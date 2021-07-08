<?php

require_once('connect.php');
require_once('utils.php');
require_once('../fonctions.php');

if(isset($_GET['article'])){
    $sql = $db->query("SELECT * FROM articles WHERE id_article = {$_GET['article']}");
    $element = resultAsArray($sql);

    $requete = $db->query("SELECT * FROM medias WHERE id_article = {$_GET['article']}");
    $medias = resultAsArray($requete);

    echo json_encode(["success"=>true, "elements"->$element, "medias"=>$medias]);
}