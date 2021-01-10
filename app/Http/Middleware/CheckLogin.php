<?php

namespace App\Http\Middleware;
use Auth;
use Closure;

class CheckLogin
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
        // if(Auth::guard('api')->check()){
        //     $user = Auth::guard('api')->user();
        // }else{
        //     return response()->view('auth.login');
        // }  
        return $next($request);
    }
}
