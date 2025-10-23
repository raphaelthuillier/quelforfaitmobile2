import fetch from "node-fetch";
import { CONFIG } from "./config.js";

// ==============================
// RÉCUPÉRATION ET NETTOYAGE DES DONNÉES NOCODB
// ==============================
export async function fetchData() {
  try {
    const response = await fetch(CONFIG.NOCO_URL, {
      headers: {
        Authorization: CONFIG.NOCO_TOKEN,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur NocoDB ${response.status}`);
    }

    const data = await response.json();
    if (!data.list || !Array.isArray(data.list)) {
      throw new Error("Structure inattendue : data.list manquant");
    }

    // Nettoyage & normalisation des données
    const records = data.list
      .filter((r) => r.operateur && r.type_offre && r.offre)
      .map((r) => {
        const prix = parseFloat(String(r.prix_mois || "0").replace(",", ".").replace(/[^0-9.]/g, "")) || 0;
        const dataGo =
          typeof r.data === "string"
            ? parseFloat(r.data.replace(",", ".").match(/[\d.]+/)?.[0] || "0")
            : r.data || 0;
        const logo =
          r.logo ||
          `https://logo.clearbit.com/${
            CONFIG.OPERATEURS.find((o) => r.operateur.toLowerCase().includes(o.nom.toLowerCase()))?.domain ||
            "example.com"
          }`;
        const favicon = `https://www.google.com/s2/favicons?domain=${
          CONFIG.OPERATEURS.find((o) => r.operateur.toLowerCase().includes(o.nom.toLowerCase()))?.domain ||
          "example.com"
        }&sz=64`;

        return {
          operateur: r.operateur,
          offre: r.offre,
          type_offre: r.type_offre,
          prix_mois: prix,
          data: dataGo,
          data_europe: r.data_europe || null,
          reseau: r.reseau || "4G",
          engagement: Boolean(r.engagement),
          bloque: Boolean(r.bloque),
          logo,
          favicon,
          url: r.url,
          plus_infos: r.plus_infos || "",
          reseau_op: r.reseau_op || "",
        };
      });

    console.log(`✅ ${records.length} offres récupérées depuis NocoDB.`);
    return records;
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des données :", err.message);
    return [];
  }
}
