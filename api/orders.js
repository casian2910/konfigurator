import { sendMail } from "./email.js"; // import funcția de email

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const data = req.body;
    if (!data.name || !data.amount || !data.payment_method)
      return res.status(400).json({ error: "Missing fields" });

    const sheetUrl = "https://script.google.com/macros/s/AKfycbyxHllMiWfRGWaOavuap9EoUQ4qnU8aP0jlvcklcl_rJChqthIPuLvb_oXTOYC4UI0MEA/exec";

    const response = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (!result.success) return res.status(500).json({ error: "Error saving order" });

console.log("Date primite:", data);
console.log("Trimitem email către:", data.email);
    
   try {
  await sendMail(
    data.email,
    data.fenstertyp,
    data.fluegel,
    data.unterlicht,
    data.amount
  );
  console.log("Email trimis cu succes!");
} catch (err) {
  console.error("Eroare la trimiterea emailului:", err);
}
    res.status(200).json({ success: true, order_number: result.order_number });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
