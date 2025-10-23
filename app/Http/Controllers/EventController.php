<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        return Event::published()
            ->orderBy('start_at', 'asc')
            ->paginate(10);
    }

    public function show($slug)
    {
        return Event::where('slug', $slug)->firstOrFail();
    }

    public function adminIndex()
    {
        return Event::latest()->paginate(20);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'         => 'required',
            'slug'          => 'required|unique:events',
            'description'   => 'required',
            'location'      => 'nullable',
            'start_at'      => 'required|date',
            'end_at'        => 'nullable|date',
            'banner_image'  => 'nullable',
            'published_at'  => 'nullable|date',
        ]);

        $data['created_by'] = $request->user()->id;

        $event = Event::create($data);

        return response()->json($event, 201);
    }

    public function update(Request $request, Event $event)
    {
        $this->authorizeOwner($request, $event);

        $data = $request->validate([
            'title'         => 'sometimes',
            'slug'          => "sometimes|unique:events,slug,{$event->id}",
            'description'   => 'sometimes',
            'location'      => 'nullable',
            'start_at'      => 'sometimes|date',
            'end_at'        => 'nullable|date',
            'banner_image'  => 'nullable',
            'published_at'  => 'nullable|date',
        ]);

        $event->update($data);

        return $event;
    }

    public function destroy(Request $request, Event $event)
    {
        $this->authorizeOwner($request, $event);
        $event->delete();

        return ['ok' => true];
    }

    private function authorizeOwner(Request $request, Event $event)
    {
        $user = $request->user();

        if (
            !in_array($user->role, ['admin', 'support']) &&
            $event->created_by !== $user->id
        ) {
            abort(403, 'Unauthorized action.');
        }
    }
}
