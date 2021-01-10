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
    <ul id= "menu-1">
        <li data-value="movies"><a href = "/">Movies</a></li>
        <li data-value="actor"><a href = "#">Actor</a></li>
        <li data-value="producer"><a href = "#">Producer</a></li>
        <li data-value="genre"><a href = "#tabs-genres">Genre</a></li>
        <li data-value="role"><a href = "#tabs-role">Roles</a></li>
        <li data-value="certificate"><a href = "#tabs-certificate">Certificate</a></li>
        <li data-value="logout"><a href = "/logout">logout</a></li>
        <li data-value="register"><a href = "/register">register</a></li>
        <li data-value="login"><a href = "/login">login</a></li>
    </ul>
    <main class="py-4">@yield('content')</main>



    @if (Auth::guard('api')->check())
        <h1>hi hahaha</h1>
    @endif
</div>
@yield('scripts')
</body>
</html>
