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
                    "<h4>" + media.nom_media + "</h4>" +
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

    fd.append('file', files[0]);

    $.ajax({
        url: 'gallery.php',
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        success: (res, status) => {
            if (res.success) {
                $("#status").html("Upload réussie!");
            } else {
                $("#status").css("color", "red");
                $("#status").html("Fichier au mauvais format. Veuillez réessayer.");
            }
        }
    })
})

$("a").click((e) => {
    e.preventDefault();
    $("input").css("display", "block");
})