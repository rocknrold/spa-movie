<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producer extends Model
{

	protected $fillable =[
		'name','email','website'
	];

    public function films(){
        return $this->hasMany(Film::class);
    }
}