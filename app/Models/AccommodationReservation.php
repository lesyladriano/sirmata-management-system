<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccommodationReservation extends Model
{
    protected $table = 'accommodation_reservation';
    protected $primaryKey = 'reservation_id';
    protected $fillable = ['guest_id','accommodation_id','payment_id','special_requests', 'check_in_date', 'check_out_date','arrival_time','created_at','status','total_nights'];   
    use HasFactory;
}
