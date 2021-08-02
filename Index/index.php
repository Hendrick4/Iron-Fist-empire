<?php
session_start();
require_once('../connect.php');
require_once('../../fonctions.php');
require_once('../utils.php');


if(isset(
    $method['pseudo'],
    $method['pwd']
    )) {
        $Spseudo = mysqli_real_escape_string($db, $method['pseudo']);
        $Spwd = mysqli_real_escape_string($db, $method['pwd']);
        $sql = "SELECT id,pwd,is_admin FROM users WHERE nickname = '{$Spseudo}'";
        $res = $db ->query($sql);
        $user = resultAsArray($res)[0];
        $pwdCheck = password_verify($method['pwd'], $user['pwd']);
        if($pwdCheck){
            $_SESSION['log_in'] = true;
            $_SESSION['user_tag'] = $user['id'];
            $_SESSION['user_status'] = $user['is_admin'];
            unset($user['pwd']);
            unset($user['is_admin']);
            echo json_encode(["success"=>true,"user"=>$user]);
    }
} else {
    $_SESSION['log_in'] = false;
    echo json_encode(["success"=>false]);
}


?>