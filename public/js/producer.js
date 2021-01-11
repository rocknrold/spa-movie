$(document).ready(function(){

    // all form validation for producer
    
         $("form").each(function() {
            $(this).validate({
                rules: {
                name: { required:true, minlength:5 },
                email: { required:true, maxlength:30 },
                website: { required:true, maxlength:50 },
                },
                messages: {
                name: {
                    required: "Name could not be empty",
                    minlength: "Name should be atleast 5 characters",
                },
                email: {
                    required: "Note could not be empty",
                    maxlength: "Noted have reached maximum characters allowed",
                },
                webiste: {
                    required: "Note could not be empty",
                    maxlength: "Noted have reached maximum characters allowed",
                },
                },
                errorClass: "error fail-alert",
                validClass: "valid success-alert",
            });
         });
       
    // load index for all producers 
        var availableproducers = [];
    
        $.ajax({
            type: "GET",
            url: "api/producer/all",
            dataType: 'json',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                    'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $.each(data, function(key, value) {
                    availableproducers.push({"label": value.name, "value": value.id });
                    id = value.id;
    
                    $('#producer-table').append('<tr id="producer_tr_'+ value.id +'">'+
                    '<th>'+ value.id +'</th>'+
                    '<th>'+ value.name +'</th>'+
                    '<th>'+ value.website +'</th>'+
                    '<th><button data-toggle="modal" data-target="#modal-producer-edit" data-id="'+ id +'">'+
                    '<i class="far fa-edit"></i></button></th>'+
                    '<th><button class="deletebtn" data-id="'+ id +'">'+
                    '<i class="fa fa-trash-o" style="font-size:24px; color:red" ></i></button></th>'+
                    '</tr>');
                });
            },
            error: function(){
                $('#modal-login-form').dialog().dialog('open');
                console.log('AJAX load did not work');
            }
        });
        console.log(availableproducers);
    
    // Read producer data via search 
    
    $( "#producer-search" ).autocomplete({
        source: availableproducers,
        autoFocus:true,
        select: function (event, ui) {
            // Set selection
            $('#producer-search').val(ui.item.label); // display the selected text
            $('#selected-producer').val(ui.item.value); // save selected id to input
            
            return false;
        }
    });
    
    $('#producerSearchForm').submit(function(e){
        e.preventDefault();
        var id = $('input[id="selected-producer"]').val();
    
        if ($('input[id="producer-search"]').val() != "") {
            $.ajax({
                type : "GET",
                url : "api/producer/show/" + id,
                dataType: 'json',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                        'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
                dataType: "json",
                contentType: "application/json",
                success : function(data){
                    $( "#showproducerDialog" ).dialog({
                        title : "Showing details for "+ data.name,
                        resizable : true,
                        open : function(){
                            var content = "<p>Hi Im "+ data.name +"</p><p>Contact "+ data.email +"</p><p>Visit on "+ data.website +"</p>&nbsp;<span>Join date: "+ data.created_at+"</span>";
                            $('#showproducerDialog').html(content);
                        },
                        buttons: {
                            "Close" : function(){
                                $('#showproducerDialog').dialog("close");
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
    
    
    
    // create -> save producer data to database
      $( "#modal-producer-form" ).dialog({
        autoOpen: false, 
        modal: true,
        buttons: {
            OK: function(e){
                e.preventDefault();
                //ok button event will be made here
                var name = $('input[id="name"]').val();
                var email = $('input[id="email"]').val();
                var website = $('input[id="website"]').val();
                if(name != "" && email != ""){
                    // var data = $("#producerForm").serialize();
                    $.ajax({
                        type: "post",
                        url: "api/producer",
                        data: JSON.stringify({name:name,email:email,website:website}),
                        dataType: 'json',
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                                'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data) {
                            availableproducers.push({"label": data.name, "value": data.id });
                            
                            $('#producer-table').prepend('<tr id="producer_tr_'+ data.id +'">'+
                            '<th>'+ data.id +'</th>'+
                            '<th>'+ data.name +'</th>'+
                            '<th>'+ data.website +'</th>'+
                            '<th><button data-toggle="modal" data-target="#modal-producer-edit" data-id="'+ data.id +'">'+
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
    
    $('#modal-producer-edit').on('show.bs.modal', function (event) {
        var id = $(event.relatedTarget).data('id') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        $.ajax({
            type: "GET",
            url: "api/producer/"+ id +"/edit",
            dataType: 'json',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                    'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                modal.find('#producer_id').val(data[0].id);
                modal.find('#edit_name').val(data[0].name);
                modal.find('#edit_email').val(data[0].email);
                modal.find('#edit_website').val(data[0].website);
            },
            error: function(error) {
                console.log('error');
            }
        });
    })
    
    $('#modal-producer-edit').on('hidden.bs.modal', function (e) {
        $("#updateproducerForm").trigger("reset");
    });
    
    // update producer and save changes 
    $('#update-producer-btn').click(function(e){
        e.preventDefault();
        var id = $('input[id="producer_id"]').val();
        var name = $('input[name="name"]').val();
        var email = $('input[name="email"]').val();
        var website = $('input[name="website"]').val();
        var data = $("#updateproducerForm").serialize();
        if(name != "" && name.length >=5 && email != "" && website != "" ){
            $.ajax({
                type: "PUT",
                url: "api/producer/"+ id +"",
                data: JSON.stringify({name:name,email:email,website:website}),
                dataType: 'json',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                        'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
                dataType: "json",
                contentType: "application/json",
                success: function(data) {
                    $('#modal-producer-edit').each(function(){
                        $(this).modal('hide'); });
    
                    $('#producer_tr_'+ id).html('<th>'+ id +'</th><th>'+ name +'</th><th>'+ website +'</th>'+
                    '<th><button data-toggle="modal" data-target="#modal-producer-edit" data-id="'+ id +'">'+
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
    
    // delete producer 
    $("#producer-table").on('click',".deletebtn",function(e) {
        var id = $(this).data('id');
        e.preventDefault();
        bootbox.confirm({
            message: "do you want to delete this producer",
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
                        url: "api/producer/"+ id,
                        dataType: 'json',
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
                                'Authorization' : 'Bearer '+ localStorage.getItem("access_token")},
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data) {
                            $('#producer_tr_'+ id).remove();
                        },
                        error: function(error) {
                            console.log('error');
                        }
                        });
            }
        });
    });
    
    }); //end document ready 
    