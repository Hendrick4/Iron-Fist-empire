const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

$.ajax({
    url: 'lore.php',
    type: 'GET',
    data: {
        id
    },
    dataType: 'json',
    success: (res, status) => {
        let title = '';
        let subtitle = '';
        let content = '';
        let media = '';
        if (res.success) {
            title = res.elements.article_name;
            subtitle = res.elements.article_snippet;
            content = res.elements.article_content;
            media = res.medias.forEach(media => {
                "<img src='" + res.media.chemin_media + "'>";
            })
        }
        $("main").append(media);
        $("h1").append(title);
        $("h3").append(subtitle);
        $("p").append(content);
    }
})