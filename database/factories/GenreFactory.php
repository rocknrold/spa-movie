<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Genre;
use Faker\Generator as Faker;

$factory->define(Genre::class, function (Faker $faker) {
	$faker->addProvider(new \Xylis\FakerCinema\Provider\Movie($faker));
    return [
        'name'=>$faker->movieGenre,
    ];
});
