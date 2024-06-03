<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class SessionController extends Controller
{
  public function logins(Request $request)
{
    $credentials = $request->only('email', 'password');
    
    if (Auth::attempt($credentials)) {
        // Authentication succeeded

        if (Auth::check()) {
            // User is properly authenticated
            return response()->json(['success' => true]);
        } else {
            // Authentication failed
            return response()->json(['success' => false]);
        }
    } else {
        // Authentication failed
        return response()->json(['success' => false]);
    }
}

    
    public function logout()
    {
        Auth::logout(); // Log the user out
        return redirect('/login'); // Redirect to the login page
    }
}
