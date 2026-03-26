<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function index()
    {
        return response()->json(Education::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'institution' => 'required|string',
            'major'       => 'required|string',
            'start_year'  => 'required|string',
            'end_year'    => 'nullable|string',
            'accent'      => 'in:blue,pink',
        ]);

        $education = Education::create($data);
        return response()->json($education, 201);
    }

    public function update(Request $request, $id)
    {
        $education = Education::findOrFail($id);
        $education->update($request->all());
        return response()->json($education);
    }

    public function destroy($id)
    {
        Education::findOrFail($id)->delete();
        return response()->json(['message' => 'Education dihapus']);
    }
}