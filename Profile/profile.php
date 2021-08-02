<?php
session_start();

require_once('../connect.php');
require_once('../../fonctions.php');
require_once('../utils.php');

switch($method['choice']){
    case 'envoyer':
        if(isset($method['firstname'],
        $method['lastname'],
        $method['nickname'],
        $method['email'],
        $method['pwd'])
        && !empty($method['firstname'])
        && !empty($method['lastname'])
        && !empty($method['nickname'])
        && !empty($method['email'])
        && !empty($method['pwd'])){
            $secuFName = mysqli_real_escape_string($db, $method['firstname']);
            $secuLName = mysqli_real_escape_string($db, $method['lastname']);
            $secuMail = mysqli_real_escape_string($db, $method['email']);
            $secuPseudo = mysqli_real_escape_string($db, $method['nickname']);
            $secuPWD = mysqli_real_escape_string($db, $method['pwd']);
            $pwd = password_hash($secuPWD, PASSWORD_DEFAULT);
           $sql = "UPDATE users SET firstname = '{$method['firstname']}', lastname = '{$method['lastname']}', nickname = '{$method['nickname']}', email = '{$method['email']}', pwd = '{$pwd}' WHERE id ={$_SESSION['user_tag']}";
           $req = $db->query($sql);
            echo json_encode(["success"=>true, "note"=>"Mise a jour des informations effectuée."]);
        } else echo json_encode(["success"=>false]);
        break;
        case 'afficher':
            if(isset($_SESSION['user_tag'])){
                $sql = $db->query("SELECT * FROM users WHERE id = {$_SESSION['user_tag']}");
                $user = resultAsArray($sql)[0];
                unset($user['pwd']);
            
                echo json_encode(["success" => true, "user" => $user, "note" =>"Informations affichées."]);
            }
            break;
}
