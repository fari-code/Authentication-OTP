<?php
session_start();
header("Content-Type:application/json");
require "config/database.php";

$data = json_decode(file_get_contents("php://input"), true);


$otp = $data["otp"] ?? "";
if (empty($otp)) {
    echo json_encode([
        "status" => "error",
        "message" => "Veuillez saisir le code OTP"
    ]);
    exit;
};
$sql = "SELECT * FROM password_modify WHERE  otp= ? AND expirationCode > NOW()";
$stmt = $conn->prepare($sql);
$stmt->execute([$otp]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);
if ($stmt->rowCount() == 0) {
    echo json_encode([
        "status" => "error",
        "message" => "code OTP invalide ou expiré"
    ]);
    exit;
} else {
    echo json_encode([
        "status" => "success",
        "message" => "code OTP valide"
    ]);
    exit;
}
