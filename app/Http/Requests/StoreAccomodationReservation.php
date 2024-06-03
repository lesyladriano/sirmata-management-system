<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAccomodationReservation extends FormRequest
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
            'guest_id' => 'required|integer',
            'accommodation_id' => 'integer',
            'payment_id' => 'nullable|integer',
            'special_requests' => 'nullable|string',
            'check_in_date' => 'required|string',
            'check_out_date' => 'required|string',
            'arrival_time' => 'required|string',
            'status' => 'required|string',
            'total_nights' => 'required|integer',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
}
