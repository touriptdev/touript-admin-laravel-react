<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function show($slug)
    {
        return Page::where('slug', $slug)->firstOrFail();
    }

    public function upsert(Request $request, $slug)
    {
        $this->ensureAdmin($request);

        $data = $request->validate([
            'title'   => 'required',
            'content' => 'required',
        ]);

        $page = Page::updateOrCreate(
            ['slug' => $slug],
            $data + ['updated_by' => $request->user()->id]
        );

        return $page;
    }

    private function ensureAdmin(Request $request)
    {
        if (!in_array($request->user()->role, ['admin', 'support'])) {
            abort(403, 'Unauthorized action.');
        }
    }
}
