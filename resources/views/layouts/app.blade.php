{{-- 
    This is the main layout used in the whole web-app 
    it is extended along to the different files inside
    /views directory, it may be considered as the master 
 --}}
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Laravel') }}</title>
    @include('layouts.header')
</head>
<body>
<div class="container">
    <div class="alert" role="alert" id="div-alert" hidden>
        <p id="status-alert"></p>
    </div>
    <div class="navbar navbar-expand-lg">
    <ul id= "menu-1">
        <li data-value="movies"><a href = "/film">Movies</a></li>
        <li data-value="actor"><a href = "/actor">Actor</a></li>
        <li data-value="producer"><a href = "/producer">Producer</a></li>
        <li data-value="genre"><a href = "/genre">Genre</a></li>
        <li data-value="role"><a href = "/role">Roles</a></li>
        <li data-value="logout"><a href = "/logout" id="logout" style="display:none;">logout</a></li>
        <li data-value="register"><a href = "/register" id="register"style="display:none;" >register</a></li>
    </ul>
    </div>
    <main class="py-4">@yield('content')</main>
</div>
@include('layouts.footer')
@yield('scripts')
</body>
</html>
