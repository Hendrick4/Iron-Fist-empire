$.ajax({
    url: 'addMap.php',
    type: 'GET',
    data: {
        choice: 'afficher'
    },
    dataType: 'json',
    success: (res) => {
        let jeu = '';
        if (res.success) {
            res.games.forEach(game => {
                jeu += "<option value='" + game.id_opus + "'>" + game.opus_name + "</option>";
            })
            $("#mapOpus").append(jeu);
        }
    }
})

$("#createMap").click((e) => {
    e.preventDefault();
    const fd = new FormData();
    const files = $("#mapMedia")[0].files;
    const mapname = $("#mapName").val();
    const mapOpus = $("#mapOpus").val();

    fd.append('mapOpus', mapOpus);
    fd.append('mapName', mapname);
    fd.append('mapMedia', files[0]);
    fd.append('choice', 'envoi');

    $.ajax({
        url: 'addMap.php',
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        success: (res) => {
            if (res.success) {
                $("#warn").html(res.msg);
            } else {
                $("#warn").css("color", "crimson");
                $("#warn").html(res.msg);
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