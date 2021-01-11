$(document).ready(function(){


        function isAuthenticated(){ //validation check if user is logged in or not
            try {   
                // checks for the item inside localstorage object 
                if(localStorage.getItem("access_token") === null) {
                    // if null show the register button in the menu bar
                   $('#register').attr('style', 'display:inline');
                }else{
                    // if the user is authorize/login on the app then show logout
                    $('#logout').attr('style', 'display:inline');
                }
            } catch (error) {
                console.log(error);
            }
        }

        function alertStatus(){ //current status of the user action is called
            // if the user is logged out of the web-app 
            try {   
            //first it checks again for the status item inside localstorage object
                if(localStorage.getItem("status") !== null) {
                    // if it founds and is not null display the status message 
                    $('#div-alert').attr('style', 'display:inline');
                    $('#status-alert').text(localStorage.getItem("status"));
                    // once displayed you can now remove it or just clear the
                    // entire localStorage for further use
                    localStorage.clear();
                }
            } catch (error) {
                console.log(error);
            }
        }
        // call the functions once the page using the login.js is loaded
        isAuthenticated();
        alertStatus();

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
            // data is formatted to use a json format
            var data = {email:email, password:password};
            // additional validation for login
            if(email != "" && password != ""){
                $.ajax({
                    type: "post",
                    url: "/api/login",
                    data: JSON.stringify(data), 
                    /**  
                     * api login request is part of the laravel passport and requires
                     * data to be on json format and the encoding type use multipart-form 
                    */
                    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                    dataType: "json",
                    contentType: "application/json",
                    success: function(data) {
                        // login will always be 200 but the data returned is different 
                        // form validation is done also on the controller and on this file
                        if(data["message"]){
                            alert("Invalid credentials");
                        } else {
                            /**
                             * once the login attempt is successful 
                             * data returned is stored on the localStorage
                             */
                            const email = data["user"]["email"];
                            const username = data["user"]["name"];
                            const access_token = data["access_token"];

                            localStorage.setItem("email",email);
                            localStorage.setItem("username", username);
                            localStorage.setItem("access_token",access_token);

                            location.reload();
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