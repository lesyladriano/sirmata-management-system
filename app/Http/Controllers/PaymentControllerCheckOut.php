<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Curl;
use App\Models\Payments;
use App\Models\Guest;
use App\Models\AccommodationReservation;
use Illuminate\Support\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Log;
use App\Mail\GuestInvoiceEmailHandler;
use App\Mail\OfflineEmailInvoiceHandler;
use Illuminate\Support\Facades\Mail;
class PaymentControllerCheckOut extends Controller

{
    

    
        public function payment_intent(Request $request)
        {
        
            $AUTH_PAY = config('app.AUTH_PAY');


            $client = new \GuzzleHttp\Client();
            $totalAmount = (int)$request->query('totalAmount');
            $roomName = $request->query('roomName');
            
            $guestEmail = $request->input('guestEmail'); 
            $firstName = $request->input('firstName'); 
            $lastName = $request->input('lastName');

            $formattedCheckInDate = $request->input('formattedCheckInDate'); 
            $formattedCheckOutDate = $request->input('formattedCheckOutDate');



            $response = $client->request('POST', 'https://api.paymongo.com/v1/payment_intents', [
                'body' => json_encode([
                    'data' => [
                        'attributes' => [
                            'amount' =>$totalAmount,
                            'description' => $roomName,
                            'payment_method_allowed' => ["card", "paymaya", "gcash", "grab_pay"],
                            'payment_method_options' => [
                                'card' => [
                                    'request_three_d_secure' => 'any'
                                ]
                            ],
                            'currency' => 'PHP',
                            'capture_type' => 'automatic'
                        ]
                    ]
                ]),
                'headers' => [
                    'accept' => 'application/json',
                    'authorization' => 'Basic c2tfbGl2ZV9iMUtVZGRtV3Zxd3ZhN3ZZWDZ5UDZYRDM6',
                    'content-type' => 'application/json',
                ],
            ]);

           
            
            // Get the response body as a string
            $responseBody = $response->getBody()->getContents();
        
            // Log the response (you can change 'payment_method_response' to any log channel you prefer)
            Log::channel('payment_method_response')->info($responseBody);
        
            $responseData = json_decode($responseBody, true);
        // Return the Payment Intent ID
        return [
            'payment_intent_id' => $responseData['data']['id'],
            'client_key' => $responseData['data']['attributes']['client_key'],
        ];
        }




