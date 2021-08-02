<?php

require_once('../connect.php');
require_once('../utils.php');
require_once('../../fonctions.php');


switch($method['table']){
    case 'opus':
        $sql = $db->query("SELECT * FROM opus");
        $titres = resultAsArray($sql);
        echo json_encode(["success" => true,"titres"=>$titres]);
        break;
    
    case 'ost':
        $sql = $db ->query("SELECT * FROM ost
        INNER JOIN opus o on ost.id_opus = o.id_opus 
        WHERE ost.id_opus LIKE {$method['id']}");
        $son = resultAsArray($sql);
        
        echo json_encode(["success"=>true,"sons"=>$son]);
        break;

    case 'ost_id':
        $sql = $db->query("SELECT * FROM ost WHERE ost_id = {$method['id']}");
        $ost = resultAsArray($sql)[0];

        echo json_encode(["success"=>true,"ost"=>$ost]);
        break;
}


?>