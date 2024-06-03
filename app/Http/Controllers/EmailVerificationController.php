<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class EmailVerificationController extends Controller
{
    public function emailVerification($token)
    {
        $user = User::where('verification_token', $token)->first();


        
        if ($user) {
            $user->update([
                'email_verified_at' => now(),
                'verification_token' => null,
            ]);
        }

        return redirect()->route('email-verified'); 
    }
    
    public function emailVerified(Request $request)
    {
        return view('YourEmailHasBeenVerified'); 
    }

   

}
