<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MessageController;

// ── Public ────────────────────────────────────────────────
Route::post('/login', [AuthController::class, 'login']);

// ── Protected (JWT token required) ───────────────────────
Route::middleware('auth:api')->group(function () {

    // Auth
    Route::post('/logout',  [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me',       [AuthController::class, 'me']);

    // Tickets
    Route::get('/tickets',               [TicketController::class, 'index']);
    Route::post('/tickets',              [TicketController::class, 'store']);
    Route::get('/tickets/{id}',          [TicketController::class, 'show']);
    Route::put('/tickets/{id}',          [TicketController::class, 'update']);
    Route::delete('/tickets/{id}',       [TicketController::class, 'destroy']);
    Route::post('/tickets/{id}/comment', [TicketController::class, 'addComment']);
    Route::put('/tickets/{id}/assign',   [TicketController::class, 'assign']);
    Route::put('/tickets/{id}/status',   [TicketController::class, 'updateStatus']);
    Route::put('/tickets/{id}/priority', [TicketController::class, 'updatePriority']);
    Route::get('/stats',                 [TicketController::class, 'stats']);

    // Users
    Route::get('/users',         [UserController::class, 'index']);
    Route::post('/users',        [UserController::class, 'store']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    // Messages — static routes MUST come before the {userId} wildcard
    Route::get('/messages/contacts', [MessageController::class, 'contacts']);
    Route::get('/messages/unread',   [MessageController::class, 'unreadCount']);
    Route::post('/messages',         [MessageController::class, 'send']);

    // {userId} constrained to integers only — prevents "contacts" / "unread" being caught here
    Route::get('/messages/{userId}', [MessageController::class, 'conversation'])
        ->where('userId', '[0-9]+');
});