<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{   
    public static $wrap=false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $createdAt = $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null;
    
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'contact_number' => $this->contact_number,
            'account_type' => $this->account_type,
            'position' => $this->position,
            'created_at' => $createdAt,
            'profile_pic' => $this->profile_pic,
        ];
    }
    
}
