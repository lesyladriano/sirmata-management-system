<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('website_info', function (Blueprint $table) {
            $table->id('info_id');
            $table->string('website_logo')->nullable(); 
            $table->string('website_name');
            $table->string('tagline');
            $table->string('location');
            $table->string('official_email');
            $table->string('contact_number');
            $table->string('weekday_opening_time');
            $table->string('weekend_opening_time');
            $table->string('facebook_link');
            $table->string('tiktok_link');
            $table->string('instagram_link');
            $table->string('map_link');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('website_info');
    }
};
    