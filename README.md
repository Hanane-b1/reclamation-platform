# Bayan · Gestion des réclamations

Plateforme web de gestion des réclamations et des tickets internes. Les employés déposent leurs tickets, les responsables les attribuent, les intervenants les traitent, et chacun suit l'avancement grâce à la messagerie intégrée.

Projet réalisé en équipe de trois. Ma contribution : la page d'accueil, la connexion et le tableau de bord administrateur côté React, ainsi que l'API des tickets et des utilisateurs côté Laravel (routes, contrôleurs, migrations et données de démonstration).

## Aperçu

<img alt="Bayan" src="https://github.com/user-attachments/assets/031aaf57-265b-47a9-a612-386e78a00315" />

<p>
  <img width="49%" alt="Bayan, tableau de bord" src="https://github.com/user-attachments/assets/56a7cb03-a2ca-4de0-ba20-bf13b643e92c" />
  <img width="49%" alt="Bayan, gestion des tickets" src="https://github.com/user-attachments/assets/6b678710-e94f-4f99-b8fa-661a661a37a0" />
</p>

## Fonctionnalités

**Quatre rôles**

- **Administrateur** : tableau de bord global, gestion des comptes, statistiques
- **Responsable** : attribution des tickets aux intervenants, choix de la priorité
- **Employé** : création de tickets et suivi de leur statut
- **Intervenant** : traitement des tickets attribués et mise à jour du statut

**Tickets**

- Titre, département, catégorie, description et pièces jointes
- Priorité (urgente, haute, normale, faible) et statut (en attente, en cours, résolu)
- Commentaires sur chaque ticket

**Communication et suivi**

- Messagerie interne avec pièces jointes et compteur de messages non lus
- Tableau de bord statistique alimenté par l'API

**Authentification**

- Connexion par JWT et routes protégées selon le rôle

## Technologies

React 19, React Router 7, Redux Toolkit, Vite, Laravel 12 (PHP 8.2), JWT, MySQL

## Installation

Prérequis : PHP 8.2+, Composer, Node.js 18+, MySQL.

**API**

```bash
git clone https://github.com/Hanane-b1/reclamation-platform.git
cd reclamation-platform/backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
```

Renseigner `DB_DATABASE=bayan_db` et les identifiants MySQL dans `.env`, puis :

```bash
php artisan migrate --seed
php artisan serve
```

**Interface**

```bash
cd ../reclamation
npm install
npm run dev
```

L'API est disponible sur http://localhost:8000 et l'interface sur http://localhost:5173.

**Comptes de démonstration** (créés par le seeder)

| Rôle | Email | Mot de passe |
|---|---|---|
| Administrateur | `ahmed@bayan.ma` | `admin123` |
| Responsable | `aya@bayan.ma` | `resp123` |
| Employé | `karim@bayan.ma` | `emp123` |
| Intervenant | `intervenant@bayan.ma` | `inter123` |

## Auteur

Hanane Belhadi
