const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const OpenAI = require("openai");

const SRC = __dirname;
const AUDIO_DIR = path.join(SRC, "assets", "audio");
const MANIFEST_PATH = path.join(AUDIO_DIR, "manifest.json");

const MAX_TTS_CHARS = 3500;

function loadManifest() {
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      const m = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
      if (m && typeof m === "object") {
        if (!m.posts) m.posts = {};
        if (!m.version) m.version = 1;
        return m;
      }
    } catch (e) {
      console.warn(`manifest unreadable (${e.message}); starting fresh`);
    }
  }
  return { version: 1, posts: {} };
}

function stripTags(html) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractPost(html) {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const article = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (!h1 || !article) return null;
  const title = stripTags(h1[1]);
  const articleHtml = article[1].trim();
  if (!title || !articleHtml) return null;
  return { title, articleHtml };
}

function chunkScript(text, maxChars) {
  const chunks = [];
  // Split on paragraph boundaries first, then sentences if needed.
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  let current = "";

  function pushUnit(unit) {
    if (unit.length > maxChars) {
      // Unit itself is too long: split on sentence boundaries.
      const sentences = unit.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [unit];
      for (const s of sentences) {
        const sentence = s.trim();
        if (!sentence) continue;
        if (sentence.length > maxChars) {
          // Hard fallback: slice the oversized sentence on whitespace.
          let rest = sentence;
          while (rest.length > maxChars) {
            let cut = rest.lastIndexOf(" ", maxChars);
            if (cut <= 0) cut = maxChars;
            pushUnit(rest.slice(0, cut).trim());
            rest = rest.slice(cut).trim();
          }
          if (rest) pushUnit(rest);
        } else {
          pushUnit(sentence);
        }
      }
      return;
    }
    if (!current) {
      current = unit;
    } else if (current.length + 2 + unit.length <= maxChars) {
      current += "\n\n" + unit;
    } else {
      chunks.push(current);
      current = unit;
    }
  }

  for (const p of paragraphs) pushUnit(p);
  if (current) chunks.push(current);
  return chunks;
}

async function narrate(openai, title, articleHtml) {
  const system =
    "You convert a blog post into a clean, natural spoken-word narration script for text-to-speech. Output ONLY the words to be spoken: no markdown, no headings, no stage directions, no URLs. Begin with exactly: 'This is " +
    title +
    ", by Luka Zoric.' Then narrate the article in a warm, clear, conversational voice. Convert math notation and symbols into spoken English (for example, x squared, the square root of two, the integral of f of x). Do not read code blocks verbatim; instead summarize in one sentence what the code does, or skip it. For figures or diagrams, give a one-line description from their labels, or skip them. Expand abbreviations sensibly. Preserve the author's meaning and structure, using natural sentences a person would actually say aloud.";

  const narrationHtml = articleHtml.replace(
    /<div class="post-meta">[\s\S]*?<\/div>/i,
    ""
  );

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 8000,
    messages: [
      { role: "system", content: system },
      { role: "user", content: narrationHtml },
    ],
  });

  return (res.choices[0].message.content || "").trim();
}

async function synthesize(openai, script) {
  const chunks = chunkScript(script, MAX_TTS_CHARS);
  const buffers = [];
  for (let i = 0; i < chunks.length; i++) {
    const res = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "sage",
      input: chunks[i],
      response_format: "mp3",
      instructions:
        "Read in a warm, clear, unhurried voice, like narrating a thoughtful blog post.",
    });
    buffers.push(Buffer.from(await res.arrayBuffer()));
  }
  return Buffer.concat(buffers);
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("missing env: OPENAI_API_KEY");
    process.exit(1);
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  fs.mkdirSync(AUDIO_DIR, { recursive: true });
  const manifest = loadManifest();

  const blogFiles = fs
    .readdirSync(SRC)
    .filter((f) => /^blog-.*\.html$/.test(f));

  let generated = 0;
  let skipped = 0;

  for (const file of blogFiles) {
    const slug = file.replace(/\.html$/, "");
    let html;
    try {
      html = fs.readFileSync(path.join(SRC, file), "utf8");
    } catch (e) {
      console.warn(`warn ${slug}: cannot read file (${e.message}); skipping`);
      continue;
    }

    const post = extractPost(html);
    if (!post) {
      console.warn(`warn ${slug}: could not extract article; skipping`);
      continue;
    }

    const cacheKey = crypto
      .createHash("sha256")
      .update(post.articleHtml)
      .digest("hex");

    const existing = manifest.posts[slug];
    const mp3Path = path.join(AUDIO_DIR, `${slug}.mp3`);
    if (existing && existing.hash === cacheKey && fs.existsSync(mp3Path)) {
      console.log(`skip ${slug} (unchanged)`);
      skipped++;
      continue;
    }

    try {
      const script = await narrate(openai, post.title, post.articleHtml);
      if (!script) {
        console.warn(`warn ${slug}: empty narration; skipping`);
        continue;
      }
      const audio = await synthesize(openai, script);
      fs.writeFileSync(mp3Path, audio);
      manifest.posts[slug] = {
        title: post.title,
        hash: cacheKey,
        file: `/assets/audio/${slug}.mp3`,
        generatedAt: new Date().toISOString(),
      };
      console.log(`generated ${slug}`);
      generated++;
    } catch (e) {
      console.warn(`warn ${slug}: generation failed (${e.message}); skipping`);
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`done: ${generated} generated, ${skipped} skipped`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
