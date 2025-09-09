<?php

namespace App\Http\Controllers;

use App\Models\Utente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class UtenteController extends Controller
{
    public function __construct()
    {
        // Usa 'auth:api' solo per le rotte CRUD
        $this->middleware('auth:api');
    }

    // Lista utenti (solo admin)
    public function index()
    {
        $this->authorizeAdmin();

        $utenti = Utente::all();
        return response()->json($utenti);
    }

    // Mostra singolo utente
    public function show($id)
    {
        $utente = Utente::findOrFail($id);
        return response()->json($utente);
    }

    // Crea nuovo utente
    public function store(Request $request)
    {
        $this->authorizeAdmin();

        $request->validate([
            'nominativo' => 'required|string|max:255',
            'email' => 'required|email|unique:utenti,email',
            'password' => 'required|string|min:6',
            'telefono' => 'nullable|string|max:20',
            'ruolo' => 'required|string',
            'stato' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        $data = $request->only('nominativo', 'email', 'telefono', 'ruolo', 'stato');
        $data['password'] = Hash::make($request->password);

        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('utenti', 'public');
        }

        $utente = Utente::create($data);

        return response()->json($utente, 201);
    }

    // Aggiorna utente
    public function update(Request $request, $id)
    {
        $this->authorizeAdmin();

        $utente = Utente::findOrFail($id);

        $request->validate([
            'nominativo' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:utenti,email,' . $id,
            'password' => 'nullable|string|min:6',
            'telefono' => 'nullable|string|max:20',
            'ruolo' => 'sometimes|required|string',
            'stato' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        $data = $request->only('nominativo', 'email', 'telefono', 'ruolo', 'stato');

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        if ($request->hasFile('foto')) {
            if ($utente->foto) {
                Storage::disk('public')->delete($utente->foto);
            }
            $data['foto'] = $request->file('foto')->store('utenti', 'public');
        }

        $utente->update($data);

        return response()->json($utente);
    }

    // Elimina utente
    public function destroy($id)
    {
        $this->authorizeAdmin();

        $utente = Utente::findOrFail($id);

        if ($utente->foto) {
            Storage::disk('public')->delete($utente->foto);
        }

        $utente->delete();

        return response()->json(['message' => 'Utente eliminato']);
    }

    // Funzione privata sicura per autorizzare solo admin
    private function authorizeAdmin()
    {
        $user = Auth::user();

        if (!$user) {
            abort(401, 'Token non valido o scaduto.');
        }

        if ($user->ruolo !== 'admin') {
            abort(403, 'Accesso negato. Solo admin.');
        }
    }
}
