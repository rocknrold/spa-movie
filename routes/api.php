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

Route::middleware(['auth:api'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', 'API\AuthController@register');
Route::post('/login', 'API\AuthController@login');
Route::post('/logout', 'API\AuthController@logout')->middleware('auth:api');




Route::middleware('auth:api')->group(function () {
    Route::get('/actor/all',[
        'uses' => 'ActorController@browseActors',
        'as' => 'actor.browseActors',
    ]);

    Route::get('/actor/show/{id}',[
        'uses' => 'ActorController@show',
        'as' => 'actor.show',
    ]);

    Route::Resource('/actor', 'ActorController');

    Route::get('/film/all',[
        'uses' => 'FilmController@browseFilms',
        'as' => 'film.browseFilms',
    ]);
    
    Route::get('/film/show/{id}',[
        'uses' => 'FilmController@show',
        'as' => 'film.show',
    ]);

    Route::resource('/film', 'FilmController');

    Route::get('/genre/all',[
        'uses' => '\App\Http\Controllers\GenreController@browseGenres',
        'as' => 'genre.browseGenres',
    ]);
    
    Route::get('/genre/show/{id}',[
        'uses' => '\App\Http\Controllers\genreController@show',
        'as' => 'genre.show',
    ]);
    
    Route::resource('/genre', 'GenreController');

    Route::get('/producer/all',[
        'uses' => '\App\Http\Controllers\ProducerController@browseProducers',
        'as' => 'producer.browseProducers',
    ]);
    
    Route::get('/producer/show/{id}',[
        'uses' => '\App\Http\Controllers\ProducerController@show',
        'as' => 'producer.show',
    ]);
    Route::resource('/producer', '\App\Http\Controllers\ProducerController');

    Route::get('/role/all',[
        'uses' => '\App\Http\Controllers\RoleController@browseRoles',
        'as' => 'role.browseRoles',
    ]);
    
    Route::get('/role/show/{id}',[
        'uses' => '\App\Http\Controllers\RoleController@show',
        'as' => 'role.show',
    ]);
    
    Route::resource('/role', 'RoleController');

    Route::get('/certificate/all',[
        'uses' => '\App\Http\Controllers\CertificateController@browseCerts',
        'as' => 'certificate.browseCerts',
    ]);
});
