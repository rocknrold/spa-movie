@extends('layouts.app')
@section('content')
<div id = "tabs-actor">
    <button id = "modal-actor-create">Add</button>
    <div class = "ui-widget">
      <form id="actorSearchForm" method="GET">
      @csrf
      <label for = "actor-search"></label>
      <input type="text" id = "actor-search" placeholder="search">
      <input type="hidden" id= "selected-actor">
      <button type="submit" id="btnSearchActor" value="search">GO</button>
      </form>
    </div>
     <table class="table" id="actor-table-class">
      <caption>List of actors</caption>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Note</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody id="actor-table">
      </tbody>
    </table>
</div>

{{-- create actor form --}}
<div id = "modal-actor-form" title = "Create actor... ">
    <form id="actorForm" method="POST" action="#" class="formValidation">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <div>
            <label for="name" >Name</label>
            <input type="text" id="name" name="name" value="{{old('name')}}" >
            @if($errors->has('name'))
                <small>{{ $errors->first('name') }}</small>
            @endif
        </div> 
        <div> 
            <label for="note">Note</label>
            <input type="text" id="note" name="note" value="{{old('note')}}" >
            @if($errors->has('note'))
                <small>{{ $errors->first('note') }}</small>
            @endif
        </div>
    </form>
</div>


{{-- edit actor form --}}
<div class="modal fade" id="modal-actor-edit" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit actor... </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="updateActorForm" method="POST" action="#" class="formValidation">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" name="id" id="actor_id">
            <div>
                <label for="name" >Name</label>
                <input type="text" id="edit_name" name="name" >
                @if($errors->has('name'))
                    <small>{{ $errors->first('name') }}</small>
                @endif
            </div> 
            <div> 
                <label for="note">Note</label>
                <input type="text" id="edit_note" name="note">
                @if($errors->has('note'))
                    <small>{{ $errors->first('note') }}</small>
                @endif
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="update-actor-btn">Save changes</button>
      </div>
    </div>
  </div>
</div>

{{-- dialog jquery UI for actor read --}}
<div id="showActorDialog" title="">
  <p></p>
</div>

@include('auth.login')

@endsection

@section('scripts')
<script src="{{asset('js/actor.js')}}"></script>
<script src="{{asset('js/login.js')}}"></script>
@endsection