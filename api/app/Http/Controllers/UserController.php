<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function index(Request $req)
    {
        $builder = new User();

        if ($req->role != null) {
            $builder = $builder->where('role', $req->role);
        }

        if ($req->status != null) {
            $builder = $builder->where('status', $req->status);
        }

        if ($req->q) {
            $search = $req->q;
            $builder = $builder->where(function ($query) use ($search) {
                return $query->where('nama', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%")
                    ->orWhere('telepon', 'like', "%$search%");
            });
        }

        $data = $builder->orderBy('created_at', 'desc')->paginate($req->limit ?: 10);

        return UserResource::collection($data);
    }

    function show($id)
    {
        $item = User::find($id);

        return new UserResource($item);
    }

    function store(UserRequest $req)
    {
        $data = $req->validated();
        $data['password'] = Hash::make($req->password);

        $item = User::create($data);

        return new UserResource($item);
    }

    function update(UserRequest $req, $id)
    {
        $item = User::find($id);
        $data = $req->validated();

        unset($data['password']);
        if ($req->password) {
            $data['password'] = Hash::make($req->password);
        }

        $item?->update($data);

        return new UserResource($item);
    }

    function destroy($id)
    {
        $item = User::find($id);
        $item?->delete();

        return new UserResource($item);
    }

    function total()
    {
        $total = User::count();
        $terverifikasi = User::where('status', '1')->count();
        $pending = User::where('status', '0')->count();
        $ditolak = User::where('status', '2')->count();

        return [
            'data' => [
                'total' => $total,
                'terverifikasi' => $terverifikasi,
                'pending' => $pending,
                'ditolak' => $ditolak,
            ]
        ];
    }
}
