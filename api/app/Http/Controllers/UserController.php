<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

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

        $data = $builder->paginate(10);

        return UserResource::collection($data);
    }

    function show($id)
    {
        $item = User::find($id);

        return new UserResource($item);
    }
}
