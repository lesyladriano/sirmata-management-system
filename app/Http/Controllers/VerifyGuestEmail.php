<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\GuestEmailVerificationTokenHandler;

class VerifyGuestEmail extends Controller
{
    public function sendTokenToGuestEmail(Request $request){
        $guestEmail = $request->query('email');
        $verificationToken = $request->query('verificationTokenEncoded');

        $verificationToken = base64_decode($verificationToken);

        Mail::to($guestEmail)->send(new GuestEmailVerificationTokenHandler($guestEmail, $verificationToken));
    }
}
