<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\ActorRole;
use Faker\Generator as Faker;

$factory->define(ActorRole::class, function (Faker $faker) {
    return [
        'film_id'=> App\Film::inRandomOrder()->first()->id,
        'actor_id'=> App\Actor::inRandomOrder()->first()->id,
    ];
});
