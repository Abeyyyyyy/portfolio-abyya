<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json(Contact::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string',
            'email'   => 'required|email',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($data);
        return response()->json(['message' => 'Pesan berhasil dikirim!'], 201);
    }

    public function markRead($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['is_read' => true]);
        return response()->json(['message' => 'Ditandai sudah dibaca']);
    }

    public function destroy($id)
    {
        Contact::findOrFail($id)->delete();
        return response()->json(['message' => 'Pesan dihapus']);
    }
}