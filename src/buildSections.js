// ==============================
// CONSTRUCTION DES SECTIONS HTML
// ==============================

function renderCard(item) {
  return `
  <div class="card">
    <div class="card-header logo-row">
      <img src="${item.logo}" alt="${item.operateur}" class="logo big-logo">
      <div class="head-text">
        <h3 class="operateur-name">${item.operateur}</h3>
        <p class="offre-soustitre">${item.offre}</p>
      </div>
    </div>

    <div class="main-go-price">
      <div class="left-pack">
        <span class="connexion-label">${item.reseau}</span>
        ${item.reseau === "5G" ? '<span class="badge-5g">5G</span>' : ""}
      </div>
      <div class="price">
        <span class="price-main">${item.prix_mois.toFixed(2)}€</span>
        <span class="price-period">/mois</span>
      </div>
    </div>

    <ul class="features">
      <li><span class="icon">📶</span>${item.data === Infinity ? "Data illimitée" : item.data + " Go"}</li>
      <li><span class="icon">🇪🇺</span>${item.data_europe || "—"} Go Europe</li>
      <li><span class="icon">📱</span>${item.engagement ? "Avec engagement" : "Sans engagement"}</li>
    </ul>

    <div class="card-footer">
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn-offer">Voir l’offre</a>
    </div>
  </div>`;
}

export function buildSections(records) {
  const sections = {
    forfaits: [],
    box: [],
    boxforfait: [],
  };

  // Regroupement des données
  for (const r of records) {
    if (r.type_offre.toLowerCase().includes("forfait") && !r.type_offre.toLowerCase().includes("box")) {
      sections.forfaits.push(r);
    } else if (r.type_offre.toLowerCase().includes("box + forfait")) {
      sections.boxforfait.push(r);
    } else if (r.type_offre.toLowerCase().includes("box")) {
      sections.box.push(r);
    }
  }

  // Construction des blocs HTML
  const buildHTML = (array, id, title, emoji) => `
    <section id="${id}" class="cards-section">
      <h1>${emoji} ${title}</h1>
      <div class="cards-grid">
        ${array.map(renderCard).join("")}
      </div>
    </section>`;

  return `
    ${buildHTML(sections.forfaits, "section-mobiles", "Forfaits mobiles", "📱")}
    ${buildHTML(sections.box, "section-box", "Box Internet", "📶")}
    ${buildHTML(sections.boxforfait, "section-boxforfait", "Box + Forfait", "📦")}
  `;
}
