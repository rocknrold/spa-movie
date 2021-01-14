<?php

namespace App\Http\Controllers;

use App\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function browseCerts(Request $request)
    {
        if ($request->ajax()){
            $certificate = Certificate::orderBy('updated_at','desc')->get();
            return response()->json($certificate);
         }
    }
}
