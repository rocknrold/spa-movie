<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use View;
use Redirect;
use App\Film;
use App\Actor;
use App\Certificate;

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

    public function store(Request $request)
    {
        $film = new Film();
        $film->name = $request->name;
        $film->story = $request->story;
        $film->released_at = $request->released_at;
        $film->duration = $request->duration;
        $film->info = $request->info;
        $film->genre_id = $request->genre_id;
        $film->certificate_id = $request->cert_id;
        $film->producer_id = $request->producer_id;
        $film->poster = 'storage/images/'.str_replace(" ","_",$request->name).'.jpg';
        $film->save();

        $actorIds = explode(',',$request->actors);
        $actor = Actor::find($actorIds);
        $film->actors()->attach($actor);

        
        Storage::put('public/images/'.str_replace(" ","_",$request->name).'.jpg',base64_decode($request->poster));
        
        if($film){
            return response()->json(["actor"=>$film, "status"=>200]);
        }

        return resoponse()->json(["message"=>"something went wrong"]);
    }

    // public function store(Request $request)
    // {
    //     $film = new Film();
    //     $film->name = $request->name;
    //     $film->story = $request->story;
    //     $film->released_at = $request->released_at;
    //     $film->duration = $request->duration;
    //     $film->info = $request->info;
    //     $film->genre_id = $request->genre_id;
    //     $film->producer_id = $request->producer_id;
    //     $file = base64_decode($request->poster); 
    //     $film->poster = request()->file($file)->store('uploads', 'public');
    //     $film->save();

    //     return response()->json($film);
    // }

    public function show(Request $request, $id)
    {
        // if ($request->ajax()) {
            $film = Film::with(['actors','producers','genre'])->where('id',$id)->first();
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
        $film = Film::findOrFail($id);
        // dd($film,$request->name, $request->story);
            
        $film->poster = 'storage/images/'.str_replace(" ","_",$request->name).'.jpg';
        $film->update(["name"=>$request->name, 
                    "story"=>$request->story,
                    "released_at"=>$request->released_at,
                    "duration"=>$request->duration,
                    "info"=>$request->info,
                    "genre_id"=>$request->genre_id,
                    "certificate_id"=>$request->cert_id,
                    "producer_id"=>$request->producer_id]);

        $actor = Actor::all();
        $film->actors()->detach($actor);
        
        $actorIds = explode(',',$request->actors);
        $actor = Actor::find($actorIds);
        $film->actors()->attach($actor);

        Storage::put('public/images/'.str_replace(" ", "_", $request->name).'.jpg',base64_decode($request->poster));
        
        return response()->json($film);
    }

    public function destroy($id)
    {
        $film = Film::findOrFail($id);
        $film->delete();
        $filename =  substr($film->poster,15);
        // ADDED THIS LINE FOR DELETING IMAGES
        Storage::delete('public/images/'.$filename);

        return response()->json(["success" => "Movie deleted successfully.",
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
