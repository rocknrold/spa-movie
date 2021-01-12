$(document).ready(function(){
        // all form validation this includes [create,edit/update]
    
        $("form").each(function() {
            $(this).validate({
                rules: {
                    name: { required:true },
                    story: { required:true, maxlength:300 },
                    info: {required:true},
                    duration: {required:true},
                    released_at: {required:true},
                    genre_film_id: {required:true},
                    cert_film_id: {required:true},
                    note: { required:true, maxlength:20 },
                    email: { required:true, email:true },
                    website: { required:true, maxlength:50 },
                },
                messages: {
                    name: {
                        required: "Name could not be empty",
                    },
                    story: {
                        required: "Could not be empty",
                        maxlength: "Noted have reached maximum characters allowed",
                    },
                    info: {
                        required: "Could not be empty",
                    },
                    duration: {
                        required: "Could not be empty",
                    },
                    released_at: {
                        required: "Could not be empty",
                    },
                    genre_id: {
                        required: "Could not be empty",
                    },
                    cert_id: {
                        required: "Could not be empty",
                    },
                    note: {
                        required: "Note could not be empty",
                        maxlength: "Noted have reached maximum characters allowed",
                    },
                    email: {
                        required: "Note could not be empty",
                        email: "Should be a valid email",
                    },
                    website: {
                        required: "Note could not be empty",
                        maxlength: "Noted have reached maximum characters allowed",
                    }

                },
                errorClass: "error fail-alert",
                validClass: "valid success-alert",
            });
         });
});