<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use View;
use Redirect;
use App\Film;
use App\Certificate;

class FilmController extends Controller
{

    public function index()
    {
        return View::make('film.index');
    }

    public function browseFilms(Request $request)
    {
        if ($request->ajax()){
            $film = Film::orderBy('updated_at','desc')->get();
            return response()->json($film);
         }
    }

    public function store()
    {
        $film = Film::create($this->validateRequest());

        $this->storePoster($film);

        return response()->json($film);
    }

    public function show(Request $request, $id)
    {
        if ($request->ajax()) {
            $film = Film::where('id',$id)->first();
             return response()->json($film);
        }
    }

    public function edit($id)
    {
        $film = Film::find($id);
        return response()->json($film);
    }

    public function update(Request $request, $id)
    {
        if ($request->ajax()) {
            $film = Film::where('id', $id)->update($this->validateRequest());
            
            if(request()->has('poster')){
                $film = Film::where('id', $id)->update(['poster' => request()->poster->store('uploads','public'),]);
            }

            $film = Film::find($id);
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

    public function validateRequest() {
        return tap(request()->validate([
            'name' => 'required',
            'story' => 'required',
            'released_at' => 'required',
            'duration' => 'required',
            'info' => 'required',
            'genre_id' => 'required',
            'certificate_id' => 'required'
        ]), function(){

            if(request()->hasFile('poster')){
                request()->validate([
                    'poster'=> 'file|image|max:10000',
                ]);
            }
        });
    }

    public function storePoster($film){
        if(request()->has('poster')){
            $film->update([
                'poster' => request()->poster->store('uploads','public'),
            ]);
        }
    }
}
