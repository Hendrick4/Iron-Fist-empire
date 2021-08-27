$("#opusData").click((e) => {
    e.preventDefault();
})

function changeOST(id) {
    $.ajax({
        url: 'jukebox.php',
        type: 'GET',
        data: {
            table: 'ost_id',
            id
        },
        dataType: 'json',
        success: (res, status) => {
            let lien = '';
            if (res.success) {
                lien = res.ost.ost_link
                $("#player1").attr("src", lien);
            }
        }
    })
}

function showOst(id) {
    $.ajax({
        url: 'jukebox.php',
        type: 'GET',
        data: {
            table: 'ost',
            id
        },
        dataType: 'json',
        success: (res) => {
            let ost = "";
            if (res.success) {
                res.sons.forEach(son => {
                    ost += "<li id='" + son.ost_id + "' class='col-md-auto'>" +
                        "<a href='#' onclick='changeOST(" + son.ost_id + ");'>" + son.ost_name + "</a>" +
                        "</li>";
                })
                $("ul").html(ost);
            }
        }
    })
    return false;
}


$.ajax({
    url: 'jukebox.php',
    type: 'GET',
    data: { table: 'opus' },
    dataType: 'json',
    success: (res) => {
        let opus = '';
        if (res.success) {
            res.titres.forEach(titre => {
                    opus += "<div id='jeu-" + titre.id_opus + "' class='col'>" +
                        "<img src='" + titre.opus_cover + "'>" +
                        "<a href='#' onclick='showOst(" + titre.id_opus + ")'>" + titre.opus_name + "</a>" +
                        "</div>";
                })
                //$("img").css("cursor", "pointer");
            $("#opusData").append(opus);
        }
    }
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

if (localStorage.getItem('user')) {
    $("#logOut").show();
    $("#add").show();
} else {
    $("#logOut").hide();
    let sign = "<h5 class='col-md-auto'><a style='color:powderblue;' href='../signUp/sign_up.html'>S'inscrire</a></h5>";
    $("#userDiv").css("color", "silver !important");
    $("#userDiv").html(sign);
    $("#add").hide();
}

const role = JSON.parse(localStorage.getItem('user')).is_admin;
if (role == 0) {
    $("#add").hide();
} else $("#add").show();