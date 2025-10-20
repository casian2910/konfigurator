<?php
// Citim datele trimise din JavaScript
$data = json_decode(file_get_contents("php://input"), true);
$rezumat = $data['rezumat'];

// Setăm emailul unde vrei să primești notificările
$to = "info@fenster-rth.de";  // ← schimbă cu emailul tău real
$subject = "Nouă configurare de fereastră";

// Construim mesajul
$message = "Un client a adăugat în coș următoarea configurație:\n\n";
$message .= strip_tags($rezumat); // elimină tag-urile HTML pentru claritate

$headers = "From: no-reply@fenster-rth.de\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Trimitem emailul
if (mail($to, $subject, $message, $headers)) {
  echo "Trimis cu succes";
} else {
  echo "Eroare la trimitere";
}
?>
