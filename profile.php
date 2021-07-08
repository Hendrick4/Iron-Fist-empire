<?php

require_once('connect.php');
require_once('../fonctions.php');
require_once('utils.php');
$data = ['firstname','lastname','nickname','email','pwd'];

switch($method['choice']){
    case 'envoyer':
        if(isset($method[$data]) && !empty ($method[$data])){
            $secuFName = mysqli_real_escape_string($db, $method['firstname']);
            $secuLName = mysqli_real_escape_string($db, $method['lastname']);
            $secuBDate = mysqli_real_escape_string($db, $method['birthdate']);
            $secuMail = mysqli_real_escape_string($db, $method['email']);
            $secuPseudo = mysqli_real_escape_string($db, $method['nickname']);
            $secuPWD = mysqli_real_escape_string($db, $method['password']);
            $pwd = password_hash($secuPWD, PASSWORD_DEFAULT);
           $sql = "UPDATE users (firstname,lastname,nickname,email,pwd) SET firstname = '{$method['firstname']}', lastname = '{$method['lastname']}', nickname = '{$method['nickname']}', email = '{$method['email']}', pwd = '{$pwd}' ";
           $req = $db->query($sql);
        
            echo json_encode(["success"=>true, "note"=>"Mise a jour des informations effectuée."]);
        } else echo json_encode(["success"=>false]);
        break;
        case 'afficher':
            if(isset($_SESSION['user_tag'])){
                $sql = "SELECT * FROM users WHERE id = {$_SESSION['user_tag']}";
                $user = $db->query($sql)[0];
            
                echo json_encode(["success" => true, "user" => $user, "note" =>"Informations affichées."]);
            }
            break;
}
