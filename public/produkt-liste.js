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
        <button onclick="adaugaInCos(${prod.variants[0].id})">In Warenkorb</button>
      `;
      container.appendChild(div);
    });
  });

function adaugaInCos(handle) {
  fetch(`/products/${handle}.js`)
    .then(res => res.json())
    .then(prod => {
      // Citește cosul curent din localStorage
      const cos = JSON.parse(localStorage.getItem("cos_produse") || "[]");

      // Construim produsul nostru în formatul tău existent
      const produsNou = {
        profil: prod.vendor || "Standard",
        tip_fereastra: prod.title,
        pret_unitar: prod.price / 100,
        cantitate: 1,
        poza_fereastra: prod.images[0],
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

      // opțional: adaugă și în Shopify, dacă vrei să păstrezi sincronizarea reală
      fetch(`/cart/add.js`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ quantity: 1, id: prod.variants[0].id }] })
      });

      // apoi mergem la pagina de plată personalizată
      window.location.href = '/pages/bezahlung';
    });
}
