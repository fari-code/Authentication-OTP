<?php
$host = "localhost";
$user = "root";
$password = "";
$db = "authentication_users";
try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} catch (PDOException $e) {
    echo "Echec de la connexion" . $e->getMessage();
}

