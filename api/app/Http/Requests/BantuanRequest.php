<?php

namespace App\Http\Requests;

class BantuanRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'longitude' => 'required|float',
            'latitude' => 'required|float',
            'alamat_lokasi' => 'required|max:250',
            'lokasi_tambahan' => 'required|max:200',
            'jenis_bantuan' => 'required|max:10',
            'kebutuhan' => 'required|max:250',
            'id_pemohon' => 'required',
            'id_pengirim' => 'required',
            'status' => 'required|in:pending,diterima',
        ];
    }
}
