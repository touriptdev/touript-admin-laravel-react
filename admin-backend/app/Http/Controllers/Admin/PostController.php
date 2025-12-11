<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str; 


class PostController extends Controller
{



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

        $data = $posts->getCollection()->transform(function ($post) {
            $post->cover_image_url = $post->cover_image
                ? asset('storage/' . $post->cover_image)
                : null;

            return $post;
        });

        return response()->json([
            'data' => $data,
            'meta' => [
                'total'     => $posts->total(),
                'page'      => $posts->currentPage(),
                'per_page'  => $posts->perPage(),
            ],
        ]);
    }



    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'slug'        => 'nullable|string|max:255',
            // 'status'      => 'nullable|string|max:50',
            'content'        => 'nullable|string',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        
        $slugBase = $data['slug'] ?? $data['title'];
        $data['slug'] = Str::slug($slugBase) . '-' . strtolower(Str::random(6));
        
        $userId = $request->user()->id ?? auth()->id();

        if (!$userId) {
            $userId = User::whereIn('role', ['admin', 'support'])->value('id');
        }

        if (!$userId) {
            abort(500, 'No admin/support user found to set as created_by');
        }

        $data['created_by'] = $userId; 

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


        public function update(Request $request, Post $post)
        {

            $validated = $request->validate([
                'title'       => 'sometimes|required|string|max:255',
                'slug'        => 'sometimes|required|string|max:255',
                'content'     => 'sometimes|nullable|string',
                'cover_image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            ]);


            if ($request->filled('slug')) {
                $validated['slug'] = Str::slug($request->slug) . '-' . strtolower(Str::random(6));
            }


            if ($request->hasFile('cover_image')) {
                $path = $request->file('cover_image')->store('cover_images', 'public');
                $validated['cover_image'] = $path;
            }


            $post->fill($validated);
            $post->save();


            $post->refresh(); 

            return response()->json([
                'message'          => 'Post updated successfully',
                'data'             => $post,
                'cover_image_url'  => $post->cover_image
                    ? asset('storage/' . $post->cover_image)
                    : null,
            ], 200);
        }    


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

    

    public function publicIndex()
    {
        $posts = Post::latest()->paginate(10);
        return response()->json($posts);
    }

    public function publicShow($id)
    {
        $post = Post::findOrFail($id);

        // Add cover_image_url
        $post->cover_image_url = $post->cover_image 
            ? asset('storage/' . $post->cover_image) 
            : null;

        return response()->json($post);
    }

}
