export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://fenster-rth.de'); // sau '*' dacă vrei pentru toate domeniile
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const {
    hersteller,
    breite,
    hoehe,
    hoeheOberlicht = 0,
    verglasung,
    glastyp,
    fensterart,
    fenstertyp,
    fenstertyp2,
    fenstertyp3,
    fenstertyp4,
    fenstertyp5,
    aussenfarbe,
    innenfarbe
  } = req.body;

  let pret = 0;

 // 1. Preț de bază pentru producător 
  const pretHersteller = {
  "Koemmerling 70 AD": 15, 
  "Koemmerling 76 MD": 25, 
  "Koemmerling 88 MD": 35 
};
  pret += pretHersteller[hersteller] || 0;

  // 2. Calcul suprafață totală
  const suprafataPrincipala = (breite / 1000) * (hoehe / 1000);
  const suprafataOberlicht = (breite / 1000) * (hoeheOberlicht / 1000);
  const suprafataTotala = suprafataPrincipala + suprafataOberlicht;

const tarifBazaPeMp = {
  "Koemmerling 70 AD": 148.6,
  "Koemmerling 76 MD": 169.5,    // exemplu tarif diferit
  "Koemmerling 88 MD": 201.5
};
pret += suprafataTotala * (tarifBazaPeMp[hersteller] || 0);
  
  // 1 Flügel 
if (fenstertyp === "Festverglasung") {
  pret += suprafataTotala * 24;
} else if (fenstertyp === "Links" || fenstertyp === "Rechts") {
  pret += 120 + suprafataTotala * 30;
}

  // Oberlicht
if (fenstertyp2 === "Festverglasung") {
  pret += suprafataTotala * 10;  // exemplu +5 EUR/m²
} else if (fenstertyp2 === "Links" || fenstertyp2 === "Rechts") {
  pret += suprafataTotala * 35; // exemplu +30 EUR/m²
} else if (fenstertyp2 === "Links - Kipp" || fenstertyp2 === "Rechts - Kipp") {
  pret += suprafataTotala * 55; // exemplu +30 EUR/m²
}
  
  // Unterlicht
if (fenstertyp3 === "Festverglasung") {
  pret += suprafataTotala * 10;  // exemplu +5 EUR/m²
} else if (fenstertyp3 === "Links" || fenstertyp3 === "Rechts") {
  pret += suprafataTotala * 35; // exemplu +30 EUR/m²
}
  
// 2 Flügel
if (fenstertyp4 === "Festverglasung") {
  pret += suprafataTotala * 1;  // exemplu +5 EUR/m²
} else if (fenstertyp4 === "drehkipp Links und Fest" || fenstertyp4 === "drehkipp Rechts und Fest") {
  pret += suprafataTotala * 10; // exemplu +30 EUR/m²
} else if (fenstertyp4 === "Drehkipp Links und drehkipp Rechst mit Pfosten") {
  pret += suprafataTotala * 15; // exemplu +30 EUR/m²
} else if (fenstertyp4 === "Drehkipp Links und dreh Rechst mit Stulp(Ohne Pfosten)" || fenstertyp4 === "Drehkipp Rechts und dreh Links mit Stulp(Ohne Pfosten)") {
  pret += suprafataTotala * 15; // exemplu +30 EUR/m²
}

  // 2 Flügel mit Unterlicht
if (fenstertyp5 === "Festverglasung") {
  pret += suprafataTotala * 2;  // exemplu +5 EUR/m²
} else if (fenstertyp5 === "drehkipp Links und Fest Unterlicht" || fenstertyp5 === "drehkipp Rechts und Fest Unterlicht") {
  pret += suprafataTotala * 3; // exemplu +30 EUR/m²
} else if (fenstertyp5 === "Drehkipp Links und drehkipp Rechst mit Pfosten") {
  pret += suprafataTotala * 53; // exemplu +30 EUR/m²
} else if (fenstertyp5 === "Drehkipp Links und drehkipp Rechst mit Stulp") {
  pret += suprafataTotala * 5; // exemplu +30 EUR/m²
} else if (fenstertyp5 === "Drehkipp Rechts und dreh Links mit Stulp") {
  pret += suprafataTotala * 5; // exemplu +30 EUR/m²
}
  
  // 5. Verglasung (3-Fach = extra pe m²)
  if (verglasung === "3-Fach-Verglasung") {
    const tarifTripluGeam = 35;
    pret += suprafataTotala * tarifTripluGeam;
  }

const normAussen = (aussenfarbe || "").toLowerCase();
const normInnen = (innenfarbe || "").toLowerCase();

const eAlbAussen = normAussen === "weiß" || normAussen === "weiss";
const eAlbInnen = normInnen === "weiß" || normInnen === "weiss";

if (!eAlbAussen && !eAlbInnen) {
  pret += suprafataTotala * 30;
} else if (!eAlbAussen || !eAlbInnen) {
  pret += suprafataTotala * 15;
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




















































