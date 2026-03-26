<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json(Project::orderBy('order')->get());
    }

    public function show($id)
    {
        return response()->json(Project::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string',
            'description' => 'required|string',
            'tech_stack'  => 'required|array',
            'status'      => 'required|in:done,on_progress,planned',
            'github_url'  => 'nullable|url',
            'demo_url'    => 'nullable|url',
            'is_featured' => 'boolean',
            'order'       => 'integer',
        ]);

        $project = Project::create($data);
        return response()->json($project, 201);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        $project->update($request->all());
        return response()->json($project);
    }

    public function destroy($id)
    {
        Project::findOrFail($id)->delete();
        return response()->json(['message' => 'Project dihapus']);
    }
}