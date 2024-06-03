<?php

use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\VerifyEmailController;
use App\Http\Controllers\PasswordResetPageController;
use App\Http\Controllers\PaymentControllerCheckOut;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VerifyGuestEmail;


Route::get('/send-email', [MailController::class, 'sendEmail']);
Route::get('/send-email/{token}', [EmailVerificationController::class, 'emailVerification'])->name('/send-email');
Route::get('/email-verified', [EmailVerificationController::class, 'emailVerified'])->name('email-verified');


Route::get('/password-reset', [PasswordResetController::class, 'resetPassword']);
Route::get('/password-reset/{userId}/{verificationToken}', [PasswordResetPageController::class, 'passwordResetPage'])->name('/password-reset');
Route::get('/password-reset-failed', [PasswordResetController::class, 'resetPasswordFailed'])->name('/password-reset-failed');
Route::post('/password-reset-update', [PasswordResetPageController::class, 'passwordResetUpdate'])
    ->name('password-reset-update')
    ->middleware('csrf:set');


Route::get('/send-email-guest-token', [VerifyGuestEmail::class, 'sendTokenToGuestEmail']);


Route::match(['get', 'post'], '/expire-checkout-session', [PaymentControllerCheckOut::class, 'expireCheckoutSession']);
Route::get('pay', [PaymentControllerCheckOut::class, 'pay']);
Route::get('payment_intent', [PaymentControllerCheckOut::class, 'payment_intent']);
Route::get('payment_method', [PaymentControllerCheckOut::class, 'payment_method']);
Route::get('attach', [PaymentControllerCheckOut::class, 'attach_intent_method_payment']);

Route::get('payment_list', [PaymentControllerCheckOut::class, 'payment_list']);

Route::get('payment_status', [PaymentControllerCheckOut::class, 'payment_status'])->name('payment_status');

Route::get('cancelled', [PaymentControllerCheckOut::class, 'cancelled'])->name('cancelled');


Route::get('send-offline-email', [PaymentControllerCheckOut::class, 'OfflinePaymentSendInvoice']);


Route::get('/blade', [YourController::class, 'viewBladeTemplate']);
