$("#create").click((e) => {
    e.preventDefault();
    const fd = new FormData();
    const files = $("#picture")[0].files;
    const lastname = $("#lastname").val();
    const firstname = $("#firstname").val();
    const gender = $("#gender").val();
    const age = $("#age").val();
    const desc = $("#desc").val();

    fd.append('picture', files[0]);
    fd.append('lastname', lastname);
    fd.append('firstname', firstname);
    fd.append('gender', gender);
    fd.append('age', age);
    fd.append('desc', desc);

    $.ajax({
        url: 'addCharacter.php',
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        success: (res, status) => {
            if (res.success) {
                $("#result").html("Creation du personnage reussie!");
            } else {
                $("#result").css("color", "crimson");
                $("#result").html("Echec de la creation du personnage");
            }
        }
    })
})