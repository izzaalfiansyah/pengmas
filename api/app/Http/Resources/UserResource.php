<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return [
        //     'id' => $this->id,
        //     'nama' => $this->nama,
        //     'email' => $this->email,
        //     'telepon' => $this->telepon,
        //     'alamat' => $this->alamat,
        //     'role' => $this->role,
        //     'role_detail' => [1 => 'Admin', 'Petugas', 'Korban'][(int)$this->role],
        //     'status' => $this->status,
        //     'status_detail' => ['Pending', 'Terverifikasi', 'Ditolak'][(int)$this->status],
        // ];

        return [
            'id' => $this->id_pengguna,
            'nama' => $this->nama_lengkap,
            'telepon' => $this->telepon,
            'alamat' => $this->alamat,
            'roles' => $this->roles,
            'status' => $this->status,
        ];
    }
}
