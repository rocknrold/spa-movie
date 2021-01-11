{{-- 
    this login index blade file is called inside views
    it is included for every views files eg: genre/index.blade.php,
    this is just shown every time the user is not authenticated and is
    requesting a route which is made only for authenticated users
 --}}
<div id = "modal-login-form" title = "Login" hidden>
<form id="loginForm" action="#" method="post" enctype="multipart/form-data">
    @csrf
  <div class="form-group">
    <label for="login-email">Email address</label>
    <input type="email" class="form-control" id="login-email" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="login-password">Password</label>
    <input type="password" class="form-control" id="login-password" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary" id="btn-login">Log in</button>
</form>
<br>
<div><a href="/register">Don't have an account?<br> Click here</a></div>
</div>