{{-- @extends('layouts.app')
@section('content') --}}
<div id = "tabs-producer">
    <button id = "modal-producer-create">Add Producer</button>
    <div class = "ui-widget">
      <form id="producerSearchForm" method="GET">
      @csrf
      <label for = "producer-search"></label>
      <input type="text" id = "producer-search" placeholder="search producer...">
      <input type="hidden" id= "selected-producer">
      <button type="submit" id="btnSearchproducer" value="search">GO</button>
      </form>
    </div>
     <table class="table" id="producer-table-class">
      <caption>List of producers</caption>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Website</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody id="producer-table">
      </tbody>
    </table>
</div>

{{-- create producer form --}}
<div id = "modal-producer-form" title = "Create producer... ">
    <form id="producerForm" method="POST" action="#" class="formValidation">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <div>
            <label for="producer_name" >Name</label>
            <input type="text" id="producer_name" name="name" value="{{old('producer_name')}}" >
            @if($errors->has('producer_name'))
                <small>{{ $errors->first('producer_name') }}</small>
            @endif
        </div> 
        <div> 
            <label for="producer_email">Email</label>
            <input type="text" id="producer_email" name="email" value="{{old('producer_email')}}" >
            @if($errors->has('producer_email'))
                <small>{{ $errors->first('producer_email') }}</small>
            @endif
        </div>
        <div> 
            <label for="website">Website</label>
            <input type="text" id="website" name="website" value="{{old('website')}}" >
            @if($errors->has('website'))
                <small>{{ $errors->first('website') }}</small>
            @endif
        </div>
    </form>
</div>


{{-- edit producer form --}}
<div class="modal fade" id="modal-producer-edit" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit producer... </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="updateproducerForm" method="POST" action="#" class="formValidation">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" name="id" id="producer_id">
            <div>
                <label for="producer_name" >Name</label>
                <input type="text" id="edit_producer_name" name="name" >
                @if($errors->has('producer_name'))
                    <small>{{ $errors->first('producer_name') }}</small>
                @endif
            </div> 
            <div> 
                <label for="producer_email">producer_email</label>
                <input type="text" id="edit_producer_email" name="email">
                @if($errors->has('producer_email'))
                    <small>{{ $errors->first('producer_email') }}</small>
                @endif
            </div>
            <div> 
                <label for="website">Website</label>
                <input type="text" id="edit_website" name="website">
                @if($errors->has('website'))
                    <small>{{ $errors->first('website') }}</small>
                @endif
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="update-producer-btn">Save changes</button>
      </div>
    </div>
  </div>
</div>

{{-- dialog jquery UI for producer read --}}
<div id="showproducerDialog" title="">
  <p></p>
</div>
{{-- @include('auth.login')

@endsection

@section('scripts')
<script src="{{asset('js/producer.js')}}"></script>
<script src="{{asset('js/login.js')}}"></script>
@endsection --}}