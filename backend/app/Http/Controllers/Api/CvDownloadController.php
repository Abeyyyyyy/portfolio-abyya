<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CvDownload;
use Illuminate\Http\Request;

class CvDownloadController extends Controller
{
    public function index()
    {
        return response()->json(CvDownload::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'    => 'required|string|min:3|max:100',
            'email'   => 'required|email',
            'status'  => 'required|string|min:2|max:50',
            'company' => 'nullable|string|max:100',
            'reason'  => 'required|string|min:10',
        ], [
            'name.min' => 'Nama terlalu pendek, mohon isi nama lengkap Anda.',
            'reason.min' => 'Mohon berikan alasan yang lebih jelas (minimal 10 karakter).',
            'email.email' => 'Format email tidak valid.',
        ]);

        $cvDownload = CvDownload::create($request->all());

        return response()->json([
            'message' => 'Terima kasih telah mengisi data. CV akan segera diunduh.',
            'data' => $cvDownload
        ], 201);
    }

    public function destroy($id)
    {
        CvDownload::findOrFail($id)->delete();
        return response()->json(['message' => 'Data log CV dihapus']);
    }
}
