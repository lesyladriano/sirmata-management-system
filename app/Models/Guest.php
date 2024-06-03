<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    protected $table = 'guests';
    protected $primaryKey = 'guest_id';
    protected $fillable = ['first_name', 'last_name','party_size', 'guest_email','contact_number','address'];   

    use HasFactory;
}