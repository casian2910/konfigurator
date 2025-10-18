fetch('/products.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('produkt-liste');
    data.products.forEach(prod => {
      const div = document.createElement('div');
      div.className = 'produkt-item';
      div.innerHTML = `
        <img src="${prod.images[0]?.src}" style="max-width:120px">
        <h3>${prod.title}</h3>
        <p>${prod.variants[0].price} €</p>
        <button onclick="adaugaInCos('${prod.handle}')">In Warenkorb</button>
      `;
      container.appendChild(div);
    });
  });

// === FUNCȚIA CORECTATĂ ===
function adaugaInCos(handle) {
  fetch(`/products/${handle}.js`)
    .then(res => res.json())
    .then(prod => {
      const cos = JSON.parse(localStorage.getItem("cos_produse") || "[]");

      const produsNou = {
        profil: prod.vendor || "Standard",
        tip_fereastra: prod.title,
        pret_unitar: prod.price / 100,
        cantitate: 1,
        poza_fereastra: prod.featured_image,
        fenstertyp: "Standard",
        culoare_exterior: "Weiß",
        culoare_interior: "Weiß",
        tip_geam: "Standard",
        glastyp: "",
        dimensiuni: "",
        dimensiuni2: "",
        fensterbankanschluss: ""
      };

      cos.push(produsNou);
      localStorage.setItem("cos_produse", JSON.stringify(cos));

      // adăugăm și în Shopify (opțional)
      fetch(`/cart/add.js`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ quantity: 1, id: prod.variants[0].id }] })
      });

      window.location.href = '/pages/bezahlung';
    })
    .catch(err => console.error("Eroare la adăugarea în coș:", err));
}
