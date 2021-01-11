<?php

namespace App\Http\Controllers;

use App\Producer;
use App\Film;
use App\FilmProducer;
use View;
use Redirect;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProducerController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        return View::make('producer.index');
    }

    public function browseProducers(Request $request)
    {
        if ($request->ajax()){
            $producer = Producer::orderBy('updated_at','desc')->get();
            return response()->json($producer);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $producer = Producer::create($request->all());
        return response()->json($producer);
    }

    /**
     * Display the specified resource.
     *
     // * @param  \App\Producer  $producer
     // * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if ($request->ajax()) {
            $producer = Producer::where('id',$id)->first();
             return response()->json($producer);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Producer  $producer
     * @return \Illuminate\Http\Response
     */
    public function edit(Producer $producer)
    {
        $producer = Producer::find($producer);
        return response()->json($producer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Producer  $producer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        if ($request->ajax()) {
            $producer = Producer::where('id', $id)->update(['name' => $request->name, 
            'email' => $request->email, 'website' => $request->website]);
            return response()->json($producer);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Producer  $producer
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $producer = Producer::findOrFail($id);
        $producer->delete();
        return response()->json(["success" => "Producer deleted successfully.",
             "data" => $producer,"status" => 200]);
    }
}
