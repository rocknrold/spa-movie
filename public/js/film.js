$(document).ready(function(){

    // all form validation for film
    
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
       
    // load index for all films 
        var availableFilms = [];
    
        $.ajax({
            type: "GET",
            url: "/film/all",
            dataType: 'json',
            success: function (data) {
                $.each(data, function(key, value) {
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
              console.log('AJAX load did not work');
              alert("error");
            }
        });
    
    // Read film data via search 
    
    $( "#film-search" ).autocomplete({
        source: availableFilms,
        autoFocus:true,
        select: function (event, ui) {
            // Set selection
            $('#film-search').val(ui.item.label); // display the selected text
            $('#selected-film').val(ui.item.value); // save selected id to input
            
            return false;
        }
    });
    
    $('#filmSearchForm').submit(function(e){
        e.preventDefault();
        var id = $('input[id="selected-film"]').val();
    
        if ($('input[id="film-search"]').val() != "") {
            $.ajax({
                type : "GET",
                url : "/film/show/" + id,
                dataType: "json",
                success : function(data){
                    var duration_in_hrs = Math.floor(data.duration/60);
                    var duration_rm_mins = Math.round(data.duration%60);
                    var readable_duration = duration_in_hrs + " hr(s) " + duration_rm_mins +" min(s)"; 

                    $( "#showFilmDialog" ).dialog({
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
    
    var availableGenres = [];
    var availableCerts = [];
    
    // create -> save film data to database
      $( "#modal-film-form" ).dialog({
        autoOpen: false, 
        modal: true,
        buttons: {
            OK: function(e){
                e.preventDefault();
                //ok button event will be made here
                if($('input[id="name"]').val() != "" && $('input[id="info"]').val() != ""){

                    var name = $('input[id="name"]').val();
                    var story = $('textarea#story').val();
                    var info = $('input[id="info"]').val();
                    var released_at = $('input[id="released_at"]').val();
                    var duration = $('input[id="duration"]').val();
                    var genre_id = $('input[id="selected_genre_id"]').val();
                    var cert_id = $('input[id="selected_cert_id"]').val();

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
                        url: "/film",
                        data: data,
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                        dataType: "json",
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
        console.log(availableFilms);

// fetch all genres
    $.ajax({
        type: "GET",
        url: "/genre/all",
        dataType: 'json',
        success: function(data){
            $.each(data, function(key, value) {
                availableGenres.push({"label": value.name, "value": value.id });
            });
        },

    }); //ajax genre end

// fetch all certificates
    $.ajax({
        type: "GET",
        url: "/certificate/all",
        dataType: 'json',
        success: function(data){
            $.each(data, function(key, value) {
                availableCerts.push({"label": value.name, "value": value.id });
            });
        },

    }); //ajax genre end


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
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        $.ajax({
            type: "GET",
            url: "/film/"+ id +"/edit",
            dataType: 'json',
            success: function (data) {
                // console.log(data);
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
        if(name != ""){
            $.ajax({
                type: "PUT",
                url: "/film/"+ id +"",
                data: data,
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                dataType: "json",
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
                        url: "/film/"+ id,
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                        dataType: "json",
                        success: function(data) {
                            $.each(availableFilms,function(key,value){
                                if(id === value.value){
                                    availableFilms.splice(key, 1);
                                    return false;
                                }
                            });

                            $('#film_div_'+ id).remove();
                        },
                        error: function(error) {
                            console.log('error');
                        }
                        });
            }
        });
    });
    
    }); //end document ready 
    