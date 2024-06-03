<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreAccommodationRequest extends FormRequest
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
        $imagesRule = ['nullable', 'max:100'];

        // Check if 'images' is an array (multiple URLs)
        if (is_array($this->input('images'))) {
            $imagesRule[] = 'array';
            foreach ($this->input('images') as $key => $value) {
                $imagesRule["images.{$key}"] = 'url|max:500';
            }
        } else {
            // Check if 'images' is a single URL
            $imagesRule[] = 'url';
        }
        
        return [
            'room_name' => 'required|string|max:55',
            'type' => 'required|string|max:1000',
            'capacity' => [
                'required',
                'string',
                'max:55',
                'regex:/^[\d-]+$/',
            ],
            'description' => 'required|string',
            'web_description'=>'required|string',
            'feature' => 'required|string|max:1000',
            'price' => [
                'required',
                'string',
                'regex:/^[\d,.]+$/',
            ],
            'status' => 'required|string|max:55',
            'banner_image' => 'nullable|url|max:1000',
            'booking_image' => 'nullable|url|max:1000',
            'web_images' => 'nullable|max:10000',
        ];
    }
}
