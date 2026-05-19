import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

async function loadEnvFile(filePath) {
  try {
    const text = await fs.readFile(filePath, "utf8");
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
  } catch {
    // ignore missing env file
  }
}

const root = process.cwd();
await loadEnvFile(path.join(root, ".env.local"));

const baseUrl = process.env.OPENAI_IMAGE_BASE_URL ?? process.env.OPENAI_BASE_URL;
const apiKey = process.env.OPENAI_IMAGE_API_KEY ?? process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-2";

if (!baseUrl || !apiKey) {
  throw new Error("Missing OPENAI_IMAGE_BASE_URL or OPENAI_IMAGE_API_KEY");
}

const webDir = path.join(root, "public", "images", "activity-scenes");
const iosDir = path.join(root, "..", "HKSchoolPlaceiOS", "HKSchoolPlace", "AppMedia", "ActivityScenes");

const styleSpec = [
  "Use case: photorealistic-natural",
  "Asset type: app card image",
  "Style: realistic editorial photography, not illustration, not 3D render",
  "Camera: 35mm, natural perspective, premium but believable",
  "Lighting: soft natural daylight, calm, clean, slightly warm",
  "Color palette: slightly desaturated, gentle warm neutrals, no neon",
  "Composition: horizontal 3:2, clear main subject, open space for overlays",
  "Constraints: no people, no faces, no hands, no text, no logos, no signage, no watermark",
  "Avoid: cartoon look, glossy fake perfection, artificial staging, AI artifacts",
].join(". ");

const jobs = [
  {
    file: "swimming-indoor.webp",
    prompt:
      "An empty indoor swimming pool with calm turquoise water, lane ropes, tiled deck, and a quiet training atmosphere. The image should clearly read as swimming class or aquatic training. " +
      styleSpec,
  },
  {
    file: "pool-outdoor.webp",
    prompt:
      "An empty outdoor public swimming pool with blue water, pool deck, railings, and open sky. The image should clearly read as a sports venue for swimming lessons. " +
      styleSpec,
  },
  {
    file: "dance-studio.webp",
    prompt:
      "An empty dance studio with a wooden floor, mirror wall, ballet barre, and soft morning light. The image should clearly read as a dance training room. " +
      styleSpec,
  },
  {
    file: "music-piano.webp",
    prompt:
      "A quiet music practice room with an upright piano, piano bench, music stand, and warm natural light. The image should clearly read as a music lesson space. " +
      styleSpec,
  },
  {
    file: "art-table.webp",
    prompt:
      "A neat art classroom table with paint jars, brushes, paper, and creative supplies arranged in a calm, organized way. The image should clearly read as an art activity space. " +
      styleSpec,
  },
  {
    file: "sports-hall.webp",
    prompt:
      "An empty indoor sports hall with polished wooden flooring, court markings, and a basketball hoop in the distance. The image should clearly read as a general sports training venue. " +
      styleSpec,
  },
  {
    file: "running-track.webp",
    prompt:
      "An empty outdoor running track beside a green field under soft daylight. The image should clearly read as an exercise and sports training venue. " +
      styleSpec,
  },
  {
    file: "parent-child-playroom.webp",
    prompt:
      "A warm parent-child activity corner with wooden toys, picture books, a soft rug, and low shelves. The image should clearly read as a family activity space. " +
      styleSpec,
  },
  {
    file: "badminton-court.webp",
    prompt:
      "An empty indoor badminton court with green flooring, white court lines, and a set net. The image should clearly read as a sports court. " +
      styleSpec,
  },
  {
    file: "science-lab.webp",
    prompt:
      "A child-friendly science activity table with magnifying glass, simple experiment materials, small containers, and clean classroom surfaces. The image should clearly read as a hands-on science activity space. " +
      styleSpec,
  },
  {
    file: "reading-corner.webp",
    prompt:
      "A cozy reading corner with children's books, a small sofa, soft cushions, and calm natural light. The image should clearly read as a language and reading activity space. " +
      styleSpec,
  },
  {
    file: "theatre-stage.webp",
    prompt:
      "A small empty theatre stage with curtains, simple props, and rehearsal lighting in a quiet room. The image should clearly read as a drama or performance activity space. " +
      styleSpec,
  },
  {
    file: "table-tennis-room.webp",
    prompt:
      "An empty indoor table tennis training room with a professional table, net, paddles resting on the table, and sports flooring. The image should clearly read as table tennis training. " +
      styleSpec,
  },
  {
    file: "judo-dojo.webp",
    prompt:
      "An empty judo dojo with clean tatami mats, folded belts, and a quiet training atmosphere. The image should clearly read as martial arts training. " +
      styleSpec,
  },
  {
    file: "tai-chi-park.webp",
    prompt:
      "A quiet open outdoor practice space in a park with broad paving, trees, and gentle morning light. The image should clearly read as tai chi training or slow movement practice. " +
      styleSpec,
  },
  {
    file: "tai-chi-sword.webp",
    prompt:
      "A calm outdoor practice space with a tai chi sword resting on a mat or bench, broad paving, and morning light. The image should clearly read as tai chi sword training. " +
      styleSpec,
  },
  {
    file: "water-safety-pool.webp",
    prompt:
      "A shallow swimming training area with lane markers, a rescue ring, and calm water designed for water safety lessons. The image should clearly read as beginner aquatic safety training. " +
      styleSpec,
  },
  {
    file: "go-board.webp",
    prompt:
      "A quiet tabletop with a wooden Go board and black and white stones neatly arranged in a training room. The image should clearly read as a Go chess lesson or strategy board game class. " +
      styleSpec,
  },
  {
    file: "garden-activity.webp",
    prompt:
      "A neat gardening activity table with small potted herbs, soil trays, hand tools, and plant labels turned away from camera with no readable text. The image should clearly read as a children's gardening activity. " +
      styleSpec,
  },
  {
    file: "basketball-court.webp",
    prompt:
      "An empty indoor basketball training court with polished wooden floor, court markings, and a hoop. The image should clearly read as a children's basketball training class venue. " +
      styleSpec,
  },
  {
    file: "yoga-studio.webp",
    prompt:
      "A calm empty yoga studio with small exercise mats, soft daylight, wooden floor, and simple props. The image should clearly read as a yoga or movement class space. " +
      styleSpec,
  },
  {
    file: "pottery-table.webp",
    prompt:
      "A pottery classroom table with clay pieces, simple pottery tools, a small wheel, and ceramic materials. The image should clearly read as a pottery or ceramics workshop. " +
      styleSpec,
  },
];

