{{-- @extends('layouts.app')
@section('content') --}}
<div id = "tabs-role">
    <button id = "modal-role-create">Add Role</button>
    <div class = "ui-widget">
      <form id="roleSearchForm" method="GET">
      @csrf
      <label for = "role-search"></label>
      <input type="text" id = "role-search" placeholder="search role...">
      <input type="hidden" id= "selected-role">
      <button type="submit" id="btnSearchrole" value="search">GO</button>
      </form>
    </div>
     <table class="table table-striped table-inverse table-responsive" id="role-table-class" size="max-width: 200px;">
      <caption>List of roles</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody id="role-table">
      </tbody>
    </table>
</div>

{{-- create role form --}}
<div id = "modal-role-form" title = "Create role... ">
    <form id="roleForm" method="POST" action="#" class="formValidation">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <div>
            <label for="role_name" >Name</label>
            <input type="text" id="role_name" name="name" value="{{old('role_name')}}" >
            @if($errors->has('role_name'))
                <small>{{ $errors->first('role_name') }}</small>
            @endif
        </div> 
    </form>
</div>


{{-- edit role form --}}
<div class="modal fade" id="modal-role-edit" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit role... </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="updateroleForm" method="POST" action="#" class="formValidation">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" name="id" id="role_id">
            <div>
                <label for="role_name" >Name</label>
                <input type="text" id="edit_role_name" name="name" >
                @if($errors->has('role_name'))
                    <small>{{ $errors->first('role_name') }}</small>
                @endif
            </div> 
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="update-role-btn">Save changes</button>
      </div>
    </div>
  </div>
</div>

{{-- dialog jquery UI for role read --}}
<div id="showroleDialog" title="">
  <p></p>
</div>
{{-- @include('auth.login')

@endsection

@section('scripts')
<script src="{{asset('js/role.js')}}"></script>
<script src="{{asset('js/login.js')}}"></script>
@endsection --}}