$(function() {
    /**
     * this just includes all the jquery neccessary for the 
     * widgets used in the UI of the web-app 
     * this includes eg: dialogs and menu/navbar
     */
    $( "#menu-1" ).menu();

    $( "#modal-opener" ).click(function() {
        $( "#modal-form" ).dialog( "open" );
    });

    $( "#modal-actor-create" ).click(function() {
        $( "#modal-actor-form" ).dialog( "open" );
    });

    $( "#modal-producer-create" ).click(function() {
        $( "#modal-producer-form" ).dialog( "open" );
    });

    $( "#modal-genre-create" ).click(function() {
        $( "#modal-genre-form" ).dialog( "open" );
    });

    $( "#modal-role-create" ).click(function() {
        $( "#modal-role-form" ).dialog( "open" );
    });

    $( "#modal-film-create" ).click(function() {
        $( "#modal-film-form" ).dialog( "open" );
    });


}); //end function 