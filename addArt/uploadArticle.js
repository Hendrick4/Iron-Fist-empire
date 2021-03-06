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

$.ajax({
    url: 'uploadArticle.php',
    type: 'GET',
    data: {},
    dataType: 'json',
    success: (res, status) => {
        let options = '';
        if (res.success) {
            res.games.forEach(game => {
                options += "<option value='" + game.id_opus + "'>" + game.opus_name + "</option>";
            })
            $("select").append(options);
        }
    }
})

$("#file-upload-button").click((e) => {
    e.preventDefault();
    const fd = new FormData();
    const files = $("#file")[0].files;
    const content = $("#content").val();
    const title = $("#title").val();
    const snippet = $("#snippet").val();
    const opus = $("#opus").val();

    fd.append('file', files[0]);
    fd.append('title', title);
    fd.append('content', content);
    fd.append('snippet', snippet);
    fd.append('opus', opus);

    $.ajax({
        url: 'uploadArticle.php',
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        success: (res, status) => {
            if (res.success) {
                $("#status").html(res.msg);
            } else {
                $("#status").css("color", "red");
                $("#status").html(res.msg);
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