<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAccommodationReservation extends FormRequest
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
            'guest_id' => 'integer',
            'accommodation_id' => 'integer',
            'payment_id' => 'nullable|integer',
            'special_requests' => 'nullable|string',
            'check_in_date' => 'string',
            'check_out_date' => 'string',
            'arrival_time' => 'string',
            'status' => 'string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
}
