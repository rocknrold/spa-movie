<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['api', 'check.access'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', 'API\AuthController@register');
Route::post('/login', 'API\AuthController@login');
Route::post('/logout', 'API\AuthController@logout')->middleware('auth:api');




Route::middleware(['check.access', 'api'])->group(function () {
    Route::get('/actor/all',[
        'uses' => 'ActorController@browseActors',
        'as' => 'actor.browseActors',
    ]);

    Route::get('/actor/show/{id}',[
        'uses' => 'ActorController@show',
        'as' => 'actor.show',
    ]);

    Route::Resource('/actor', 'ActorController');
});
