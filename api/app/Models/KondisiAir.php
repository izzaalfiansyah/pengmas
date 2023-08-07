<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KondisiAir extends Model
{
    use HasFactory;

    public $table = 'kondisi_air';

    public $fillable = [
        'perangkat_id',
        'ketinggian',
        'status',
    ];
}
