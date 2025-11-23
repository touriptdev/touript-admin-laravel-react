<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\UserController;

Route::prefix('admin')->group(function () {
    // Optional: login
    Route::post('/login', [AuthController::class, 'login']);

    // POST ROUTES: explicit methods, includes PATCH
    Route::get('posts', [PostController::class, 'index']);           // list
    Route::post('posts', [PostController::class, 'store']);          // create
    Route::get('posts/{post}', [PostController::class, 'show']);     // show
    Route::match(['put', 'patch'], 'posts/{post}', [PostController::class, 'update']); // update
    Route::delete('posts/{post}', [PostController::class, 'destroy']);                // delete

    // USERS (optional)
    Route::get('users', [UserController::class, 'index']);
    Route::post('users', [UserController::class, 'store']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::match(['put', 'patch'], 'users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);
});
