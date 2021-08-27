$.ajax({
    url: 'profile.php',
    type: 'GET',
    data: {
        choice: 'afficher',
    },
    dataType: 'json',
    success: (res, status) => {
        let profil = '';
        if (res.success) {
            $("#fn").text(res.user.firstname);
            $("#ln").text(res.user.lastname);
            $("#nn").text(res.user.nickname);
            $("#ml").text(res.user.email);
            $("#birthdate").html(res.user.birthdate);
            $("#profile").append(profil);
            profil += "<img src='" + res.user.profilePic + "' id='pp'>" +
                "<h4>" + res.user.firstname + " " + res.user.lastname + "</h4>";
            $("#profil").html(profil);
        }
    }
})

$("#admin").click(() => {
    window.location.replace('../Admin/admin.html');
})

$("#modif").click((e) => {
    e.preventDefault();
    $("#send").css("display", "block");
    $.ajax({
        url: 'profile.php',
        type: 'GET',
        data: {
            choice: 'afficher',
        },
        dataType: 'json',
        success: (res, status) => {
            if (res.success) {
                $("#fn").hide();
                $("#ln").hide();
                $("#nn").hide();
                $("#ml").hide();
                $("#firstname").val(res.user.firstname);
                $("#lastname").val(res.user.lastname);
                $("#nickname").val(res.user.nickname);
                $("#email").val(res.user.email);
                $("#birthdate").html(res.user.birthdate);
            }
        }
    })

})

$("button").click(() => {
    $("#modif").hide();
    let modif = "<div>" +
        "<input type='text' name='name' id='firstname'>" +
        "</div>";
    $("#prenom").append(modif);

    let modif2 = "<div>" +
        "<input type='text' name='surname' id='lastname'>" +
        "</div>";
    $("#nom").append(modif2);


    let modif3 = "<div>" +
        "<input type='text' name='nickname' id='nickname'>" +
        "</div>";
    $("#pseudo").append(modif3);


    let modif4 = "<div>" +
        "<input type='text' name='email' id='email'>" +
        "</div>";
    $("#mail").append(modif4);


    let modif5 = "<div>" +
        "<input type='password' name='password' id='pwd'>" +
        "<br>" +
        "</div>";
    $("#mdp").append(modif5);

});

$("#send").click((e) => {
    e.preventDefault();
    const firstname = $("#firstname").val();
    const lastname = $("#lastname").val();
    const nickname = $("#nickname").val();
    const email = $("#email").val();
    const pwd = $("#pwd").val();
    if (
        firstname.trim() != '' &&
        lastname.trim() != '' &&
        email.trim() != '' &&
        nickname.trim() != '' &&
        pwd.trim() != ''
    ) {
        $.ajax({
            url: 'profile.php',
            type: 'POST',
            data: {
                choice: 'envoyer',
                firstname,
                lastname,
                email,
                nickname,
                pwd
            },
            dataType: 'json',
            success: (res, status) => {
                if (res.success) {
                    $("#firstname").hide();
                    $("#lastname").hide();
                    $("#email").hide();
                    $("#nickname").hide();
                    $("#pwd").hide();
                    $("#modif").show();
                    $("#fn").show();
                    $("#ln").show();
                    $("#nn").show();
                    $("#ml").show();
                    $("#fn").text(firstname);
                    $("#ln").text(lastname);
                    $("#nn").text(nickname);
                    $("#ml").text(email);
                    $("h4").text(firstname + ' ' + lastname);
                } else console.log("Echec de l'envoi d'informations....");
            }
        })
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
    $("#admin").hide();
} else $("#admin").show();