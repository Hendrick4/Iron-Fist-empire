function delUser(id, user) {
    const check = confirm("Voulez-vous supprimer l'utilisateur " + user + " ?");
    if (check) {
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                request: 'delete_user',
                id,
                user
            },
            dataType: 'json',
            success: (res) => {
                if (res.success) {
                    $("#user-" + id).remove();
                    alert("Utilisateur supprime!");
                } else alert("Erreur lors de la suppression de l'utilisateur....");
            }
        })
    }
};

function delArticle(id, article) {
    const check = confirm("Voulez-vous supprimer " + article + " ?");
    if (check) {
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                request: 'del_article',
                id,
                article
            },
            dataType: 'json',
            success: (res) => {
                if (res.success) {
                    $("#article-" + id).remove();
                    alert("article supprime!");
                } else alert("Erreur lors de la suppression de l'article....");
            }
        })
    }
};

function delIMG(id, media) {
    const check = confirm("Voulez-vous supprimer " + media + " ?");
    if (check) {
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                request: 'del_media',
                id,
                media
            },
            dataType: 'json',
            success: (res) => {
                if (res.success) {
                    $("#media-" + id).remove();
                    alert("media supprime!");
                } else alert("Erreur lors de la suppression du media....");
            }
        })
    }
};

function delOST(id, ost) {
    const check = confirm("Voulez-vous supprimer " + ost + " ?");
    if (check) {
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                request: 'del_media',
                id,
                ost
            },
            dataType: 'json',
            success: (res) => {
                if (res.success) {
                    $("#piste-" + id).remove();
                    alert("Piste supprimee!");
                } else alert("Erreur lors de la suppression de la piste....");
            }
        })
    }
};

function delMap(id, map) {
    const check = confirm("Voulez-vous supprimer " + map + " ?");
    if (check) {
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                request: 'del_map',
                id,
                map
            },
            dataType: 'json',
            success: (res) => {
                if (res.success) {
                    $("#map-" + id).remove();
                    alert("Map supprimee!");
                } else alert("Erreur lors de la suppression de la map....");
            }
        })
    }
};

function delChara(id, perso) {
    const check = confirm("Voulez-vous supprimer " + perso + " ?");
    if (check) {
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                request: 'del_chara',
                id,
                perso
            },
            dataType: 'json',
            success: (res) => {
                if (res.success) {
                    $("#perso-" + id).remove();
                    alert("Personnage supprime!");
                } else alert("Erreur lors de la suppression du personnage....");
            }
        })
    }
};

function delGame(id, game) {
    const check = confirm("Voulez-vous supprimer " + game + " ?");
    if (check) {
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                request: 'del_opus',
                id,
                game
            },
            dataType: 'json',
            success: (res) => {
                if (res.success) {
                    $("#jeu-" + id).remove();
                    alert("Jeu supprime!");
                } else alert("Erreur lors de la suppression du jeu....");
            }
        })
    }
}

$("#display").click((e) => {
    const table = $("#table").val();
    e.preventDefault();
    switch (table) {
        case 'articles':
            $.ajax({
                url: 'admin.php',
                type: 'GET',
                data: { request: 'select_articles' },
                dataType: 'json',
                success: (res) => {
                    let liste = '';
                    if (res.success) {
                        res.articles.forEach(article => {
                            liste += "<li id='article-" + article.id_article + "'>" + article.article_name + "</li>" +
                                "<button onclick='return delArticle(" + article.id_article + ", \"" + article.article_name + "\")'>Supprimer</button>";
                        })
                        $("#element").html(liste);
                    }
                }
            })
            break;

        case 'medias':
            $.ajax({
                url: 'admin.php',
                type: 'GET',
                data: { request: 'select_medias' },
                dataType: 'json',
                success: (res) => {
                    let liste = '';
                    if (res.success) {
                        res.medias.forEach(media => {
                            liste += "<li id='media-" + media.id_media + "'>" + media.nom_media + "</li>" +
                                "<button onclick='return delIMG(" + media.id_media + ", \"" + media.nom_media + "\")'>Supprimer</button>";
                        })
                        $("#element").html(liste);
                    }
                }
            })
            break;

        case 'ost':
            $.ajax({
                url: 'admin.php',
                type: 'GET',
                data: { request: 'select_ost' },
                dataType: 'json',
                success: (res) => {
                    let liste = '';
                    if (res.success) {
                        res.ost.forEach(piste => {
                            liste += "<li id='piste-" + piste.ost_id + "'>" + piste.ost_name + "</li>" +
                                "<button onclick='return delOST(" + piste.ost_id + ", \"" + piste.ost_name + "\")'>Supprimer</button>";
                        })
                        $("#element").html(liste);
                    }
                }
            })
            break;

        case 'maps':
            $.ajax({
                url: 'admin.php',
                type: 'GET',
                data: { request: 'select_maps' },
                dataType: 'json',
                success: (res) => {
                    let liste = '';
                    if (res.success) {
                        res.maps.forEach(map => {
                            liste += "<li id='map-" + map.map_id + "'>" + map.map_name + "</li>" +
                                "<button onclick='return delMap(" + map.map_id + ", \"" + map.map_name + "\")'>Supprimer</button>";
                        })
                        $("#element").html(liste);
                    }
                }
            })
            break;

        case 'characters':
            $.ajax({
                url: 'admin.php',
                type: 'GET',
                data: { request: 'select_chara' },
                dataType: 'json',
                success: (res) => {
                    let liste = '';
                    if (res.success) {
                        res.characters.forEach(character => {
                            liste +=
                                "<li id='perso-" + character.chara_id + "'>" + character.chara_lastname + " " + character.chara_firstname + "</li>" +
                                "<button onclick='return delChara(" + character.chara_id + ", \"" + character.chara_firstname + "\")'>Supprimer</button>";
                        })
                        $("#element").html(liste);
                    }
                }
            })
            break;

        case 'opus':
            $.ajax({
                url: 'admin.php',
                type: 'GET',
                data: { request: 'select_opus' },
                dataType: 'json',
                success: (res) => {
                    let liste = '';
                    if (res.success) {
                        res.opus.forEach(jeu => {
                            liste +=
                                "<li id='jeu-" + jeu.id_opus + "'>" + jeu.opus_name + "</li>" +
                                "<button onclick='return delGame(" + jeu.id_opus + ", \"" + jeu.opus_name + "\")'>Supprimer</button>";
                        })
                        $("#element").html(liste);
                    }
                }
            })
            break;
    }
})
$.ajax({
    url: 'admin.php',
    type: 'GET',
    data: { request: 'select_users' },
    dataType: 'json',
    success: (res) => {
        let users = '';
        if (res.success) {
            res.users.forEach(user => {
                users += "<tr id='user-" + user.id + "'>" +
                    "<td>" + user.lastname + "</td>" +
                    "<td>" + user.firstname + "</td>" +
                    "<td>" + user.nickname + "</td>" +
                    "<td><button onclick='return delUser(" + user.id + ", \"" + user.nickname + "\")'>Supprimer</button></td>" +
                    "</tr>";
            })
            $("#users").append(users);
        }
    }
})