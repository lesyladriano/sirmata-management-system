<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreGuestRequest;
use App\Http\Requests\UpdateGuestRequest;
use Illuminate\Http\Request;
use App\Models\Guest;

class GuestContoller extends Controller
{  
    public function index()
    {
        $guests = Guest::all();
        return response()->json($guests); 
    }   
    public function store(StoreGuestRequest $request)
    {
        $guests = new Guest([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'guest_email' => $request->input('guest_email'),
            'party_size' => $request->input('party_size'),
            'contact_number' => $request->input('contact_number'),
            'address' => $request->input('address'),
          
        ]);
        $guests->guest_id = rand(1000, 9999);    
       $guests->save();
    
    return response()->json([
        'message' => 'Guest Added',
        'guest_id' => $guests->guest_id, 
    ]);
    }
    public function show($guest_id)
    {
        $contact = Guest::find($guest_id);
        return response()->json($contact);
    }
    public function update(UpdateGuestRequest $request, $guest_id)
    {
       $guests = Guest::find($guest_id);
       $guests->update($request->all());
       return response()->json('Guest updated');
    }
    public function destroy($guest_id)
    {
        $guests = Guest::find($guest_id);
        $guests->delete();
        return response()->json(' Deleted!');
    }
}