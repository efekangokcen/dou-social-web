import { readFileSync, readdirSync } from "fs";
import { join, extname } from "path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY || "your-service-role-key";
const BUCKET       = "media";

async function uploadImage(filePath) {
  const buffer   = readFileSync(filePath);
  const ext      = extname(filePath).slice(1).toLowerCase();
  const mime     = ext === "jpg" ? "image/jpeg" : `image/${ext}`;
  const rand     = Math.random().toString(36).slice(2, 8);
  const destPath = `blog/${Date.now()}-${rand}.${ext}`;

  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${destPath}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SERVICE_KEY}`,
        "Content-Type": mime,
        "x-upsert": "false",
      },
      body: buffer,
    }
  );

  if (!res.ok) throw new Error(`Upload failed: ${await res.text()}`);
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${destPath}`;
}

async function insertPost(post) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SERVICE_KEY}`,
      apikey: SERVICE_KEY,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error(`Insert failed: ${await res.text()}`);
}

async function run(mdPath, imageDir, slug, seoTitle, metaDesc, tags) {
  let raw = readFileSync(mdPath, "utf-8");

  // Yayın bilgileri bloğunu kaldır
  raw = raw.replace(/\*\*Yayın bilgileri\*\*[\s\S]*?\n\n/, "");

  // H1 başlığını al ve içerikten çıkar
  const titleMatch = raw.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : seoTitle;
  raw = raw.replace(/^# .+\n+/, "");

  // Tarih satırını kaldır
  raw = raw.replace(/\*Son güncelleme:.*?\*\n+/, "");

  // Görselleri sırala
  const imageFiles = readdirSync(imageDir)
    .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f) && !f.startsWith("."))
    .sort()
    .map((f) => join(imageDir, f));

  console.log(`\n📁 ${slug} — ${imageFiles.length} görsel`);

  // Görselleri yükle
  const urls = [];
  for (const imgFile of imageFiles) {
    process.stdout.write(`   ⬆  ${imgFile.split("\\").pop()} → `);
    const url = await uploadImage(imgFile);
    urls.push(url);
    console.log("✓");
  }

  // Kapak = ilk görsel
  const cover = urls[0];

  // Yer tutucuları gerçek URL'lerle değiştir
  let urlIdx = 0;
  const content = raw
    .replace(/\*\*\[ \d+\. GÖRSEL[^\]]*\]\*\*/g, () => {
      const url = urls[urlIdx++];
      return url ? `\n![](${url})\n` : "";
    })
    .trim();

  await insertPost({
    locale: "tr",
    slug,
    title,
    seo_title: seoTitle,
    description: metaDesc,
    content,
    cover,
    tags,
    author: "DOU Social",
    published_at: new Date().toISOString().split("T")[0],
    is_published: true,
  });

  console.log(`   ✅ "${title}" yayınlandı`);
}

console.log("🚀 Blog yazıları Supabase'e yükleniyor...");

await run(
  "./public/blog/2/mermer-dijital-pazarlama-trendleri-2026.md",
  "./public/blog/2",
  "mermer-dijital-pazarlama-trendleri-2026",
  "Mermer Sektörü Dijital Pazarlama Trendleri (2026)",
  "Mermer ve doğal taş markaları için yapay zekâ, AR sanal showroom, sürdürülebilirlik ve 2026 tasarım trendlerini kapsayan güncel dijital pazarlama rehberi.",
  ["Mermer", "Doğal Taş", "Dijital Pazarlama", "Trendler"]
);

await run(
  "./public/blog/3/spor-salonu-dijital-pazarlama.md",
  "./public/blog/3",
  "spor-salonu-dijital-pazarlama",
  "Spor Salonu Dijital Pazarlama Rehberi (2026)",
  "Spor salonu ve fitness markaları için içerik, reklam, hedef kitle, bütçe ve yerel SEO stratejilerini kapsayan güncel 2026 dijital pazarlama rehberi.",
  ["Spor Salonu", "Fitness", "Dijital Pazarlama"]
);

await run(
  "./public/blog/4/spor-salonu-dijital-pazarlama-trendleri-2026.md",
  "./public/blog/4",
  "spor-salonu-dijital-pazarlama-trendleri-2026",
  "Spor Salonu Dijital Pazarlama Trendleri (2026)",
  "Spor salonu ve fitness markaları için yapay zekâ, hibrit modeller, oyunlaştırma ve yerel SEO trendlerini kapsayan güncel 2026 dijital pazarlama rehberi.",
  ["Spor Salonu", "Fitness", "Dijital Pazarlama", "Trendler"]
);

console.log("\n🎉 Tamamlandı!");
