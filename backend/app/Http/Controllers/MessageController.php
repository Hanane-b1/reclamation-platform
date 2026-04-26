<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // ── Get authenticated user ID — no silent fallback ────────────
    private function currentUserId()
    {
        $id = auth('api')->id();

        if (!$id) {
            abort(401, 'Non authentifié.');
        }

        return $id;
    }

    // ── GET /messages/contacts ────────────────────────────────────
    public function contacts()
    {
        $meId = $this->currentUserId();

        // Show all users except current user
        $users = User::where('id', '!=', $meId)->get();

        $contacts = $users->map(function ($user) use ($meId) {
            $lastMsg = Message::where(function ($q) use ($meId, $user) {
                $q->where('sender_id', $meId)
                  ->where('receiver_id', $user->id);
            })
            ->orWhere(function ($q) use ($meId, $user) {
                $q->where('sender_id', $user->id)
                  ->where('receiver_id', $meId);
            })
            ->latest()
            ->first();

            $unread = Message::where('sender_id', $user->id)
                ->where('receiver_id', $meId)
                ->where('lu', false)
                ->count();

            return [
                'id'       => $user->id,
                'nom'      => $user->nom,
                'email'    => $user->email,
                'role'     => $user->role,
                'unread'   => $unread,
                'last_msg' => $lastMsg ? [
                    'contenu'    => $lastMsg->contenu,
                    'sender_id'  => $lastMsg->sender_id,
                    'created_at' => $lastMsg->created_at->format('H:i'),
                ] : null,
            ];
        });

        return response()->json($contacts);
    }

    // ── GET /messages/{userId} ────────────────────────────────────
    public function conversation($userId)
    {
        $meId = $this->currentUserId();

        // Mark incoming messages as read
        Message::where('sender_id', $userId)
            ->where('receiver_id', $meId)
            ->where('lu', false)
            ->update(['lu' => true]);

        $messages = Message::where(function ($q) use ($meId, $userId) {
                $q->where('sender_id', $meId)
                  ->where('receiver_id', $userId);
            })
            ->orWhere(function ($q) use ($meId, $userId) {
                $q->where('sender_id', $userId)
                  ->where('receiver_id', $meId);
            })
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages->map(function ($msg) use ($meId) {
            return [
                'id'             => $msg->id,
                'from'           => $msg->sender_id == $meId ? 'me' : $msg->sender_id,
                'sender_id'      => $msg->sender_id,
                'receiver_id'    => $msg->receiver_id,
                'contenu'        => $msg->contenu,
                'fichier_nom'    => $msg->fichier_nom,
                'fichier_taille' => $msg->fichier_taille,
                'file_path'      => $msg->file_path,
                'lu'             => (bool) $msg->lu,
                'time'           => $msg->created_at->format('H:i'),
                'date'           => $this->formatDate($msg->created_at),
            ];
        }));
    }

    // ── POST /messages ────────────────────────────────────────────
    public function send(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|integer|exists:users,id',
            'contenu'     => 'nullable|string|max:5000',
            'file'        => 'nullable|file|max:5120',
        ]);

        // Must have text OR a file — not both empty
        if (!$request->filled('contenu') && !$request->hasFile('file')) {
            return response()->json([
                'message' => 'Le message ne peut pas être vide.',
            ], 422);
        }

        $meId = $this->currentUserId();

        // Cannot message yourself
        if ((int) $request->receiver_id === $meId) {
            return response()->json([
                'message' => 'Vous ne pouvez pas vous envoyer un message.',
            ], 422);
        }

        $fileName = null;
        $fileSize = null;
        $filePath = null;

        if ($request->hasFile('file')) {
            $file     = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $fileSize = max(1, round($file->getSize() / 1024)) . ' Ko';
            $filePath = $file->store('messages', 'public');
        }

        $message = Message::create([
            'sender_id'      => $meId,
            'receiver_id'    => (int) $request->receiver_id,
            'contenu'        => $request->filled('contenu') ? $request->contenu : 'Fichier joint',
            'fichier_nom'    => $fileName,
            'fichier_taille' => $fileSize,
            'file_path'      => $filePath,
            'lu'             => false,
        ]);

        return response()->json([
            'id'             => $message->id,
            'from'           => 'me',
            'sender_id'      => $message->sender_id,
            'receiver_id'    => $message->receiver_id,
            'contenu'        => $message->contenu,
            'fichier_nom'    => $message->fichier_nom,
            'fichier_taille' => $message->fichier_taille,
            'file_path'      => $message->file_path,
            'lu'             => false,
            'time'           => $message->created_at->format('H:i'),
            'date'           => "Aujourd'hui",
        ], 201);
    }

    // ── GET /messages/unread ──────────────────────────────────────
    public function unreadCount()
    {
        $meId = $this->currentUserId();

        $count = Message::where('receiver_id', $meId)
            ->where('lu', false)
            ->count();

        return response()->json(['count' => $count]);
    }

    // ── Helper ────────────────────────────────────────────────────
    private function formatDate($date)
    {
        $today     = now()->startOfDay();
        $yesterday = now()->subDay()->startOfDay();

        if ($date->copy()->startOfDay()->eq($today)) {
            return "Aujourd'hui";
        }

        if ($date->copy()->startOfDay()->eq($yesterday)) {
            return "Hier";
        }

        return $date->format('d/m/Y');
    }
}