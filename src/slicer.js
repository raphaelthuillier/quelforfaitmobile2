// =============================================
// GÉNÉRATION DU SLICER (curseurs + filtres + tri)
// =============================================

function getNumericRange(records, key) {
  const values = records.map(r => Number(r[key])).filter(v => Number.isFinite(v));
  if (!values.length) return { min: 0, max: 100 };
  return {
    min: Math.floor(Math.min(...values)),
    max: Math.ceil(Math.max(...values))
  };
}

function getUnique(records, key) {
  return [...new Set(records.map(r => r[key]).filter(Boolean))];
}

export function buildSlicer(records) {
  const prix = getNumericRange(records, "prix_mois");
  const data = getNumericRange(records, "data_go");
  const dataEurope = getNumericRange(records, "data_europe_go");

  // ✅ Opérateurs dynamiques (depuis les données réelles)
  const operateurs = getUnique(records, "operateur").sort();
  const operateursHTML = operateurs.map(o => `
    <button class="reseau-btn operateur-btn" data-operateur="${o}">
      <img src="https://www.google.com/s2/favicons?domain=${o.replace(/\s+/g,'').toLowerCase()}.fr&sz=32" alt="${o}" width="18" height="18">
      ${o}
    </button>
  `).join("");

  // ✅ Réseaux (fixes)
  const reseaux = ["Orange", "SFR", "Bouygues", "Free"];
  const reseauxHTML = reseaux.map(r => `
    <button class="reseau-btn" data-reseau="${r}">
      <img src="https://www.google.com/s2/favicons?domain=${r.toLowerCase()}.fr&sz=32" alt="${r}" width="18" height="18">
      ${r}
    </button>
  `).join("");

  // ✅ Curseurs dynamiques
  const sliders = [
    { id: "montant-actuel-mobile", label: "Votre prix actuel", value: prix.min, min: prix.min, max: prix.max, unit: "€", step: 1 },
    { id: "prix-max-mobile", label: "Prix max souhaité", value: prix.max, min: prix.min, max: prix.max, unit: "€", step: 1 },
    { id: "go-min-mobile", label: "Data min souhaitée", value: data.min, min: data.min, max: data.max, unit: "Go", step: 5 },
    { id: "go-europe-min-mobile", label: "Data EU min souhaitée", value: dataEurope.min, min: dataEurope.min, max: dataEurope.max, unit: "Go", step: 5 }
  ];

  const slidersHTML = sliders.map(s => `
    <div class="control-block" data-for="${s.id}">
      <label for="${s.id}" class="slicer-label">${s.label}</label>
      <div class="number-wrapper">
        <button class="btn-minus" data-target="${s.id}" data-step="${s.step}"></button>
        <span class="value" id="v-${s.id}" data-unit="${s.unit}">${s.value} ${s.unit}</span>
        <button class="btn-plus" data-target="${s.id}" data-step="${s.step}"></button>
        <input type="number" id="${s.id}" value="${s.value}" min="${s.min}" max="${s.max}" hidden>
      </div>
    </div>`).join("");

  // ✅ Bloc HTML final du slicer
  return `
  <div id="filters" class="forfaits-filters" role="region" aria-label="Filtres forfaits mobiles">
    <button class="filters-collapse" type="button">×</button>
    <div class="filters-inner">
      <div class="slicer-title">🔎 Recherche forfait mobile</div>

      <div class="control-line">${slidersHTML}</div>

      <div class="filters-section" style="margin-top:4px;margin-bottom:2px;">
        <strong>Opérateurs</strong>
        <div class="control-options reseaux-list">${operateursHTML}</div>
      </div>

      <div class="filters-section">
        <strong>Options</strong>
        <div class="control-options">
          <div class="filter-btn" data-opt="5g">5G</div>
          <div class="filter-btn" data-opt="illimite">Appels illimités</div>
          <div class="filter-btn" data-opt="sms">SMS illimités</div>
          <div class="filter-btn" data-opt="engagement">Sans engagement</div>
          <div class="filter-btn" data-opt="esim">eSIM</div>
        </div>

        <strong>Réseaux</strong>
        <div class="control-options reseaux-list">${reseauxHTML}</div>
      </div>

      <div class="sort-bar-inline" style="display:flex;gap:8px;flex-wrap:nowrap;margin-top:12px;align-items:center;">
        <span style="font-weight:600;">Trier par</span>
        <button class="sort-btn" data-sort="prix_asc">Prix ↑</button>
        <button class="sort-btn" data-sort="prix_desc">Prix ↓</button>
        <button class="sort-btn" data-sort="data_desc">Data ↑</button>
        <button class="sort-btn" data-sort="score_desc">Score (Go/€) ↑</button>
      </div>
    </div>
    <button id="filters-toggle" class="filters-toggle" type="button" style="display:none;">Afficher les filtres</button>
  </div>`;
}
