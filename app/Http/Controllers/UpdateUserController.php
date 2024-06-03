<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreAccommodationRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserPasswordNotifyHandler;

class UpdateUserController extends Controller
{  
 
    public function update(UpdateUserRequest $request, $id)
{
    $user = User::find($id);
    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    $userData = $request->all();

    // Check if email is being updated and if so, mark email_verified_at as current time
    if (isset($userData['email'])) {
        $userData['email_verified_at'] = Carbon::now();
    }

    $user->update($userData);
    return response()->json('User updated');
}
  
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json(' User Delete!');
    }

    public function where($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        // Assuming the refresh token is stored in the user model's attributes
        $refreshToken = $user->refresh_token;
    
        // Include the refresh token in the response data
        return response()->json([
            'user' => new \App\Http\Resources\UserResource($user),
            'refresh_token' => $refreshToken,
        ]);
    }
    
    public function notify_change_password(Request $request)
    {   
        $changedUserId = $request->input('changedUserId');
        $loggedInUserId = $request->input('loggedInUserId');

        $changedUser = User::find($changedUserId);
        if (!$changedUser) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $loggedInUser = User::find($loggedInUserId);
        if (!$loggedInUser) {
            return response()->json(['error' => 'User not found'], 404);
        }


        $changedName =  $changedUser['first_name']. ' ' . $changedUser['last_name'];
        $email =  $changedUser['email'];
        $loggedName =  $loggedInUser['first_name']. ' ' . $loggedInUser['last_name'];

        // return [
        //     "change" => $changedName,
        //     "loggedName" => $loggedName,
        // ];
        

        Mail::to($email)->send(new UserPasswordNotifyHandler($changedName, $loggedName));

        return "Email Sent";
       
    }
    

    public function checkEmailExists(Request $request)
    {
        $email = $request->input('email');
    
        $user = User::where('email', $email)->first();
        
        
        if ($user) {
            return response()->json([
                'message' => 'Email already exists.',
                'user' => $user,
            ]);
        } else {
            return response()->json([
                'message' => 'Email does not exist. Continue.',
            ]);
        }
    }
    

}   