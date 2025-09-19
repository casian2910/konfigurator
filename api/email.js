import nodemailer from "nodemailer";

export async function sendMail(to, name, strasse, plzOrt, fenstertyp, amount, order_number, summaryHTML) {
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
        <img src="https://cdn.shopify.com/s/files/1/0946/0301/8572/files/logo_transparent.png?v=1747438787" 
             alt="Fenster RTH Logo" style="max-width:200px;">
      </div>

      <p>Sehr geehrter Kunde,</p>
      <p>vielen Dank für Ihr Vertrauen, das Sie uns mit Ihrer Bestellung entgegengebracht haben. 
         Wir bestätigen hiermit nachfolgenden Auftrag. Es gelten unsere AGB.</p>

      <p><strong>Bestellnummer:</strong> ${order_number}</p>

      <h3>Rechnungsadresse</h3>
      <p>
        ${name}<br>
        ${strasse}<br>
        ${plzOrt}<br>
      </p>

      ${summaryHTML}  

      <p><b>Gesamtpreis:</b> ${amount} €</p>

      <p>Vielen Dank für Ihre Bestellung!<br>
      Ihr Fenster RTH Team</p>
    </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

