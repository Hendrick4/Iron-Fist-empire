$.ajax({
    url: 'news.php',
    type: 'GET',
    data: {},
    dataType: 'json',
    success: (res, status) => {
        let html = '';
        if (res.success) {
            res.articles.forEach(article => {
                html += "<div id='tr-" + article.id_article + "'>" +
                    "<a href='lore.html?id=" + article.id_article + "'><img src='" + article.chemin_media + "'></a>" +
                    "<a href='lore.html?id=" + article.id_article + "'><h3>" + article.article_name + "</a></h3>" +
                    "<p>" + article.article_snippet + "</p>" +
                    "</div>";
            })
            $("main").append(html);
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
} else $("#logOut").hide();

const role = JSON.parse(localStorage.getItem('user')).is_admin;
if (role == 0) {
    $("#add").hide();
} else $("#add").show();