<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $req) {
        $data = $req->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $data['email'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 422);
        }

        $token = $user->createToken('admin')->plainTextToken; // requires HasApiTokens + personal_access_tokens table
        return ['token' => $token, 'user' => $user];
    }

    public function me(Request $r) { return $r->user(); }
    public function logout(Request $r) { $r->user()->currentAccessToken()->delete(); return ['ok'=>true]; }
}
/*

// app/Http/Controllers/Admin/AuthController.php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $user = User::where(
            'email', $request->email
            )->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
        if ($user->role !== 'admin') { // or your own check/policy
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        // Sanctum personal token with ability "admin"
        $token = $user->createToken('admin-token', [
            'admin'
            ])->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function me(Request $request)
    {
        $u = $request->user();
        return response()->json([
            'id' => $u->id,
            'name' => $u->name,
            'email' => $u->email,
            'avatar_url' => null,
            'role' => $u->role,
        ]);
    }
}
*/
