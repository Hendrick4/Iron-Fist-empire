<?php
session_start();
require_once('connect.php');
require_once('../fonctions.php');
require_once('utils.php');
$pwdCheck ='';

if(isset(
    $method['pseudo'],
    $method['pwd']
    )) {
        if($pwdCheck){
        $pwdCheck = password_verify($method['pwd'], $user['pwd']);
        $sql = "SELECT id FROM users WHERE nickname = '{$method['pseudo']}' AND pwd = '{$method['pwd']}'";
        $res = $db ->query($sql);
        $user = resultAsArray($res)[0];
        $_SESSION['log_in'] = true;
        $_SESSION['user_tag'] = $user['id'];
        echo json_encode(["success"=>true]);
    }
} else {
    $_SESSION['log_in'] = false;
    echo json_encode(["success"=>false]);
}


?>