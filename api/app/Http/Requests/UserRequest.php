<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
{
    public function rules(): array
    {
        $user = $this->route('user');

        return [
            'nama' => 'required',
            'email' => ['required', 'email', $user ? Rule::unique('users')->ignore($user) : Rule::unique('users')],
            'password' => [Password::min(8), $user ? 'nullable' : 'required'],
            'telepon' => 'required|numeric',
            'alamat' => 'required',
            'role' => 'nullable|in:1,2,3',
            'status' => 'nullable|in:1,2,3',
        ];
    }
}
