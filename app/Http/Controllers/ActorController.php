<?php

namespace App\Http\Controllers;

use App\Actor;
use View;
use Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ActorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function index()
    {
        return View::make('actor.index');
    }

    public function browseActors(Request $request)
    {
        if ($request->ajax()){
            $actor = Actor::orderBy('updated_at','desc')->get();
            return response()->json($actor);
         }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // return view('actor.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $actor = Actor::create($request->all());
        return response()->json($actor);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Actor  $actor
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if ($request->ajax()) {
            $actor = Actor::where('id',$id)->first();
             return response()->json($actor);
        }
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
        if ($request->ajax()) {
            $actor = Actor::where('id', $id)->update(['name' => $request->name, 
            'note' => $request->note]);
            return response()->json($actor);
        }
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
        return response()->json(["success" => "Actor deleted successfully.",
             "data" => $actor,"status" => 200]);
    }

    public function restore($id) 
    {
        $actor = new Actor;
        $actor->where('id',$id)->restore();
        return  Redirect::route('actor.index')->with('success','Actor restored successfully!');
    }
}
