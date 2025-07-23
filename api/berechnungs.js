export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const {
    hersteller,
    breite,
    hoehe,
    hoeheOberlicht = 0,
    verglasung,
    glastyp,
    fenstertyp,
    aussenfarbe,
    innenfarbe
  } = req.body;

  // Verificare existență producător
  const herstellerKey = (hersteller || "").trim();
  const pretHersteller = {
    "Aluplast 70": 55,
    "Salamander 76 AD": 65,
    "Salamander 76 MD": 78,
    "Kömmerling 88 MD": 88
  };

  const tarifPeMpPerHersteller = {
    "Aluplast 70": 115,
    "Salamander 76 AD": 125,
    "Salamander 76 MD": 138,
    "Kömmerling 88 MD": 150
  };

  if (!pretHersteller[herstellerKey] || !tarifPeMpPerHersteller[herstellerKey]) {
    return res.status(400).json({ message: "Hersteller invalid sau lipsă." });
  }

  let pret = 0;

  // 1. Preț de bază pentru producător
  pret += pretHersteller[herstellerKey];

  // 2. Calcul suprafață totală
  const suprafataPrincipala = (breite / 1000) * (hoehe / 1000);
  const suprafataOberlicht = (breite / 1000) * (hoeheOberlicht / 1000);
  const suprafataTotala = suprafataPrincipala + suprafataOberlicht;

  // 3. Tarif specific producător
  const tarif = tarifPeMpPerHersteller[herstellerKey];
  pret += suprafataTotala * tarif;

  // 4. Tip fereastră (Festverglasung = reducere, altfel adaos)
  const esteFereastraFixa = fenstertyp === "Festverglasung";
  if (esteFereastraFixa) {
    pret -= suprafataTotala * 10; // reducere €/m²
  } else {
    pret += suprafataTotala * 20; // cost deschidere €/m²
  }

  // 5. Tip de geam (3-Fach = extra €/m²)
  if (verglasung === "3-Fach-Verglasung") {
    pret += suprafataTotala * 35;
  }

  // 6. Culoare exterior/interior
  const normAussen = (aussenfarbe || "").toLowerCase();
  const normInnen = (innenfarbe || "").toLowerCase();
  const eAlbAussen = normAussen === "weiß" || normAussen === "weiss";
  const eAlbInnen = normInnen === "weiß" || normInnen === "weiss";

  if (!eAlbAussen && !eAlbInnen) {
    pret += suprafataTotala * 30;
  } else if (!eAlbAussen || !eAlbInnen) {
    pret += suprafataTotala * 15;
  }

  // 7. Tip sticlă (satin = extra €/m²)
  if ((glastyp || "").toLowerCase() === "satin") {
    pret += suprafataTotala * 25;
  }

  // 8. Rotunjire
  pret = Math.round(pret * 100) / 100;

  return res.status(200).json({ pret });
}
