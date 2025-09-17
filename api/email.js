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
     <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <!-- Logo -->
      <div style="text-align:center; margin-bottom:20px;">
        <img src="https://cdn.shopify.com/s/files/1/0946/0301/8572/files/logo_transparent.png?v=1747438787" alt="Fenster RTH Logo" style="max-width:200px;">
      </div>

      <p>Sehr geehrter Kunde,</p>
      <p>vielen Dank für Ihr Vertrauen, das Sie uns mit Ihrer Bestellung entgegengebracht haben. Wir bestätigen hiermit nachfolgenden Auftrag. Es gelten unsere AGB.</p>

      <p><strong>Bestellnummer:</strong> ${order_number}</p>

      <h3>Rechnungsadresse</h3>
      <p>
        ${data.name}<br>
        ${data.strasse}<br>
        ${data.plzOrt}<br>
        </p>


      <h3>Ihre bestellten Artikel</h3>
      <ul>
      <li>Hersteller: ${hersteller}</li>
      <li>Fensterart: ${fensterart}</li>
      <li>Fensteröffnung: ${fenstertyp}</li>
      <li>Außenfarbe: ${aussenfarbe}</li>
      <li>Innenfarbe: ${innenfarbe}</li>
      <li>Verglasung: ${verglasung}</li>
      <li>Glastyp: ${glastyp}</li>
      <li>Maße BxH: ${breite} mm x ${hoehe} mm</li>
      <li>Höhe Ober/-Unterlicht: ${hoeheOberlicht} mm</li>
      <li>Fensterbankanschluss: ${fensterbankanschluss}</li>
      <li>Gesamtpreis: ${amount} €</li>
      </ul>


      <p>Vielen Dank für Ihre Bestellung!<br>
      Ihr Fenster RTH Team</p>
    </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

