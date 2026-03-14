<?php
// Importation des classes PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Chargement automatique de Composer
require 'vendor/autoload.php';

// Création d'une instance de PHPMailer

$mail = new PHPMailer(true);
function sendEmail($email,$otp)
{ global $mail;
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'email@gmail.com';
        $mail->Password = 'password';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('email@gmail.com', 'Mon site');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = "'Votre code de réinitialisation";
        $mail->Body = "Votre code OTP est : <b>$otp</b>";

        $mail->send();
        return ["status" => "success","message" => "Code de réinitialisation envoyé par email"];
    } catch (Exception $e) {
        return ["error" => "error", "message" => "Impossible d'envoyer l'email: {$mail->ErrorInfo}"];
    }
}
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'email@gmail.com';
$mail->Password = 'password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->setFrom('email@gmail.com', 'Mon site');
$mail->addAddress($email);

$mail->isHTML(true);
$mail->Subject = "Reset Password";
$mail->Body = "Votre code OTP est : <b>$otp</b>";

$mail->send();
