import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./Accueil";
import Fonctionnalites from "./Fonctionnalites";
import APropos from "./APropos";
import Login from "./Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/fonctionnalites" element={<Fonctionnalites />} />
        <Route path="/a-propos" element={<APropos />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}