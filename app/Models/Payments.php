<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    protected $table = 'payments';
    protected $primaryKey = 'payment_id';
    protected $fillable = ['reservation_id', 'guest_id', 'payment_mode','payment_mode_online','total_amount','payment_status','payment_intent_id','email_sent','total_nights','checkout_session_id','payment_expire'];   

    use HasFactory;
}