const express = require("express");
const cors = require("cors");        // ✅ Aici importi cors
const app = express();

app.use(cors());                     // ✅ Aici îl activezi global
app.use(express.json());

app.post("/calculeaza", (req, res) => {
    console.log("CERERE PRIMITĂ:", req.body);
  const { hersteller, breite, hoehe, verglasung, glastyp } = req.body;

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

  if (verglasung === "2-Fach-Verglasung") pret += 0;
  if (verglasung === "3-Fach-Verglasung") pret += 8;
  if (glastyp === "klarglas") pret += 10;
  if (glastyp === "satin") pret += 50;


 // pret = Math.round(pret);

  res.json({ pret });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});