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

  let pret = 0;

  // 1. Preț de bază pentru producător
  const pretHersteller = {
    "Salamander 76 AD": 50,
    "Salamander 76 MD": 55,
    "Aluplast 70": 45,
    "Kömmerling 88 MD": 65
  };
  pret += pretHersteller[hersteller] || 0;

  // 2. Calcul suprafață totală
  const suprafataPrincipala = (breite / 1000) * (hoehe / 1000);
  const suprafataOberlicht = (breite / 1000) * (hoeheOberlicht / 1000);
  const suprafataTotala = suprafataPrincipala + suprafataOberlicht;

  // 3. Preț pe m² bază
  const tarifBazaPeMp = 125.6;
  pret += suprafataTotala * tarifBazaPeMp;

  // 4. Tip fereastră (pe m²)
  const esteFereastraFixa = fenstertyp === "Festverglasung";
  if (esteFereastraFixa) {
    pret -= suprafataTotala * 10; // reducere €/m²
  } else {
    pret += suprafataTotala * 20; // cost deschidere €/m²
  }

  // 5. Verglasung (3-Fach = extra pe m²)
  if (verglasung === "3-Fach-Verglasung") {
    const tarifTripluGeam = 35;
    pret += suprafataTotala * tarifTripluGeam;
  }

const normalizedAussen = aussenfarbe?.trim().toLowerCase();
const normalizedInnen = innenfarbe?.trim().toLowerCase();

const weissAussen = normalizedAussen === "weiß" || normalizedAussen === "weiss";
const weissInnen = normalizedInnen === "weiß" || normalizedInnen === "weiss";

if (!weissAussen && !weissInnen) {
  pret += suprafataTotala * 30; // ambele colorate
} else if (!weissAussen || !weissInnen) {
  pret += suprafataTotala * 15; // doar una colorată
}

  // 6. Tip sticlă (satin pe m²)
  if (glastyp === "satin") {
    const tarifSatin = 25;
    pret += suprafataTotala * tarifSatin;
  }

  // 7. Rotunjire
  pret = Math.round(pret * 100) / 100;

  return res.status(200).json({ pret });
}
