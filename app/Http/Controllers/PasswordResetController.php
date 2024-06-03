<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordResetHandler;
use Illuminate\Support\Str;
use App\Models\User;

class PasswordResetController extends Controller
{
    public function resetPassword(Request $request)
    {
        $emailAddress = $request->query('email');
        $userId = $request->query('userId');
    
        // Generate a verification token
        $verificationToken = Str::random(40);
    
        // Update the user's verification_token
        $user = User::find($userId);
        if ($user) {
            $user->verification_token = $verificationToken;
            $user->save();
        }
    
        Mail::to($emailAddress)->send(new PasswordResetHandler($emailAddress, $userId, $verificationToken)); 
    }
    
}
