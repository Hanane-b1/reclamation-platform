<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'sender_id',
        'receiver_id',
        'contenu',
        'fichier_nom',
        'fichier_taille',
        'file_path',
        'lu',
    ];

    // Cast lu to boolean so JSON returns true/false not 0/1
    protected $casts = [
        'lu' => 'boolean',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}