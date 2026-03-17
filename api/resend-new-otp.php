<?php
session_start();
header("Content-Type:application/json");
require "sendEmail.php";
require "config/database.php";

$email = $_SESSION["email"];

$otp = random_int(100000,999999);

$expirationCode = date("Y-m-d H:i:s", strtotime("+5 minutes"));

$sql = "UPDATE password_modify 
        SET otp = ?, expirationCode = ?
        WHERE email = ?";

$stmt = $conn->prepare($sql);
$stmt->execute([$otp,$expirationCode,$email]);

$reponse = sendEmail($email,$otp);

echo json_encode([
    "success" => true,
]);