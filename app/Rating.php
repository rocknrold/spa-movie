<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $fillable = ['film_id','user_id'];

    public function film(){
        return $this->hasMany('App\Film');
    }

    public function user(){
        return $this->hasMany('App\User');
    }
}
