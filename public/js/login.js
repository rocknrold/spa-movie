$(document).ready(function(){

        // all form validation for login
    
        $("form").each(function() {
            $(this).validate({
                rules: {
                email: { required:true,email:true},
                password: { required:true, password:true},
                },
                messages: {
                email: {
                    required: "Name could not be empty",
                    email: "Should be a valid email",
                    },
                password: {
                    required: "Name could not be empty",
                    password: "Should be a password",
                    },
                },
                errorClass: "error fail-alert",
                validClass: "valid success-alert",
            });
         });
       

         //  login submit action here

         $('#btn-login').click(function(e){
            e.preventDefault();
            var email = $('input[id="login-email"]').val();
            var password = $('input[id="login-password"]').val();
            var data = {email:email, password:password};

            if(email != "" && password != ""){
                $.ajax({
                    type: "post",
                    url: "/api/login",
                    data: JSON.stringify(data),
                    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                    dataType: "json",
                    contentType: "application/json",
                    success: function(data) {
                        console.log(data);
                        if(data["message"]){
                            alert("Invalid credentials");
                        } else {
                            const email = data["user"]["email"];
                            const username = data["user"]["name"];
                            const access_token = data["access_token"];

                            localStorage.setItem("email",email);
                            localStorage.setItem("username", username);
                            localStorage.setItem("access_token",access_token);

                            window.location.href = "/";
                        }
                    },
                    error: function(error) {
                    console.log('error');

                    }
                });
            } else {
                console.log('There is an error on inputs please check')
            }
        });
}); //end of document