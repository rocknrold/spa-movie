{{-- 
    master layout
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
<div class="alert" role="alert" id="div-alert" hidden>
    <p id="status-alert"></p>
</div>
<div class="container my-4" id="containerForAll">
    <div class="navbar navbar-expand-lg" style="position:fixed; z-index:100;">
    <ul id= "menu-1">
        <li data-value="movies"><a href = "#tabs-movies">Movies</a></li>
        <li data-value="actor"><a href = "#tabs-actor">Actor</a></li>
        <li data-value="producer"><a href = "#tabs-producer">Producer</a></li>
        <li data-value="genre"><a href = "#tabs-genre">Genre</a></li>
        <li data-value="role"><a href = "#tabs-role">Roles</a></li>
        <li data-value="logout"><a href = "/logout" id="logout" style="display:none;">logout</a></li>
        <li data-value="register"><a href = "/register" id="register"style="display:none;" >register</a></li>
    </ul>
    </div>
    <br><br>
    <main class="py-4">
    @include('film.index')
    @include('actor.index')
    @include('producer.index')
    @include('genre.index')
    @include('role.index')
    </main>
@include('layouts.footer')
</div>
@include('auth.login')
<script src="{{asset('js/auth.js')}}"></script>
@yield('scripts') {{-- for logout--}}
</body>
</html>
