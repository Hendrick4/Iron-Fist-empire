<?php

require_once('connect.php');


if(isset($_FILES['file']['name'])) {
    $fileName = $_FILES['file']['name'];

    $location='assets/article/'. $fileName;
    $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
    $imageFileType = strtolower($imageFileType);

    $validExtensions = ['jpg','jpeg','gif','png'];

    
    
    if(in_array($imageFileType,$validExtensions)){
        if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
            $sql = "INSERT INTO medias(chemin_media) VALUE '{$fileName}'";
            $req = $db->query($sql);
            echo json_encode(["success"=>true,"msg"=>'Upload réussie']);
        };//!move uploaded file sert a uploader le fichier -> prend en parametre le chemin tmp
    } else {
        echo json_encode(["success"=>false,"msg"=>"Upload échouée. Veuillez réessayer."]);
    }
}