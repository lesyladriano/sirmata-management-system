<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(
            User::orderBy('created_at', 'desc')
        );
    }

    public function getAllUsers()
    {
        return UserResource::collection(
            User::orderBy('created_at', 'desc')->paginate(9)
        );
    }

    
    public function store(StoreUserRequest $request)
    {
        $verificationToken = Str::random(40);
    
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = new User($data);
        $user->id = $this->generateUniqueId();
        $user->verification_token = $verificationToken;
        $user->save();
    
        $user->email_verified_at = Carbon::now();
        $user->save();
    
        return response()->json(['user' => new UserResource($user), 'verification_token' => $verificationToken], 201);
    }
    
    
    private function generateUniqueId()
    {
        $id = rand(10000, 99999);
        while (User::where('id', $id)->exists()) {
            $id = rand(10000, 99999);
        }
        return $id;
    }
    

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if ($user->email !== $data['email']) {
            // Reset email_verified_at and verification_token
            $user->email_verified_at = null;
            $user->verification_token = null;
            // Generate a new verification token
            $user->email = $data['email'];
            $user->verification_token = Str::random(40);
        }
        $user->update($data);
        return response()->json([
            'user' => new UserResource($user),
            'verification_token' => $user->verification_token, // Include the verification token
        ]);
    }
    
  

    public function findOne($id)
{
    $user = User::find($id);
    if ($user) {
        return new UserResource($user);
    } else {
        return response()->json(['error' => 'User not found'], 404);
    }
}

    public function destroy(User $user)
    {
        $user->delete();
        return response("", 204);
    }
    
  
    

}
