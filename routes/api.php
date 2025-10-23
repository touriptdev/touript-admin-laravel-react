<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PageController;

// PUBLIC auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


// --- Protected (auth:sanctum) ---
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Admin-only
    Route::middleware('role:admin,support')->group(function () {
        Route::get('/admin/stats', function () {
            return [
                'users' => \App\Models\User::count(),
                'posts' => \App\Models\Post::count(),
                'events'=> \App\Models\Event::count(),
                'pages' => \App\Models\Page::count(),
            ];
        });

        // Posts
        Route::get('/admin/posts', [PostController::class,'adminIndex']);
        Route::post('/posts', [PostController::class,'store']);
        Route::put('/posts/{post}', [PostController::class,'update']);
        Route::delete('/posts/{post}', [PostController::class,'destroy']);

        // Events
        Route::get('/admin/events', [EventController::class,'adminIndex']);
        Route::post('/events', [EventController::class,'store']);
        Route::put('/events/{event}', [EventController::class,'update']);
        Route::delete('/events/{event}', [EventController::class,'destroy']);

        // Pages
        Route::put('/pages/{slug}', [PageController::class,'upsert']);

        // Upload
        Route::post('/upload', function(Illuminate\Http\Request $r){
            $r->validate(['image'=>'required|image|max:2048']);
            $path = $r->file('image')->store('public/uploads');
            return ['url' => \Illuminate\Support\Facades\Storage::url($path)];
        });
    });
});

// --- Public reads ---
Route::get('/blog', [PostController::class,'index']);
Route::get('/blog/{slug}', [PostController::class,'show']);
Route::get('/events', [EventController::class,'index']);
Route::get('/events/{slug}', [EventController::class,'show']);
Route::get('/pages/{slug}', [PageController::class,'show']);
