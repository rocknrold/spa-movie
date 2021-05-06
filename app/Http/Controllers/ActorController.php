<?php

namespace App\Http\Controllers;

use App\Actor;
use App\Film;
use View;
use Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ActorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        return View::make('actor.index');
    }

    public function browseActors(Request $request)
    {
        // if ($request->ajax()){
            $actor = Actor::orderBy('updated_at','desc')->get();
            return response()->json($actor);
        //  }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $actor = new Actor();
        $actor->name = $request->name;
        $actor->note = $request->note;
        $actor->poster = 'storage/images/'.str_replace(" ","_",$request->name).'.jpg';
        $actor->save();
        
        Storage::put('public/images/'.str_replace(" ","_",$request->name).'.jpg',base64_decode($request->poster));
        
        if($actor){
            return response()->json(["actor"=>$actor, "status"=>200]);
        }

        return resoponse()->json(["message"=>"something went wrong"]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Actor  $actor
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        // if ($request->ajax()) {
            $actor = Actor::with(['films'])->where('id',$id)->first();
             return response()->json($actor);
        // }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Actor  $actor
     * @return \Illuminate\Http\Response
     */
    public function edit(Actor $actor)
    {
        $actor = Actor::find($actor);
        return response()->json($actor);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Actor  $actor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $actor = Actor::findOrFail($id);
        // dd($request->name);
        $actor->poster = 'storage/images/'.str_replace(" ","_",$request->name).'.jpg';
        $actor->update(["name"=>$request->name, "note"=>$request->note]);

        Storage::put('public/images/'.str_replace(" ", "_", $request->name).'.jpg',base64_decode($request->poster));
        
        return response()->json($actor);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Actor  $actor
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $actor = Actor::findOrFail($id);
        $actor->delete();
        
        $filename =  substr($actor->poster,15);
        // dd($filename);
        // ADDED THIS LINE FOR DELETING IMAGES
        Storage::delete('public/images/'.$filename);
        
        return response()->json(["success" => "Actor deleted successfully.",
             "data" => $actor,"status" => 200]);
    }

}
