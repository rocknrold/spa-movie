<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

/** 
	if has error on faker provider run this command on cli
	composer require xylis/faker-cinema-providers 
*/
	
use App\Film;
use Faker\Generator as Faker;

$factory->define(Film::class, function (Faker $faker) {
	$faker->addProvider(new \Xylis\FakerCinema\Provider\Movie($faker));
    return [
        'name'=>$faker->movie,	
        'story'=>$faker->overview,
        'released_at'=>now(),
        'duration'=>$faker->numberBetween($min = 60, $max = 180),
        'info'=>$faker->studio,
        'genre_id'=> App\Genre::inRandomOrder()->first()->getKey(),
        'certificate_id'=> App\Certificate::inRandomOrder()->first()->id,
    ];
});


