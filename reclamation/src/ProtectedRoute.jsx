import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";



export default function ProtectedRoute({ children, roles }) {
  const { currentUser } = useAuth();

 
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    if (currentUser.role === "admin")       return <Navigate to="/dashboard"    replace />;
    if (currentUser.role === "responsable") return <Navigate to="/responsable"  replace />;
    if (currentUser.role === "employe")     return <Navigate to="/employe"      replace />;
  }

  return children;
}
