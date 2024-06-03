<?php
namespace App\Http\Controllers;

use App\Http\Requests\UpdateWebInfoRequest;
use Illuminate\Http\Request;
use App\Models\WebsiteInfo;

class WebsiteInfoController extends Controller
{  
    public function index()
    {
        $employees = WebsiteInfo::all();
        return response()->json($employees); 
    }   
    public function store(Request $request)
    {
        $employees = new WebsiteInfo([
            'official_email' => $request->input('official_email'),
            'website_name'=>$request->input('website_name'),
            'tagline'=>$request->input('tagline'),
            'location'=>$request->input('location'),
            'contact_number' => $request->input('contact_number'),
            'weekday_opening_time' => $request->input('weekday_opening_time'),
            'weekend_opening_time' =>$request->input('weekend_opening_time'),
            'facebook_link'=>$request->input('facebook_link'),
            'tiktok_link'=>$request->input('tiktok_link'),
            'instagram_link'=>$request->input('instagram_link'),
            'map_link'=>$request->input('map_link'),
            'website_logo'=>$request->input('website_logo'),
        ]);
        $employees->save();
        return response()->json('Employee created!');
    }
  
    public function update(UpdateWebInfoRequest $request, $info_id)
    {
       $web_info = WebsiteInfo::find($info_id);
       $web_info->update($request->all());
       return response()->json('pdated');
    }
    
    public function destroy($info_id)
    {
        $employees = WebsiteInfo::find($info_id);
        $employees->delete();
        return response()->json(' deleted!');
    }
}