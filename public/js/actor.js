$(document).ready(function(){

// all form validation for actor

     $("form").each(function() {
        $(this).validate({
            rules: {
            name: { required:true, minlength:5 },
            note: { required:true, maxlength:20 },
            },
            messages: {
            name: {
                required: "Name could not be empty",
                minlength: "Name should be atleast 5 characters",
            },
            note: {
                required: "Note could not be empty",
                maxlength: "Noted have reached maximum characters allowed",
            },
            },
            errorClass: "error fail-alert",
            validClass: "valid success-alert",
        });
     });
   
// load index for all actors 
    var availableActors = [];

    $.ajax({
        type: "GET",
        url: "/actor/all",
        dataType: 'json',
        success: function (data) {
            $.each(data, function(key, value) {
                availableActors.push({"label": value.name, "value": value.id });
                id = value.id;

                $('#actor-table').append('<tr id="actor_tr_'+ value.id +'">'+
                '<th>'+ value.id +'</th>'+
                '<th>'+ value.name +'</th>'+
                '<th>'+ value.note +'</th>'+
                '<th><button data-toggle="modal" data-target="#modal-actor-edit" data-id="'+ id +'">'+
                '<i class="far fa-edit"></i></button></th>'+
                '<th><button class="deletebtn" data-id="'+ id +'">'+
                '<i class="fa fa-trash-o" style="font-size:24px; color:red" ></i></button></th>'+
                '</tr>');
            });
        },
        error: function(){
          console.log('AJAX load did not work');
          alert("error");
        }
    });
    console.log(availableActors);

// Read actor data via search 

$( "#actor-search" ).autocomplete({
    source: availableActors,
    autoFocus:true,
    select: function (event, ui) {
        // Set selection
        $('#actor-search').val(ui.item.label); // display the selected text
        $('#selected-actor').val(ui.item.value); // save selected id to input
        
        return false;
    }
});

$('#actorSearchForm').submit(function(e){
    e.preventDefault();
    var id = $('input[id="selected-actor"]').val();

    if ($('input[id="actor-search"]').val() != "") {
        $.ajax({
            type : "GET",
            url : "/actor/show/" + id,
            dataType: "json",
            success : function(data){
                $( "#showActorDialog" ).dialog({
                    title : "Showing details for "+ data.name,
                    resizable : true,
                    open : function(){
                        var content = "<p>"+ data.name +"</p><p>"+ data.note +"</p>&nbsp;<span>Join date: "+ data.created_at+"</span>";
                        $('#showActorDialog').html(content);
                    },
                    buttons: {
                        "Close" : function(){
                            $('#showActorDialog').dialog("close");
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



// create -> save actor data to database
  $( "#modal-actor-form" ).dialog({
    autoOpen: false, 
    modal: true,
    buttons: {
        OK: function(e){
            e.preventDefault();
            //ok button event will be made here
            if($('input[id="name"]').val() != "" && $('input[id="note"]').val() != ""){
                var data = $("#actorForm").serialize();
                $.ajax({
                    type: "post",
                    url: "/actor",
                    data: data,
                    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                    dataType: "json",
                    success: function(data) {
                        availableActors.push({"label": data.name, "value": data.id });
                        
                        $('#actor-table').prepend('<tr id="actor_tr_'+ data.id +'">'+
                        '<th>'+ data.id +'</th>'+
                        '<th>'+ data.name +'</th>'+
                        '<th>'+ data.note +'</th>'+
                        '<th><button data-toggle="modal" data-target="#modal-actor-edit" data-id="'+ data.id +'">'+
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

$('#modal-actor-edit').on('show.bs.modal', function (event) {
    var id = $(event.relatedTarget).data('id') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    $.ajax({
        type: "GET",
        url: "/actor/"+ id +"/edit",
        dataType: 'json',
        success: function (data) {
            modal.find('#actor_id').val(data[0].id);
            modal.find('#edit_name').val(data[0].name);
            modal.find('#edit_note').val(data[0].note);
        },
        error: function(error) {
            console.log('error');
        }
    });
})

$('#modal-actor-edit').on('hidden.bs.modal', function (e) {
    $("#updateActorForm").trigger("reset");
});

// update actor and save changes 
$('#update-actor-btn').click(function(e){
    e.preventDefault();
    var id = $('input[id="actor_id"]').val();
    var name = $('input[name="name"]').val();
    var note = $('input[name="note"]').val();
    var data = $("#updateActorForm").serialize();
    if(name != "" && note != "" && name.length >= 5){
        $.ajax({
            type: "PUT",
            url: "/actor/"+ id +"",
            data: data,
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            dataType: "json",
            success: function(data) {
                console.log(data);
                $('#modal-actor-edit').each(function(){
                    $(this).modal('hide'); });

                $('#actor_tr_'+ id).html('<th>'+ id +'</th><th>'+ name +'</th><th>'+ note +'</th>'+
                '<th><button data-toggle="modal" data-target="#modal-actor-edit" data-id="'+ id +'">'+
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

// delete actor 
$("#actor-table").on('click',".deletebtn",function(e) {
    var id = $(this).data('id');
    e.preventDefault();
    bootbox.confirm({
        message: "do you want to delete this actor",
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
                    url: "/actor/"+ id,
                    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                    dataType: "json",
                    success: function(data) {
                        $('#actor_tr_'+ id).remove();
                    },
                    error: function(error) {
                        console.log('error');
                    }
                    });
        }
    });
});

}); //end document ready 
