$.ajax({
    url: 'news.php',
    type: 'POST',
    data: {},
    dataType: 'json',
    success: (res, status) => {
        let html = '';
        if (res.success) {
            html += "<div id='tr-" + res.article.id_article + "'>" +
                "<h3>" + res.article.article_title + "</h3>" +
                "<p>" + res.article.article_snippet + "</p>" +
                "</div>";
        }
        $("main").append(html);
    }
})