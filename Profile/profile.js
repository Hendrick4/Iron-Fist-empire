let i = 0;
let j = 0;
let k = 0;
let l = 0;
let m = 0;

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
        }
    }
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
            let profil = '';
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
                profil = "<img src='" + res.user.profilePic + "'>" +
                    "<h4>" + res.user.firstname + " " + res.user.lastname + "</h4>";
            }
            $("#profile").append(profil);
        }
    })

})

$("button").click(() => {
    $("p").attr("hidden");
    i++;
    if (i <= 1) {
        let modif = "<div>" +
            "<input type='text' name='name' id='firstname'>" +
            "</div>";
        $("#prenom").append(modif);
    }
    j++;
    if (j <= 1) {
        let modif2 = "<div>" +
            "<input type='text' name='surname' id='lastname'>" +
            "</div>";
        $("#nom").append(modif2);
    }
    k++;
    if (k <= 1) {
        let modif3 = "<div>" +
            "<input type='text' name='nickname' id='nickname'>" +
            "</div>";
        $("#pseudo").append(modif3);
    }
    l++;
    if (l <= 1) {
        let modif4 = "<div>" +
            "<input type='text' name='email' id='email'>" +
            "</div>";
        $("#mail").append(modif4);
    }
    m++;
    if (m <= 1) {
        let modif5 = "<div>" +
            "<input type='password' name='password' id='pwd'>" +
            "<br>" +
            "</div>";
        $("#mdp").append(modif5);
    }
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
                    console.log("Infos envoyées!");
                } else console.log("Echec de l'envoi d'informations....");
            }
        })
    }
})

if ()