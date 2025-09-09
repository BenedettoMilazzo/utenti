<?php

use Illuminate\Support\Facades\Route;

// Rotta per la Homepage
Route::get('/', function () {
    return view('welcome');
})->name('home');


