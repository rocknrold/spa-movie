@extends('layouts.app')
@section('content')
<div id = "tabs-genre">
    <button id = "modal-genre-create">Add</button>
    <div class = "ui-widget">
      <form id="genreSearchForm" method="GET">
      @csrf
      <label for = "genre-search"></label>
      <input type="text" id = "genre-search" placeholder="search">
      <input type="hidden" id= "selected-genre">
      <button type="submit" id="btnSearchgenre" value="search">GO</button>
      </form>
    </div>
     <table class="table table-striped table-inverse table-responsive" id="genre-table-class" size="max-width: 200px;">
      <caption>List of genres</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody id="genre-table">
      </tbody>
    </table>
</div>

{{-- create genre form --}}
<div id = "modal-genre-form" title = "Create genre... ">
    <form id="genreForm" method="POST" action="#" class="formValidation">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <div>
            <label for="name" >Name</label>
            <input type="text" id="name" name="name" value="{{old('name')}}" >
            @if($errors->has('name'))
                <small>{{ $errors->first('name') }}</small>
            @endif
        </div> 
    </form>
</div>


{{-- edit genre form --}}
<div class="modal fade" id="modal-genre-edit" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit genre... </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="updategenreForm" method="POST" action="#" class="formValidation">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" name="id" id="genre_id">
            <div>
                <label for="name" >Name</label>
                <input type="text" id="edit_name" name="name" >
                @if($errors->has('name'))
                    <small>{{ $errors->first('name') }}</small>
                @endif
            </div> 
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="update-genre-btn">Save changes</button>
      </div>
    </div>
  </div>
</div>

{{-- dialog jquery UI for genre read --}}
<div id="showgenreDialog" title="">
  <p></p>
</div>
@include('auth.login')

@endsection

@section('scripts')
<script src="{{asset('js/genre.js')}}"></script>
<script src="{{asset('js/login.js')}}"></script>
@endsection