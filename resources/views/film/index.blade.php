{{--   
Author : HAROLD AARON 
Developer and maintainer : HAROLD AARON

Note: 
    This index blade file from among all the files inside /views directory was 
used as a base pattern for all BREADS used in the web-app, basically it uses
the same logic for all.

--}}
{{-- @extends('layouts.app')
@section('film') --}}
<div id="tabs-movies">
    <button id = "modal-film-create">Add Film</button>
<div class = "ui-widget">
    <form id="filmSearchForm" method="GET">
        @csrf
        <label for = "film-search"></label>
        <input type="text" id = "film-search" placeholder="search film...">
        <input type="hidden" id= "selected-film">
        <button type="submit" id="btnSearchFilm" value="search">GO</button>
    </form>
</div>
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 p-5" id="film-table">
</div>

<div class="d-flex justify-content-center">
    {{-- {{ $films->links() }} --}}
</div>

<div id = "modal-film-form" title = "Create film... ">
    <form id="filmForm" method="POST" action="#" class="formValidation" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <div>
            <label for="film_name" >Name</label>
            <input type="text" id="film_name" name="name" value="{{old('film_name')}}" >
            @if($errors->has('film_name'))
                <small>{{ $errors->first('film_name') }}</small>
            @endif
        </div>
        <div>
            <label for="story" >Story</label>
            <textarea rows="4" cols="50" id="story" name="story">{{old('story')}}</textarea>
            @if($errors->has('story'))
                <small>{{ $errors->first('story') }}</small>
            @endif
        </div>
        <div>
            <label for="duration" >Duration</label>
            <input type="number" id="duration" name="duration" value="{{old('duration')}}" >
            @if($errors->has('duration'))
                <small>{{ $errors->first('duration') }}</small>
            @endif
        </div>
        <div>
            <label for="released_at" >Release Date</label>
            <input type="date" id="released_at" name="released_at" value="'{{old('released_at')}}'" >
            @if($errors->has('released_at'))
                <small>{{ $errors->first('released_at') }}</small>
            @endif
        </div> 
        <div> 
            <label for="info">Info</label>
            <input type="text" id="info" name="info" value="{{old('info')}}" >
            @if($errors->has('info'))
                <small>{{ $errors->first('info') }}</small>
            @endif
        </div>
        <div class = "ui-widget"> 
            <label for="genre_film_id">Genre</label>
            <input type="text" id="genre_film_id" name="genre_id" value="{{old('genre_id')}}" >
            <input type="hidden" id= "selected_genre_film_id">
            @if($errors->has('genre_id'))
                <small>{{ $errors->first('genre_id') }}</small>
            @endif
        </div>
        <div class = "ui-widget"> 
            <label for="cert_film_id">Certificate</label>
            <input type="text" id="cert_film_id" name="certificate_id" value="{{old('certificate_id')}}" >
            <input type="hidden" id= "selected_cert_film_id">
            @if($errors->has('certificate_id'))
                <small>{{ $errors->first('certificate_id') }}</small>
            @endif
        </div>
        <div class = "ui-widget"> 
            <label for="poster">Film Poster</label>
            <input type="file" id="poster" name="poster">
            @if($errors->has('poster'))
                <small>{{ $errors->first('poster') }}</small>
            @endif
        </div>
    </form>
</div>


{{-- edit film form --}}
<div class="modal fade" id="modal-film-edit" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit film... </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body ui-front">
        <form id="updateFilmForm" action="#" class="formValidation" enctype="multipart/form-data">
            <input type="hidden" name="_method" value="PUT">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" name="id" id="film_id">
                   <div>
            <label for="film_name" >Name</label>
            <input type="text" id="edit_film_name" name="name" value="{{old('film_name')}}" >
            @if($errors->has('film_name'))
                <small>{{ $errors->first('film_name') }}</small>
            @endif
        </div>
        <div>
            <label for="story" >Story</label>
            <textarea rows="4" cols="50" id="edit_story" name="story">{{old('story')}}</textarea>
            @if($errors->has('story'))
                <small>{{ $errors->first('story') }}</small>
            @endif
        </div>
        <div>
            <label for="duration" >Duration</label>
            <input type="number" id="edit_duration" name="duration" value="{{old('duration')}}" >
            @if($errors->has('duration'))
                <small>{{ $errors->first('duration') }}</small>
            @endif
        </div>
        <div>
            <label for="released_at" >Released Date</label>
            <input type="date" id="edit_released_at" name="released_at" value="'{{old('released_at')}}'" >
            @if($errors->has('released_at'))
                <small>{{ $errors->first('released_at') }}</small>
            @endif
        </div> 
        <div> 
            <label for="info">Info</label>
            <input type="text" id="edit_info" name="info" value="{{old('info')}}" >
            @if($errors->has('info'))
                <small>{{ $errors->first('info') }}</small>
            @endif
        </div>
        <div class = "ui-widget"> 
            <label for="genre_film_id">Genre</label>
            <input type="text" id="edit_genre_film_id" name="genre_id" value="{{old('genre_film_id')}}" >
            <input type="hidden" id= "edit_selected_genre_film_id">
            @if($errors->has('genre_film_id'))
                <small>{{ $errors->first('genre_film_id') }}</small>
            @endif
        </div>
        <div class = "ui-widget"> 
            <label for="cert_film_id">Certificate</label>
            <input type="text" id="edit_cert_film_id" name="certificate_id" value="{{old('cert_film_id')}}" >
            <input type="hidden" id= "edit_selected_cert_film_id">
            @if($errors->has('cert_film_id'))
                <small>{{ $errors->first('cert_film_id') }}</small>
            @endif
        </div>
        <div class = "ui-widget"> 
            <label for="poster">Film Poster</label>
            <input type="file" id="edit_poster" name="poster">
            @if($errors->has('film_poster'))
                <small>{{ $errors->first('film_poster') }}</small>
            @endif
        </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="update-film-btn">Save changes</button>
      </div>
    </div>
  </div>
</div>

{{-- dialog jquery UI for film read --}}
<div id="showFilmDialog" title="">
  <p></p>
</div>
{{-- this is the enddiv tab --}}
</div> 
