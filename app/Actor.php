<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{

    protected $fillable = ['name', 'note','media_id', 'poster'];

    // public function actorRoles(){
    //     return $this->hasMany(ActorRole::class);
    // }

    public function films(){
        return $this->belongsToMany(Film::class);
    }

}