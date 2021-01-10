$(document).ready(function(){
    $.ajax({
        type: 'post',
        url: "/api/logout",
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
            if(data["message"]){
                window.location.href = "/login";
                alert(data["message"]);
            }

            localStorage.clear();
        },
        error: function(error) {
            console.log('error');
        }
    });
});