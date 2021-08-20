<?php

require_once('../connect.php');
require_once('../../fonctions.php');
session_start();



$req = $db->query("SELECT * FROM opus");
            $games = resultAsArray($req);
            
            echo json_encode(["success" => true, "games" => $games]);