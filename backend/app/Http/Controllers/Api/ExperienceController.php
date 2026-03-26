<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        return response()->json(Experience::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'company'    => 'required|string',
            'role'       => 'required|string',
            'description'=> 'nullable|string',
            'tags'       => 'nullable|array',
            'start_date' => 'required|string',
            'end_date'   => 'nullable|string',
            'status'     => 'required|in:active,done,upcoming',
            'type'       => 'required|in:work,organization',
        ]);

        $experience = Experience::create($data);
        return response()->json($experience, 201);
    }

    public function update(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);
        $experience->update($request->all());
        return response()->json($experience);
    }

    public function destroy($id)
    {
        Experience::findOrFail($id)->delete();
        return response()->json(['message' => 'Experience dihapus']);
    }
}