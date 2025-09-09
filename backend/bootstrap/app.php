<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\HandleCors;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        apiPrefix: 'api/'
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Aggiungi il middleware CORS alle rotte API e Web
        $middleware->web(append: [HandleCors::class]);
        $middleware->api(prepend: [HandleCors::class]);

        $middleware->validateCsrfTokens(
            except: ['stripe/*', 'api/pizze/*']
        );
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

