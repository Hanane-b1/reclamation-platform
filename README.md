# 📨 Bayan — Complaint & Ticket Management Platform

**Bayan** is a full stack web platform for managing internal complaints (réclamations) and support tickets.
Employees submit tickets, managers assign and prioritise them, technicians resolve them — and everyone can follow progress and talk through built-in messaging.

<!-- Add screenshots here: docs/landing.png, docs/dashboard.png, docs/messages.png -->

## ✨ Features

- **JWT authentication** with 4 roles and protected routes:
  - 👑 **Admin** — global dashboard, user management (create / delete accounts), statistics
  - 🧭 **Responsable (manager)** — assigns tickets to technicians, sets priority
  - 👤 **Employee** — creates tickets and follows their status
  - 🔧 **Intervenant (technician)** — handles assigned tickets and updates their status
- **Ticket lifecycle** — title, department, category, description, attachments, priority (`urgent / haute / normale / faible`) and status (`attente → cours → résolu`)
- **Comments** on each ticket
- **Internal messaging** between users, with file attachments and unread counter
- **Statistics dashboard** fed by the API
- **Public pages** — landing page, features, about and demo

## 🛠️ Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, React Router 7, Redux Toolkit, Vite |
| Backend | Laravel 12 (PHP 8.2), REST API, JWT auth (`php-open-source-saver/jwt-auth`), role middleware |
| Database | MySQL |

## 🔌 Main API endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/login` | Log in, returns a JWT |
| `GET` | `/api/me` | Current user |
| `GET / POST` | `/api/tickets` | List / create tickets |
| `PUT` | `/api/tickets/{id}/assign` | Assign to a technician |
| `PUT` | `/api/tickets/{id}/status` | Change status |
| `PUT` | `/api/tickets/{id}/priority` | Change priority |
| `POST` | `/api/tickets/{id}/comment` | Add a comment |
| `GET` | `/api/stats` | Dashboard statistics |
| `GET / POST` | `/api/messages/...` | Conversations and messages |

## 🚀 Getting started

**Prerequisites:** PHP 8.2+, Composer, Node.js 18+, MySQL.

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
# set DB_DATABASE=bayan_db and your MySQL credentials in .env
php artisan migrate --seed
php artisan serve
```

The API runs on http://localhost:8000.

### Frontend

```bash
cd reclamation
npm install
npm run dev
```

The app runs on http://localhost:5173.

### Demo accounts (created by the seeder)

| Role | Email | Password |
|---|---|---|
| Admin | `ahmed@bayan.ma` | `admin123` |
| Responsable | `aya@bayan.ma` | `resp123` |
| Employee | `karim@bayan.ma` | `emp123` |
| Intervenant | `intervenant@bayan.ma` | `inter123` |

## 📁 Project structure

```
backend/        # Laravel 12 REST API (controllers, models, migrations, seeders)
reclamation/    # React frontend (dashboards per role, messaging, auth context)
bayan_db.sql    # Optional MySQL dump
```

## 👩‍💻 Author

**Hanane Belhadi** — Full Stack Developer · [GitHub](https://github.com/Hanane-b1)
