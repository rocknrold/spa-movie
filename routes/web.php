<?php

use Illuminate\Support\Facades\Route;
use App\Mail\LoginEmail;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Route::middleware(['check.login'])->group(function () {
// });
Route::get('/', function () {
    return view('layouts.app');
});
Route::get('/login',function(){
    return view('auth.login');
});

Route::get('/register',function(){
    return view('auth.register');
});

Route::get('/logout',function(){
    return view('auth.logout');
});

Route::get('/actor',function(){
    return view('actor.index');
});

Route::get('/film',function(){
    return view('film.index');
});

Route::get('/genre',function(){
    return view('genre.index');
});
Route::get('/producer',function(){
    return view('producer.index');
});

Route::get('/role',function(){
    return view('role.index');
});