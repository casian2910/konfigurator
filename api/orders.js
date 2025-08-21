export default async function handler(req, res) {
  // Adaugă CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // or specific: "https://fenster-rth.de"
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;
    if (!data.name || !data.amount || !data.payment_method) {
      return res.status(400).json({ error: "Lipsesc date obligatorii" });
    }

    // URL-ul Web App Google Apps Script
    const sheetUrl = "https://script.google.com/macros/s/AKfycbxZQ7BRn_JkE8PX6MHaFWLMyTpbr05T1vvmyeaypUeruyznjUufR9pQArVTducD5GE_ew/exec";

    const response = await fetch(sheetUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json();
    if (!result.success) {
      return res.status(500).json({ error: "Eroare la salvarea comenzii in Sheet" });
    }

    res.status(200).json({ success: true, order_number: result.order_number });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Eroare server" });
  }
}
