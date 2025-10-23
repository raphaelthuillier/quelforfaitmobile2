import { API_URL, API_TOKEN } from "./config.js";

document.addEventListener("DOMContentLoaded", async () => {
  const sections = [
    { id: "mobiles", type: "Forfait" },
    { id: "box", type: "Box" },
    { id: "boxforfait", type: "Box + Forfait" },
  ];

  const forfaits = await fetchData();
  renderAllSections(forfaits, sections);
});

async function fetchData() {
  const res = await fetch(API_URL, { headers: { Authorization: API_TOKEN } });
  const data = await res.json();
  return data.list || [];
}

function renderAllSections(forfaits, sections) {
  sections.forEach(sec => {
    const filtered = forfaits.filter(f => f.type_offre === sec.type);
    renderCards(`#cards-${sec.id}`, filtered);
    renderSlicer(`#slicer-${sec.id}`, filtered, `#cards-${sec.id}`);
  });
}

function renderCards(containerSelector, forfaits) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = "";
  forfaits.forEach(f => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.prix = f.prix_mois || 0;
    card.dataset.go = f.data_go || 0;
    card.dataset.reseau = f.reseau_op || f.reseau || "";

    card.innerHTML = `
      <div class="card-header logo-row">
        <img src="${f.logo_favicon || f.logo || ""}" alt="${f.operateur}" class="logo big-logo">
        <div class="head-text">
          <h3 class="operateur-name">${f.operateur || "Opérateur inconnu"}</h3>
          <p class="offre-soustitre">${f.offre || ""}</p>
        </div>
      </div>
      <div class="main-go-price">
        <div class="left-pack">
          <span class="connexion-label">${f.reseau || "4G"}</span>
          ${f.reseau === "5G" ? '<span class="badge-5g">5G</span>' : ""}
        </div>
        <div class="price">
          <span class="price-main">${f.prix_mois || "-"}€</span>
          <span class="price-period">/mois</span>
        </div>
      </div>
      <div class="card-footer">
        <a href="${f.Tracking || f.url}" target="_blank" class="btn-offer">Voir l’offre</a>
      </div>`;
    container.appendChild(card);
  });
}

function renderSlicer(slicerSelector, forfaits, cardContainerSelector) {
  const slicer = document.querySelector(slicerSelector);
  const cardContainer = document.querySelector(cardContainerSelector);

  const operateurs = [...new Set(forfaits.map(f => f.operateur).filter(Boolean))];
  const reseaux = [...new Set(forfaits.map(f => f.reseau_op || f.reseau).filter(Boolean))];

  slicer.innerHTML = `
    <div class="control-line">
      <div class="slicer-title">Filtres</div>
      <div class="control-block">
        <label>Prix max</label>
        <input type="range" id="prix-max" min="0" max="100" value="100" />
        <span id="prix-value">100 €</span>
      </div>
      <div class="control-options" id="ops"></div>
      <div class="control-options" id="res"></div>
    </div>`;

  const opsContainer = slicer.querySelector("#ops");
  operateurs.forEach(op => {
    const btn = document.createElement("button");
    btn.className = "reseau-btn operateur-btn";
    btn.textContent = op;
    btn.onclick = () => {
      btn.classList.toggle("active");
      applyFilters();
    };
    opsContainer.appendChild(btn);
  });

  const resContainer = slicer.querySelector("#res");
  reseaux.forEach(res => {
    const btn = document.createElement("button");
    btn.className = "reseau-btn";
    btn.textContent = res;
    btn.onclick = () => {
      btn.classList.toggle("active");
      applyFilters();
    };
    resContainer.appendChild(btn);
  });

  slicer.querySelector("#prix-max").addEventListener("input", e => {
    slicer.querySelector("#prix-value").textContent = e.target.value + " €";
    applyFilters();
  });

  function applyFilters() {
    const prixMax = parseFloat(slicer.querySelector("#prix-max").value);
    const activeOps = [...opsContainer.querySelectorAll(".active")].map(b => b.textContent.trim());
    const activeRes = [...resContainer.querySelectorAll(".active")].map(b => b.textContent.trim());

    cardContainer.querySelectorAll(".card").forEach(card => {
      const prix = parseFloat(card.dataset.prix) || 0;
      const opName = card.querySelector(".operateur-name")?.textContent.trim();
      const reseau = card.dataset.reseau;
      let visible = true;

      if (prix > prixMax) visible = false;
      if (activeOps.length && !activeOps.includes(opName)) visible = false;
      if (activeRes.length && !activeRes.includes(reseau)) visible = false;

      card.style.display = visible ? "" : "none";
    });
  }
}
