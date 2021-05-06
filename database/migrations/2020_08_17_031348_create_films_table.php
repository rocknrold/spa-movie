<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('films', function (Blueprint $table) {
            $table->id();
            $table->string('name',100);
            $table->text('story');
            $table->date('released_at');
            $table->integer('duration');
            $table->text('info');
            $table->unsignedBigInteger('genre_id')->nullable();
            $table->foreign('genre_id')->references('id')->on('genres')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('certificate_id')->nullable();
            $table->foreign('certificate_id')->references('id')->on('certificates')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('producer_id')->nullable();
            $table->foreign('producer_id')->references('id')->on('producers')->onDelete('cascade')->onUpdate('cascade');
            // $table->unsignedBigInteger('media_id')->nullable();
            $table->string('poster')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('films');
    }
}
