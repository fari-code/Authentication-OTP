<?php


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


require '../vendor/autoload.php';







$mail = new PHPMailer(true);

function sendEmail($email, $otp)
{
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username ="dossafarid1@gmail.com";
        $mail->Password = "a u v y s r z v c e c j y e x e";
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('no-reply@authsystem.com', 'AuthSystem');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = "Code de reinitialisation";
        $mail->Body = "<h2>Réinitialisation de mot de passe</h2>
        <p>Voici votre code OTP :</p>
        <h1>$otp</h1>
        <p>Ce code expire dans 5 minutes.</p>
        ";
        $mail->AltBody = "Votre code OTP est : $otp";
        $mail->send();
        return ["status" => "success", "message" => "Code de réinitialisation envoyé par email"];
    } catch (Exception $e) {
        return ["error" => "error", "message" => "Impossible d'envoyer l'email: {$mail->ErrorInfo}"];
    }
}
