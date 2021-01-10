@extends('layouts.app')
@section('content')
<form id="registerForm" action="#" enctype="multipart/form-data">
    @csrf
    {{ method_field('post')}}
  <div class="form-group">
    <label for="register-name">Name</label>
    <input type="text" class="form-control" id="register-name" placeholder="Enter name">
  </div>
  <div class="form-group">
    <label for="register-email">Email address</label>
    <input type="email" class="form-control" id="register-email" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="register-password">Password</label>
    <input type="password" class="form-control" id="register-password" placeholder="Password">
  </div>
  <div class="form-group">
    <label for="register-confirm">Confirm Password</label>
    <input type="password" class="form-control" id="register-confirm" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary" id="btn-register">Submit</button>
</form>
<br>
<div><a href="/login">Back to login </a></div>
@endsection
@section('scripts')
<script src="{{asset("js/register.js")}}"></script>
@endsection