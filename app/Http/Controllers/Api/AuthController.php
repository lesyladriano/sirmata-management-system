<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }
    
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (is_null($user->email_verified_at)) {
            return response()->json(['message' => 'Email not verified'], 403);
        }
        // Generate Token expite
        $tokenExpire = Carbon::now()->addMinutes(20);
        // $tokenExpire = Carbon::now()->addSeconds(20);
        // $tokenExpire = Carbon::now()->addDays(5);
        $token = $user->createToken('My App')->accessToken;
        $user->update([
            'refresh_token' => $token,
            'token_expire' => $tokenExpire,
        ]);
        $user->save();
        $response = response([
            'user' => $user,
            'token' => $token,
            'tokenExpire'=>$tokenExpire
        ]);
    
        return $response;
    }
    
    
    public function getAuthenticatedUser(Request $request)
    {
        try {
            $token = $request->bearerToken();
            
            // Log the token
            Log::info('Token received: ' . $token);
            $user = Auth::user();
    
            if ($user) {
                return response()->json(['user' => new UserResource($user)]);
            } else {
                // User is not authenticated
                return response()->json(['error' => 'Unauthenticated'], 401);
            }
        } catch (\Exception $e) {
            // Log the exception
            Log::error('Exception occurred in getAuthenticatedUser method: ' . $e->getMessage());
    
            // Return a generic error response
            return response()->json(['error' => 'An error occurred while retrieving user details'], 500);
        }
    }



    public function logout(Request $request)
    {
        // Retrieve the authenticated user
        $user = $request->user();
    
        // Revoke the user's access token
        $user->update([
            'refresh_token' => null,
            'token_expire' =>null,
        ]);
        $user->save();
        
        return response()->json(['message' => 'Successfully logged out']);
    }
}
