let h = 0;
$("#map").click((e) => {
    e.preventDefault();
    h++;
    if (h <= 1) {
        let map = "<label for='mapName'>Nom de la map :</label>" +
            "<input type='text' id='mapName'>" +
            "<label for='mapMedia'>Aperçu de la map :</label>" +
            "<input type='file' id='mapMedia'>";
        $("#mapInfo").append(map);
        $("#createMap").css("display", "block");
    }
})

let i = 0;
$("#opusInfo").click((e) => {
    e.preventDefault();
    i++;
    if (i <= 1) {
        let opus = "<label>Nom de l'opus :</label>" +
            "<input type='text' id='opusName'>";
        $("#opus").append(opus);
        $("#createOpus").css("display", "block");
    }
})

$("#create").click((e) => {
    e.preventDefault();
    const fd = new FormData();
    const files = $("#picture")[0].files;
    const lastname = $("#lastname").val();
    const firstname = $("#firstname").val();
    const gender = $("#gender").val();
    const age = $("#age").val();
    const desc = $("#desc").val();

    fd.append('picture', files[0]);
    fd.append('lastname', lastname);
    fd.append('firstname', firstname);
    fd.append('gender', gender);
    fd.append('age', age);
    fd.append('desc', desc);
    fd.append('column', 'characters');

    $.ajax({
        url: 'addCharacter.php',
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        success: (res, status) => {
            if (res.success) {
                $("#result").html("Creation du personnage reussie!");
            } else {
                $("#result").css("color", "crimson");
                $("#result").html("Echec de la creation du personnage");
            }
        }
    })
})

$("#createMap").click((e) => {
    e.preventDefault();
    const fd = new FormData();
    const files = $("#mapMedia")[0].files;
    const mapname = $("#mapName").val();

    fd.append('mapName', mapname);
    fd.append('mapMedia', files[0]);
    fd.append('column', 'maps');

    $.ajax({
        url: 'addCharacter.php',
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        success: (res, status) => {
            if (res.success) {
                $("#warn").html("Creation de la map reussie!");
            } else {
                $("#warn").css("color", "crimson");
                $("#warn").html("Echec de la creation de la map");
            }
        }
    })
})

$("#createOpus").click((e) => {
    e.preventDefault();

    const opusName = $("#opusName").val();

    $.ajax({
        url: 'addCharacter.php',
        type: 'POST',
        data: {
            column: 'opus',
            opusName
        },
        dataType: 'json',
        success: (res, success) => {
            if (res.success) {
                $("#warning").html("Ajout d'opus reussi!");
            } else {
                $("#warning").css("color", "crimson");
                $("#warning").html("Echec de l'ajout d'opus....");
            }
        }
    })
})