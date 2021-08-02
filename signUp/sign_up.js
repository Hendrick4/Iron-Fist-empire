$("input:submit").click((e) => {
    e.preventDefault();

    const firstname = $("#firstname").val();
    const lastname = $("#lastname").val();
    const birthdate = $("#birthdate").val();
    const email = $("#email").val();
    const nickname = $("#nickname").val();
    const password = $("#pwd").val();

    if (
        firstname.trim() != '' &&
        lastname.trim() != '' &&
        birthdate.trim() != '' &&
        email.trim() != '' &&
        nickname.trim() != '' &&
        password.trim() != ''
    ) {
        $.ajax({
            url: 'sign_up.php',
            type: 'POST',
            data: {
                firstname,
                lastname,
                birthdate,
                email,
                nickname,
                password
            },
            dataType: 'json',
            success: (res, status) => {
                if (res.success) {
                    $("#warn").css('color', 'forestgreen');
                    $("#warn").html("Inscription terminée!");
                    window.location.replace("../Index/index.html");
                } else {
                    $("#warn").css('color', 'darkred');
                    $("#warn").html("Inscription impossible.... Veuillez réessayer ulterieurement");
                }
            }
        })
    }
})