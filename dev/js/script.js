$(function() {

    $('#email-form').on('submit', function(event) {
        event.preventDefault();
        var $email = $('#email').val();
        console.log($email);
        $.ajax({
            type: 'POST',
            url: '//localhost:3000/api/',
            data: {
                'email': $email
            },
            crossDomain: true,
            cache: false,
            dataType: 'jsonp',
            contentType: "application/json",
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
