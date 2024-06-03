<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebsiteInfo extends Model
{
    protected $table = 'website_info';
    protected $primaryKey = 'info_id';
    protected $fillable = ['official_email','website_logo', 'website_name','tagline','location','contact_number', 'weekday_opening_time','weekend_opening_time','facebook_link','tiktok_link','instagram_link','map_link'];   

    use HasFactory;
}