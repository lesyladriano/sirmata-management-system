<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  
    public function up(): void
    {
        Schema::create('accommodation_reservation', function (Blueprint $table) {
            $table->id('reservation_id');
            $table->unsignedBigInteger('guest_id');
            $table->unsignedBigInteger('accommodation_id');
            $table->foreign('guest_id')->references('guest_id')->on('guests')->onUpdate('cascade');
            $table->foreign('accommodation_id')->references('accommodation_id')->on('accommodations')->onUpdate('cascade');
            $table->string('special_requests');
            $table->string('check_in_date');
            $table->string('check_out_date');
            $table->string('arrival_time');
            $table->string('status')->default('Scheduled'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accommodation_reservation');
    }
};
