export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // ✅ adaugă această linie
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // preflight OK
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { hersteller, breite, hoehe, hoeheOberlicht, verglasung, glastyp } = req.body;

  let pret = 0;

  switch (hersteller) {
    case "Salamander 76 AD": pret += 50; break;
    case "Salamander 76 MD": pret += 55; break;
    case "Aluplast 70": pret += 45; break;
    case "Kömmerling 88 MD": pret += 65; break;
    default: pret += 0;
  }

  const suprafata = (breite / 100) * (hoehe / 100);
  pret += suprafata * 1.256;

  if (verglasung === "3-Fach-Verglasung") pret += 8;
  if (glastyp === "klarglas") pret += 10;
  if (glastyp === "satin") pret += 50;

  res.status(200).json({ pret });
}
