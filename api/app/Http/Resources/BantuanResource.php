<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class BantuanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_bantuan' => $this->id_bantuan,
            'longitude' => (float) $this->longitude,
            'latitude' => (float) $this->latitude,
            'alamat_lokasi' => $this->alamat_lokasi,
            'lokasi_tambahan' => $this->lokasi_tambahan,
            'jenis_bantuan' => $this->jenis_bantuan,
            'kebutuhan' => $this->kebutuhan,
            'timestamp' => $this->timestamp,
            'id_pemohon' => $this->id_pemohon,
            'pemohon' => DB::table('akun')->where('id_pengguna', $this->id_pemohon)->first(),
            'id_pengirim' => $this->id_pengirim,
            'pengirim' => DB::table('akun')->where('id_pengguna', $this->id_pengirim)->first(),
            'status' => strtolower($this->status),
        ];
    }
}
