<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Producer;
use Faker\Generator as Faker;

$factory->define(Producer::class, function (Faker $faker) {
	$faker->addProvider(new \Xylis\FakerCinema\Provider\Person($faker));
    return [
    	'name'=>$faker->director,
        'email'=>$faker->unique()->safeEmail,
        'website'=>$faker->safeEmailDomain,
    ];
});
