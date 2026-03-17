<?php
session_start();
header("Content-Type:application/json");
require "config/database.php";
require "sendEmail.php";

$data = json_decode(file_get_contents("php://input"), true);


$email = $data["email"] ?? "";


if (empty($email)) {
    echo json_encode([
        "status" => "error",
        "message" => "Veuillez remplir le champs d'Email"
    ]);
    exit;
}
if(isset($email)){
    $_SESSION["email"] = $email ;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "status" => "error",
        "message" => "Email invalide"
    ]);
    exit;
}

$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->execute([$email]);
$result = $check->fetch(PDO::FETCH_ASSOC);
if ($check->rowCount() == 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Cet email n’est pas enregistré"
    ]);
    exit;
}
$otp = random_int(100000, 999999);
$expirationCode = date("Y-m-d H:i:s", strtotime("+5 minutes"));
$sql = "INSERT INTO password_modify(email, otp, expirationCode)
VALUES(?,?,?)";
$stmt = $conn->prepare($sql);
$stmt->execute([
    $email,
    $otp,
    $expirationCode
]);
$_SESSION['id_user'] = $result["id"];

$reponse = sendEmail($email,$otp);

echo json_encode($reponse);
