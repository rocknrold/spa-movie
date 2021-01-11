$(document).ready(function(){

    // all form validation for register

    $("form").each(function() {
        $(this).validate({
            rules: {
            name: { required:true},
            email: { required:true,email:true},
            password: { required:true, password:true},
            confirm: { required:true,password:true},
            },
            messages: {
            name: {
                required: "Name could not be empty",
                },
            email: {
                required: "Name could not be empty",
                email: "Should be a valid email",
                },
            password: {
                required: "Name could not be empty",
                password: "Should be a password",
            },
            confirm: {
                required: "Name could not be empty",
                password: "Should be a password",
            },
            },
            errorClass: "error fail-alert",
            validClass: "valid success-alert",
        });
     });
   

     //  register submit action here

     $('#btn-register').click(function(e){
        e.preventDefault();
        var name= $('input[id="register-name"]').val();
        var email = $('input[id="register-email"]').val();
        var password = $('input[id="register-password"]').val();
        var confirm = $('input[id="register-confirm"]').val();
        var data = {name:name,email:email,password:password,password_confirmation:confirm};

        if(email != "" && password != "" && name != "" && confirm != ""){
            $.ajax({
                type: "post",
                url: "/api/register",
                data: JSON.stringify(data),
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                dataType: "json",
                contentType: "application/json",
                success: function(data) {
                    if(data["message"]){
                        alert(data["message"]);
                    }else if(data["success"]){
                        window.location.href = "/film";
                    }
                },
                error: function(error) {
                console.log('error');

                }
            });
        } else {
            alert('There is an error on inputs please check')
        }
    });
}); //end of document