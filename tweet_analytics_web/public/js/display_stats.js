console.log("script loaded");

$(document).ready(function () {
    $("#btn_tweet_submit").click(function (event) {
        event.preventDefault();

        var form = $('#tweet_file_form')[0];
        var data = new FormData(form);

        $("#btn_tweet_submit").prop("disabled", true);
        $("#btn_tweet_file_choose").prop("disabled", true);

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
                $("#stats_result").html(data);
                $("#btn_tweet_submit").prop("disabled", false);
                $("#btn_tweet_file_choose").prop("disabled", false);
            },
            error: function (e) {
                $("#stats_result").text(e.responseText);
                console.log("ERROR : ", e);
                $("#btn_tweet_submit").prop("disabled", false);
                $("#btn_tweet_file_choose").prop("disabled", false);
            }
        });
    });
});
