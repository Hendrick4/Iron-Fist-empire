<?php

require_once('../connect.php');
require_once('../utils.php');
require_once('../../fonctions.php');
session_start();

if(isset($_GET['id']) && $_GET['id'] != 0){
    $sql = $db->query("SELECT a.*, m.chemin_media FROM articles a
    LEFT JOIN medias m ON a.id_article = m.id_article
    WHERE a.id_article  = {$_GET['id']}");
    $element = resultAsArray($sql)[0];

    echo json_encode(["success"=>true, "element"=>$element]);
} else {
    $sql = $db->query("SELECT a.article_name, o.opus_id, opus_name FROM articles a
    LEFT JOIN opus o on a.id_opus = o.id_opus");
    $res = resultAsArray($sql);

    echo json_encode(["success"=>true, "element"=>$res]);
}