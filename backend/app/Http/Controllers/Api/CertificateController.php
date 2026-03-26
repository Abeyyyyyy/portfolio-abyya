<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function index()
    {
        return response()->json(Certificate::orderBy('date', 'desc')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'           => 'required|string',
            'issuer'         => 'required|string',
            'date'           => 'required|string',
            'image'          => 'nullable|string',
            'credential_url' => 'nullable|url',
        ]);

        $certificate = Certificate::create($data);
        return response()->json($certificate, 201);
    }

    public function update(Request $request, $id)
    {
        $certificate = Certificate::findOrFail($id);
        $certificate->update($request->all());
        return response()->json($certificate);
    }

    public function destroy($id)
    {
        Certificate::findOrFail($id)->delete();
        return response()->json(['message' => 'Certificate dihapus']);
    }
}