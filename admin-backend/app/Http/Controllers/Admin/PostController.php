<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Str; // make sure this is at the top

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
            'message' => 'Postcd  created successfully',
            'data' => $post,
            'cover_image_url' => isset($data['cover_image']) ? asset('storage/' . $data['cover_image']) : null,
        ], 201);
    }

        // Update Post
        public function update(Request $request, Post $post)
        {
            // "sometimes" = only validate if the field is present
            $validated = $request->validate([
                'title'       => 'sometimes|required|string|max:255',
                'slug'        => 'sometimes|required|string|max:255',
                'content'     => 'sometimes|nullable|string',
                'cover_image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            ]);

            // If a new cover_image file is sent, handle upload
            if ($request->hasFile('cover_image')) {
                $path = $request->file('cover_image')->store('images', 'public');
                $validated['cover_image'] = $path;
            }

            // Only update the fields that were provided
            $post->fill($validated);
            $post->save();

            // Make sure we include the URL for the frontend
            $post->refresh(); // reload with accessors/appends

            return response()->json([
                'message'          => 'Post updated successfully',
                'data'             => $post,
                'cover_image_url'  => $post->cover_image
                    ? asset('storage/' . $post->cover_image)
                    : null,
            ], 200);
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
