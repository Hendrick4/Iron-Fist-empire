<?php

require_once('../connect.php');
require_once('../utils.php');
require('../../fonctions.php');

switch($method['request']){
    case 'select_articles':
        $sql = $db->query("SELECT * FROM articles");
        $articles = resultAsArray($sql);
        echo json_encode(["success"=>true, "articles"=>$articles]);
        break;

    case 'del_article':
        $sql = $db->query("DELETE FROM articles WHERE id_article = {$method['id']}");
        echo json_encode(["success"=>true]);
        break;

    case "select_medias":
        $sql = $db->query("SELECT * FROM medias");
        $medias = resultAsArray($sql);
        echo json_encode(["success"=>true, "medias"=>$medias]);
        break;

    case 'del_media':
        $sql = $db->query("DELETE FROM medias WHERE id_media = {$method['id']}");
        echo json_encode(["success"=>true]);
        break;
        
    case "select_maps":
        $sql = $db->query("SELECT * FROM maps");
        $maps = resultAsArray($sql);
        echo json_encode(["success"=>true, "maps"=>$maps]);
        break;

    case 'del_map':
        $sql = $db->query("DELETE FROM maps WHERE id_map = {$method['id']}");
        echo json_encode(["success"=>true]);
        break;

    case "select_opus":
        $sql = $db->query("SELECT * FROM opus");
        $opus = resultAsArray($sql);
        echo json_encode(["success"=>true, "opus"=>$opus]);
        break;

    case 'del_opus':
        $sql = $db->query("DELETE FROM opus WHERE id_opus = {$method['id']}");
        echo json_encode(["success"=>true]);
        break;

    case "select_chara":
        $sql = $db->query("SELECT * FROM characters");
        $characters = resultAsArray($sql);
        echo json_encode(["success"=>true, "characters"=>$characters]);
        break;

    case 'del_chara':
        $sql = $db->query("DELETE FROM characters WHERE chara_id = {$method['id']}");
        echo json_encode(["success"=>true]);
        break;

    case "select_ost":
        $sql = $db->query("SELECT * FROM ost");
        $ost = resultAsArray($sql);
        echo json_encode(["success"=>true, "ost"=>$ost]);
        break;
    
    case "del_ost":
        $sql = $db->query("DELETE FROM ost WHERE id_media = {$method['id']}");
        echo json_encode(["success"=>true]);
        break;

    case "select_users":
        $sql = $db->query("SELECT firstname,lastname,nickname,id FROM users WHERE is_admin = 0");
        $users = resultAsArray($sql);
        echo json_encode(["success"=>true, "users"=>$users]);
        break;

    case "delete_user":
        $sql = $db->query("DELETE FROM users WHERE id = {$method['id']}");
        echo json_encode(["success"=>true]);
        break;
}