await fs.mkdir(webDir, { recursive: true });
await fs.mkdir(iosDir, { recursive: true });

async function generateOne(job) {
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/images/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt: job.prompt,
      size: "1536x1024",
      quality: "high",
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      payload?.error?.message ?? payload?.error ?? `${response.status} ${response.statusText}`;
    throw new Error(`Image generation failed for ${job.file}: ${message}`);
  }

  const b64 = payload?.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error(`Image generation response did not include b64_json for ${job.file}`);
  }

  const buffer = Buffer.from(b64, "base64");
  const webPath = path.join(webDir, job.file);
  const iosPath = path.join(iosDir, job.file);

  const normalized = await sharp(buffer)
    .resize(1200, 800, { fit: "cover", position: "attention" })
    .modulate({ brightness: 1.03, saturation: 1.02 })
    .sharpen({ sigma: 0.5 })
    .webp({ quality: 86 })
    .toBuffer();

  await fs.writeFile(webPath, normalized);
  await fs.writeFile(iosPath, normalized);

  const metadata = await sharp(normalized).metadata();
  return { file: job.file, width: metadata.width, height: metadata.height };
}

const results = [];
const only = new Set(
  process.argv
    .slice(2)
    .flatMap((arg) => (arg.startsWith("--only=") ? arg.slice(7).split(",") : []))
    .map((value) => value.trim())
    .filter(Boolean),
);
const selectedJobs = only.size > 0 ? jobs.filter((job) => only.has(job.file)) : jobs;

for (const job of selectedJobs) {
  console.log(`Generating ${job.file}...`);
  results.push(await generateOne(job));
}

console.log(JSON.stringify({ ok: true, results }, null, 2));
