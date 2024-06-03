<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWebInfoRequest extends FormRequest
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
            'official_email' => 'required|email',
            'website_name' => 'required|string',
            'tagline' => 'required|string',
            'location' => 'required|string',
            'contact_number' => ['required', 'string', 'regex:/^(09\d{2}\s?\d{3}\s?\d{4}(,\s*09\d{2}\s?\d{3}\s?\d{4})*)$/'],
            'weekday_opening_time' => 'required|string',
            'weekend_opening_time' => 'required|string',
            'facebook_link' => 'required|url',
            'tiktok_link' => 'required|url',
            'instagram_link' => 'required|url',
            'map_link' => 'required|url',
            'website_logo' => 'sometimes|url', 
        ];
    }
}
