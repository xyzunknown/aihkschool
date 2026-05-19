import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

function loadEnvFile(filePath) {
  return fs
    .readFile(filePath, "utf8")
    .then((text) => {
      for (const rawLine of text.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#")) continue;
        const index = line.indexOf("=");
        if (index === -1) continue;
        const key = line.slice(0, index).trim();
        let value = line.slice(index + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = value;
      }
    })
    .catch(() => {});
}

const root = process.cwd();
await loadEnvFile(path.join(root, ".env.local"));

const baseUrl = process.env.OPENAI_IMAGE_BASE_URL ?? process.env.OPENAI_BASE_URL;
const apiKey = process.env.OPENAI_IMAGE_API_KEY ?? process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-2";

if (!baseUrl || !apiKey) {
  throw new Error("Missing OPENAI_IMAGE_BASE_URL or OPENAI_IMAGE_API_KEY");
}

const outputDir = path.join(root, "public", "images", "school-photo-tests");
const outputPath = path.join(outputDir, "kindergarten-entrance-test.webp");

const prompt = [
  "Create a polished app-ready image for a Hong Kong kindergarten school card.",
  "Bright realistic exterior of a welcoming kindergarten entrance in Hong Kong.",
  "Warm daylight, clean facade, soft natural colors, no readable text, no logos, no people.",
  "Gently beautified, premium but believable, suitable for a 16:9 mobile app hero image.",
].join(" ");

const response = await fetch(`${baseUrl.replace(/\/$/, "")}/images/generations`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model,
    prompt,
    size: "1536x1024",
  }),
});

const payload = await response.json().catch(() => null);

if (!response.ok) {
  const message =
    payload?.error?.message ?? payload?.error ?? `${response.status} ${response.statusText}`;
  throw new Error(`Image generation failed: ${message}`);
}

const b64 = payload?.data?.[0]?.b64_json;
if (!b64) {
  throw new Error("Image generation response did not include b64_json");
}

await fs.mkdir(outputDir, { recursive: true });

await sharp(Buffer.from(b64, "base64"))
  .resize(1200, 675, { fit: "cover", position: "centre" })
  .modulate({ brightness: 1.03, saturation: 1.04 })
  .sharpen({ sigma: 0.6 })
  .webp({ quality: 86 })
  .toFile(outputPath);

const metadata = await sharp(outputPath).metadata();
console.log(
  JSON.stringify(
    {
      ok: true,
      output: outputPath,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
    },
    null,
    2
  )
);
