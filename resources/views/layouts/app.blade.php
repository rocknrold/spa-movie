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
    <div class="alert alert-success" role="alert" id="div-alert" hidden>
        <h4 class="alert-heading">Status</h4>
        <p id="status-alert"></p>
        <p class="mb-0"></p>
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
@yield('scripts')
</body>
</html>
