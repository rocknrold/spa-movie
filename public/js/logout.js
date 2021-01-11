$(document).ready(function(){
    try {
        $.ajax({
            type: 'post',
            url: "/api/logout",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                    'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
            dataType: "json",
            contentType: "application/json",
            success: function(data) {
                if(data["message"]){
                    localStorage.clear();
                    
                    const status = data["message"];
                    localStorage.setItem("status",status);
                }
                window.location.href = "/film";
            },
            error: function(error) {
                console.log('error');
            }
        });
    } catch (error) {
        console.log(error);
        window.location.href = "/film";
    }
});