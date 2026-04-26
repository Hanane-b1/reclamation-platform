<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    private function currentUserId()
    {
        return auth('api')->id() ?? 3; // mode test
    }

    public function contacts()
    {
        $meId = $this->currentUserId();
$users = User::where('id', '!=', $meId)
    ->where('role', '!=', 'admin')
    ->get();


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
                'id' => $user->id,
                'nom' => $user->nom,
                'email' => $user->email,
                'role' => $user->role,
                'unread' => $unread,
                'last_msg' => $lastMsg ? [
                    'contenu' => $lastMsg->contenu,
                    'sender_id' => $lastMsg->sender_id,
                    'created_at' => $lastMsg->created_at->format('H:i'),
                ] : null,
            ];
        });

        return response()->json($contacts);
    }

    public function conversation($userId)
    {
        $meId = $this->currentUserId();

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
                'id' => $msg->id,
                'from' => $msg->sender_id == $meId ? 'me' : $msg->sender_id,
                'sender_id' => $msg->sender_id,
                'receiver_id' => $msg->receiver_id,
                'contenu' => $msg->contenu,
                'fichier_nom' => $msg->fichier_nom,
                'fichier_taille' => $msg->fichier_taille,
                'file_path' => $msg->file_path, // IMPORTANT
                'lu' => $msg->lu,
                'time' => $msg->created_at->format('H:i'),
                'date' => $this->formatDate($msg->created_at),
            ];
        }));
    }

public function send(Request $request)
{
    $request->validate([
        'receiver_id' => 'required|exists:users,id',
        'contenu' => 'required|string',
    ]);

    $meId = $this->currentUserId();

    $message = Message::create([
        'sender_id' => $meId,
        'receiver_id' => $request->receiver_id,
        'contenu' => $request->contenu,
        'lu' => false,
    ]);

    return response()->json([
        'id' => $message->id,
        'from' => 'me',
        'sender_id' => $message->sender_id,
        'receiver_id' => $message->receiver_id,
        'contenu' => $message->contenu,
        'lu' => false,
        'time' => $message->created_at->format('H:i'),
        'date' => "Aujourd'hui",
    ], 201);
}



    public function unreadCount()
    {
        $meId = $this->currentUserId();

        $count = Message::where('receiver_id', $meId)
            ->where('lu', false)
            ->count();

        return response()->json(['count' => $count]);
    }

    private function formatDate($date)
    {
        $today = now()->startOfDay();
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
