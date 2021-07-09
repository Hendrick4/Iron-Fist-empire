let i = 0;
$("button").click((e) => {
    if (i < 3) {
        i++;
        e.preventDefault();
        const newInput = "<div>" +
            "<br>" +
            "<input type='file' id='upload-" + i + "' > " +
            "</div>";
        $("form").append(newInput);
    }
    if (i > 4) {
        $("#limit").css("color", "crimson");
        $("#limit").html("Vous avez atteint la limite max d'images a insérer.");
    }
})
$("#file-upload-button").click((e) => {
    e.preventDefault();
    const fd = new FormData();
    const files = $("file")[0].files;

    fd.append(files[0]);

    $.ajax({
        url: 'uploadArticle.php',
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        success: (res, status) => {
            if (res.success) {
                $("#status").html("Upload réussie!");
            } else {
                $("#status").html("Fichier au mauvais format. Veuillez réessayer.");
            }
        }
    })

})