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
                const player = $("#player1").attr("src", lien);
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
                    ost += "<li id='" + son.ost_id + "'>" +
                        "<a href='#' onclick='changeOST( " + son.ost_id + ")'>" + son.ost_name + "</a>" +
                        "</li>";
                })
                $("ul").html(ost);
            }
        }
    })
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
                    opus += "<div id='jeu-" + titre.id_opus + "'>" +
                        "<img src='" + titre.opus_cover + "'>" +
                        "<a href='#' onclick='showOst(" + titre.id_opus + ")'>" + titre.opus_name + "</a>" +
                        "</div>";
                })
                //$("img").css("cursor", "pointer");
            $("#opusData").append(opus);
        }
    }
})