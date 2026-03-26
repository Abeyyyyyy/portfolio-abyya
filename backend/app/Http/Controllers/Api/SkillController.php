<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        return response()->json(Skill::orderBy('order')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required|string',
            'category'   => 'required|string',
            'percentage' => 'required|integer|min:0|max:100',
            'icon'       => 'nullable|string',
            'order'      => 'integer',
        ]);

        $skill = Skill::create($data);
        return response()->json($skill, 201);
    }

    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);
        $skill->update($request->all());
        return response()->json($skill);
    }

    public function destroy($id)
    {
        Skill::findOrFail($id)->delete();
        return response()->json(['message' => 'Skill dihapus']);
    }
}