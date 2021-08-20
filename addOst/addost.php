<?php

require_once('../connect.php');
require_once('../../fonctions.php');
require_once('../utils.php');
session_start();

switch($method['table']){
    case 'opus':
        $sql = $db->query("SELECT * FROM opus");
        $opus = resultAsArray($sql);
        
        echo json_encode(["success"=>true,"opus"=> $opus]);
    break;
    
    case 'ost':
        if(isset($method['name'],$method['opus'],$method['link']) && !empty($method['name']) && !empty($method['opus']) && !empty($method['link'])) {
            $secuName = mysqli_real_escape_string($db, $method['name']);
            $secuLink = mysqli_real_escape_string($db, $method['link']);
            $req = "INSERT INTO ost(ost_name, id_opus, ost_link) VALUES ('$secuName',{$method['opus']},'$secuLink')";
            $ost = $db->query($req);
        
            echo(json_encode(["success"=>true, "msg"=>"Ajout de l'OST réussi!"]));
        } else echo(json_encode(["success"=>false, "msg"=>"Echec de l'ajout de l'OST"]));
    break;
}

