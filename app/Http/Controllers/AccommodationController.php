<?php
namespace App\Http\Controllers;
use Cloudinary\Uploader;
use App\Http\Requests\StoreAccommodationRequest;
use App\Http\Requests\UpdateAccommodationRequest;
use Illuminate\Http\Request;
use App\Models\Accommodation;
use Illuminate\Support\Arr;

use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Search\SearchApi;
use Cloudinary\Api\Admin\AdminApi;
use Cloudinary\Api\Upload\UploadApi;

class AccommodationController extends Controller
{  
    public function index()
    {
        $accommodation = Accommodation::all();
        return response()->json($accommodation); 
    }   

    public function sortIndex()
    {
    $accommodations = Accommodation::orderBy('created_at', 'desc')->paginate(10);
    return response()->json($accommodations);
    }
        
    public function store(StoreAccommodationRequest $request)
    {
        $accommodation = new Accommodation([
            'room_name' => $request->input('room_name'),
            'type' => $request->input('type'),
            'capacity' => $request->input('capacity'),
            'description' => $request->input('description'),
            'web_description' => $request->input('web_description'),
            'feature' => $request->input('feature'),
            'price' => $request->input('price'),
            'status' => $request->input('status'),
            'booking_image' => $request->input('booking_image'),
        ]);
        // Initialize web_images as an empty array
    $webImages = [];
    
    // Check if web_images are present and if it's a string, split it into an array
    if ($request->has('web_images')) {
        $images = $request->input('web_images');
        if (is_string($images)) {
            // Split the string into an array   
            $webImages = explode(',', $images);
        } elseif (is_array($images)) {
            $webImages = $images;
        }
    }

    // Serialize the array of web_images
    $accommodation->web_images = serialize($webImages);
        $accommodation->accommodation_id = rand(1000, 9999);  

        $accommodation->save();
        return response()->json('Accommodation created!');
    }

    public function show($accommodation_id)
{
        $contact = Accommodation::find($accommodation_id);
        $accommodation->web_images = unserialize($accommodation->web_images);
        return response()->json($contact);
    }

 public function findByRoomName($room_name)
{
    $accom = Accommodation::where('room_name', $room_name)->first();
    return response()->json($accom);
}
public function findById($accommodation_id)
{
    $accommodation = Accommodation::find($accommodation_id);
    return response()->json($accommodation);
}

    
    public function update(UpdateAccommodationRequest $request, $accommodation_id)
    {
        $accommodation = Accommodation::find($accommodation_id);
        $requestData = $request->all();
    
        // Update regular fields
        $accommodation->update(Arr::except($requestData, 'web_images'));
    
        // Update web_images field
        if ($request->has('web_images')) {
            $webImages = $request->input('web_images');
            $accommodation->web_images = serialize($webImages);
            $accommodation->save();
        }
    
        return response()->json('Accommodation updated');
    }
    public function destroy($accommodation_id)
    {
        $accommodation = Accommodation::find($accommodation_id);
        $accommodation->delete();
        return response()->json(' deleted!');
    }

    public function deleteCloudinaryImage(Request $request) {
        $publicIds = $request->input('publicId');
        Configuration::instance('cloudinary://337975936264878:kvNRRVn_Gee-Ne9qpSESY_Kk5UQ@di0nkj5kz?secure=true');
        $cloudinaryConfig = [
            'cloud_name' => 'di0nkj5kz',
            'api_key' => '337975936264878',
            'api_secret' => 'kvNRRVn_Gee-Ne9qpSESY_Kk5UQ',
            'secure'=>true,
        ];
        
        foreach ($publicIds as $publicId) {
            $public_id = 'sirmata_accommodations/' . $publicId;
            $result = (new AdminApi())->deleteAssets($public_id, ["resource_type" => "image", "type" => "upload"]);
        }
        
        return response()->json(['message' => 'Images have been deleted'], 200);
    }
    
}