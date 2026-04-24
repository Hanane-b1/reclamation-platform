import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading,     setLoading]     = useState(true); // vérifier token au démarrage

  // ── Au démarrage — vérifier si token existe ───────────
  useEffect(() => {
    const token = localStorage.getItem("bayan_token");
    if (token) {
      // Vérifier que le token est encore valide
      authAPI.me()
        .then(user => setCurrentUser(user))
        .catch(() => {
          // Token expiré → supprimer
          localStorage.removeItem("bayan_token");
          setCurrentUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // ── LOGIN ─────────────────────────────────────────────
  const login = async (email, password) => {
    try {
      const data = await authAPI.login(email, password);

      // Sauvegarder token dans localStorage
      localStorage.setItem("bayan_token", data.token);
      setCurrentUser(data.user);

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ── LOGOUT ────────────────────────────────────────────
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (_) {
      // Peu importe si l'API échoue
    }
    localStorage.removeItem("bayan_token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {/* Attendre la vérification du token avant d'afficher */}
      {loading
        ? (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", fontFamily:"'DM Sans',sans-serif", color:"#9CA3AF", fontSize:14 }}>
            Chargement...
          </div>
        )
        : children
      }
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
