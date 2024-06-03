<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGuestRequest extends FormRequest
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
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'guest_email' => 'required|email|max:100',
            'contact_number' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (!preg_match('/^(09|\+639)[0-9]{9}$/', $value)) {
                        $fail('The '.$attribute.' is invalid.');
                    }
                },
            ],
            'address' => 'required|string|max:225',
            'party_size' => 'required|integer|max:225',
           
        ];
    }
}
