<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Payments;
use App\Models\AccommodationReservation;
use App\Models\Guest;
use App\Models\Accommodation;
use App\Models\WebsiteInfo;
use App\Mail\GuestInvoiceEmailHandler;
use Illuminate\Foundation\Exceptions\Exception;
use Illuminate\Support\Facades\Mail;
class PaymentController extends Controller
{  
    public function index()
    {
        $payments = Payments::all();
        return response()->json($payments); 
    }   
    
 

   

    public function store(Request $request)
    {
        $payment = new Payments([
            'reservation_id' => $request->input('reservation_id'),
            'guest_id' => $request->input('guest_id'),
            'payment_mode' => $request->input('payment_mode'),
            'reference_number' => $request->input('reference_number'),
            'total_amount' => $request->input('total_amount'),
            'payment_status' => $request->input('payment_status'),
            'checkout_session_id' => $request->input('checkout_session_id'),
            
        ]);
    
        $payment->payment_id = rand(1000, 9999);   
        $payment->created_at = now(); 
        $payment->payment_expire = now()->addMinutes(30); 
    
        $payment->save();
    
        return response()->json([
            'message' => 'Payment Added',
            'payment_id' => $payment->payment_id,
            'payment_expire' => $payment->payment_expire,
        ]);
    }
    

            
    public function sortIndex(Request $request)
    {
        $perPage = 10; 
    
        $sortBy = $request->input('sortBy', 'created_at');
        $sortOrder = $request->input('sortOrder', 'desc');
    
        $payment = Payments::orderBy($sortBy, $sortOrder)
            ->paginate($perPage);
    
        return response()->json($payment);
    }


    
    public function show($payment_id)
    {
        $contact = Employee::find($payment_id);
        return response()->json($contact);
    }
    public function update(Request $request, $payment_id)
    {
       $payments = Payments::find($payment_id);
       $payments->update($request->all());



       return response()->json('Payment updated');

    }
    public function destroy($payment_id)
    {
        $payments = Payments::find($payment_id);
        $payments->delete();
        return response()->json(' deleted!');
    }



