<?php

namespace App\Listeners;

use App\Events\UserLogin;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Mail;

class SendLoginNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserLogin  $event
     * @return void
     */
    public function handle(UserLogin $event)
    {
        $email = $event->user_email;
        Mail::send('loginEmail',[$email],
            function($message) use($email) {
                $message->from('movie-webapp@test.com','Admin');
                $message->to($email,'no-reply');
                $message->subject('Login alert!');
            }
        );
    }
}
