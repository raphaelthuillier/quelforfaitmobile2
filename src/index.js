import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchData } from "./fetchData.js";
import { buildLayout } from "./buildLayout.js";
import { buildSlicer } from "./slicer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "../public/index.html");

async function main() {
  console.log("🚀 Génération du site QuelForfaitMobile…");

  // 1️⃣ Récupération des données depuis NocoDB
  const records = await fetchData();
  if (!records.length) {
    console.error("❌ Aucune donnée disponible, arrêt du build.");
    return;
  }

  // 2️⃣ Construction du slicer dynamique (curseurs + opérateurs + réseaux)
  const slicerHtml = buildSlicer(records);

  // 3️⃣ Construction du layout complet (header + slicer + sections + footer)
  const html = buildLayout(records, slicerHtml);

  // 4️⃣ Écriture du fichier dans /public
  fs.mkdirSync(path.join(__dirname, "../public"), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, html, "utf8");

  console.log(`✅ Build terminé : ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Erreur lors du build :", err);
});
