<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Press;
use App\Models\User;
use Illuminate\Support\Str; 


class PressController extends Controller
{

    public function index(Request $request)
    {
        $perPage = (int) $request->get('per_page', 25);
        $sort = $request->get('sort', 'created_at');
        $order = $request->get('order', 'DESC');

        $query = Press::query();

        if ($search = $request->get('q')) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
        }

        $presses = $query->orderBy($sort, $order)->paginate($perPage);

        return response()->json([
            'data' => $presses->items(),
            'meta' => [
                'total' => $presses->total(),
                'page' => $presses->currentPage(),
                'per_page' => $presses->perPage(),
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
        

        if ($request->hasFile('cover_image') && $request->file('cover_image')->isValid()) {
            $data['cover_image'] = $request->file('cover_image')->store('cover_images', 'public');
        }
        // $data['created_by'] = auth()->id() ?? 1;

        $userId = $request->user()->id ?? auth()->id();

        if (!$userId) {
            $userId = User::whereIn('role', ['admin', 'support'])->value('id');
        }

        if (!$userId) {
            abort(500, 'No admin/support user found to set as created_by');
        }

        $data['created_by'] = $userId;

        $presses = Press::create($data);

        return response()->json([
            'message' => 'Press  created successfully',
            'data' => $presses,
            'cover_image_url' => isset($data['cover_image']) ? asset('storage/' . $data['cover_image']) : null,
        ], 201);
    }


        // public function update(Request $request, Press $presses)
        // {

        //     $validated = $request->validate([
        //         'title'       => 'sometimes|required|string|max:255',
        //         'slug'        => 'sometimes|required|string|max:255',
        //         'content'     => 'sometimes|nullable|string',
        //         'cover_image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        //     ]);


        //     if ($request->filled('slug')) {
        //         $validated['slug'] = Str::slug($request->slug) . '-' . strtolower(Str::random(6));
        //     }


        //     if ($request->hasFile('cover_image')) {
        //         $path = $request->file('cover_image')->store('cover_image', 'public');
        //         $validated['cover_image'] = $path;
        //     }


        //     $presses->fill($validated);
        //     $presses->save();


        //     $presses->refresh(); 

        //     return response()->json([
        //         'message'          => 'Post updated successfully',
        //         'data'             => $presses,
        //         'cover_image_url'  => $presses->cover_image
        //             ? asset('storage/' . $presses->cover_image)
        //             : null,
        //     ], 200);
        // }    

        public function update(Request $request, Press $press)
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

    if ($request->hasFile('cover_image') && $request->file('cover_image')->isValid()) {
        // keep directory name consistent with store()
        $path = $request->file('cover_image')->store('cover_images', 'public');
        $validated['cover_image'] = $path;
    }

    $press->fill($validated);
    $press->save();

    $press->refresh();

    return response()->json([
        'message'          => 'Press updated successfully',
        'data'             => $press,
        'cover_image_url'  => $press->cover_image
            ? asset('storage/' . $press->cover_image)
            : null,
    ], 200);
}



    public function show($id)
    {
        $presses = Press::findOrFail($id);
        return response()->json($presses);
    }

    // Delete presses
    public function destroy($id)
    {
        $presses = Press::findOrFail($id);
        $presses->delete();
        return response()->json(['id' => (int)$id, 'deleted' => true]);
    }

    

    public function publicIndex()
    {
        $presses = Press::latest()->paginate(10);
        return response()->json($presses);
    }

    public function publicShow($id)
    {
        $presses = Press::findOrFail($id);

        // Add cover_image_url
        $presses->cover_image_url = $presses->cover_image 
            ? asset('storage/' . $presses->cover_image) 
            : null;

        return response()->json($presses);
    }

}
