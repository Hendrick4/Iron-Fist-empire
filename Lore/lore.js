const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const c_id = urlParams.get('c_id');

if (id) {
    $("#list").hide();
    $("#add").hide();
    $("#perso").hide();
    $.ajax({
        url: 'lore.php',
        type: 'GET',
        data: {
            id,
            page: 'article'
        },
        dataType: 'json',
        success: (res, status) => {
            let title = '';
            let subtitle = '';
            let content = '';
            let media = '';
            if (res.success) {
                title = res.element.article_name;
                subtitle = res.element.article_snippet;
                content = res.element.article_content;
                media = "<img src='"
                if (res.element.chemin_media) {
                    media += res.element.chemin_media;
                } else {
                    media += "../assets/img/VioletSystems.jpg";
                }
                media += "'>";
                $("#pic").append(media);
                $("h1").append(title);
                $("h3").append(subtitle);
                $("p").append(content);
            }
        }
    })
}
if (c_id) {
    $("#list").hide();
    $("#add").hide();
    $("#perso").hide();
    $.ajax({
        url: 'lore.php',
        type: 'GET',
        data: {
            c_id,
            page: 'chara'
        },
        dataType: 'json',
        success: (res) => {
            let name = '';
            let gender = '';
            let age = '';
            let desc = '';
            let media = '';
            if (res.success) {
                name = "<h1 class ='text-center'>" + res.chara.name + "</h1>";
                gender = "<h4> Sexe : </h4>" + res.chara.chara_gender;
                age = "<h4> Age : </h4>" + res.chara.age;
                desc = res.chara.chara_desc;
                media = "<img src='" + res.chara.chara_picturepath + "'>";
                $("#pic").html(name);
                $("p").html(desc);
                $("#pic").append(media);
                $("#pic").append(age);
                $("#pic").append(gender);
                $("#pic").append("<hr>");
                $("hr").css("margin-top", "9%");

            }
        }
    })
} else {
    //$("#list").show();
    //$("#perso").show();
    //$("#chara").show();
    $.ajax({
        url: 'lore.php',
        type: 'GET',
        data: {
            page: 'frontpage'
        },
        dataType: 'json',
        success: (res) => {
            let content = '';
            let chara = ''
            if (res.success) {
                res.elements.forEach(element => {
                    content += "<tr>" +
                        "<td>" + element.opus_name + "</td>" +
                        "<td><a href='../Lore/lore.html?id=" + element.id_article + "'>" + element.article_name + "</a></td>" +
                        "</tr>";
                })
                res.persos.forEach(perso => {
                    chara += "<li> <a href='../Lore/lore.html?c_id=" + perso.chara_id + "'>" + perso.chara_firstname + " " + perso.lastname + "</a></li>";
                })
                $("#chara").append(chara);
                $("table").append(content);
            }
        }
    })
}



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

const role = JSON.parse(localStorage.getItem('user')).is_admin;
if (role == 0) {
    $("#add").hide();
} else $("#add").show();