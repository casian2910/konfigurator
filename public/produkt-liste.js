fetch('/products.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('produkt-liste');
    container.innerHTML = ""; // curățăm containerul
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(3, 1fr)";
    container.style.gap = "20px";

    data.products.forEach(prod => {
      const div = document.createElement('div');
      div.className = 'produkt-item';
      div.style.border = "1px solid #ccc";
      div.style.padding = "10px";
      div.style.textAlign = "center";
      div.style.cursor = "pointer";

      // când dai click pe imagine sau titlu, mergi la pagina produsului
      div.addEventListener("click", () => {
        window.location.href = `/products/${prod.handle}`;
      });

      div.innerHTML = `
        <img src="${prod.images[0]?.src}" style="max-width:150px; margin-bottom:10px;">
        <h3 style="margin:10px 0;">${prod.title}</h3>
        <p>${prod.variants[0].price} €</p>
      `;

      container.appendChild(div);
    });
  })
  .catch(err => console.error("Eroare la afișarea produselor:", err));

function adaugaInCos(handle) {
  fetch(`/products/${handle}.js`)
    .then(res => res.json())
    .then(prod => {
      const cos = JSON.parse(localStorage.getItem("cos_produse") || "[]");

     // construim produsul doar cu ce există
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


      // redirect fix către pagina ta de checkout
      window.location.href = '/pages/bezahlung';
    })
    .catch(err => console.error("Eroare la adăugarea în coș:", err));
}
