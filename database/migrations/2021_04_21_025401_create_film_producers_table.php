<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilmProducersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('film_producers', function (Blueprint $table) {
            $table->id();
            // $table->unsignedBigInteger('film_id')->nullable();
            // $table->foreign('film_id')->references('id')->on('films')->onDelete('cascade')->onUpdate('cascade');
            // $table->unsignedBigInteger('producer_id')->nullable();
            // $table->foreign('producer_id')->references('id')->on('actors')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('film_producers');
    }
}
