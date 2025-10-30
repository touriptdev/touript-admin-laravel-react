<?php
/*
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller {

    public function index()
    {
        return Post::published()->latest('published_at')->paginate(10);
    }
    public function show($slug)
    {
        return Post::where('slug',$slug)->firstOrFail();
    }

    public function adminIndex()
    {
        return Post::latest()->paginate(20);
    }

    public function store(Request $r)
    {
        $data = $r->validate([
        'title'=>'required','slug'=>'required|unique:posts','content'=>'required','cover_image'=>'nullable','published_at'=>'nullable|date'
        ]);
        $data['created_by'] = $r->user()->id;
        $post = Post::create($data);
        return response()->json($post,201);
    }

    public function update(Request $r, Post $post)
    {
        $this->authorizeOwner($r,$post);
        $data = $r->validate([
        'title'=>'Update Data','slug'=>"update-data|unique:posts,slug,$post->id",'content'=>'Updated Data','cover_image'=>'nullable','published_at'=>'nullable|date'
        ]);
        $post->update($data); return $post;
    }

    public function destroy(Request $r, Post $post)
    {
        $this->authorizeOwner($r,$post); $post->delete(); return ['ok'=>true];
    }

    private function authorizeOwner(Request $r, Post $post)
    {
        $u=$r->user();

        if(!in_array($u->role,['admin','support']) && $post->created_by !== $u->id)
        {
            abort(403);
        }
    }
}
*/


// app/Http/Controllers/Admin/PostController.php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int)($request->get('per_page', 25));
        $sort = $request->get('sort', 'created_at');
        $order = $request->get('order', 'DESC');

        $queryCall = Post::query();

        // optional filters from RA
        if ($search = $request->get('q')) {
            $queryCall->where(function ($word) use ($search) {
                $word->where('title', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
            });
        }
        // You can map more filters here...

        $queryCall->orderBy($sort, $order);
        $postCall = $queryCall->paginate($perPage);

        return response()->json([
            'data' => $postCall->items(),
            'meta' => [
                'total' => $postCall->total(),
                'page' => $postCall->currentPage(),
                'per_page' => $postCall->perPage(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'slug' => 'nullable|string',
            'status' => 'nullable|string',
            'body' => 'nullable|string',
        ]);

        $post = Post::create($data);
        return response()->json($post);
    }

    public function show($id)
    {
        $post = Post::findOrFail($id);
        return response()->json($post);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->fill($request->all())->save();
        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(['id' => (int)$id]);
    }
}
