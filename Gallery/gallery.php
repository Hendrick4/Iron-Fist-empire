<?php

require_once('../connect.php');
require_once('../../fonctions.php');
session_start();

$sql = $db->query("SELECT * FROM medias");
$medias = resultAsArray($sql);

echo json_encode(['success'=> true, "medias"=> $medias]);

if($_SESSION['log_in']== false) {
    die();
}
if(isset($_POST['mediaName'], $_FILES['file']['name'])) {
    $fileName = $_FILES['file']['name'];
    $secuName = mysqli_real_escape_string($db,$_POST['mediaName']);

    $location='../assets/gallery/'. $fileName;
    $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
    $imageFileType = strtolower($imageFileType);

    $validExtensions = ['jpg','jpeg','gif','png'];

    if(in_array($imageFileType,$validExtensions)){
        if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
            $sql = "INSERT INTO medias(nom_media,chemin_media) VALUES ('$secuName','$location')";
            $req = $db->query($sql);
            echo json_encode(["success"=>true,"msg"=>"Upload reussie"]);
        };//!move uploaded file sert a deplacer le fichier -> prend en parametre le chemin tmp
    } else {
        echo json_encode(["success"=>false,"msg"=>"Upload echouee. Veuillez réessayer."]);
    }
}
