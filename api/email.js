import nodemailer from "nodemailer";

export async function sendMail(to, name, strasse, plzOrt, order_number, amount, summaryHTML) {
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

      <p><b>Bestellwert (Brutto) inkl. 19% MwSt. Gesamtpreis: </b> ${amount} €</p>


<div style="font-family: Arial, sans-serif; font-size:8pt; color:#333; margin-top:20px; text-align:center;">
  <p>Dies ist eine automatisch erstellte E-Mail. Bitte antworten Sie nicht an diese E-Mail-Adresse. 
     Bei Fragen zu Ihrer Bestellung, Rechnung oder unseren Produkten nutzen Sie bitte unser 
     <a href="https://fenster-rth.de/pages/kontakt" target="_blank">Kontaktformular</a>.
  </p>

  <div style="margin-top:10px;">
    <img src="https://cdn.shopify.com/s/files/1/0946/0301/8572/files/2xtrustmark-header-1.png?v=1758285739" style="height:30px; margin-right:5px;">
    <img src="https://cdn.shopify.com/s/files/1/0946/0301/8572/files/veristore-siegel.png?v=1758285738" alt="Veristore siegel" style="height:30px; margin-right:5px;">
    <img src="https://cdn.shopify.com/s/files/1/0946/0301/8572/files/Komponente-6-_-1_2x_bb5ceaaf-e6d9-412c-8663-c0476eda0f67.webp?v=1758285739" alt="Top Seller" style="height:30px; margin-right:5px;">
    <img src="https://cdn.shopify.com/s/files/1/0946/0301/8572/files/ontrust-logo-shopsiegel.jpg?v=1758285851" alt="Online Shop" style="height:30px;">
  </div>

  <table style="width:100%; font-size:8pt; color:#333; margin-top:10px; text-align:left;">
    <tr>
      <td>
        <b>Fenster RTH ist eine Marke der</b><br>
        Rothermic Fenster <br>
        Birkenhof 6a<br>
        D - 91456 Diespeck
      </td>
      <td>
        <b>Persönlich haftende Gesellschafterin:</b><br>
        Fenster RTH<br>
        Birkehof 6a<br>
        D - 91456 Diespeck
      </td>
      <td>
        <b>Bankverbindung:</b><br>
        Maris Rothermic Fenster<br>
        BIC/SWIFT-Code: PBNKDEFFXXXS<br>
        IBAN: DE64 7601 0085 0168 4768 50<br>
        Kreditinstitut: Postbank
      </td>
    </tr>
  </table>
</div>
      <p>Vielen Dank für Ihre Bestellung!<br>
      Ihr Fenster RTH Team</p>
    </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

