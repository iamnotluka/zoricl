const fs = require("fs");
const path = require("path");
const katex = require("katex");

const SRC = __dirname;
const DIST = path.join(SRC, "dist");

const STATIC_PATHS = [
  "style.css",
  "date.js",
  "listen.js",
  "favicon.ico",
  "feed.xml",
  "profile_image.jpg",
  "vercel.json",
  "assets",
  "content",
];

function renderMath(html) {
  html = html.replace(/\$\$([\s\S]+?)\$\$/g, (m, tex) => {
    try {
      return katex.renderToString(tex.trim(), {
        displayMode: true,
        throwOnError: false,
      });
    } catch {
      return m;
    }
  });
  html = html.replace(/\$([^$\n]+?)\$/g, (m, tex) => {
    try {
      return katex.renderToString(tex.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return m;
    }
  });
  return html;
}

function stripKatexScripts(html) {
  return html.replace(/[ \t]*<script\b[^>]*katex[^>]*>[\s\S]*?<\/script>\n?/g, "");
}

function loadAudioManifest() {
  const p = path.join(SRC, "assets", "audio", "manifest.json");
  if (!fs.existsSync(p)) return { version: 1, posts: {} };
  try {
    const m = JSON.parse(fs.readFileSync(p, "utf8"));
    if (m && typeof m === "object" && m.posts) return m;
  } catch (e) {
    console.warn(`audio manifest: unreadable (${e.message}); skipping injection`);
  }
  return { version: 1, posts: {} };
}

function injectPlayer(html, slug) {
  const player =
    '<div class="listen">\n' +
    '          <button class="listen-btn" type="button" aria-label="Play narration"><span class="listen-icon">▶</span>Audio</button>\n' +
    '          <span class="listen-time"></span>\n' +
    '          <audio preload="metadata" src="/assets/audio/' +
    slug +
    '.mp3"></audio>\n' +
    "        </div>";

  let injected = false;
  html = html.replace(
    /(<div class="post-meta">[\s\S]*?<\/div>)/,
    (m) => {
      injected = true;
      return m + "\n\n        " + player;
    },
  );
  if (!injected) return html;

  html = html.replace(
    /<\/body>/,
    '    <script src="/listen.js" defer></script>\n  </body>',
  );
  return html;
}

function findChartUrl() {
  const indexHtml = fs.readFileSync(path.join(SRC, "index.html"), "utf8");
  const match = indexHtml.match(
    /https:\/\/github-chart-api\.vercel\.app\/api\/chart\?[^"']+/,
  );
  return match ? match[0] : null;
}

async function fetchChart(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`status ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buf);
}

async function main() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  for (const p of STATIC_PATHS) {
    const s = path.join(SRC, p);
    if (fs.existsSync(s)) fs.cpSync(s, path.join(DIST, p), { recursive: true });
  }

  let chartReplacement = null;
  const chartUrl = findChartUrl();
  if (chartUrl) {
    fs.mkdirSync(path.join(DIST, "assets"), { recursive: true });
    const chartDest = path.join(DIST, "assets", "gh-chart.svg");
    try {
      await fetchChart(chartUrl, chartDest);
      chartReplacement = "/assets/gh-chart.svg";
      console.log("github chart: fetched and saved");
    } catch (e) {
      console.warn(`github chart: fetch failed (${e.message}); using live URL`);
    }
  }

  const audioManifest = loadAudioManifest();

  const htmlFiles = fs.readdirSync(SRC).filter((f) => f.endsWith(".html"));
  for (const file of htmlFiles) {
    let html = fs.readFileSync(path.join(SRC, file), "utf8");
    html = renderMath(html);
    html = stripKatexScripts(html);
    if (chartReplacement && chartUrl) {
      html = html.split(chartUrl).join(chartReplacement);
    }
    const slug = file.replace(/\.html$/, "");
    if (audioManifest.posts[slug]) {
      html = injectPlayer(html, slug);
    }
    fs.writeFileSync(path.join(DIST, file), html);
  }

  fs.writeFileSync(
    path.join(DIST, "serve.json"),
    JSON.stringify({ cleanUrls: true, trailingSlash: false }, null, 2) + "\n",
  );

  console.log(`built ${htmlFiles.length} html files into dist/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
