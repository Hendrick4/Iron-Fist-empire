<?php

require_once('../connect.php');
require_once('../../fonctions.php');
require_once('../utils.php');
session_start();

if(!isset($_SESSION['user_rank']) || $_SESSION['user_rank']==0) {
    die();
}


switch($method['choice']) {
    case 'afficher':
        $req = $db->query("SELECT * FROM opus");
        $games = resultAsArray($req);
                    
        echo json_encode(["success" => true, "games" => $games]);
        break;
    
    case 'envoi':
        if(isset($_POST['mapName'],$_POST['mapOpus'])) {
            $secuName = mysqli_real_escape_string($db, $_POST['mapName']);
            if(isset($_FILES['mapMedia']['name'])) {
                $fileName = $_FILES['mapMedia']['name'];
            
                $location='../assets/gallery/'. $fileName;
                $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
                $imageFileType = strtolower($imageFileType);
            
                $validExtensions = ['jpg','jpeg','gif','png'];
            
                if(in_array($imageFileType,$validExtensions)){
                    if(move_uploaded_file($_FILES['mapMedia']['tmp_name'],$location)){
                        $sql= "INSERT INTO maps(map_name,id_opus,map_media) VALUES ('$secuName', {$_POST['mapOpus']}, '$location')";
                        $res = $db->query($sql);
                    echo json_encode(["success"=>true, "msg"=>"Ajout de la map réussi!"]);
                    }
                }
        } else echo json_encode(["success"=>false, "msg"=>"Echec de l'ajout de la map!"]);
        break;
}
}
