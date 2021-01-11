<?php

namespace App\Http\Controllers;

use App\Film;
use App\FilmUser;
use App\Genre;
use App\Certificate;
use View;
use Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Spatie\MediaLibrary\MediaCollections\Models\Media;

class FilmController extends Controller
{

    public function index()
    {
        return View::make('film.index');
    }

    public function browseFilms(Request $request)
    {
        // if ($request->ajax()){
            $film = Film::orderBy('updated_at','desc')->get();
            return response()->json($film);
        //  }
    }

    public function create()
    {

    }

    public function store(Request $request)
    {
        $film = Film::create($request->all());
        return response()->json($film);
    }

    public function show(Request $request, $id)
    {
        // if ($request->ajax()) {
            $film = Film::where('id',$id)->first();
             return response()->json($film);
        // }
    }

    public function edit($id)
    {
        $film = Film::find($id);
        return response()->json($film);
    }

    public function update(Request $request, $id)
    {
        if ($request->ajax()) {
            $film = Film::where('id', $id)->update(['name' => $request->name, 
            'story' => $request->story,
            'released_at' => $request->released_at,
            'duration' => $request->duration,
            'info' => $request->info,
            'genre_id' => $request->genre_id,
            'certificate_id' => $request->certificate_id,]);
            
            return response()->json($film);
        }
    }

    public function destroy($id)
    {
        $film = Film::findOrFail($id);
        $film->delete();
        return response()->json(["success" => "Actor deleted successfully.",
             "data" => $film,"status" => 200]);
    }

    public function restore($id)
    {
        $film = new Film;
        $film->where('id',$id)->restore();
        return Redirect::route('film.index')->with('success','Film Restored');
    }
}
