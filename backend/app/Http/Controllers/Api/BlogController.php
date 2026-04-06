<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        return response()->json(Blog::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'     => 'required|string',
            'tag'       => 'required|string',
            'excerpt'   => 'required|string',
            'content'   => 'nullable|string',
            'read_time' => 'string',
            'status'    => 'in:draft,published',
        ]);
        return response()->json(Blog::create($data), 201);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);
        $blog->update($request->all());
        return response()->json($blog);
    }

    public function destroy($id)
    {
        Blog::findOrFail($id)->delete();
        return response()->json(['message' => 'Blog dihapus']);
    }

    public function show($id)
{
    return response()->json(Blog::findOrFail($id));
}
}