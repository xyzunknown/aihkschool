#!/usr/bin/env node
// 把之前 sharp palette 量化丢失了 alpha 的透明 PNG 修回来。
// 检测背景 = 整图角落 4 像素的颜色（接近灰白），用 chroma key 把所有该颜色像素 alpha 置 0。
// 边缘容差 18 单位 + 羽化 2 像素去锯齿。

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "public", "brand");
const TOLERANCE = 18;
const FEATHER = 2;

const TARGETS = [
  "hero/family.png",
  "hero/family@2x.png",
  "hero/family-mobile.png",
  "hero/family-mobile@2x.png",
  "decor/leaf-tl.png",
  "decor/leaf-tr.png",
  "decor/leaf-bl.png",
  "decor/leaf-br.png",
  "decor/skyline-watercolor.png",
  "mascot/miumiu-celebrating-1024×1024.png",
  "mascot/miumiu-empty-1024×1024.png",
  "mascot/miumiu-loading-1024×1024.png",
  "mascot/miumiu-reminder1024×1024.png",
  "mascot/miumiu-thinking-1024×1024.png",
  "mascot/miumiu-waving-1024×1024.png",
  "mascot/favicon-source.png",
  "timeline/school.png",
  "timeline/microphone.png",
  "timeline/calendar.png",
  "Web Logo/Logo.png",
];

function dist(r1, g1, b1, r2, g2, b2) {
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

async function processFile(rel) {
  const p = path.join(ROOT, rel);
  try {
    await fs.access(p);
  } catch {
    console.log("  ✗ missing:", rel);
    return;
  }

  const meta = await sharp(p).metadata();
  if (meta.hasAlpha && meta.channels === 4) {
    console.log("  = skip (already has alpha):", rel);
    return;
  }

  const { data, info } = await sharp(p).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  // sample background color from 4 corners + average
  const samples = [
    [0, 0],
    [w - 1, 0],
    [0, h - 1],
    [w - 1, h - 1],
    [Math.floor(w / 2), 0],
    [Math.floor(w / 2), h - 1],
  ];
  let sr = 0,
    sg = 0,
    sb = 0;
  for (const [x, y] of samples) {
    const i = (y * w + x) * 3;
    sr += data[i];
    sg += data[i + 1];
    sb += data[i + 2];
  }
  const bgR = Math.round(sr / samples.length);
  const bgG = Math.round(sg / samples.length);
  const bgB = Math.round(sb / samples.length);

  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];
    const d = dist(r, g, b, bgR, bgG, bgB);
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;
    if (d < TOLERANCE) {
      rgba[i * 4 + 3] = 0;
    } else if (d < TOLERANCE + FEATHER * 6) {
      rgba[i * 4 + 3] = Math.min(255, Math.round(((d - TOLERANCE) / (FEATHER * 6)) * 255));
    } else {
      rgba[i * 4 + 3] = 255;
    }
  }

  const tmp = p + ".tmp";
  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(tmp);
  await fs.rename(tmp, p);
  const size = (await fs.stat(p)).size;
  console.log(
    `  ✓ ${rel}: bg=[${bgR},${bgG},${bgB}] → ${(size / 1024).toFixed(0)}KB`
  );
}

for (const rel of TARGETS) {
  await processFile(rel);
}
console.log("\nDone.");
