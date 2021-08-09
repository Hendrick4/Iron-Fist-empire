const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
$("th, #list").hide();

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
            title = res.element.article_name;
            subtitle = res.element.article_snippet;
            content = res.element.article_content;
            media = "<img src='" + res.element.chemin_media + "'>";
            $("main").append(media);
            $("h1").append(title);
            $("h3").append(subtitle);
            $("p").append(content);
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