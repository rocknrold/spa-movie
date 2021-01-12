$(document).ready(function(){
    try {
        $.ajax({
            type: 'post',
            url: "/api/logout",
            /**
             * the api logout route is part of the laravel passport routes that 
             * uses the api authentication so the request includes headers such as
             * the authorization and the csrf token and also the accept type 
             * which is the application/json 
             */
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                    'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
            dataType: "json",
            contentType: "application/json",
            success: function(data) {
                // if the logout is successfully been completed
                if(data["message"]){
                    /**
                     * the object-like structure => localStorage is cleared on the
                     * client side to fully destroy the access_token used
                     * for authenticating request on the resource of our API
                     */
                    localStorage.clear();
                    // here we are going to store the status success message on lS 
                    const status = data["message"];
                    localStorage.setItem("status",status); // lS
                }
                window.location.href = "/";
            },
            error: function(error) {
                console.log('error');
            }
        });
    } catch (error) {
        // complicated request are handled by catch and
        // still be directed back to the home
        console.log(error);
        window.location.href = "/";
    }
});