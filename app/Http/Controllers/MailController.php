<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SignUp;
use App\Mail\EmailVerify;
use App\Mail\VerificationEmailHandler;

class MailController extends Controller
{
    public function sendEmail(Request $request){
        $emailAddress = $request->query('email');
        $verificationToken = $request->query('verificationTokenEncoded');

        $verificationToken = base64_decode($verificationToken);
        Mail::to($emailAddress)->send(new VerificationEmailHandler($emailAddress, $verificationToken));
    }
}