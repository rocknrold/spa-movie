<?php

namespace App\Http\Middleware;

use Closure;

class ApiAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(!in_array($request->headers->get('Accept'),['application/json','Application/json'])){
            // return response()->json(["message" => "unauthorize"], 401);
            return abort(401);
        };

        return $next($request);
    }
}
