import nodemailer from "nodemailer";

export async function sendMail(clientEmail, fenstertyp, fluegel, unterlicht, pret) {
  let transporter = nodemailer.createTransport({
    host: "smtp.tudomeniu.de",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: '"Fenster-RTH" <no-reply@fenster-rth.de>',
    to: clientEmail,
    subject: "Bestellbestätigung - Fenster-RTH",
    html: `
      <h3>Danke für Ihre Bestellung!</h3>
      <ul>
        <li>Fenstertyp: ${fenstertyp}</li>
        <li>Flügel: ${fluegel}</li>
        <li>Unterlicht: ${unterlicht}</li>
        <li>Preis: ${pret} €</li>
      </ul>
    `
  });
}
