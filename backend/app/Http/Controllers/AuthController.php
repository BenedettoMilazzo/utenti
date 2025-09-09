<?php

namespace App\Http\Controllers;

use App\Models\Utente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            "nominativo" => "required|string|max:255",
            "email" => "required|email|unique:utenti,email",
            "password" => "required|string|min:6",
            "telefono" => "nullable|string|max:20",
        ]);

        $utente = Utente::create([
            "nominativo" => $request->nominativo,
            "email" => $request->email,
            "password" => Hash::make($request->password),
            "telefono" => $request->telefono,
        ]);

        $token = JWTAuth::fromUser($utente);

        return response()->json(["utente" => $utente, "token" => $token], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only("email", "password");

        if (!($token = JWTAuth::attempt($credentials))) {
            return response()->json(["error" => "Credenziali non valide"], 401);
        }

        $utente = JWTAuth::user(); // Recupera l'utente loggato

        return response()->json([
            "token" => $token,
            "utente" => [
                "id" => $utente->id,
                "nominativo" => $utente->nominativo,
                "email" => $utente->email,
            ],
        ]);
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(["message" => "Logout effettuato"]);
        } catch (\Exception $e) {
            return response()->json(["error" => "Logout fallito"], 500);
        }
    }

    public function me()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json([
                "id" => $user->id,
                "nominativo" => $user->nominativo,
                "email" => $user->email,
            ]);
        } catch (\Exception $e) {
            return response()->json(["error" => "Token non valido"], 401);
        }
    }
}
