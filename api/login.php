<?php
session_start();
header("Content-Type:application/json");
require "config/database.php";

$data = json_decode(file_get_contents("php://input"), true);


$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

if (empty($email) || empty($password)) {
    echo json_encode([
        "error" => "error",
        "message" => "Tous les champs sont obligatoires"
    ]);
    exit;
}


$sql = "SELECT `id`, `username`, `email`, `password` FROM `users` WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$user){
        echo json_encode([
        "error" => "error",
        "message" => "Email incorrect"
    ]);
    exit;  
}

if (!password_verify($password,$user["password"])){
        echo json_encode([
        "error" => "error",
        "message" => "Mot de passe incorrect"
    ]);
    exit;   
}
$_SESSION['id_user'] = $user["id"];
$_SESSION['username'] = $user["username"];

echo json_encode([
    "status" => "success",
    "message" => "Connexion réussie"
]);
