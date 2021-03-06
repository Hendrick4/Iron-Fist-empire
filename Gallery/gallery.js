$.ajax({
    url: 'gallery.php',
    type: 'GET',
    data: {},
    dataType: 'json',
    success: (res, status) => {
        let images = '';
        if (res.success) {
            res.medias.forEach(media => {
                images += "<div id='div-" + media.id_media + "'>" +
                    "<h4 class='text-center'>" + media.nom_media + "</h4>" +
                    "<img src='" + media.chemin_media + "'>" +
                    "</div>";
            })
            $("main").append(images);
        }
    }
})

$("input:submit").click((e) => {
    e.preventDefault();

    const fd = new FormData();
    const files = $("#file")[0].files;
    const mediaName = $("#mediaName").val();

    fd.append('file', files[0]);
    fd.append('mediaName', mediaName);

    $.ajax({
        url: 'gallery.php',
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        success: (res, status) => {
            if (res.success) {
                $("#status").html(res.msg);
                console.log(res.msg);
            } else {
                $("#status").css("color", "red");
                $("#status").html(res.msg);
            }
        }
    })
})
$("#add").click((e) => {
    e.preventDefault();
    $("input, #mediaName, label").css("display", "block");
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