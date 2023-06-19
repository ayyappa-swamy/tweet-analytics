$(document).ready(function () {
    $("#btn_tweet_submit").click(function (event) {
        event.preventDefault();

        var form = $('#tweet_file_form')[0];
        var data = new FormData(form);

        $(".upload_div *").prop("disabled", true);
        $(".stats_result").html("<h3 class='center_text'>Processing the tweet file ...</h1>");

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/tweet_file_upload",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                $(".stats_result").html(data);
                $(".upload_div *").prop("disabled", false);
            },
            error: function (e) {
                $(".stats_result").text(e.responseText);
                console.log("ERROR : ", e);
                $(".upload_div *").prop("disabled", false);
            }
        });
    });
});
