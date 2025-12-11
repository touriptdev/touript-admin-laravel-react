<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\PressController;
use App\Http\Controllers\Admin\UserController;
// use App\Http\Controllers\Admin\PostResource;

Route::get('/ping', function () {
    return response()->json(['message' => 'pong from Laravel'], 200);
});

Route::prefix('admin')->group(function () {
    //login
    Route::post('/login', [AuthController::class, 'login']);

    // PUBLIC ROUTES MUST COME FIRST
    Route::get('posts/user-end', [PostController::class, 'publicIndex']);
    Route::get('posts/public/{id}', [PostController::class, 'publicShow']);
    Route::get('presses/user-end', [PressController::class, 'publicIndex']);
    Route::get('presses/public/{id}', [PressController::class, 'publicShow']);


    Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

    // ADMIN ROUTES
    Route::get('posts', [PostController::class, 'index']);
    Route::post('posts', [PostController::class, 'store']);
    Route::get('posts/{post}', [PostController::class, 'show']);
    Route::post('posts/{post}', [PostController::class, 'update']);
    Route::match(['put', 'patch'], 'posts/{post}', [PostController::class, 'update']);
    Route::delete('posts/{post}', [PostController::class, 'destroy']);

    Route::get('presses', [PressController::class, 'index']);           // list
    Route::post('presses', [PressController::class, 'store']);          // create
    Route::get('presses/{press}', [PressController::class, 'show']);     // show
    Route::post('presses/{press}', [PressController::class, 'update']);
    Route::match(['put', 'patch'], 'presses/{press}', [PressController::class, 'update']); // update
    Route::delete('presses/{press}', [PressController::class, 'destroy']);                // delete
  
    // USERS (optional)
    Route::get('users', [UserController::class, 'index']);
    Route::post('users', [UserController::class, 'store']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::match(['put', 'patch'], 'users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);
});
