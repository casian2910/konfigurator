const container = document.getElementById("produkte-liste");

produkte.forEach(produs => {
  const div = document.createElement("div");
  div.className = "produkt-item";
  div.innerHTML = `
    <img src="${produs.poza_fereastra}" style="max-width:100px;">
    <p>${produs.titlu}</p>
    <b>${produs.pret_unitar} EUR</b>
    <button data-id="${produs.id}">In Warenkorb</button>
  `;
  container.appendChild(div);
});

// Klick-Event: Produkt in Warenkorb legen
document.querySelectorAll("#produkte-liste button").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    const produs = produkte.find(p => p.id === id);
    const cos = JSON.parse(localStorage.getItem("cos_produse") || "[]");

    // Wenn schon vorhanden, Menge erhöhen
    const existent = cos.find(p => p.id === id);
    if (existent) {
      existent.cantitate = (existent.cantitate || 1) + 1;
    } else {
      cos.push({...produs, cantitate: 1});
    }

    localStorage.setItem("cos_produse", JSON.stringify(cos));
    afiseazaCos();
  });
});
