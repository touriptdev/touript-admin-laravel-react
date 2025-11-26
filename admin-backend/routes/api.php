<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\UserController;
// use App\Http\Controllers\Admin\PostResource;

Route::prefix('admin')->group(function () {
    //login
    Route::post('/login', [AuthController::class, 'login']);

    // PUBLIC ROUTES MUST COME FIRST
    Route::get('posts/user-end', [PostController::class, 'publicIndex']);
    Route::get('posts/public/{id}', [PostController::class, 'publicShow']);

    // ADMIN ROUTES
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
