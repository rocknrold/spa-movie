<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    public function films(){
    	return $this->hasMany(Film::class);
    }
}
