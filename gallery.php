<?php

require_once('connect.php');
require_once('../fonctions.php');
//!require_once('utils.php');

$sql = $db->query("SELECT * FROM medias");
$medias = resultAsArray($sql);

echo json_encode(['success'=> true, "medias"=> $medias]);

if(isset($_FILES['file']['name'])) {
    $fileName = $_FILES['file']['name'];

    $location='assets/gallery/'. $fileName;
    $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
    $imageFileType = strtolower($imageFileType);

    $validExtensions = ['jpg','jpeg','gif','png'];

    if(in_array($imageFileType,$validExtensions)){
        if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
            $sql = "INSERT INTO medias(nom_media,chemin_media) VALUES ('$fileName','$location')";
            $req = $db->query($sql);
            echo json_encode(["success"=>true,"msg"=>'Upload reussie']);
        };//!move uploaded file sert a uploader le fichier -> prend en parametre le chemin tmp
    } else {
        echo json_encode(["success"=>false,"msg"=>"Upload echouee. Veuillez réessayer."]);
    }
}
