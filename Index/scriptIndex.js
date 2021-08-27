$("#connect").click((e) => {
    $("#connect").hide();
    e.preventDefault();
    const form = "<form>" +
        "<label for='login' >Pseudo:</label>" +
        "<input type='text' name='pseudo' id='n_name'>" +
        "<label for='pwd'>Mot de passe:</label>" +
        "<input type='password' name='pwd' id='pwd'>" +
        "</form>";
    $("form").append(form);
    $("#send").css("display", "block");
});

$("#send").click((e) => {

    e.preventDefault();
    const pseudo = $("#n_name").val();
    const pwd = $("#pwd").val();

    if (
        pseudo.trim() != '' &&
        pwd.trim() != ''
    ) {
        $.ajax({
            url: 'index.php',
            type: 'POST',
            data: {
                pseudo,
                pwd
            },
            dataType: 'json',
            success: (res, status) => {
                if (res.success) {
                    localStorage.setItem('user', JSON.stringify(res.user));
                    JSON.parse(localStorage.getItem('user'));
                    $("#check").html("Connexion réussie! redirection vers le site....");
                    window.location.replace('../News/newspage.html');
                } else {
                    $("#check").css("color", "darkred");
                    $("#check").html("Identifiant ou mot de passe incorrect.");
                }
            }
        })
    }
})