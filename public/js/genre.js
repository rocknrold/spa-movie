$(document).ready(function(){

    // all form validation for genre
    
         $("form").each(function() {
            $(this).validate({
                rules: {
                name: { required:true, minlength:5 },
                },
                messages: {
                name: {
                    required: "Name could not be empty",
                    minlength: "Name should be atleast 5 characters",
                    },
                },
                errorClass: "error fail-alert",
                validClass: "valid success-alert",
            });
         });
       
    // load index for all genres 
        var availablegenres = [];
    
        $.ajax({
            type: "GET",
            url: "api/genre/all",
            dataType: 'json',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                    'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $.each(data, function(key, value) {
                    availablegenres.push({"label": value.name, "value": value.id });
                    id = value.id;
    
                    $('#genre-table').append('<tr id="genre_tr_'+ value.id +'">'+
                    '<th>'+ value.name +'</th>'+
                    '<th><button data-toggle="modal" data-target="#modal-genre-edit" data-id="'+ id +'">'+
                    '<i class="far fa-edit"></i></button></th>'+
                    '<th><button class="deletebtn" data-id="'+ id +'">'+
                    '<i class="fa fa-trash-o" style="font-size:24px; color:red" ></i></button></th>'+
                    '</tr>');
                });
            },
            error: function(){
                $("#modal-login-form").dialog().dialog("open");
                console.log('AJAX load did not work');
            }
        });
        console.log(availablegenres);
    
    // Read genre data via search 
    
    $( "#genre-search" ).autocomplete({
        source: availablegenres,
        autoFocus:true,
        select: function (event, ui) {
            // Set selection
            $('#genre-search').val(ui.item.label); // display the selected text
            $('#selected-genre').val(ui.item.value); // save selected id to input
            
            return false;
        }
    });
    
    $('#genreSearchForm').submit(function(e){
        e.preventDefault();
        var id = $('input[id="selected-genre"]').val();
    
        if ($('input[id="genre-search"]').val() != "") {
            $.ajax({
                type : "GET",
                url : "api/genre/show/" + id,
                dataType: 'json',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                        'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
                dataType: "json",
                contentType: "application/json",
                success : function(data){
                    $( "#showgenreDialog" ).dialog({
                        title : "Showing details for "+ data.name,
                        resizable : true,
                        open : function(){
                            var content = "<p>"+ data.name +"</p>&nbsp;<span>Date Added: "+ data.created_at+"</span>";
                            $('#showgenreDialog').html(content);
                        },
                        buttons: {
                            "Close" : function(){
                                $('#showgenreDialog').dialog("close");
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
    
    
    
    // create -> save genre data to database
      $( "#modal-genre-form" ).dialog({
        autoOpen: false, 
        modal: true,
        buttons: {
            OK: function(e){
                e.preventDefault();
                //ok button event will be made here
                var name = $('input[id="name"]').val();
                if( name != "" && name.length > 5 ){
                    $.ajax({
                        type: "post",
                        url: "api/genre",
                        data: JSON.stringify({name:name}),
                        dataType: 'json',
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                                'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data) {
                            availablegenres.push({"label": data.name, "value": data.id });
                            
                            $('#genre-table').prepend('<tr id="genre_tr_'+ data.id +'">'+
                            '<th>'+ data.name +'</th>'+
                            '<th><button data-toggle="modal" data-target="#modal-genre-edit" data-id="'+ data.id +'">'+
                            '<i class="far fa-edit"></i></button></th>'+
                            '<th><button class="deletebtn" data-id="'+ data.id +'">'+
                            '<i class="fa fa-trash-o" style="font-size:24px; color:red" ></i></button></th>'+
                            '</tr>');
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
    
    // edit only ->  show to form
    
    $('#modal-genre-edit').on('show.bs.modal', function (event) {
        var id = $(event.relatedTarget).data('id') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        $.ajax({
            type: "GET",
            url: "api/genre/"+ id +"/edit",
            dataType: 'json',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                    'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                modal.find('#genre_id').val(data[0].id);
                modal.find('#edit_name').val(data[0].name);
            },
            error: function(error) {
                console.log('error');
            }
        });
    })
    
    $('#modal-genre-edit').on('hidden.bs.modal', function (e) {
        $("#updategenreForm").trigger("reset");
    });
    
    // update genre and save changes 
    $('#update-genre-btn').click(function(e){
        e.preventDefault();
        var id = $('input[id="genre_id"]').val();
        var name = $('input[name="name"]').val();
        var data = $("#updategenreForm").serialize();
        if(name != "" && name.length >= 5){
            $.ajax({
                type: "PUT",
                url: "api/genre/"+ id +"",
                data: JSON.stringify({name:name}),
                dataType: 'json',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                        'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
                dataType: "json",
                contentType: "application/json",
                success: function(data) {
                    console.log(data);
                    $('#modal-genre-edit').each(function(){
                        $(this).modal('hide'); });
    
                    $('#genre_tr_'+ id).html('<th>'+ name +'</th>'+
                    '<th><button data-toggle="modal" data-target="#modal-genre-edit" data-id="'+ id +'">'+
                    '<i class="far fa-edit"></i></button></th><th><button class="deletebtn" data-id="'+ id +'">'+
                    '<i class="fa fa-trash-o" style="font-size:24px; color:red" ></i></button></th>');
                    
                },
                error: function(error) {
                console.log('error');
                }
            });
        } else {
            console.log('error validation on inputs')
        }
    });
    
    // delete genre 
    $("#genre-table").on('click',".deletebtn",function(e) {
        var id = $(this).data('id');
        e.preventDefault();
        bootbox.confirm({
            message: "do you want to delete this genre",
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
                        url: "api/genre/"+ id,
                        dataType: 'json',
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                                'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data) {
                            $('#genre_tr_'+ id).remove();
                        },
                        error: function(error) {
                            console.log('error');
                        }
                        });
            }
        });
    });
    
    }); //end document ready 
    