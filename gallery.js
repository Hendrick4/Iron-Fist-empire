$.ajax({
    url: 'gallery.php',
    type: 'POST',
    data: {},
    dataType: 'json',
    success: (res, status) => {
        let images = '';
        if (res.success) {
            res.medias.forEach(media => {
                images += "<div>" +
                    "<h4>" + media.nom_media + "</h4>" +
                    "<img src='" + media.chemin_media + "'>" +
                    "</div>";
            })
            $("main").append(images);
        }
    }
})