<?php
session_start();
header("Content-Type:application/json");
require "config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$idUser = $_SESSION['id_user'] ?? null;

if (!$idUser) {
    echo json_encode([
        "status" => "error",
        "message" => "Utilisateur non identifié"
    ]);
    exit;
}

$passwordSet = $data["passwordSet"] ?? "";
if (empty($passwordSet)) {
    echo json_encode([
        "status" => "error",
        "message" => "Veuillez saisir votre nouveau mot de passe"
    ]);
    exit;
};


$passwordSetHash = password_hash($passwordSet, PASSWORD_DEFAULT);
$stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
$stmt->execute([
    $passwordSetHash,
    $idUser
]);

echo json_encode([
    "status"=>"success",
    "message"=>"Mot de passe modifiée avec succès!"
]);