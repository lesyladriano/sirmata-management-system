<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('accommodations', function (Blueprint $table) {
        $table->bigIncrements('accommodation_id');
        $table->string('room_name');
        $table->string('type');
        $table->string('capacity');
        $table->string('description');
        $table->string('feature');
        $table->string('price');
        $table->string('status');
        $table->string('images');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accommodations');
    }
};
