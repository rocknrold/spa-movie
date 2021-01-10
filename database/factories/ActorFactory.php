<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Actor;
use Faker\Generator as Faker;

$factory->define(Actor::class, function (Faker $faker) {
	$faker->addProvider(new \Xylis\FakerCinema\Provider\Person($faker));
    return [
        'name'=>$faker->actor,
        'note'=>$faker->sentence($nbWords = 6, $variableNbWords = true),
    ];
});
