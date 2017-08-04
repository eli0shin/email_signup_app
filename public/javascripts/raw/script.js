$(function() {

    $('#email-form').on('submit', function(event) {
        event.preventDefault();
        var $email = 'email=' + encodeURIComponent($('#email').val());
        $.ajax({
            type: 'POST',
            url: 'api/',
            data: $email,
            cache: false,
            contentType: "application/x-www-form-urlencoded",
            error: function(req, res, err) {
                console.log(req);
                console.log(res);
                console.log(err);
                $('#error').toggle();
                setTimeout(function() {
                    $('#error').toggle();
                }, 3000);
            },
            success: function(data) {
                
                $('#thank-you').toggle();
                setTimeout(function() {
                    $('#thank-you').toggle();
                }, 3000);
            }
        });
        return;
    });
});
