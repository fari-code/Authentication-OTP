<?php
session_start();
header("Content-Type:application/json");
require "config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"] ?? "";
$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

if (empty($username) || empty($email) || empty($password)) {
    echo json_encode([
        "error" => "error",
        "message" => "Tous les champs sont obligatoires"
    ]);
    exit;
}
$check = $conn->prepare("SELECT id FROM users WHERE email=?");
$check->execute([$email]);
if ($check->rowCount() > 0) {
    echo json_encode([
        "error" => "error",
        "message" => "Email déjà utilisé"
    ]);
    exit;
}
$passwordhash = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO `users`(`username`, `email`, `password`) VALUES (?,?,?)";
$stmt = $conn->prepare($sql);
$stmt->execute([
    $username,
    $email,
    $passwordhash
]);
$_SESSION['username'] = $username;

echo json_encode([
    "status" => "success",
    "message" => "Inscription réussie"
]);
