<?php

namespace App\Http\Controllers;

use App\Http\Requests\BantuanRequest;
use App\Http\Resources\BantuanResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Nette\Utils\Random;

class BantuanController extends Controller
{
    function index(Request $req)
    {
        $builder = DB::table('sos_bantuan');

        if ($req->id_pemohon != null) {
            $builder = $builder->where('id_pemohon', $req->id_pemohon);
        }

        if ($req->id_pengirim != null) {
            $builder = $builder->where('id_pengirim', $req->id_pengirim);
        }

        if ($req->q != null) {
            $search = $req->q;
            $builder = $builder->where(function ($query) use ($search) {
                $query->where('alamat_lokasi', 'like', "%$search%")
                    ->orWhere('lokasi_tambahan', 'like', "%$search%")
                    ->orWhere('jenis_bantuan', 'like', "%$search")
                    ->orWhere('kebutuhan', 'like', "%$search%");
            });
        }

        $items = $builder->orderBy('timestamp', 'desc')->paginate($req->limit ?: 10);

        return BantuanResource::collection($items);
    }

    function show($id)
    {
        $item = DB::table('sos_bantuan')->where('id_bantuan', $id)->first();

        return new BantuanResource($item);
    }

    function store(BantuanRequest $req)
    {
        $data = $req->validated();
        $data['id_bantuan'] = "BN-" . Random::generate(5);

        DB::table('sos_bantuan')->insert($data);

        return true;
    }

    function update(BantuanRequest $req, $id)
    {
        $data = $req->validated();

        DB::table('sos_bantuan')->where('id_bantuan', $id)->update($data);

        return true;
    }

    function destroy($id)
    {
        DB::table('sos_bantuan')->where('id_bantuan', $id)->delete();

        return true;
    }
}
