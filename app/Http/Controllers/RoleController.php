<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use View;
use App\Role;

class roleController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        return View::make('role.index');
    }

    public function browseRoles(Request $request)
    {
        // if ($request->ajax()){
            $role = Role::orderBy('updated_at','desc')->get();
            return response()->json($role);
        // }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $role = Role::create($request->all());
        return response()->json($role);
    }

    public function show(Request $request, $id)
    {
        // if ($request->ajax()) {
            $role = Role::where('id',$id)->first();
             return response()->json($role);
        // }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        $role = Role::find($role);
        return response()->json($role);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        // if ($request->ajax()) {
            $role = Role::where('id', $id)->update(['name' => $request->name]);
            return response()->json($role);
        // }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return response()->json(["success" => "role deleted successfully.",
             "data" => $role,"status" => 200]);
    }
}
