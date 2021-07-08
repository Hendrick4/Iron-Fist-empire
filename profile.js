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
        //!id
    },
    dataType: 'json',
    success: (res, status) => {
        let profil = '';
        if (res.success) {
            $("#firstname").val(res.user.firstname);
            $("#lastname").val(res.user.lastname);
            $("#nickname").val(res.user.nickname);
            $("#email").val(res.user.email);
            $("#pwd").val(res.user.pwd);
            $("#birthdate").val(res.user.birthdate);
            profil = "<img src='" + res.user.profilePic + "'>" +
                "<h4>" + res.infos.firstname + " " + res.user.lastname + "</h4>";
        }
        $("#profile").append(profil);
    }
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
            "<input type='submit' value='Modifier' id='send'>" +
            "</div>";
        $("#mdp").append(modif5);
    }
});

$("#send").click((e) => {
    e.preventDefault();
    const name = $("#firstname").val();
    const surname = $("#lastname").val();
    const nickname = $("#nickname").val();
    const mail = $("#email").val();
    const pwd = $("#pwd").val();
    if (
        name.trim() != '' &&
        surname.trim() != '' &&
        mail.trim() != '' &&
        nickname.trim() != '' &&
        pwd.trim() != ''
    ) {
        $.ajax({
            url: 'profile.php',
            type: 'POST',
            data: {
                choice: 'envoyer',
                name,
                surname,
                birthdate,
                mail,
                nickname,
                pwd,
                id,
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