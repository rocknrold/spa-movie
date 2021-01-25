<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Mail;
use App\User;
use App\Events\UserLogin;
use App\Models\LoginLog;


class AuthController extends Controller
{

    public function register(Request $request)
    {
        if($request->ajax()){
            $validator = Validator::make($request->all(), [
                'name' => 'required|max:55',
                'email' => 'email|required|unique:users',
                'password' => 'required|confirmed'
            ]);

            if ($validator->fails()) {
                return response()->json(['message' => $validator->errors()->first(), 'status' => false]);
            }

            $user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->save();

            return response()->json([ 'success' => 'Registered Successfully', 200]);
        }
    }

    public function login(Request $request)
    {
        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if ($request->ajax()){
            if (!auth()->attempt($loginData)) {
                return response()->json(['message' => 'Invalid Credentials']);
            } else {
                // event-listener for mail and logs
                //  Event::dispatch(new UserLogin($request->email));

                // mail is now using events-listeners
                // Mail::to($request->email)->send(new LoginEmail);

                $accessToken = auth()->user()->createToken('authToken')->accessToken;
                return response()->json(['user' => auth()->user(), 'access_token' => $accessToken]);
            }    
        }

    }

    public function logout(Request $request)
    {
        if($request->ajax()){
            auth()->user()->tokens->each(function($token , $key){
                // i could either do delete
                $token->delete();
                // or revoke the access token for authenticated user
                // $token->revoke();
            });
            return response()->json([
                'message' => 'Successfully logged out'
            ]);
        }
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