    public function create_checkout_session(Request $request)
    {
        $client = new \GuzzleHttp\Client();
        $name = $request->input('name');
        $amount = (int) $request->input('amount') * 100;
        
        $reservation_id =$request->input('reservation_id');
        $guest_id =$request->input('guest_id');
        $payment_id =$request->input('payment_id');

        $response = $client->request('post', 'https://api.paymongo.com/v1/checkout_sessions', [
            'body' => json_encode([
                'data' => [
                    'attributes' => [
                        'send_email_receipt' => true,
                        'show_description' => true,
                        'show_line_items' => true,
                        'description' => 'Sirmata Farm Reservation',
                        'line_items' => [
                            [
                                'currency' => 'PHP',
                                'amount' => $amount,
                                'description' => $name,
                                'name' => $name,
                                'quantity' => 1,
                            ],  
                        ],
                        'payment_method_types' => [
                            "card",
                            "gcash",
                            "grab_pay",
                            "paymaya",
                            "qrph"
                        ],
                        'success_url' => env('FRONTEND_URL') . "/booking/success?reservation_id={$reservation_id}",
                    ],
                ],
            ]),
            'headers' => [
                'Content-Type' => 'application/json',
                'accept' => 'application/json',
                'authorization' => 'Basic c2tfbGl2ZV9iMUtVZGRtV3Zxd3ZhN3ZZWDZ5UDZYRDM6',
            ],
        ]);
    
        $body = $response->getBody()->getContents();
    
        $responseData = json_decode($body, true);
    
        if (isset($responseData['data'])) {
          
    
            return $responseData['data'];
        } else {
            return null;
        }
    }
    
public function update_payment_paymongo(Request $request)
{
    $client = new \GuzzleHttp\Client();
    $payment_intent_id = $request->input('payment_intent_id');
    $payments = Payments::find($payment_intent_id);
    
    $after = null; 
    $allPayments = [];

    do {
        $url = 'https://api.paymongo.com/v1/payments';
        if ($after !== null) {
            $url .= "?after=$after&limit=20";
        }

        $listResponse = $client->request('GET', $url, [
            'headers' => [
                'accept' => 'application/json',
                'authorization' => 'Basic c2tfbGl2ZV9iMUtVZGRtV3Zxd3ZhN3ZZWDZ5UDZYRDM6',
            ],
        ]);

        $listData = json_decode($listResponse->getBody()->getContents(), true);

        // Check if data is present
        if (isset($listData['data'])) {
            $allPayments = array_merge($allPayments, $listData['data']);

            $lastPayment = end($listData['data']);
            $after = isset($lastPayment['id']) ? $lastPayment['id'] : null;
        } else {
            break;
        }

    } while ($after !== null);

    // Check if the payment intent ID exists in the list of payments
    $matchingPayment = null;
    foreach ($allPayments as $payment) {
        if ($payment['attributes']['payment_intent_id'] === $payment_intent_id) {
            $matchingPayment = $payment;
            break; 
        }
    }

    if ($matchingPayment) {

        $updateStatus = $matchingPayment['attributes']['status']; 
        $updatePaymentMode =  $matchingPayment['attributes']['source']['type'];
        $payment = Payments::where('payment_intent_id', $payment_intent_id)->first();
        $payment->update(['payment_status' => $updateStatus,'payment_mode_online'=> $updatePaymentMode]);

    
        return   $matchingPayment; 
    }
    return  $matchingPayment;
}

public function send_guest_invoice(Request $request)
{
    $reservation_id =$request->input('reservation_id');
    $reservations= AccommodationReservation::where('reservation_id', $reservation_id)->first();

    if ($reservations == null) {
        return [
            'errors' => 'No matching reservations found.',
        ];
    }
    $guest_id =$reservations['guest_id'];
    $payment_id =$reservations['payment_id'];

    $guests = Guest::where('guest_id', $guest_id)->first();
    $firstName = $guests['first_name'];
    $lastName = $guests['last_name'];
    $guestEmail = $guests['guest_email'];
    $guestNumber = $guests['contact_number'];
    $totalGuests = $guests['party_size'];
    
 
    

    $reservations= AccommodationReservation::where('reservation_id', $reservation_id)->first();
    function formatDate($dateString)
    {
        // Check if $dateString is empty or null
        if (!empty($dateString)) {
            // Check if the date string is in the correct format
            if (preg_match('/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/', $dateString)) {
                $date = new \DateTime($dateString);
                return $date->format('F j, Y');
            } else {
                return 'Invalid Date Format';
            }
        } else {
            return 'Date String is Empty';
        }
    }
    $reservationId = $reservations['reservation_id'];
    $formattedCheckInDate =formatDate($reservations['check_in_date']);
    $formattedCheckOutDate=formatDate($reservations['check_out_date']);
    $specialRequest=$reservations['special_requests'];
    $totalNights=$reservations['total_nights'];
    $accommodation_id=$reservations['accommodation_id'];
    $accommodation= Accommodation::where('accommodation_id', $accommodation_id)->first();
    $roomName = $accommodation['room_name'];




    $payments= Payments::where('payment_id', $payment_id)->first();
    $mode =  $payments['payment_mode_online'];
    $capitalizedPaymentModeOnline = ucfirst($mode);
    $paymentModeOnline = $capitalizedPaymentModeOnline;
    $totalAmount = $payments['total_amount'];

    $web_info = WebsiteInfo::find(1);
    $contactNumber = $web_info['contact_number'];
    
    $phoneNumbers = explode(',', $contactNumber);
    $firstPhoneNumber = trim($phoneNumbers[0]);

    $status = $payments['payment_status'];
    $emailSent = $payments['email_sent'];

    if ($emailSent === 1) {
        return (object)[
            'errors' => 'Reservation has already been made. Now returning to home'
        ];
    }
    
    
    // Continue with the rest of your code here
    

    if ( $emailSent===0 && $status==="paid") {
        Mail::to($guestEmail)->send(new GuestInvoiceEmailHandler($guestEmail, $firstName, $lastName, $formattedCheckInDate, $formattedCheckOutDate, $roomName, $totalAmount, $firstPhoneNumber, $reservationId, $guestNumber, $totalGuests, $totalNights, $specialRequest, $paymentModeOnline));
        $payments->update(['email_sent' =>1]);
        return "Email Sent!";
    }

   return "Already sent";
}



// public function get_webhooks()
// {
//     $client = new \GuzzleHttp\Client();

//     $response = $client->request('GET', 'https://api.paymongo.com/v1/webhooks', [
//       'headers' => [
//         'accept' => 'application/json',
//         'authorization' => 'Basic c2tfbGl2ZV9iMUtVZGRtV3Zxd3ZhN3ZZWDZ5UDZYRDM6cGtfbGl2ZV9hTHpVVzdwd3pjVXd1SDlqQTJrZnVMTDc=',
//       ],
//     ]);
    
//     $body = $response->getBody()->getContents();

//     $responseData = json_decode($body, true);

//     if (isset($responseData['data'])) {
//         return $responseData['data'];
//     } else {
//         return null;
//     }
// }

public function payment_update_expire(Request $request)
{
    $client = new \GuzzleHttp\Client();
    $currentTime = now();
    $pendingPaymentIds = Payments::where('payment_status', 'Pending')->pluck('payment_intent_id')->toArray();

    $after = null; 
    $allPayments = [];

    do {
        $url = 'https://api.paymongo.com/v1/payments';
        if ($after !== null) {
            $url .= "?after=$after&limit=20";
        }

        $listResponse = $client->request('GET', $url, [
            'headers' => [
                'accept' => 'application/json',
                'authorization' => 'Basic c2tfbGl2ZV9iMUtVZGRtV3Zxd3ZhN3ZZWDZ5UDZYRDM6',
            ],
        ]);

        $listData = json_decode($listResponse->getBody()->getContents(), true);

        // Check if data is present
        if (isset($listData['data'])) {
            $allPayments = array_merge($allPayments, $listData['data']);

            $lastPayment = end($listData['data']);
            $after = isset($lastPayment['id']) ? $lastPayment['id'] : null;
        } else {
            break;
        }

    } while ($after !== null);

    // Check if the payment intent ID exists in the list of payments
    $matchingPayments = [];
    foreach ($allPayments as $payment) {
        if (in_array($payment['attributes']['payment_intent_id'], $pendingPaymentIds)) {
            $matchingPayments[] = $payment;
        }
    }
    $updatedPaid =[];
    if (!empty($matchingPayments)) {
        foreach ($matchingPayments as $matchingPayment) {
            $updateStatus = $matchingPayment['attributes']['status']; 
            $updatePaymentMode = $matchingPayment['attributes']['source']['type'];
            $payment = Payments::where('payment_intent_id', $matchingPayment['attributes']['payment_intent_id'])->first();

            if ($payment) {
                $payment->update(['payment_status' => $updateStatus, 'payment_mode_online' => $updatePaymentMode]);
                $updatedPaid[] = $payment;
            }
        }
    }

    // Expire Logic (Commented Out)
    $expiredPayments = Payments::where('payment_expire', '<=', $currentTime)->get();
    $updatedExpired =[];
    foreach ($expiredPayments as $payment) {
        $cs_id = $payment->checkout_session_id;
        if ($cs_id) {              
            if ($payment->payment_status === 'Pending') {
                $response = $client->request('POST', "https://api.paymongo.com/v1/checkout_sessions/{$cs_id}/expire", [
                    'headers' => [
                        'accept' => 'application/json',
                        'authorization' => 'Basic c2tfbGl2ZV9iMUtVZGRtV3Zxd3ZhN3ZZWDZ5UDZYRDM6',
                    ],
                ]);
            $payment->update(['payment_status' => 'failed']);
            $updatedExpired[] = $payment;
            }
        }
    }

    return [
        'messsage'=>"Payment data up to date.",
        'updatedPaid'=>$updatedPaid,
        'updatedExpired'=> $updatedExpired
    ];
}


// public function disable_webhooks(Request $request)
// {
//     $client = new \GuzzleHttp\Client();
//     $webhook_id = $request->input('webhook_id');
    
//     $response = $client->request('DELETE', 'https://api.paymongo.com/v1/webhooks/'.$webhook_id, [
//         'headers' => [
//             'accept' => 'application/json',
//             'authorization' => 'Basic c2tfbGl2ZV9iMUtVZGRtV3Zxd3ZhN3ZZWDZ5UDZYRDM6cGtfbGl2ZV9hTHpVVzdwd3pjVXd1SDlqQTJrZnVMTDc=',
//         ],
//     ]);
    
//     echo $response->getBody();
// }

// public function create_webhooks(Request $request)
// {
//     $client = new \GuzzleHttp\Client();
//     $url = 'http://localhost:8000/api/checkout_paid';
    
//     $body = json_encode([
//         'data' => [
//             'attributes' => [
//                 'events' => ['checkout_session.payment.paid'],
//                 'url' => $url,
//             ],
//         ],
//     ]);
    
//     $response = $client->request('POST', 'https://api.paymongo.com/v1/webhooks', [
//         'body' => $body,
//         'headers' => [
//             'accept' => 'application/json',
//             'authorization' => 'Basic c2tfbGl2ZV9iMUtVZGRtV3Zxd3ZhN3ZZWDZ5UDZYRDM6cGtfbGl2ZV9hTHpVVzdwd3pjVXd1SDlqQTJrZnVMTDc=',
//             'content-type' => 'application/json',
//         ],
//     ]);
    
//     echo $response->getBody();
    
// }
public function checkout_paid(Request $request)
{
    $payment = Payments::where('payment_id', 5044)->first();
    
    if ($payment) {
        $payment->update(['payment_mode' => 'urethra!']);
        return $payment;
    } else {
        return response()->json(['error' => 'Payment not found'], 404);
    }
}





// IT LIVE
}
