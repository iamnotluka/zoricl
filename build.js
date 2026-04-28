const fs = require("fs");
const path = require("path");
const katex = require("katex");

const SRC = __dirname;
const DIST = path.join(SRC, "dist");

const STATIC_PATHS = [
  "style.css",
  "date.js",
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

  const htmlFiles = fs.readdirSync(SRC).filter((f) => f.endsWith(".html"));
  for (const file of htmlFiles) {
    let html = fs.readFileSync(path.join(SRC, file), "utf8");
    html = renderMath(html);
    html = stripKatexScripts(html);
    if (chartReplacement && chartUrl) {
      html = html.split(chartUrl).join(chartReplacement);
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
