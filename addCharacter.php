<?php

require_once('connect.php');
//!require_once('');
switch($_POST['column']){
    case 'characters':
        if(isset(
            $_POST['lastname'],
            $_POST['firstname'],
            $_POST['gender'],
            $_POST['age'],
            $_POST['desc'],
            $_FILES['picture']['name']
        )) {
            $fileName = $_FILES['picture']['name'];
        
            $location='assets/gallery/'. $fileName;
            $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
            $imageFileType = strtolower($imageFileType);
        
            $validExtensions = ['jpg','jpeg','gif','png'];
            if(in_array($imageFileType,$validExtensions)){
                if(move_uploaded_file($_FILES['picture']['tmp_name'],$location)){
                    $sql = "INSERT INTO characters(chara_lastname,chara_firstname,chara_gender,chara_age,chara_desc,chara_picturepath) VALUES ('{$_POST['lastname']}','{$_POST['firstname']}','{$_POST['gender']}',{$_POST['age']},'{$_POST['desc']}','$location')";
                    $req = $db->query($sql);
                    echo json_encode(["success"=>true, "msg"=>"Succes de la creation du personnage!"]);
                }else echo json_encode(["success"=>false]);
            }
        }
        break;
    case 'maps':
        if(isset($_POST['mapName'],$_FILES['mapMedia']['name'])) {
            $fileName = $_FILES['mapMedia']['name'];
        
            $location='assets/gallery/'. $fileName;
            $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
            $imageFileType = strtolower($imageFileType);
        
            $validExtensions = ['jpg','jpeg','gif','png'];
            if(in_array($imageFileType,$validExtensions)){
                if(move_uploaded_file($_FILES['mapMedia']['tmp_name'],$location)){
                    $sql = $db->query("INSERT INTO maps(map_name,map_media) VALUES ('{$_POST['mapName']}','$location')");

                    echo json_encode(["success"=>true, "msg"=>"Succes de la creation de la map!"]);
                }else echo json_encode(["success"=>false]);
            }
        }
        break;
    case 'opus':
        if(isset($_POST['opusName'])) {
            $sql = $db->query("INSERT INTO opus(opus_name) VALUE ('{$_POST['opusName']}')");

            echo json_encode(["success"=>true, "msg"=>"Creation de l'opus reussie!"]);
        }
        break;
}
