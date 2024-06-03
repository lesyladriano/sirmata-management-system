<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\AccommodationReservation;
use App\Models\Payments;

use App\Http\Requests\StoreAccomodationReservation;
use App\Http\Requests\UpdateAccommodationReservation;
class AccommodationReservationController extends Controller
{  
    public function index()
    {
        $reservations = AccommodationReservation::orderBy('created_at', 'desc')->get();
        return response()->json($reservations); 
    }   

    public function filteredFailed()
    {
        $failedPayments = Payments::where('payment_status', 'failed')->pluck('reservation_id')->toArray();
        $reservations = AccommodationReservation::whereNotIn('reservation_id', $failedPayments)->get();
    
        return response()->json($reservations);
        
    }
    
    public function is_date_overlapping(Request $request)
{
    $check_in_date = $request->input('check_in_date');
    $check_out_date = $request->input('check_out_date');
    $accommodation_id = $request->input('accommodation_id');

    $failedPayments = Payments::where('payment_status', 'failed')->pluck('reservation_id')->toArray();

    $reservations = AccommodationReservation::whereNotIn('reservation_id', $failedPayments)
        ->where('check_in_date', '<', $check_out_date)
        ->where('check_out_date', '>', $check_in_date)
        ->where('accommodation_id', '=', $accommodation_id)
        ->get();

      

    // Check if there are overlapping reservations
    if ($reservations->isNotEmpty()) {
        return  response()->json([
            'errors' => 'Overlap',
            'Overlap'=>$reservations
            
        ]);
    } else {
        return response()->json([
            'message' => 'No overlap!',
        ]);
    }
}

    
    

    public function sortIndex(Request $request)
    {
        $perPage = 10; 
        $sortBy = $request->input('sortBy', 'created_at');
        $sortOrder = $request->input('sortOrder', 'desc');
        $reservations = AccommodationReservation::orderBy($sortBy, $sortOrder)
            ->paginate($perPage);
    
        return response()->json($reservations);
    }

    public function store(StoreAccomodationReservation $request)
    {
        $reservations = new AccommodationReservation([
            'guest_id' => $request->input('guest_id'),
            'accommodation_id' => $request->input('accommodation_id'),
            'payment_id'=>$request->input('payment_id'),
            'special_requests' => $request->input('special_requests'),
            'check_in_date' => $request->input('check_in_date'),
            'check_out_date' => $request->input('check_out_date'),
            'arrival_time' => $request->input('arrival_time'),
            'total_nights' => $request->input('total_nights'),
            'status' => $request->input('status'),
        ]);
        
        $reservations->reservation_id = rand(1000, 9999);
        $reservations->save();
        
        // Return the generated reservation_id in the response
        return response()->json([
            'message' => 'Accommodation Reservation created!',
            'reservation_id' => $reservations->reservation_id,
        ]);
    }
    
    public function show($reservation_id)
    {
        $contact = AccommodationReservation::find($reservation_id);
        return response()->json($contact);
    }
   public function isReservationPaid($reservation_id)
{
    $reservation = AccommodationReservation::find($reservation_id);
    if (!$reservation) {
        return response()->json(['error' => 'Reservation not found']);
    }

    $payment_id = $reservation->payment_id; 
    $payment =  Payments::find($payment_id);
    $payment_status = $payment->payment_status; 

    if($payment_status!='paid'){
        return response()->json(['error' => 'Payment is not completed']);
    }

    return response()->json(['message' => "is paid"]);
}

    
    public function update(UpdateAccommodationReservation $request, $reservation_id)
    {
       $reservations = AccommodationReservation::find($reservation_id);
       $reservations->update($request->all());
       return response()->json('Accommodation Reservation updated');
    }
    public function destroy($reservation_id)
    {
        $reservations = AccommodationReservation::find($reservation_id);
        $reservations->delete();
        return response()->json(' Accommodation Reservation Deleted!');
    }

    public function cancelled_reservation($reservation_id)
    {
        $reservation = AccommodationReservation::find($reservation_id);
    
        if (!$reservation) {
            return response()->json(['error' => 'Reservation not found'], 404);
        }
    
        $payment_id = $reservation->payment_id;
    
        $payment = Payments::find($payment_id);
    
        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }
        $payment->update(['payment_status' => 'failed']);
        return $payment;
    }
    
}