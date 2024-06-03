<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateAccommodationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'room_name' => 'required|string|max:55',
            'type' => 'required|string|max:55',
            'capacity' => [
                'required',
                'string',
                'max:55',
                'regex:/^[\d-]+$/',
            ],
            'description' => 'required|string|max:500',
            'web_description'=>'required|string|max:2000',
            'feature' => 'required|string|max:1000',
            'price' => [
                'required',
                'string',
                'regex:/^[\d,.]+$/',
            ],
            'status' => 'required|string|max:55',
            'web_images' => 'nullable|max:10000',
            'booking_image' => 'nullable|url|max:1000',
          
        ];
    }
}
