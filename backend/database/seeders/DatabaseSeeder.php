<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Ticket;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['nom' => 'Ahmed Ataki', 'email' => 'ahmed@bayan.ma', 'password' => Hash::make('admin123'), 'role' => 'admin'],
            ['nom' => 'Karim Alami', 'email' => 'karim@bayan.ma', 'password' => Hash::make('emp123'), 'role' => 'employe'],
            ['nom' => 'Aya Saïl', 'email' => 'aya@bayan.ma', 'password' => Hash::make('resp123'), 'role' => 'responsable'],
            ['nom' => 'Zakaria Achraf', 'email' => 'zakaria@bayan.ma', 'password' => Hash::make('emp123'), 'role' => 'employe'],
            ['nom' => 'Sarah Lemarié', 'email' => 'sarah@bayan.ma', 'password' => Hash::make('emp123'), 'role' => 'employe'],
            ['nom' => 'Omar Almsaddek', 'email' => 'omar@bayan.ma', 'password' => Hash::make('emp123'), 'role' => 'employe'],
            ['nom' => 'Intervenant Test', 'email' => 'intervenant@bayan.ma', 'password' => Hash::make('inter123'), 'role' => 'intervenant'],
        ];

        foreach ($users as $u) {
            User::updateOrCreate(['email' => $u['email']], $u);
        }

        $zakaria = User::where('email', 'zakaria@bayan.ma')->first();
        $sarah   = User::where('email', 'sarah@bayan.ma')->first();
        $omar    = User::where('email', 'omar@bayan.ma')->first();
        $karim   = User::where('email', 'karim@bayan.ma')->first();

        $tickets = [
            [
                'titre' => 'Panne serveur principal',
                'description' => 'Le serveur principal ne répond plus.',
                'service' => 'Informatique',
                'priorite' => 'urgent',
                'statut' => 'cours',
                'created_by' => $sarah->id,
                'assigned_to' => $zakaria->id,
            ],
            [
                'titre' => 'Remboursement médical',
                'description' => 'Demande de remboursement médical en attente de validation.',
                'service' => 'RH',
                'priorite' => 'normal',
                'statut' => 'attente',
                'created_by' => $sarah->id,
                'assigned_to' => null,
            ],
            [
                'titre' => 'Climatisation en panne',
                'description' => 'La climatisation du bureau ne fonctionne plus.',
                'service' => 'Externe',
                'priorite' => 'normal',
                'statut' => 'resolu',
                'created_by' => $sarah->id,
                'assigned_to' => $omar->id,
            ],
        ];

        foreach ($tickets as $t) {
            Ticket::create($t);
        }
    }
}
