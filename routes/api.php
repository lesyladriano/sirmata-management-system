 <?php

use App\Http\Controllers\AccommodationReservationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\CloudinaryImageController;
use App\Http\Controllers\MailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|

*/
Route::middleware('cors')->group(function () {

Route::get('/users-all', [UserController::class, 'getAllUsers']);
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::middleware(['auth:sanctum', EnsureFrontendRequestsAreStateful::class])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
Route::get('/does_email_exist', [App\Http\Controllers\UpdateUserController::class, 'checkEmailExists']);


Route::get('/users/{id}', [UserController::class, 'findOne']);
Route::get('/find/user/{id}', [App\Http\Controllers\UpdateUserController::class, 'where']);

    // ROUTE API
    Route::middleware(['auth:api'])->group(function () {
        Route::put('/users/{id}',[App\Http\Controllers\UpdateUserController::class, 'update']);
        Route::delete('/users/{id}',[App\Http\Controllers\UpdateUserController::class, 'destroy']);

        
        Route::apiResource('/users', UserController::class);
        Route::get('/auth/user', [AuthController::class, 'getAuthenticatedUser']);
        Route::post('/logout',[AuthController::class,'logout']);
        Route::post('/notify_change_password',[App\Http\Controllers\UpdateUserController::class, 'notify_change_password']);
        
        Route::put('/update/{accommodation_id}',[App\Http\Controllers\AccommodationController::class, 'update']);
        Route::post('/save',[App\Http\Controllers\AccommodationController::class, 'store']);
        Route::delete('/delete/{accommodation_id}',[App\Http\Controllers\AccommodationController::class, 'destroy']);

        Route::put('/reviews/update/{review_id}',[App\Http\Controllers\ReviewController::class, 'update']);
        Route::delete('/reviews/delete/{review_id}',[App\Http\Controllers\ReviewController::class, 'destroy']);

        Route::post('/web/save',[App\Http\Controllers\WebsiteInfoController::class, 'store']);
        Route::put('/web/update/{info_id}',[App\Http\Controllers\WebsiteInfoController::class, 'update']);
        Route::delete('/web/delete/{info_id}',[App\Http\Controllers\WebsiteInfoController::class, 'destroy']);


    });

  

   // Route::get('/reviews', [App\Http\Controllers\ReviewController::class, 'index'])->middleware('auth:sanctum');
   Route::post('/delete/cloudinary/',[App\Http\Controllers\AccommodationController::class, 'deleteCloudinaryImage']);

    Route::get('/reviews', [App\Http\Controllers\ReviewController::class, 'index']);


Route::get('/accommodation',[App\Http\Controllers\AccommodationController::class, 'index']);
Route::get('/accommodation/sort',[App\Http\Controllers\AccommodationController::class, 'sortIndex']);
Route::get('/accommodation/find/{room_name}',[App\Http\Controllers\AccommodationController::class, 'findByRoomName']);
Route::get('/accommodation/find/id/{accommodation_id}',[App\Http\Controllers\AccommodationController::class, 'findById']);

Route::get('/guests',[App\Http\Controllers\GuestContoller::class, 'index']);
Route::post('/guests/save',[App\Http\Controllers\GuestContoller::class, 'store']);
Route::put('/guests/update/{guest_id}',[App\Http\Controllers\GuestContoller::class, 'update']);
Route::delete('/guests/delete/{guest_id}',[App\Http\Controllers\GuestContoller::class, 'destroy']);

Route::get('/reservation',[App\Http\Controllers\AccommodationReservationController::class, 'index']);
Route::get('/reservation/sort',[App\Http\Controllers\AccommodationReservationController::class, 'sortIndex']);
Route::post('/reservation/save',[App\Http\Controllers\AccommodationReservationController::class, 'store']);
Route::get('/is_reservation_paid/{reservation_id}',[App\Http\Controllers\AccommodationReservationController::class, 'isReservationPaid']);
Route::put('/reservation/update/{reservation_id}',[App\Http\Controllers\AccommodationReservationController::class, 'update']);
Route::delete('/reservation/delete/{reservation_id}',[App\Http\Controllers\AccommodationReservationController::class, 'destroy']);
Route::get('/filter_failed',[App\Http\Controllers\AccommodationReservationController::class, 'filteredFailed']);
Route::get('/is_date_overlapping',[App\Http\Controllers\AccommodationReservationController::class, 'is_date_overlapping']);
Route::get('/cancelled_reservation/{reservation_id}',[App\Http\Controllers\AccommodationReservationController::class, 'cancelled_reservation']);


Route::get('/reviews/sort',[App\Http\Controllers\ReviewController::class, 'sortIndex']);
Route::post('/reviews/save',[App\Http\Controllers\ReviewController::class, 'store']);
Route::get('/reviews/search', [App\Http\Controllers\ReviewController::class, 'search']);


Route::get('/web',[App\Http\Controllers\WebsiteInfoController::class, 'index']);

Route::get('/payments/sort',[App\Http\Controllers\PaymentController::class, 'sortIndex']);
Route::post('/payments/save',[App\Http\Controllers\PaymentController::class, 'store']);
Route::put('/payments/update/{payment_id}',[App\Http\Controllers\PaymentController::class, 'update']);
Route::delete('/payments/delete/{payment_id}',[App\Http\Controllers\PaymentController::class, 'destroy']);
Route::get('/payments',[App\Http\Controllers\PaymentController::class, 'index']);

  
Route::get('/create_checkout',[App\Http\Controllers\PaymentController::class, 'create_checkout_session']);
Route::get('/retrieve_checkout',[App\Http\Controllers\PaymentController::class, 'retrieve_checkout']);
Route::post('/send_guest_invoice',[App\Http\Controllers\PaymentController::class, 'send_guest_invoice']);
Route::get('/payment_update_expire',[App\Http\Controllers\PaymentController::class, 'payment_update_expire']);


// Route::get('/update_payment_paymongo',[App\Http\Controllers\PaymentController::class, 'update_payment_paymongo']);
// Route::get('/get_webhooks',[App\Http\Controllers\PaymentController::class, 'get_webhooks']);
// Route::get('/disable',[App\Http\Controllers\PaymentController::class, 'disable_webhooks']);
// Route::get('/create_webhooks',[App\Http\Controllers\PaymentController::class, 'create_webhooks']);

// Route::post('/checkout_paid',[App\Http\Controllers\PaymentController::class, 'checkout_paid']);


});