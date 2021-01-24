<?php

use Illuminate\Database\Seeder;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        for($i = 1; $i <= 10 ; $i++){
            App\Rating::create([
                'film_id' => $i,
                'user_id' => 1,
                'rating_value' => $faker->numberBetween($min = 1, $max = 5),
            ]);
        }
    }
}
