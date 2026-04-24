// ── BASE DE DONNÉES LOCALE ────────────────────────────────
// Comptes prédéfinis — mail + mdp + rôle
// Pour ajouter un compte : copier un objet et modifier les champs

export const USERS = [
  // ── ADMINS ──
  {
    id: 1,
    nom: "Ahmed Ataki",
    email: "ahmed@bayan.ma",
    motdepasse: "admin123",
    role: "admin",
    initiales: "AA",
    couleur: "#4F46E5",
  },

  // ── RESPONSABLES ──
  {
    id: 2,
    nom: "Karim Alami",
    email: "karim@bayan.ma",
    motdepasse: "resp123",
    role: "responsable",
    initiales: "KA",
    couleur: "#10B981",
  },
  {
    id: 3,
    nom: "Aya Saïl",
    email: "aya@bayan.ma",
    motdepasse: "resp123",
    role: "responsable",
    initiales: "AS",
    couleur: "#EC4899",
  },

  // ── EMPLOYÉS ──
  {
    id: 4,
    nom: "Zakaria Achraf",
    email: "zakaria@bayan.ma",
    motdepasse: "emp123",
    role: "employe",
    initiales: "ZA",
    couleur: "#8B5CF6",
  },
  {
    id: 5,
    nom: "Sarah Lemarié",
    email: "sarah@bayan.ma",
    motdepasse: "emp123",
    role: "employe",
    initiales: "SL",
    couleur: "#F59E0B",
  },
  {
    id: 6,
    nom: "Omar Almsaddek",
    email: "omar@bayan.ma",
    motdepasse: "emp123",
    role: "employe",
    initiales: "OM",
    couleur: "#0EA5E9",
  },
];
