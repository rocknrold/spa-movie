/* 
Author : HAROLD AARON 
Developer and maintainer : HAROLD AARON

Note: 
    This js file from among all the files inside /public/js directory was 
used as a base pattern for all BREADS used in the web-app, basically it uses
the same logic for all.

*/
$(document).ready(function(){

    // all form validation for film this includes [create,edit/update]
    
         $("form").each(function() {
            $(this).validate({
                rules: {
                name: { required:true, minlength:5 },
                story: { required:true, maxlength:300 },
                info: {required:true},
                duration: {required:true},
                released_at: {required:true},
                genre_id: {required:true},
                cert_id: {required:true}
                },
                messages: {
                name: {
                    required: "Name could not be empty",
                    minlength: "Name should be atleast 5 characters",
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

                },
                errorClass: "error fail-alert",
                validClass: "valid success-alert",
            });
         });
       
    /* 
        load index for all films, this ajax creates an asynchronous request 
        on the server and it uses an API so the request must include some 
        headers nescessary to be an authenticated request on the server
        handling API requests. 

    */
        var availableFilms = []; //this array is needed for search feature 
    
        $.ajax({
            type: "GET",
            /* 
                the url slug here is the route we want to make a request for
                so this is the route of the resource defined in the routes/api  
            */
            url: "api/film/all", 
            dataType: 'json',
            /*
                headers are required based from how to use the API,
                the laravel passport API auth verifies request by using
                access token that is given on an authenticated user
            */
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                    'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
                    // the app uses localStorage to store and retrieve this tokens
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $.each(data, function(key, value) {
                // this line is necessary for search function it pushes data to be search
                    availableFilms.push({"label": value.name, "value": value.id });
                    id = value.id;
                    $('#film-table').append('<div class="col-sm-6" id="film_div_'+ id +'">'+
                    '<div class="card h-100"><img class="card-img-top" src="../logo-02.jpg" alt="Card image cap">'+
                    '<div class="card-body">'+
                    '<h5 class="card-title">'+ value.name +'</h5>'+
                    '<p class="card-text">'+ value.info +'</p>'+
                    '<button data-toggle="modal" data-target="#modal-film-edit" data-id="'+ value.id +'">'+
                    '<i class="far fa-edit"></i></button><button class="deletebtn" data-id="'+ value.id +'">'+
                    '<i class="fa fa-trash-o" style="font-size:24px; color:red"></i></button></div></div></div>');
                });
            },
            error: function(){
            /*
                once ajax fails to load it means that the request has either caught a problem
                or has a 401 unauthenticated request on the resource
                the function calls for the jquery UI dialog for the login form 
            */   
                console.log('AJAX load did not work');
                $("#modal-login-form").dialog().dialog("open"); 
            }
        });
    
    // Read film data via search
    
    $( "#film-search" ).autocomplete({ //any text on the search bar will make an autocomplete
        source: availableFilms, //the above variable is now used as an array of films for search
        autoFocus:true,
        select: function (event, ui) {
            // Set selection
            $('#film-search').val(ui.item.label); // display the selected text
            $('#selected-film').val(ui.item.value); // save selected id to input
            
            return false;
        }
    });
    
    $('#filmSearchForm').submit(function(e){ //executes once search button is clicked
        e.preventDefault();
        var id = $('input[id="selected-film"]').val(); //get slected film's id 
    
        if ($('input[id="film-search"]').val() != "") { //validation if search is empty
            $.ajax({
                type : "GET",
                url : "api/film/show/" + id,
                dataType: 'json',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                        'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
                dataType: "json",
                contentType: "application/json",
                success : function(data){
                    // data.duration will calculated as minutes to hours
                    var duration_in_hrs = Math.floor(data.duration/60);
                    var duration_rm_mins = Math.round(data.duration%60);
                    var readable_duration = duration_in_hrs + " hr(s) " + duration_rm_mins +" min(s)"; 

                    $( "#showFilmDialog" ).dialog({ //show data on the jquery ui dialog
                        title : "Showing details for "+ data.name,
                        resizable : true,
                        open : function(){
                            var content = "<p>"+ data.name +"</p><p>"+ data.story +"</p>&nbsp;<p>"+ readable_duration +"</p><span>Release date: "+ data.released_at+"</span>";
                            $('#showFilmDialog').html(content);
                        },
                        buttons: {
                            "Close" : function(){
                                $('#showFilmDialog').dialog("close");
                            }
                        }
                    }); 
                },
                error: function(error) {
                    console.log('error');
                }
            });
        }else {
            console.log('error on search no query input');
        }
    });
    
    // create -> save film data to database
      $( "#modal-film-form" ).dialog({ // modal form for create, a customized jquery dialog 
        autoOpen: false, 
        modal: true,
        buttons: {
            OK: function(e){
                //ok button event will be made here once submit
                e.preventDefault();
                // accessing input data from create form 
                var name = $('input[id="name"]').val();
                var story = $('textarea#story').val();
                var info = $('input[id="info"]').val();
                var released_at = $('input[id="released_at"]').val();
                var duration = $('input[id="duration"]').val();
                var genre_id = $('input[id="selected_genre_id"]').val();
                var cert_id = $('input[id="selected_cert_id"]').val();
                //some input validation 
                if(name != "" && story != "" && info != "" && name.length >= 5){
                    // the accessed data is now being formatted to be a json
                    // because the api request accepts application/json as 
                    // content type and forms here uses multipart-form as encoding type
                    var data = {
                        name:name,
                        story:story,
                        released_at:released_at,
                        duration:duration,
                        info:info,
                        genre_id:genre_id,
                        certificate_id:cert_id
                    };

                    $.ajax({
                        type: "post",
                        url: "api/film",
                        data: JSON.stringify(data), // for validation that we uses json, stringify does it also
                        dataType: 'json',
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                                'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data) {
                            availableFilms.push({"label": data.name, "value": data.id });
                            
                            $('#film-table').prepend('<div class="col-sm-6" id="film_div_'+ id +'">'+
                            '<div class="card h-100"><img class="card-img-top" src="../logo-02.jpg" alt="Card image cap">'+
                            '<div class="card-body">'+
                            '<h5 class="card-title">'+ data.name +'</h5>'+
                            '<p class="card-text">'+ data.info +'</p>'+
                            '<button data-toggle="modal" data-target="#modal-film-edit" data-id="'+ data.id +'">'+
                            '<i class="far fa-edit"></i></button><button class="deletebtn" data-id="'+ data.id +'">'+
                            '<i class="fa fa-trash-o" style="font-size:24px; color:red"></i></button></div></div></div>');
                        },
                        error: function(error) {
                            console.log('error');
                        }
                    });
                    $(this).dialog("close");
            } else {
                console.log("error on saving data");
            }
        },
        },
    });

// these arrays will be used for form autocomplete 
var availableGenres = [];
var availableCerts = [];

// fetch all genres
    $.ajax({
        type: "GET",
        url: "api/genre/all",
        dataType: 'json',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
        dataType: "json",
        contentType: "application/json",
        success: function(data){
            $.each(data, function(key, value) {
                //push available genre to be used on forms 
                availableGenres.push({"label": value.name, "value": value.id });
            });
        },

    }); //ajax genre end

// fetch all certificates
    $.ajax({
        type: "GET",
        url: "api/certificate/all",
        dataType: 'json',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
        dataType: "json",
        contentType: "application/json",
        success: function(data){
            $.each(data, function(key, value) {
                //push available certificate to be used on forms
                availableCerts.push({"label": value.name, "value": value.id });
            });
        },

    }); //ajax cert end


    //genre and certificate for movie
    $( "#genre_id, #edit_genre_id" ).autocomplete({ 
        source: availableGenres,
        autoFocus:true,
        select: function (event, ui) {
            // Set selection
            $('#genre_id').val(ui.item.label); // display the selected text
            $('#selected_genre_id').val(ui.item.value); // save selected id to input
            $('#edit_genre_id').val(ui.item.label); // display the selected text
            $('#edit_selected_genre_id').val(ui.item.value); // save selected id to input
            
            return false;
        }
    }); 

    $( "#cert_id, #edit_cert_id" ).autocomplete({
        source: availableCerts,
        autoFocus:true,
        select: function (event, ui) {
            // Set selection
            $('#cert_id').val(ui.item.label); // display the selected text
            $('#selected_cert_id').val(ui.item.value); // save selected id to input
            $('#edit_cert_id').val(ui.item.label); // display the selected text
            $('#edit_selected_cert_id').val(ui.item.value); // save selected id to input
            
            return false;
        }
    }); 




    // edit only ->  show to form
    
    $('#modal-film-edit').on('show.bs.modal', function (event) {
        var id = $(event.relatedTarget).data('id') // Extract info from data-* attributes
        // initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        $.ajax({
            type: "GET",
            url: "api/film/"+ id +"/edit",
            dataType: 'json',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                    'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                var default_movie_genre = data.genre_id;
                var default_movie_cert = data.certificate_id;
                var genrevalue,certvalue;
                var genreid, certid;
                $.each(availableGenres,function(key,value){
                    if(default_movie_genre === value.value){
                        genrevalue = value.label;
                        genreid = value.value;
                    }
                });
                $.each(availableCerts,function(key,value){
                    if(default_movie_cert === value.value){
                        certvalue = value.label;
                        certid = value.value;
                    }
                });
                
                //puts data on the form fields 
                modal.find('#film_id').val(data.id);
                modal.find('#edit_name').val(data.name);
                modal.find('#edit_story').val(data.story);
                modal.find('#edit_duration').val(data.duration);
                modal.find('#edit_released_at').val(data.released_at);
                modal.find('#edit_info').val(data.info);
                modal.find('#edit_genre_id').val(genrevalue);
                modal.find('#edit_selected_genre_id').val(genreid);
                modal.find('#edit_cert_id').val(certvalue);
                modal.find('#edit_selected_cert_id').val(certid);
            },
            error: function(error) {
                console.log('error');
            }
        }); //ajax end
    })
    
    $('#modal-film-edit').on('hidden.bs.modal', function (e) {
        $("#updateFilmForm").trigger("reset");
    });
    
    // update film and save changes 
    $('#update-film-btn').click(function(e){
        e.preventDefault();
        var id = $('input[id="film_id"]').val();
        var name = $('input[id="edit_name"]').val();
        var story = $('textarea#edit_story').val();
        var info = $('input[id="edit_info"]').val();
        var released_at = $('input[id="edit_released_at"]').val();
        var duration = $('input[id="edit_duration"]').val();
        var genre_id = $('#edit_selected_genre_id').val();
        var cert_id = $('#edit_selected_cert_id').val();

        var data = {
            name:name,
            story:story,
            released_at:released_at,
            duration:duration,
            info:info,
            genre_id:genre_id,
            certificate_id:cert_id
        };
        if(name != "" && name.length >= 5 && story != "" && info !=""){
            $.ajax({
                type: "PUT",
                url: "api/film/"+ id +"",
                data: JSON.stringify(data),
                dataType: 'json',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                        'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
                dataType: "json",
                contentType: "application/json",
                success: function() {

                    $.each(availableFilms,function(key,value){
                        if(id == value.value){
                            availableFilms.splice(key, 1);
                            return false;
                        }
                    });

                    availableFilms.push({"label": name, "value": id });

                    $('#modal-film-edit').each(function(){
                        $(this).modal('hide'); });
    
                    $('#film_div_'+ id).html('<div class="card h-100"><img class="card-img-top" src="../logo-02.jpg" alt="Card image cap">'+
                    '<div class="card-body"><h5 class="card-title">'+ name +'</h5><p class="card-text">'+ info +'</p>'+
                    '<button data-toggle="modal" data-target="#modal-film-edit" data-id="'+ id +'">'+
                    '<i class="far fa-edit"></i></button><button class="deletebtn" data-id="'+ id +'">'+
                    '<i class="fa fa-trash-o" style="font-size:24px; color:red"></i></button></div></div>');
                    
                },
                error: function(error) {
                console.log('error');
                }
            });
        } else {
            console.log('error validation on inputs')
        }
    });
    
    // delete film 
    $("#film-table").on('click',".deletebtn",function(e) {
        var id = $(this).data('id');
        e.preventDefault();
        bootbox.confirm({
            message: "do you want to delete this film",
            buttons: {
                confirm: {
                    label: 'yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'no',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result)
                    $.ajax({
                        type: "DELETE",
                        url: "api/film/"+ id,
                        dataType: 'json',
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                                'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data) {
                            $.each(availableFilms,function(key,value){
                                if(id === value.value){ //search the id of film deleted and remove it
                                    // on the availableFilms and once true
                                    availableFilms.splice(key, 1); //return the new available films
                                    return false;
                                }
                            });

                            $('#film_div_'+ id).remove(); //remove div on the film rows list
                        },
                        error: function(error) {
                            console.log('error');
                        }
                        });
            }
        });
    });
    
    }); //end document ready 
    