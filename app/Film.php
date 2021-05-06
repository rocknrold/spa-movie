<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Film extends Model 
{


    // protected $fillable = [
    //     'name','story','released_at','duration','info','genre_id','producer_id','poster'
    // ];
    protected $fillable = [
        'name','story','released_at','duration','info','genre_id','certificate_id','producer_id','media_id', 'poster'
    ];

    public function genre()
    {
        return $this->belongsTo(Genre::class, 'genre_id', 'id');
    }

    // public function certificate()
    // {
    //     return $this->belongsTo(Certificate::class, 'certificate_id', 'id');
    // }

    // public function filmProducers(){
    //     return $this->hasMany(FilmProducer::class);
    // }

    // public function actorRoles(){
    //     return $this->hasMany(ActorRole::class);
    // }
    
    public function actors() {
        return $this->belongsToMany(Actor::class);
    }

    public function producers(){
        return $this->belongsTo(Producer::class, 'producer_id', 'id');
    }

    // public function filmUsers(){
    //     return $this->hasMany(FilmUser::class);
    // }
}
