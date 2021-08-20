<?php

require_once('../connect.php');
require_once('../../fonctions.php');
session_start();

$requete = $db->query("SELECT * FROM opus");
$games = resultAsArray($requete);

echo json_encode(["success"=>true, "games"=>$games]);


if(isset($_POST['title'],$_POST['content'],$_POST['snippet'],$_POST['opus'])&& !empty($_POST['title']) && !empty($_POST['content']) && !empty($_POST['snippet'])){
    $secuTitle = mysqli_real_escape_string($db, $_POST['title']);
    $secuContent = mysqli_real_escape_string($db, $_POST['content']);
    $secuSnippet = mysqli_real_escape_string($db, $_POST['snippet']);

    $res= $db->query("INSERT INTO articles(article_name,article_content,article_snippet,id_opus,user_id) VALUES ('$secuTitle','$secuContent', '$secuSnippet', {$_POST['opus']} , {$_SESSION['user_tag']})");
    echo json_encode(["success"=>true, "msg"=>"Succes de l'upload de l'article."]);
}
$id_article = $db->insert_id;

if(isset($_FILES['file']['name'])) {
    $fileName = $_FILES['file']['name'];

    $location='assets/article/'. $fileName;
    $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
    $imageFileType = strtolower($imageFileType);

    $validExtensions = ['jpg','jpeg','gif','png'];

    if(in_array($imageFileType,$validExtensions)){
        if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
            $sql = "INSERT INTO medias(nom_media,chemin_media,id_article) VALUES ('$fileName','$location', $id_article)";
            //echo $sql;
            $req = $db->query($sql);
            echo json_encode(["success"=>true,"msg"=>'Upload de media reussie']);
        };//!move uploaded file sert a uploader le fichier -> prend en parametre le chemin tmp
    } else {
        echo json_encode(["success"=>false,"msg"=>"Upload echouee. Veuillez reessayer."]);
    }
}