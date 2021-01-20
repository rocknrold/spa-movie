$(document).ready(function(){

    try {
        if(localStorage.getItem("access_token") === null) {
            $("#modal-login-form").dialog().dialog("open"); 
            $.getScript('http://127.0.0.1:8000/js/login.js');
        } else {
            $('#logout').attr('style', 'display:inline');
            $.getScript('http://127.0.0.1:8000/js/film.js');
            $.getScript('http://127.0.0.1:8000/js/actor.js');
            $.getScript('http://127.0.0.1:8000/js/producer.js');
            $.getScript('http://127.0.0.1:8000/js/genre.js');
            $.getScript('http://127.0.0.1:8000/js/role.js');  
            $.getScript('http://127.0.0.1:8000/js/validation.js');
        }
    } catch (error) {
        console.log(error);
    }
});