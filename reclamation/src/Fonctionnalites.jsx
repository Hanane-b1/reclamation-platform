import { useNavigate } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #F4F5FA; color: #0F1117; }

  .navbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 60px;
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(0,0,0,0.06);
    position: sticky; top: 0; z-index: 100;
  }
  .nav-link {
    font-size: 13.5px; font-weight: 400; color: #6B7280;
    text-decoration: none; transition: color 0.2s; letter-spacing: 0.01em;
  }
  .nav-link.active { color: #0F1117; font-weight: 500; }
  .nav-link:hover { color: #0F1117; }
  .btn-connect {
    background: none; border: 1px solid #D1D5DB; border-radius: 8px;
    padding: 7px 16px; font-size: 13px; color: #374151; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: border-color 0.2s;
  }
  .btn-connect:hover { border-color: #9CA3AF; background: #F9FAFB; }
  .btn-primary-nav {
    background: #1C1C2E; color: #fff; border: none; border-radius: 8px;
    padding: 8px 16px; font-size: 13px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    transition: background 0.2s;
  }
  .btn-primary-nav:hover { background: #2D2D44; }

  .page-header {
    padding: 64px 48px 48px;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }
  .page-title {
    font-family: 'Sora', sans-serif;
    font-size: 40px; font-weight: 800;
    color: #0F1117; letter-spacing: -1.2px;
    margin-bottom: 16px;
  }
  .page-subtitle {
    font-size: 16px; color: #6B7280; line-height: 1.6;
    max-width: 600px; margin: 0 auto;
  }

  .features-section {
    padding: 64px 48px;
  }
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 32px;
    max-width: 1200px; margin: 0 auto;
  }
  .feature-card {
    background: #fff; border-radius: 20px; padding: 40px;
    border: 1px solid rgba(0,0,0,0.06);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.1);
  }
  .feature-icon {
    width: 60px; height: 60px; border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; margin-bottom: 24px;
  }
  .feature-icon.blue { background: #EEF2FF; }
  .feature-icon.green { background: #D1FAE5; }
  .feature-icon.orange { background: #FFF7ED; }
  .feature-icon.purple { background: #F3E8FF; }
  .feature-title {
    font-family: 'Sora', sans-serif;
    font-size: 22px; font-weight: 700; color: #0F1117;
    margin-bottom: 16px;
  }
  .feature-desc {
    font-size: 15px; color: #6B7280; line-height: 1.6;
    margin-bottom: 24px;
  }
  .feature-benefits {
    list-style: none; padding: 0;
  }
  .benefit-item {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 12px;
  }
  .benefit-check {
    width: 20px; height: 20px; border-radius: 50%; background: #EEF2FF;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .benefit-text {
    font-size: 14px; color: #374151;
  }

  .cta-section {
    background: #1C1C2E; padding: 64px 48px; text-align: center;
  }
  .cta-title {
    font-family: 'Sora', sans-serif;
    font-size: 32px; font-weight: 700; color: #fff;
    margin-bottom: 16px;
  }
  .cta-desc {
    font-size: 16px; color: rgba(255,255,255,0.8); line-height: 1.6;
    max-width: 500px; margin: 0 auto 32px;
  }
  .cta-buttons {
    display: flex; gap: 16px; justify-content: center;
  }
  .btn-cta-primary {
    background: #4F46E5; color: #fff; border: none; border-radius: 10px;
    padding: 14px 28px; font-size: 15px; font-weight: 600; cursor: pointer;
    font-family: 'Sora', sans-serif; transition: background 0.2s;
  }
  .btn-cta-primary:hover { background: #4338CA; }
  .btn-cta-secondary {
    background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px; padding: 14px 28px; font-size: 15px;
    font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: background 0.2s;
  }
  .btn-cta-secondary:hover { background: rgba(255,255,255,0.2); }

  .footer {
    border-top: 1px solid #E5E7EB; padding: 20px 48px;
    display: flex; justify-content: space-between; align-items: center;
    background: #fff;
  }
  .footer a { font-size: 11.5px; color: #9CA3AF; text-decoration: none; }
  .footer a:hover { color: #6B7280; }
  .footer-copy { font-size: 11.5px; color: #9CA3AF; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .navbar { padding: 0 32px; }
    .page-header { padding: 48px 32px 36px; }
    .page-title { font-size: 32px; }
    .features-section { padding: 48px 32px; }
    .features-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .cta-section { padding: 48px 32px; }
    .cta-title { font-size: 28px; }
    .footer { padding: 16px 32px; }
  }

  @media (max-width: 768px) {
    .navbar { padding: 0 16px; flex-wrap: wrap; height: auto; gap: 12px; }
    .navbar > div:nth-child(2) { display: none; }
    .navbar > div:nth-child(3) { width: 100%; justify-content: flex-end; order: 3; }

    .page-header { padding: 32px 16px 24px; }
    .page-title { font-size: 26px; letter-spacing: -0.8px; }
    .page-subtitle { font-size: 14px; }

    .features-section { padding: 36px 16px; }
    .features-grid { grid-template-columns: 1fr; gap: 16px; }
    .feature-card { padding: 24px 18px; }
    .feature-icon { width: 48px; height: 48px; font-size: 22px; }
    .feature-title { font-size: 18px; }
    .feature-desc { font-size: 13px; }
    .benefit-item { margin-bottom: 10px; }
    .benefit-text { font-size: 13px; }

    .cta-section { padding: 36px 16px; }
    .cta-title { font-size: 22px; }
    .cta-desc { font-size: 14px; margin-bottom: 20px; }
    .cta-buttons { flex-direction: column; gap: 10px; }
    .btn-cta { width: 100%; padding: 11px 16px; font-size: 13px; }

    .footer { padding: 14px 16px; flex-direction: column; gap: 10px; text-align: center; }
  }

  @media (max-width: 480px) {
    .navbar > div:nth-child(3) { gap: 6px; }
    .btn-connect, .btn-primary-nav { padding: 6px 12px; font-size: 12px; width: 48%; }

    .page-header { padding: 20px 12px 16px; }
    .page-title { font-size: 20px; }
    .page-subtitle { font-size: 12px; }

    .features-section { padding: 24px 12px; }
    .features-grid { grid-template-columns: 1fr; }
    .feature-card { padding: 16px 14px; }
    .feature-icon { width: 40px; height: 40px; font-size: 18px; margin-bottom: 12px; }
    .feature-title { font-size: 16px; margin-bottom: 8px; }
    .feature-desc { font-size: 12px; margin-bottom: 12px; }

    .cta-section { padding: 24px 12px; }
    .cta-title { font-size: 18px; }

    .footer { padding: 10px; font-size: 10px; }
  }
`;

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="#4F46E5" />
      <path d="M8 14C8 10.686 10.686 8 14 8C17.314 8 20 10.686 20 14C20 17.314 17.314 20 14 20"
        stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="14" cy="20" r="1.6" fill="white" />
    </svg>
    <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15.5, color: "#0F1117", letterSpacing: "-0.3px" }}>
      Bayan
    </span>
  </div>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6L4.5 8.5L10 3" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const features = [
  {
    icon: "⚡", cls: "blue", title: "Saisie Ultra-Rapide",
    desc: "Déposez une réclamation en moins de 30 secondes grâce à nos formulaires intelligents pré-remplis et notre interface intuitive.",
    benefits: [
      "Champs dynamiques adaptatifs",
      "Pièces jointes illimitées",
      "Validation en temps réel",
      "Sauvegarde automatique"
    ]
  },
  {
    icon: "📊", cls: "green", title: "Analytics Prédictifs",
    desc: "Identifiez les goulots d'étranglement avant qu'ils ne surviennent grâce à notre IA d'analyse avancée.",
    benefits: [
      "Rapports automatiques quotidiens",
      "Exportation CSV/PDF/Excel",
      "Tableaux de bord personnalisables",
      "Alertes proactives"
    ]
  },
  {
    icon: "👥", cls: "orange", title: "Collaboration d'Équipe",
    desc: "Assignez, commentez et résolvez des tickets en équipe sans jamais quitter la plateforme.",
    benefits: [
      "Mentions @équipe et notifications",
      "Historique complet des actions",
      "Partage de fichiers sécurisé",
      "Intégration calendrier"
    ]
  },
  {
    icon: "🔒", cls: "purple", title: "Sécurité Renforcée",
    desc: "Vos données sont protégées par les standards de sécurité les plus élevés de l'industrie.",
    benefits: [
      "Chiffrement end-to-end",
      "Authentification multi-facteurs",
      "Conformité RGPD",
      "Sauvegarde automatique"
    ]
  },
  {
    icon: "📱", cls: "blue", title: "Accessibilité Mobile",
    desc: "Gérez vos réclamations partout avec notre application mobile native et notre design responsive.",
    benefits: [
      "Application iOS et Android",
      "Mode hors ligne",
      "Notifications push",
      "Synchronisation instantanée"
    ]
  },
  {
    icon: "🤖", cls: "green", title: "Automatisation Intelligente",
    desc: "Laissez notre IA catégoriser et router automatiquement vos tickets pour une résolution plus rapide.",
    benefits: [
      "Classification automatique",
      "Routage intelligent",
      "Suggestions de résolution",
      "Apprentissage continu"
    ]
  }
];

export default function Fonctionnalites() {
  const navigate = useNavigate();

  return (
    <>
      <style>{CSS}</style>

      <nav className="navbar">
        <Logo />
        <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
          {[
            { name: "Accueil", path: "/" },
            { name: "Fonctionnalités", path: "/fonctionnalites" },
            { name: "À propos", path: "/a-propos" }
          ].map((item, i) => (
            <a
              key={item.name}
              href="#"
              className={`nav-link${i === 1 ? " active" : ""}`}
              onClick={(e) => { e.preventDefault(); navigate(item.path); }}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-connect" onClick={() => navigate("/login")}>
            Se connecter
          </button>
          <button className="btn-primary-nav" onClick={() => navigate("/login")}>
            Déposer une réclamation
          </button>
        </div>
      </nav>

      <header className="page-header">
        <h1 className="page-title">Fonctionnalités Puissantes</h1>
        <p className="page-subtitle">
          Découvrez comment Bayan transforme la gestion des réclamations avec des outils innovants
          conçus pour optimiser votre efficacité opérationnelle.
        </p>
      </header>

      <section className="features-section">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className={`feature-icon ${feature.cls}`}>{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
              <ul className="feature-benefits">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="benefit-item">
                    <div className="benefit-check">
                      <CheckIcon />
                    </div>
                    <span className="benefit-text">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">Prêt à Optimiser Vos Processus ?</h2>
        <p className="cta-desc">
          Rejoignez des milliers d'entreprises qui font confiance à Bayan pour gérer leurs réclamations efficacement.
        </p>
        <div className="cta-buttons">
          <button className="btn-cta-primary" onClick={() => navigate("/login")}>
            Commencer Maintenant
          </button>
          <button className="btn-cta-secondary" onClick={() => navigate("/")}>
            Voir la Démo
          </button>
        </div>
      </section>

      <footer className="footer">
        <Logo />
        <p className="footer-copy">© 2026 Bayan. All rights reserved.</p>
        <div style={{ display: "flex", gap: 22 }}>
          {["Privacy Policy","Terms of Service","Cookie Policy","Security"].map((l) => (
            <a key={l} href="#">{l}</a>
          ))}
        </div>
      </footer>
    </>
  );
}
