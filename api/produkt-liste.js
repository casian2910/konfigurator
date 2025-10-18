fetch('/products.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('produkte-liste');
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

function adaugaInCos(handle) {
  fetch(`/cart/add.js`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [{ quantity: 1, id: handle }] })
  }).then(() => {
    window.location.href = '/pages/bezahlung';
  });
}
