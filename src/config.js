

// ==============================
// CONFIGURATION GLOBALE
// ==============================
export const CONFIG = {
  // === NocoDB ===
export const API_URL = "https://sheet.tools.timeonegroup.com/api/v2/tables/mz5amo5hh2ax24v/records";
export const API_TOKEN = "Bearer hQDY5bJcAtrsHPsr2mz4LQSmRxG0G7pqj-VXvsoq"; // ton token NocoDB


  // === STRUCTURE DU SITE ===
  OUTPUT_PATH: "./public/index.html", // fichier HTML final
  SITE_TITLE: "Quel Forfait Mobile - Comparateur intelligent",
  SITE_DESCRIPTION:
    "Comparez les forfaits mobiles et box internet des principaux opérateurs français selon vos besoins et votre budget.",
  SITE_FAVICON: "https://i.imgur.com/JT29hK7.png",

  // === COULEURS DE BASE ===
  COLORS: {
    primary: "#4d9eff",
    secondary: "#8a6fff",
    accent: "#0ecb60",
    text: "#2d4568",
    background: "#f0f0f0",
  },

  // === LOGOS OPÉRATEURS ===
  OPERATEURS: [
    { nom: "Orange", domain: "orange.fr" },
    { nom: "SFR", domain: "sfr.fr" },
    { nom: "Bouygues", domain: "bouyguestelecom.fr" },
    { nom: "Free", domain: "free.fr" },
    { nom: "NRJ Mobile", domain: "nrjmobile.fr" },
    { nom: "Cdiscount", domain: "cdiscount.com" },
    { nom: "Syma", domain: "symamobile.com" },
    { nom: "Auchan Telecom", domain: "auchantelecom.fr" },
    { nom: "Prixtel", domain: "prixtel.com" },
  ],
};
