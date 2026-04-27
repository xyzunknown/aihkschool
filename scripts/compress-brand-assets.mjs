#!/usr/bin/env node
// 压缩 public/brand 下所有 GPT 生成的大图，减少线上加载体积。
// JPG: 重采样到最大宽度 1280，quality 78
// PNG（带透明）: 重采样到最大宽度 1280，无损 + palette 优化
// 跳过 hero/、Web Logo/、mascot/（用户原图保留），跳过已小于 200KB 的文件

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "public", "brand");
const SKIP_DIRS = new Set(["hero", "Web Logo", "mascot"]);
const MAX_WIDTH = 1280;
const JPG_QUALITY = 78;
const SKIP_BELOW_KB = 200;

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const rel = path.relative(ROOT, full).split(path.sep)[0];
      if (SKIP_DIRS.has(rel)) continue;
      yield* walk(full);
    } else if (entry.isFile() && /\.(jpe?g|png)$/i.test(entry.name)) {
      yield full;
    }
  }
}

let scanned = 0;
let compressed = 0;
let savedTotalKb = 0;

for await (const file of walk(ROOT)) {
  scanned++;
  const before = (await fs.stat(file)).size;
  if (before / 1024 < SKIP_BELOW_KB) {
    continue;
  }

  const ext = path.extname(file).toLowerCase();
  const tmp = file + ".tmp";
  const meta = await sharp(file).metadata();
  const resize = meta.width && meta.width > MAX_WIDTH ? { width: MAX_WIDTH } : null;

  let pipeline = sharp(file);
  if (resize) pipeline = pipeline.resize(resize);

  if (ext === ".jpg" || ext === ".jpeg") {
    await pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toFile(tmp);
  } else {
    // PNG: NEVER use palette:true — it strips alpha channel on RGBA images
    // and silently bakes the transparent area to a solid colour, leaving
    // the source PNG looking fine while the on-disk file is broken.
    // Stick with deflate-only compression so transparency is preserved.
    await pipeline.png({ compressionLevel: 9, effort: 10 }).toFile(tmp);
  }

  const after = (await fs.stat(tmp)).size;
  if (after >= before) {
    await fs.unlink(tmp);
    console.log(`  = skip (no gain): ${path.relative(ROOT, file)}`);
    continue;
  }
  await fs.rename(tmp, file);
  const savedKb = Math.round((before - after) / 1024);
  savedTotalKb += savedKb;
  compressed++;
  console.log(
    `  ✓ ${path.relative(ROOT, file)}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (-${savedKb}KB)`
  );
}

console.log(
  `\nDone. scanned=${scanned} compressed=${compressed} total saved=${(savedTotalKb / 1024).toFixed(1)} MB`
);
