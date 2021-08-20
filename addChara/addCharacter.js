let i = 0;
$("#opusInfo").click((e) => {
    e.preventDefault();
    i++;
    if (i <= 1) {
        let opus = "<label>Nom de l'opus :</label>" +
            "<input type='text' id='opusName'>" +
            "<input type='file' id='opusCover'>";
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
                $("#result").html(res.msg);
            } else {
                $("#result").css("color", "crimson");
                $("#result").html(res.msg);
            }
        }
    })
})



$("#createOpus").click((e) => {
    e.preventDefault();

    const fd = new FormData();
    const files = $("#opusCover")[0].files;
    const opusName = $("#opusName").val();

    fd.append('opusCover', files[0]);
    fd.append('opusName', opusName);
    fd.append('column', 'opus');



    $.ajax({
        url: 'addCharacter.php',
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        success: (res, status) => {
            if (res.success) {
                $("#warning").html("Ajout d'opus reussi!");
            } else {
                $("#warn").css("color", "crimson");
                $("#warning").html("Echec de l'ajout d'opus....");
            }
        }
    })
})

$("#logOut").click((e) => {
    e.preventDefault();
    $.ajax({
        url: '../logout.php',
        type: 'GET',
        data: {},
        dataType: 'json',
        success: (res, status) => {
            if (res.success) {
                localStorage.removeItem('user');
                window.location.replace('../Index/index.html');
                $("main").append(html);
            } else {
                alert("ERREUR!!!!!!");
            }
        }
    })
})


const role = JSON.parse(localStorage.getItem('user')).is_admin;
if (role == 0) {
    $("body").hide();
} else $("body").show();