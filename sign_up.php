<?php

require_once('connect.php');
require_once('utils.php');
require_once('../fonctions.php');
$verif = true;
$infos = ['firstname','lastname','birthdate','email','nickname','password'];
foreach($infos as $info) {
    if(isset($method[$info])){
        $verif = true;
    } else {
        $verif = false;
        echo json_encode(["success"=>false, "warning" => "Veuillez renseigner toutes les valeurs"]);
        die();
    }
}

if($info == 'email'){
    $regex = "/^[^0-9][_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/";
    if(!preg_match($regex, $method['email'])){
        echo json_encode(["success" => false, "warning" => "Veuillez entrer une adresse mail au bon format."]);
        die();
    }
}
if($info == 'password'){
    $regex = "/^\S*(?=\S{4,45})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/";
    if(!preg_match($regex,$method['password'])){
        echo json_encode(["success" => false, "warning" => "Votre mot de passe doit contenir au moins 4 caractères, 1 majuscule, 1 caractère special et 1 chiffre"]);
        die();
    }
}
$pwd = password_hash($method['password'], PASSWORD_DEFAULT);
$sql = "INSERT INTO users(firstname, lastname, birthdate, email, nickname, pwd) VALUES ('{$method['firstname']}','{$method['lastname']}','{$method['birthdate']}','{$method['email']}', '{$method['nickname']}', '{$pwd}')";
$res = $db->query($sql);
//!$_SESSION['user_tag'] = 
echo json_encode(["success" => true]);