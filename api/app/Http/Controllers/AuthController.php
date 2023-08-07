<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Nette\Utils\Random;

class AuthController extends Controller
{
    function login(AuthRequest $req)
    {
        $data = $req->validated();

        $user = User::where('email', $req->email)->get();

        if (count($user) <= 0) {
            return Response::json([
                'email' => "username tidak ditemukan",
            ], 400);
        }

        foreach ($user as $key => $item) {
            if (Hash::check($req->password, $item->password)) {
                Auth::attempt($req->only(['email', 'password']), true);
                $user = Auth::user();

                return Response::json([
                    'success' => true,
                    'message' => "Berhasil Login",
                    'data' => $user->getRememberToken(),
                ]);
            }
        }

        return Response::json([
            'password' => 'password salah',
        ], 400);
    }

    function logout()
    {
        $user = User::find(Auth::id());

        $user->update(['remember_token' => null]);

        Auth::logout();

        return Response::json([
            'success' => true,
            'message' => "Berhasil logout",
        ]);
    }

    function profile()
    {
        return new UserResource(Auth::user());
    }
}
