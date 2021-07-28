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