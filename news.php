<?php

require_once('connect.php');
require_once('utils.php');
require('../fonctions.php');
//!$id_art = {$method['id_art']};
$sql = "SELECT id_article,article_name,article_content,article_snippet FROM articles";
$req = $db->query($sql);
$article = resultAsArray($req)[0];

echo json_encode(["success"=>true]);