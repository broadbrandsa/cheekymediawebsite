// Generates a Sanity import file from the migrated catalogue in
// src/content/work.ts. Run scripts/upload-work-images.sh first to upload the
// images and produce /tmp/asset-map.txt, then:
//
//   node scripts/build-work-import.mjs
//   npx sanity dataset import /tmp/work-import.ndjson --dataset production --replace
//
// WARNING: --replace overwrites documents by id (work-<slug>), so re-running
// this discards any edits made in the studio. It exists for a rebuild from
// scratch, not for routine syncing.

import fs from "node:fs";
import path from "node:path";

const projectRoot = "/Users/mikeelmira/Desktop/Cheeky Media Website/cheeky-media";

// Parse the migrated catalogue straight out of work.ts so the CMS import is
// generated from the same source the site already renders.
const src = fs.readFileSync(path.join(projectRoot, "src/content/work.ts"), "utf8");
const arrStart = src.indexOf("export const work: WorkItem[] = [");
const arrEnd = src.indexOf("\n];", arrStart);
const body = src.slice(src.indexOf("[", arrStart) + 1, arrEnd);

const items = [];
for (const chunk of body.split(/\n  \{\n/).slice(1)) {
  const block = "{\n" + chunk;
  const get = (k) => {
    const m = block.match(new RegExp(`\\b${k}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
    return m ? m[1].replace(/\\"/g, '"') : undefined;
  };
  const num = (k) => {
    const m = block.match(new RegExp(`\\b${k}:\\s*(\\d+)`));
    return m ? Number(m[1]) : undefined;
  };
  const cats = (block.match(/categories:\s*\[([^\]]*)\]/) || [, ""])[1]
    .split(",").map((s) => s.trim().replace(/^"|"$/g, "")).filter(Boolean);
  const bodyMatch = block.match(/body:\s*\[([\s\S]*?)\n    \],/);
  const paras = bodyMatch
    ? [...bodyMatch[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) =>
        m[1].replace(/\\"/g, '"').replace(/\s+/g, " ").trim())
    : [];
  items.push({
    slug: get("slug"), title: get("title"), kicker: get("kicker"),
    categories: cats, client: get("client"), year: num("year"),
    summary: get("summary"), videoId: get("videoId"), paras,
  });
}

const assetMap = Object.fromEntries(
  fs.readFileSync("/tmp/asset-map.txt", "utf8").trim().split("\n")
    .filter(Boolean).map((l) => l.split("|")),
);

const docs = items.map((it, i) => {
  const asset = assetMap[it.slug];
  if (!asset) throw new Error("no uploaded image for " + it.slug);
  const doc = {
    _id: `work-${it.slug}`,
    _type: "project",
    title: it.title,
    slug: { _type: "slug", current: it.slug },
    categories: it.categories,
    summary: it.summary,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset },
      alt: it.title,
    },
    order: (i + 1) * 10,
    featured: i < 6,
  };
  if (it.kicker) doc.kicker = it.kicker;
  if (it.client) doc.client = it.client;
  if (it.year) doc.year = it.year;
  if (it.videoId) doc.videoUrl = `https://www.youtube.com/watch?v=${it.videoId}`;
  if (it.paras.length) {
    doc.body = it.paras.map((text, n) => ({
      _type: "block", _key: `b${n}`, style: "normal",
      children: [{ _type: "span", _key: `s${n}`, text }],
    }));
  }
  return doc;
});

fs.writeFileSync("/tmp/work-import.ndjson", docs.map((d) => JSON.stringify(d)).join("\n"));
console.log("parsed items :", items.length);
console.log("with image   :", docs.length);
console.log("with video   :", docs.filter((d) => d.videoUrl).length);
console.log("with body    :", docs.filter((d) => d.body).length);
console.log("featured     :", docs.filter((d) => d.featured).length);
console.log("\nfirst three:");
docs.slice(0, 5).forEach((d) => console.log(` ${d.slug.current.padEnd(28)} ${d.categories.join("/").padEnd(16)} ${d.videoUrl ? "video" : "     "} ${d.body ? "body" : ""}`));
