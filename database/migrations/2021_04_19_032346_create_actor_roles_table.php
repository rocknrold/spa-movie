<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActorRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // change actor_roles table to actor_film
        Schema::create('actor_film', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('film_id')->nullable();
            $table->foreign('film_id')->references('id')->on('films')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('actor_id')->nullable();
            $table->foreign('actor_id')->references('id')->on('actors')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('actor_roles');
    }
}
