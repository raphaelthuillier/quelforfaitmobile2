import { CONFIG } from "./config.js";
import { buildSections } from "./buildSections.js";

// ==============================
// CONSTRUCTION DU TEMPLATE GLOBAL HTML
// ==============================

export function buildLayout(records, slicerHtml) {
  const { SITE_TITLE, SITE_DESCRIPTION, SITE_FAVICON } = CONFIG;

  const htmlHeader = `
  <header id="site-header" class="site-header">
    <div class="header-box">
      <a href="/" class="header-logo">
        <img src="${SITE_FAVICON}" alt="QuelForfaitMobile" class="logo-img">
        <span class="logo-text">QuelForfaitMobile</span>
      </a>
      <nav class="main-nav">
        <a href="#section-mobiles" class="nav-btn">
          📱 <span class="text">Forfait mobile</span><span class="short">Forfait</span>
        </a>
        <a href="#section-box" class="nav-btn">
          📶 <span class="text">Box Internet</span><span class="short">Box</span>
        </a>
        <a href="#section-boxforfait" class="nav-btn">
          📦 <span class="text">Box + Forfait</span><span class="short">Box + Forfait</span>
        </a>
      </nav>
    </div>
  </header>`;

  const htmlFooter = `
  <footer style="text-align:center;padding:30px 0;color:#7b8da5;font-size:.9rem;">
    © ${new Date().getFullYear()} QuelForfaitMobile — Données mises à jour automatiquement.
  </footer>`;

  const htmlSections = buildSections(records);

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${SITE_TITLE}</title>
  <meta name="description" content="${SITE_DESCRIPTION}">
  <link rel="icon" type="image/png" href="${SITE_FAVICON}">
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  ${htmlHeader}
  ${slicerHtml || ""}
  <main class="container-fluid">
    ${htmlSections}
  </main>
  ${htmlFooter}
  <script src="./extra.js"></script>
</body>
</html>`;
}
