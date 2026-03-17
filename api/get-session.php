<?php
session_start();
header("Content-Type:application/json");



$email = $_SESSION["email"];
echo json_encode([
    "email"=>$email
]);