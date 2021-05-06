<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Http;
use App\Film;

class FilmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        $faker->addProvider(new \Xylis\FakerCinema\Provider\Movie($faker));
        
        $result = Http::get('https://api.themoviedb.org/3/movie/popular?api_key=0ef92786f7e4434faa019fcee61dfe1a');
        $movies = $result->json();
        // dd($movies["results"]);
        foreach($movies["results"] as $key){
            // dd($key["title"]);
            Film::create([
                'name'=>$key["title"],	
                'story'=>$key["overview"],
                'released_at'=>now(),
                'duration'=>$faker->numberBetween($min = 60, $max = 180),
                'info'=>$faker->studio,
                'genre_id'=> App\Genre::inRandomOrder()->first()->getKey(),
                'certificate_id'=> App\Certificate::inRandomOrder()->first()->id,
                'producer_id'=> App\Producer::inRandomOrder()->first()->id,
                'poster'=>"https://image.tmdb.org/t/p/w185".$key["poster_path"]."?api_key=0ef92786f7e4434faa019fcee61dfe1a",
            ]);
        }

        // factory(App\Film::class, 25)->create();

    }
}