    public function payment_method(Request $request)
    {   
        $AUTH_PAY = config('app.AUTH_PAY');
        $client = new \GuzzleHttp\Client();
        
        $response = $client->request('POST', 'https://api.paymongo.com/v1/payment_methods', [
            'body' => '{"data":{"attributes":{"type":"gcash"}}}',
            'headers' => [
                'content-type' => 'application/json',
                'accept' => 'application/json',
                'authorization' => 'Basic c2tfbGl2ZV9iMUtVZGRtV3Zxd3ZhN3ZZWDZ5UDZYRDM6',
            ],
        ]);
    
        // Get the response body as a string
        $responseBody = $response->getBody()->getContents();
    
        // Log the response (you can change 'payment_method_response' to any log channel you prefer)
        Log::channel('payment_method_response')->info($responseBody);
        $responseData = json_decode($responseBody, true);

        // Return the Payment Method ID
        return $responseData['data']['id'];

        
    }


public function attach_intent_method_payment(Request $request)
{       
    $AUTH_PAY = config('app.AUTH_PAY');

    
    $client = new \GuzzleHttp\Client();

    $totalAmount = (int)$request->query('totalAmount');

    $paymentIntentInfo = $this->payment_intent($request);
    $paymentMethodId = $this->payment_method($request);
    $paymentId = $request->input('paymentId'); 

    $guestEmail = $request->input('guestEmail'); 

    $firstName = $request->input('firstName'); 
    $lastName = $request->input('lastName'); 
    
    $formattedCheckInDate = $request->input('formattedCheckInDate'); 
    $formattedCheckOutDate = $request->input('formattedCheckOutDate');

    $roomName = $request->input('roomName'); 
    
    $firstPhoneNumber = $request->query('firstPhoneNumber');

    $paymentIntentId = $paymentIntentInfo['payment_intent_id'];
    $clientKey = $paymentIntentInfo['client_key'];


    $reservationId = $request->input('reservationId'); 
    $guestNumber = $request->input('guestNumber'); 
    $totalGuests = $request->input('totalGuests'); 
    $totalNights = $request->input('totalNights'); 
    

    $requestData = [
        'data' => [
            'attributes' => [
                
                'payment_method' => $paymentMethodId,
                'client_key' => $clientKey, // Include the client key

                'return_url' => 'https://api.sirmatafarm.com/payment_status?paymentId=' . $paymentId . '&paymentIntentId=' . $paymentIntentId . '&guestEmail=' . $guestEmail . '&firstName=' . $firstName  . '&lastName=' . $lastName .
                '&formattedCheckInDate=' . $formattedCheckInDate . '&formattedCheckOutDate=' . $formattedCheckOutDate . '&roomName=' . $roomName .  '&totalAmount=' . $totalAmount . '&reservationId=' . $reservationId .'&guestNumber=' . $guestNumber . '&totalGuests=' . $totalGuests . '&totalNights=' . $totalNights,

            ],
        ],
    ];

    $response = $client->request('POST', 'https://api.paymongo.com/v1/payment_intents/' . $paymentIntentId . '/attach', [
        'body' => json_encode($requestData),
        'headers' => [
            'accept' => 'application/json',
            'authorization' => 'Basic c2tfbGl2ZV9iMUtVZGRtV3Zxd3ZhN3ZZWDZ5UDZYRDM6',
            'content-type' => 'application/json',
            'amount'=>$totalAmount,
        ],
    ]);



        

    // Get the response body as a string
    $responseBody = $response->getBody()->getContents();
    
    // Decode the response body
    $responseData = json_decode($responseBody, true);

    // Extract the status from the response
    $status = $responseData['data']['attributes']['status'];
    
    // Extract the redirect URL for payment
    $redirectPayment = $responseData['data']['attributes']['next_action']['redirect']['url'];

    // Prepare the response data including the status and redirect URL
    $responseJson = [
        'response' => $responseData,
        'status' => $status,
        'redirectPayment' => $redirectPayment
    ];

    return response()->json($responseJson);
}




public function payment_status(Request $request)
{   
    $AUTH_PAY = config('app.AUTH_PAY');

    $paymentId = $request->query('paymentId');
    $paymentIntentId = $request->query('paymentIntentId');
    $roomName = $request->query('roomName');
    $guestEmail = $request->query('guestEmail');

 

    $firstName = $request->query('firstName');
    $lastName = $request->query('lastName');
    
    $roomName = $request->query('roomName');




    $reservationId = $request->query('reservationId');

    $guestNumber = $request->query('guestNumber');
    $totalGuests = $request->query('totalGuests');
    $totalNights = $request->query('totalNights');

    // SpecialRequest
    $specialRequest = $request->query('specialRequest');

    $firstPhoneNumber = $request->query('firstPhoneNumber');

    $formattedCheckInDate = $request->input('formattedCheckInDate'); 
    $formattedCheckOutDate = $request->input('formattedCheckOutDate');

    $client = new \GuzzleHttp\Client();

    // Retrieve the list of payments
    $listPayments = $client->request('GET', 'https://api.paymongo.com/v1/payments', [
        'headers' => [
            'accept' => 'application/json',
            'authorization' => 'Basic c2tfbGl2ZV9iMUtVZGRtV3Zxd3ZhN3ZZWDZ5UDZYRDM6',
        ],
    ]);

    // Convert the JSON response to an array
    $paymentsData = json_decode($listPayments->getBody(), true);

    // Filter payments with the specified paymentIntentId
    $filteredPayments = array_filter($paymentsData['data'], function ($payment) use ($paymentIntentId) {
        return $payment['attributes']['payment_intent_id'] === $paymentIntentId;
    });



    // Extract the "balance_transaction_id" from the first filtered payment (assuming there's only one)
    $paymongo_payment_id = null;
    if (!empty($filteredPayments)) {
        $firstFilteredPayment = reset($filteredPayments);
        $paymongo_payment_id = $firstFilteredPayment['id'];
    }

    $status = null;
    if (!empty($filteredPayments)) {
        $firstFilteredPayment = reset($filteredPayments);
        $status = $firstFilteredPayment['attributes']['status'];
    }

    $totalAmount = $request->query('totalAmount') / 100;

    
    if($filteredPayments){

            if ($status='paid'){
                $payment = Payments::where('payment_id', $paymentId)->first();
                if ($payment) {
                    $payment->update(['payment_status' => 'paid']);
                    $payment->update(['paymongo_payment_id' => $paymongo_payment_id]);
                }
                Mail::to($guestEmail)->send(new GuestInvoiceEmailHandler($guestEmail,$firstName,$lastName,$formattedCheckInDate,$formattedCheckOutDate,$roomName,$totalAmount,$firstPhoneNumber,$reservationId,$guestNumber,$totalGuests,$totalNights,$specialRequest));
                return view('TransactionSuccess');
            }

          


        }else{
                    $payment = Payments::where('payment_id', $paymentId)->first();
                    $guest = Guest::where('guest_id', $payment->guest_id)->first();
                    
                    // Delete the selected guest
                    if ($guest) {
                        $guest->delete();
                    }
                return view('TransactionCancelled');
        }



}


public function cancelled(Request $request){
    $AUTH_PAY = config('app.AUTH_PAY');
    dd($AUTH_PAY);
    
}


        

        
public function payment_list(Request $request)
{

    $AUTH_PAY = config('app.AUTH_PAY');
    
    $client = new \GuzzleHttp\Client();
    
    $response = $client->request('GET', 'http://api.paymongo.com/v1/payments', [
      'headers' => [
        'accept' => 'application/json',
        'authorization' => 'Basic c2tfbGl2ZV9iMUtVZGRtV3Zxd3ZhN3ZZWDZ5UDZYRDM6',
      ],
    ]);
    
    echo $response->getBody();
}
public function OfflinePaymentSendInvoice(Request $request)
{
    $guestEmail = $request->query('email');
    $firstName = $request->query('firstName');
    $lastName = $request->query('lastName');
    $roomName = $request->query('roomName');
    $totalAmount = $request->query('totalAmount');
    $formattedGuestCheckIn = $request->query('formattedGuestCheckIn');
    $formattedGuestCheckOut = $request->query('formattedGuestCheckOut');
    $firstPhoneNumber = $request->query('firstPhoneNumber');
    $reservationId = $request->query('reservationId');
    $guestNumber = $request->query('guestNumber');
    $totalGuests = $request->query('totalGuests');
    $totalNights = $request->query('totalNights');
    $specialRequest = $request->query('specialRequest');
    $checkInTime = $request->query('checkInTime');
    $discountValue = $request->query('discountValue');
    

    
    Mail::to($guestEmail)->send(new OfflineEmailInvoiceHandler($guestEmail,$firstName,$lastName,$roomName,$totalAmount,$formattedGuestCheckOut,$formattedGuestCheckIn,$firstPhoneNumber,$reservationId,$guestNumber,$totalGuests,$totalNights,$specialRequest,$checkInTime,$discountValue));
  
}



}

