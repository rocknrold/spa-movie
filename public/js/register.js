$(document).ready(function(){

    // all form validation for register
    // this just validates the form
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
        /**
         * create a data variable with json format in javascript 
         */
        var data = {name:name,email:email,password:password,password_confirmation:confirm};
        
        // some small validation again to make sure data is valid and correct
        if(email != "" && password != "" && name != "" && confirm != ""){
            $.ajax({
                type: "post",
                url: "/api/register",
                /**
                 * the route api/register is part of the laravel passport
                 * so a json data is needed and Accept type as an application/json 
                 */
                data: JSON.stringify(data),
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                dataType: "json",
                contentType: "application/json",
                success: function(data) {
                    // data is validated from the API also 
                    if(data["message"]){
                        // it returns a message this could either be validation also
                        // because some data could be only verified directly on the database 
                        alert(data["message"]);
                    }else if(data["success"]){
                        // if data passed the validation then redirect
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