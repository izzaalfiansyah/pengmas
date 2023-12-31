<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BantuanController;
use App\Http\Controllers\KondisiAirController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\VerifyUser;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/csrf-token', function () {
    return csrf_token();
});

Route::prefix('/air')->group(function () {
    Route::get('/latest', [KondisiAirController::class, 'latest']);
});

Route::post('/login', [AuthController::class, 'login']);

// Route::middleware(VerifyUser::class)->group(function () {
Route::get('/logout', [AuthController::class, 'logout']);
Route::get('/profile', [AuthController::class, 'profile']);
Route::resource('/user', UserController::class);
Route::resource('/bantuan', BantuanController::class);

Route::prefix('/total')->group(function () {
    Route::get('/user', [UserController::class, 'total']);
});

// });
