<?php

namespace App\Http\Requests;

class AuthRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        // return [
        //     'email' => 'required|email',
        //     'password' => 'required',
        // ];

        return [
            'nama_lengkap' => 'required',
            'password' => 'required',
        ];
    }
}
