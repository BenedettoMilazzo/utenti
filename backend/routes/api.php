<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UtenteController;

// Rotte pubbliche (senza autenticazione)
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/password/forgot', [AuthController::class, 'forgotPassword']);
Route::post('/auth/password/reset', [AuthController::class, 'resetPassword']);

// Rotte protette da JWT (middleware jwt.auth)
Route::middleware('auth:api')->group(function () {
    // Profilo utente
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // CRUD utenti (solo per admin)
    Route::prefix('utenti')->group(function () {
        Route::get('/', [UtenteController::class, 'index']);        // lista utenti
        Route::get('/edit/{id}', [UtenteController::class, 'show']);    // dettagli utente
        Route::post('/add', [UtenteController::class, 'store']);      // crea nuovo utente
        Route::put('/update/{id}', [UtenteController::class, 'update']);  // aggiorna utente
        Route::delete('/delete/{id}', [UtenteController::class, 'destroy']); // elimina utente
    });
});
