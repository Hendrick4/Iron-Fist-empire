<?php

require_once('connect.php');
//!require_once('');

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
