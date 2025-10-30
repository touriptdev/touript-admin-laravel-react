<?php

// app/Http/Controllers/Admin/UserController.php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int)($request->get('per_page', 25));
        $sort = $request->get('sort', 'created_at');
        $order = $request->get('order', 'DESC');

        $q = User::query();

        if ($search = $request->get('q')) {
            $q->where(function ($w) use ($search) {
                $w->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $q->orderBy($sort, $order);
        $p = $q->paginate($perPage);

        return response()->json([
            'data' => $p->items(),
            'meta' => [
                'total' => $p->total(),
                'page' => $p->currentPage(),
                'per_page' => $p->perPage(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'nullable|string',
        ]);

        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

        // do NOT return hashed password
        unset($user->password);
        return response()->json($user);
    }

    public function show($id)
    {
        $u = User::findOrFail($id);
        unset($u->password);
        return response()->json($u);
    }

    public function update(Request $request, $id)
    {
        $u = User::findOrFail($id);
        $payload = $request->all();

        if (!empty($payload['password'])) {
            $payload['password'] = Hash::make($payload['password']);
        } else {
            unset($payload['password']);
        }

        $u->fill($payload)->save();
        unset($u->password);
        return response()->json($u);
    }

    public function destroy($id)
    {
        $u = User::findOrFail($id);
        $u->delete();
        return response()->json(['id' => (int)$id]);
    }
}
