$.ajax({
    url: 'addost.php',
    type: 'GET',
    data: {
        table: 'opus'
    },
    dataType: 'json',
    success: (res) => {
        let options = '';
        if (res.success) {
            res.opus.forEach(option => {
                options += "<option value='" + option.id_opus + "'>" + option.opus_name + "</option>";
            })
            $("#opus").append(options);
        }
    }
})

$("#add").click((e) => {
    e.preventDefault();
    const name = $("#name").val();
    const opus = $("#opus").val();
    const link = $("#link").val();
    $.ajax({
        url: 'addost.php',
        type: 'POST',
        data: {
            table: 'ost',
            name,
            opus,
            link
        },
        dataType: 'json',
        success: (res) => {
            console.log(res);
            if (res.success) {
                $("#msg").html(res.msg);
            } else $("#msg").html(res.msg);

        }
    })
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


const role = JSON.parse(localStorage.getItem('user')).is_admin;
if (role == 0) {
    $("body").hide();
} else $("body").show();