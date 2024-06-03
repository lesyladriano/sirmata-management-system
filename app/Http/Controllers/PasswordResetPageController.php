<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class PasswordResetPageController extends Controller
{   

    public function passwordResetUpdate(Request $request)
    {
        if ($request->isMethod('post')) {
            $userId = $request->input('userId');
            $password = $request->input('password');
            $verificationToken = $request->input('verificationToken');
            $passwordConfirmation = $request->input('password_confirmation');
    
            $user = User::find($userId);
    
            if ($user && $user->verification_token === $verificationToken) {
                // Hash the new password
                $hashedPassword = bcrypt($password);
    
                // Update the user's password
                $user->update(['password' => $hashedPassword]);
    
                // Nullify the verification token
                $user->update(['verification_token' => null]);
    
                // Your processing logic here
    
                return view('PasswordResetSuccess');
            } else {
                return view('PasswordResetFailed')->with('error', 'Token does not match. Please send another Reset Password request');
            }
        }
    
        // If the request method is GET, you can proceed with your original GET logic here
        return view('PasswordResetSuccess');
    }
    
    
    public function passwordResetPage(Request $request)
    {
        return view('PasswordResetPage'); 
    }
    public function resetPasswordFailed(Request $request)
    {
        return view('PasswordResetPage'); 
    }
}
