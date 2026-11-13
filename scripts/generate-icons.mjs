// Generates favicons, PWA icons and the social share image from the logo.
// Usage: npm run icons
import sharp from "sharp";
import fs from "node:fs";

const SRC = "scripts/source/logo-original.png";
const OUT = "public";
const NAVY = "#2C587D";
const meta = await sharp(SRC).metadata();

// The round emblem lives in the left ~40% of the wordmark — crop a square around it.
const size = Math.round(meta.height * 0.92);
const cropped = await sharp(SRC)
  .extract({ left: Math.round(meta.width * 0.03), top: 0, width: size, height: meta.height })
  .toBuffer();
// Tight-trim the transparent margin so the emblem fills the icon (no "shrunk" look)
const emblem = await sharp(cropped).trim({ threshold: 8 }).toBuffer();
const em = await sharp(emblem).metadata();
console.log("emblem trimmed to", em.width, "x", em.height);

const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const square = (px, pad = 0.02, bg = CLEAR) => {
  const inner = Math.round(px * (1 - pad * 2));
  return sharp(emblem)
    .resize(inner, inner, { fit: "contain", background: CLEAR })
    .extend({
      top: Math.floor((px - inner) / 2), bottom: Math.ceil((px - inner) / 2),
      left: Math.floor((px - inner) / 2), right: Math.ceil((px - inner) / 2),
      background: bg,
    });
};

const png = (px, name, pad, bg) => square(px, pad, bg).png({ compressionLevel: 9 }).toFile(`${OUT}/${name}`);

await Promise.all([
  png(16, "favicon-16x16.png", 0.0),
  png(32, "favicon-32x32.png", 0.0),
  png(48, "favicon-48x48.png", 0.0),
  png(96, "favicon-96x96.png", 0.02),
  png(180, "apple-touch-icon.png", 0.1, WHITE),
  png(192, "icon-192.png", 0.03),
  png(512, "icon-512.png", 0.03),
  png(512, "icon-maskable-512.png", 0.2, WHITE), // safe-zone padding for maskable icons
]);

// favicon.ico (PNG-in-ICO, 16/32/48)
const sizes = [16, 32, 48];
const imgs = await Promise.all(sizes.map((s) => square(s, 0).png().toBuffer()));
const header = Buffer.alloc(6); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = imgs.map((b, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0); e.writeUInt8(sizes[i], 1); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(b.length, 8); e.writeUInt32LE(offset, 12); offset += b.length; return e;
});
fs.writeFileSync(`${OUT}/favicon.ico`, Buffer.concat([header, ...dir, ...imgs]));

// Scalable favicon wrapper (modern browsers pick the sharpest size)
const b64 = (await square(256, 0).png().toBuffer()).toString("base64");
fs.writeFileSync(`${OUT}/favicon.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><image width="256" height="256" href="data:image/png;base64,${b64}"/></svg>`);

// Open Graph / Twitter share image 1200x630
const logo = await sharp(SRC).resize({ width: 760 }).toBuffer();
const lm = await sharp(logo).metadata();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#EAF6FF" } })
  .composite([
    { input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="590" width="1200" height="40" fill="${NAVY}"/><rect x="0" y="0" width="14" height="590" fill="#25B5E9"/></svg>`), top: 0, left: 0 },
    { input: logo, top: Math.round((590 - lm.height) / 2) - 40, left: 220 },
    { input: Buffer.from(`<svg width="1200" height="120" xmlns="http://www.w3.org/2000/svg"><text x="600" y="60" font-family="Arial,sans-serif" font-size="34" font-weight="700" fill="${NAVY}" text-anchor="middle">Accurate Results, Better Health — Thiruvarur</text></svg>`), top: 440, left: 0 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(`${OUT}/og-image.jpg`);

console.log("icons generated");
