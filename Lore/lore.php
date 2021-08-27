<?php

require_once('../connect.php');
require_once('../utils.php');
require_once('../../fonctions.php');
session_start();

switch($method['page']){
    case 'article':
        if(isset($_GET['id']) && $_GET['id'] != 0){
            $sql = $db->query("SELECT a.*, m.chemin_media FROM articles a
            LEFT JOIN medias m ON a.id_article = m.id_article
            WHERE a.id_article  = {$_GET['id']}");
            $element = resultAsArray($sql)[0];
        
            echo json_encode(["success"=>true, "element"=>$element]);
        } 

        break;
    
    case 'chara':
        if(isset($_GET['c_id']) && $_GET['c_id'] != 0){
            $sql = $db->query("SELECT CONCAT(chara_firstname,' ',chara_lastname) AS name,chara_gender,chara_desc,CASE
            WHEN chara_age = 0 THEN 'Inconnu'
            ELSE chara_age
            END AS age, chara_picturepath FROM characters WHERE chara_id = {$_GET['c_id']}");
            $chara = resultAsArray($sql)[0];
        
            echo json_encode(["success"=>true, "chara"=>$chara]);
        }
        break;

    case 'frontpage':
        if(!isset($_GET['id'],$_GET['c_id'])) {
            $sql = $db->query("SELECT article_name,id_article, o.id_opus, COALESCE(opus_name,'Aucun') AS opus_name FROM articles a
            LEFT JOIN opus o on a.id_opus = o.id_opus");
            $res = resultAsArray($sql);
            $req = $db->query("SELECT chara_id,chara_firstname, COALESCE(chara_lastname, ' ') AS lastname FROM characters");
            $persos = resultAsArray($req);
        
            echo json_encode(["success"=>true, "elements"=>$res, "persos"=>$persos]);
        }
        break;
}