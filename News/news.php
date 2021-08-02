<?php

require_once('../connect.php');
require_once('../utils.php');
require('../../fonctions.php');
//!$id_art = {$method['id_art']};

$sql = "SELECT a.id_article, article_name, article_snippet, chemin_media FROM articles a
        LEFT JOIN medias m ON a.id_article = m.id_article
        ORDER BY a.id_article ASC";
$req = $db->query($sql);
$article = resultAsArray($req);


echo json_encode(["success" => true, "articles" => $article]);
