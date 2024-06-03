<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    protected $table = 'accommodations';
    protected $primaryKey = 'accommodation_id';
    protected $fillable = ['room_name', 'type', 'capacity','description','web_description','feature','price','status','web_images','booking_image'];   

    use HasFactory;
}