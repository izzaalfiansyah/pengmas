<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;

class AuthController extends Controller
{
    // function login(AuthRequest $req)
    // {
    //     $data = $req->validated();

    //     $user = User::where('email', $req->email)->get();

    //     if (count($user) <= 0) {
    //         return Response::json([
    //             'email' => "username tidak ditemukan",
    //         ], 400);
    //     }

    //     foreach ($user as $key => $item) {
    //         if (Hash::check($req->password, $item->password)) {
    //             Auth::attempt($req->only(['email', 'password']), true);
    //             $user = Auth::user();

    //             return Response::json([
    //                 'success' => true,
    //                 'message' => "Berhasil Login",
    //                 'data' => $user->getRememberToken(),
    //             ]);
    //         }
    //     }

    //     return Response::json([
    //         'password' => 'password salah',
    //     ], 400);
    // }

    function login(AuthRequest $req)
    {
        $data = $req->validated();

        $user = DB::table('akun')->where('nama_lengkap', $req->nama_lengkap)->where('roles', 'admin')->get();

        if (count($user) <= 0) {
            return Response::json([
                'nama_lengkap' => "pengguna tidak ditemukan",
            ], 400);
        }

        foreach ($user as $key => $item) {
            if ($item->password == $req->password) {

                return Response::json([
                    'success' => true,
                    'message' => "Berhasil Login",
                    'data' => $item->id_pengguna,
                ]);
            }
        }

        return Response::json([
            'password' => 'password salah',
        ], 400);
    }

    // function logout()
    // {
    //     $user = User::find(Auth::id());

    //     $user->update(['remember_token' => null]);

    //     Auth::logout();

    //     return Response::json([
    //         'success' => true,
    //         'message' => "Berhasil logout",
    //     ]);
    // }

    function logout()
    {
        return Response::json([
            'success' => true,
            'message' => "Berhasil logout",
        ]);
    }

    // function profile(Request $req)
    // {
    //     try {
    //         $token = str_replace('Bearer ', '', $req->header('Authorization'));
    //         $user = User::where('remember_token', $token)->first();

    //         if ($user) {
    //             return new UserResource($user);
    //         }

    //         return [];
    //     } catch (\Exception $e) {
    //         return [];
    //     }
    // }

    function profile(Request $req)
    {
        try {
            $token = str_replace('Bearer ', '', $req->header('Authorization'));
            $user = DB::table('akun')->where('id_pengguna', $token)->first();

            if ($user) {
                return new UserResource($user);
            }

            return [];
        } catch (\Exception $e) {
            return [];
        }
    }
}
