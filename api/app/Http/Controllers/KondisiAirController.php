<?php

namespace App\Http\Controllers;

use App\Models\KondisiAir;
use Illuminate\Http\Request;

class KondisiAirController extends Controller
{
    function latest(Request $req)
    {
        $builder = new KondisiAir;

        if ($req->perangkat_id) {
            $builder = $builder->where('perangkat_id', $req->perangkat_id);
        }


        $item = $builder->orderBy('created_at', 'desc')->first();
        $status = random_int(1, 3);

        return [
            'id' => $item->id,
            'perangkat_id' => $item->perangkat_id,
            'waktu' => date('H:i:s', strtotime($item->created_at)),
            'ketinggian' => $item->ketinggian,
            'status' => $item->status,
            'status_detail' => [1 => 'aman', 'siaga', 'bahaya'][(int) $item->status],


            // 'waktu' => date('H:i:s'),
            // 'ketinggian' => random_int(0, 90),
            // 'status' => $status,
            // 'status_detail' => [1 => 'aman', 'siaga', 'bahaya'][(int) $status],
        ];
    }
}
