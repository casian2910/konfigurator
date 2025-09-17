import nodemailer from "nodemailer";

export async function sendMail(to, fenstertyp, fluegel, unterlicht, amount) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ionos.de",
    port: 465, // poți încerca și 587 dacă nu merge cu 465
    secure: true, // true pentru 465, false pentru 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Fenster-RTH" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: "Ihre Bestellbestätigung",
    html: `
      <h2>Danke für Ihre Bestellung!</h2>
      <p><b>Fenstertyp:</b> ${fenstertyp}</p>
      <p><b>Flügel:</b> ${fluegel}</p>
      <p><b>Unterlicht:</b> ${unterlicht}</p>
      <p><b>Gesamtpreis:</b> ${amount} EUR</p>
      <p>Wir werden uns in Kürze mit Ihnen in Verbindung setzen.</p>
    `
  };

  await transporter.sendMail(mailOptions);
}
