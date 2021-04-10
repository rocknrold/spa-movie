$(document).ready(function(){

    try {
        if(localStorage.getItem("access_token") === null) {
            $("#modal-login-form").dialog().dialog("open"); 
            // $.getScript('http://127.0.0.1:8000/js/login.js');
            getScript('/js/login.js',function(){});
        } else {
            $('#logout').attr('style', 'display:inline');
            $.getScript('/js/film.js');
            $.getScript('/js/actor.js');
            $.getScript('/js/producer.js');
            $.getScript('js/genre.js');
            $.getScript('/js/role.js');  
            $.getScript('/js/validation.js');
        }
    } catch (error) {
        console.log(error);
    }

    
    function getScript(scriptUrl, callback) {
        const scriptt = document.createElement('script');
        scriptt.src = scriptUrl;
        scriptt.onload = callback;

        document.body.appendChild(scriptt);
    }
});