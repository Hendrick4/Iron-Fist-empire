<?php

require_once('../connect.php');
require_once('../../fonctions.php');
session_start();


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
                $secuLName = mysqli_real_escape_string($db,$_POST['lastname']);
            $secuFName = mysqli_real_escape_string($db,$_POST['firstname']);
            $secuGender = mysqli_real_escape_string($db,$_POST['gender']);
            $secuAge = mysqli_real_escape_string($db,$_POST['age']);
            $secuDesc = mysqli_real_escape_string($db,$_POST['desc']);
            
            $location='assets/gallery/'. $fileName;
            $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
            $imageFileType = strtolower($imageFileType);
        
            $validExtensions = ['jpg','jpeg','gif','png'];
            if(in_array($imageFileType,$validExtensions)){
                if(move_uploaded_file($_FILES['picture']['tmp_name'],$location)){
                    $sql = "INSERT INTO characters(chara_lastname,chara_firstname,chara_gender,chara_age,chara_desc,chara_picturepath) VALUES ('$secuLName','$secuFName','$secuGender',$secuAge,'$secuDesc','$location')";
                    $req = $db->query($sql);
                    echo json_encode(["success"=>true, "msg"=>"Succes de la creation du personnage!"]);
                }else echo json_encode(["success"=>false, "msg"=> "Echec de la creation du personnage...."]);
            }
        }
        break;
        case 'maps':
            if(isset($_POST['mapName'],
        $_POST['mapOpus'],
        $_FILES['mapMedia']['name']) && !empty($_POST['mapName']) && !empty($_POST['mapOpus'])) {
            $secuMap = mysqli_real_escape_string($db, $_POST['mapName']);
            $secuOpus = mysqli_real_escape_string($db, $_POST['mapOpus']);
            $fileName = $_FILES['mapMedia']['name'];
            
            $location='assets/gallery/'. $fileName;
            $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
            $imageFileType = strtolower($imageFileType);
            
            $validExtensions = ['jpg','jpeg','gif','png'];
            if(in_array($imageFileType,$validExtensions)){
                if(move_uploaded_file($_FILES['mapMedia']['tmp_name'],$location)){
                    $sql = $db->query("INSERT INTO maps(map_name,id_opus,map_media) VALUES ('$secuMap',$secuOpus,'$location')");
                    
                    echo json_encode(["success"=>true, "msg"=>"Succes de la creation de la map!"]);
                }else echo json_encode(["success"=>false]);
            }
        }
        break;
        case 'opus':
        if(isset($_POST['opusName'])) {
            $secuOpus = mysqli_real_escape_string($db, $_POST['opusName']);
            if(isset($_FILES['opusCover']['name'])){
                
                $fileName = $_FILES['opusCover']['name'];
                $location='assets/gallery/'. $fileName;
                $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
                $imageFileType = strtolower($imageFileType);
                
                $validExtensions = ['jpg','jpeg','gif','png'];
                $cover = "NULL";
                if(move_uploaded_file($_FILES['opusCover']['tmp_name'],$location)){
                    $cover= "'" .$location. "'";
                    $sql = $db->query("INSERT INTO opus(opus_name,opus_cover) VALUE ('$secuOpus',$cover)");
                    
                    echo json_encode(["success"=>true, "msg"=>"Creation de l'opus reussie!"]);
                }
            }
        }
        break;


}
