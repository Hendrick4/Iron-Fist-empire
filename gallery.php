<?php

require_once('connect.php');
require_once('../fonctions.php');
//!require_once('utils.php');

$sql = $db->query("SELECT * FROM medias");
$medias = resultAsArray($sql);

echo json_encode(['success'=> true, "medias"=> $medias]);