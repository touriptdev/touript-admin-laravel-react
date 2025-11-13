<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    // List posts
    public function index(Request $request)
    {
        $perPage = (int) $request->get('per_page', 25);
        $sort = $request->get('sort', 'created_at');
        $order = $request->get('order', 'DESC');

        $query = Post::query();

        if ($search = $request->get('q')) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
        }

        $posts = $query->orderBy($sort, $order)->paginate($perPage);

        return response()->json([
            'data' => $posts->items(),
            'meta' => [
                'total' => $posts->total(),
                'page' => $posts->currentPage(),
                'per_page' => $posts->perPage(),
            ],
        ]);
    }

    // Store post with optional cover image
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'slug'        => 'nullable|string|max:255',
            // 'status'      => 'nullable|string|max:50',
            'content'        => 'nullable|string',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if (empty($data['slug'])) {
            $data['slug'] = \Illuminate\Support\Str::slug($data['title']) . '-' . time();
        }

        if ($request->hasFile('cover_image') && $request->file('cover_image')->isValid()) {
            $data['cover_image'] = $request->file('cover_image')->store('cover_images', 'public');
        }

        $post = Post::create($data);

        return response()->json([
            'message' => 'Post created successfully',
            'data' => $post,
            'cover_image_url' => isset($data['cover_image']) ? asset('storage/' . $data['cover_image']) : null,
        ], 201);
    }

    // Update post
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'slug'        => 'nullable|string|max:255',
            'status'      => 'nullable|string|max:50',
            'body'        => 'nullable|string',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('cover_image') && $request->file('cover_image')->isValid()) {
            $data['cover_image'] = $request->file('cover_image')->store('cover_images', 'public');
        }

        $post->update($data);

        return response()->json([
            'message' => 'Post updated successfully',
            'data' => $post,
            'cover_image_url' => isset($data['cover_image']) ? asset('storage/' . $data['cover_image']) : null,
        ]);
    }

    // Show single post
    public function show($id)
    {
        $post = Post::findOrFail($id);
        return response()->json($post);
    }

    // Delete post
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(['id' => (int)$id, 'deleted' => true]);
    }
}
