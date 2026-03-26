<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        return response()->json(Testimonial::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string',
            'role'     => 'required|string',
            'initials' => 'required|string|max:3',
            'text'     => 'required|string',
        ]);
        return response()->json(Testimonial::create($data), 201);
    }

    public function update(Request $request, $id)
    {
        $t = Testimonial::findOrFail($id);
        $t->update($request->all());
        return response()->json($t);
    }

    public function destroy($id)
    {
        Testimonial::findOrFail($id)->delete();
        return response()->json(['message' => 'Testimoni dihapus']);
    }
}