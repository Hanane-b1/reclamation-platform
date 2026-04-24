// ── API SERVICE ───────────────────────────────────────────
// Toutes les calls vers Laravel API

const BASE_URL = "http://localhost:8000/api";

// ── Headers avec token JWT ────────────────────────────────
const getHeaders = () => {
  const token = localStorage.getItem("bayan_token");
  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ── Fetch générique ───────────────────────────────────────
const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: getHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erreur serveur");
  return data;
};

// ── AUTH ──────────────────────────────────────────────────
export const authAPI = {
  login:  (email, password) => apiFetch("/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  me:     () => apiFetch("/me"),
  logout: () => apiFetch("/logout", { method: "POST" }),
};

// ── TICKETS ───────────────────────────────────────────────
export const ticketsAPI = {
  getAll:     (filters = {}) => apiFetch(`/tickets?${new URLSearchParams(filters)}`),
  create:     (data)        => apiFetch("/tickets", { method: "POST", body: JSON.stringify(data) }),
  getOne:     (id)          => apiFetch(`/tickets/${id}`),
  update:     (id, data)    => apiFetch(`/tickets/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete:     (id)          => apiFetch(`/tickets/${id}`, { method: "DELETE" }),
  addComment: (id, contenu) => apiFetch(`/tickets/${id}/comment`, { method: "POST", body: JSON.stringify({ contenu }) }),
  getStats:   ()            => apiFetch("/stats"),
};

// ── USERS (admin only) ────────────────────────────────────
export const usersAPI = {
  getAll: ()       => apiFetch("/users"),
  create: (data)   => apiFetch("/users", { method: "POST", body: JSON.stringify(data) }),
  delete: (id)     => apiFetch(`/users/${id}`, { method: "DELETE" }),
};
