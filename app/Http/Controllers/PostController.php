<?php

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
