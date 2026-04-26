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

  .hero-section {
    padding: 80px 48px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff; text-align: center;
    position: relative; overflow: hidden;
  }
  .hero-section::after {
    content: '';
    position: absolute; top: -50%; right: -20%;
    width: 400px; height: 400px;
    background: rgba(255,255,255,0.1); border-radius: 50%;
  }
  .hero-section::before {
    content: '';
    position: absolute; bottom: -30%; left: -10%;
    width: 300px; height: 300px;
    background: rgba(255,255,255,0.05); border-radius: 50%;
  }
  .hero-title {
    font-family: 'Sora', sans-serif;
    font-size: 48px; font-weight: 800;
    margin-bottom: 24px; position: relative; z-index: 1;
  }
  .hero-subtitle {
    font-size: 20px; line-height: 1.6;
    max-width: 700px; margin: 0 auto; position: relative; z-index: 1;
    opacity: 0.9;
  }

  .mission-section {
    padding: 80px 48px; background: #fff;
  }
  .mission-container {
    max-width: 1000px; margin: 0 auto; text-align: center;
  }
  .mission-title {
    font-family: 'Sora', sans-serif;
    font-size: 36px; font-weight: 700; color: #0F1117;
    margin-bottom: 32px;
  }
  .mission-text {
    font-size: 18px; color: #6B7280; line-height: 1.7;
    margin-bottom: 48px;
  }
  .mission-stats {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;
  }
  .stat-item {
    text-align: center;
  }
  .stat-number {
    font-family: 'Sora', sans-serif;
    font-size: 48px; font-weight: 800; color: #4F46E5;
    margin-bottom: 8px;
  }
  .stat-label {
    font-size: 14px; color: #6B7280; font-weight: 500;
    text-transform: uppercase; letter-spacing: 1px;
  }

  .values-section {
    padding: 80px 48px; background: #F8FAFC;
  }
  .values-container {
    max-width: 1200px; margin: 0 auto;
  }
  .values-title {
    font-family: 'Sora', sans-serif;
    font-size: 36px; font-weight: 700; color: #0F1117;
    text-align: center; margin-bottom: 64px;
  }
  .values-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;
  }
  .value-card {
    background: #fff; border-radius: 20px; padding: 40px 32px;
    text-align: center; border: 1px solid rgba(0,0,0,0.06);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .value-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.1);
  }
  .value-icon {
    width: 64px; height: 64px; border-radius: 16px;
    background: #EEF2FF; display: flex; align-items: center; justify-content: center;
    font-size: 32px; margin: 0 auto 24px;
  }
  .value-title {
    font-family: 'Sora', sans-serif;
    font-size: 20px; font-weight: 600; color: #0F1117;
    margin-bottom: 16px;
  }
  .value-desc {
    font-size: 15px; color: #6B7280; line-height: 1.6;
  }

  .team-section {
    padding: 80px 48px; background: #fff;
  }
  .team-container {
    max-width: 1000px; margin: 0 auto; text-align: center;
  }
  .team-title {
    font-family: 'Sora', sans-serif;
    font-size: 36px; font-weight: 700; color: #0F1117;
    margin-bottom: 16px;
  }
  .team-subtitle {
    font-size: 18px; color: #6B7280; line-height: 1.6;
    margin-bottom: 48px;
  }
  .team-quote {
    font-style: italic; font-size: 20px; color: #4F46E5;
    margin-bottom: 32px;
  }
  .team-founder {
    font-size: 16px; color: #6B7280;
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
  .btn-cta-primary {
    background: #4F46E5; color: #fff; border: none; border-radius: 10px;
    padding: 14px 28px; font-size: 15px; font-weight: 600; cursor: pointer;
    font-family: 'Sora', sans-serif; transition: background 0.2s;
  }
  .btn-cta-primary:hover { background: #4338CA; }

  .footer {
    border-top: 1px solid #E5E7EB; padding: 20px 48px;
    display: flex; justify-content: space-between; align-items: center;
    background: #fff;
  }
  .footer a { font-size: 11.5px; color: #9CA3AF; text-decoration: none; }
  .footer a:hover { color: #6B7280; }
  .footer-copy { font-size: 11.5px; color: #9CA3AF; }

  /* ── RESPONSIVE ──────────────────────────────────────────────────────────── */

/* TABLET (≤ 1024px) */
@media (max-width: 1024px) {
  .navbar { padding: 0 28px; }
  .hero-section { padding: 60px 28px; }
  .hero-title { font-size: 38px; }
  .hero-subtitle { font-size: 17px; }
  .mission-section { padding: 60px 28px; }
  .values-section { padding: 60px 28px; }
  .team-section { padding: 60px 28px; }
  .cta-section { padding: 48px 28px; }
  .footer { padding: 20px 28px; }
  .stat-number { font-size: 38px; }
  .values-grid { gap: 24px; }
}

/* MOBILE (≤ 768px) */
@media (max-width: 768px) {
  /* NAVBAR */
  .navbar { padding: 0 18px; height: 54px; }
  .navbar > div:nth-child(2) { display: none; }
  .btn-connect { display: none; }
  .btn-primary-nav { font-size: 12px; padding: 7px 12px; }

  /* HERO */
  .hero-section { padding: 48px 18px; }
  .hero-title { font-size: 28px; margin-bottom: 16px; }
  .hero-subtitle { font-size: 15px; }

  /* MISSION */
  .mission-section { padding: 48px 18px; }
  .mission-title { font-size: 26px; margin-bottom: 20px; }
  .mission-text { font-size: 15px; margin-bottom: 32px; }
  .mission-stats { grid-template-columns: 1fr; gap: 24px; }
  .stat-number { font-size: 42px; }

  /* VALUES */
  .values-section { padding: 48px 18px; }
  .values-title { font-size: 26px; margin-bottom: 36px; }
  .values-grid { grid-template-columns: 1fr; gap: 16px; }
  .value-card { padding: 28px 20px; border-radius: 14px; }
  .value-icon { width: 52px; height: 52px; font-size: 26px; margin-bot
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

const values = [
  {
    icon: "🎯", title: "Innovation",
    desc: "Nous repoussons constamment les limites de la technologie pour offrir des solutions de pointe à nos clients."
  },
  {
    icon: "🤝", title: "Collaboration",
    desc: "Nous croyons que le travail d'équipe et la communication ouverte sont essentiels à notre succès."
  },
  {
    icon: "🔒", title: "Sécurité",
    desc: "La protection des données de nos clients est notre priorité absolue dans tout ce que nous faisons."
  },
  {
    icon: "🌱", title: "Durabilité",
    desc: "Nous nous engageons à développer des solutions respectueuses de l'environnement et socialement responsables."
  },
  {
    icon: "💡", title: "Excellence",
    desc: "Nous visons l'excellence dans chaque aspect de notre travail, de la conception à la livraison."
  },
  {
    icon: "❤️", title: "Empathie",
    desc: "Nous comprenons les défis de nos clients et travaillons avec compassion pour les aider à réussir."
  }
];

export default function APropos() {
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
              className={`nav-link${i === 2 ? " active" : ""}`}
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

      <section className="hero-section">
        <h1 className="hero-title">À Propos de Bayan</h1>
        <p className="hero-subtitle">
          Révolutionner la gestion des réclamations d'entreprise avec l'innovation,
          la simplicité et l'excellence au cœur de notre mission.
        </p>
      </section>

      <section className="mission-section">
        <div className="mission-container">
          <h2 className="mission-title">Notre Mission</h2>
          <p className="mission-text">
            Chez Bayan, nous croyons que chaque réclamation est une opportunité d'amélioration.
            Notre plateforme transforme les défis opérationnels en solutions efficaces,
            permettant aux entreprises de se concentrer sur leur cœur de métier tout en
            assurant une gestion transparente et efficiente de leurs processus internes.
          </p>
          <div className="mission-stats">
            <div className="stat-item">
              <div className="stat-number">2.4k+</div>
              <div className="stat-label">Entreprises Actives</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15k+</div>
              <div className="stat-label">Tickets Résolus/Mois</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Taux de Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="values-container">
          <h2 className="values-title">Nos Valeurs</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="team-container">
          <h2 className="team-title">Notre Équipe</h2>
          <p className="team-subtitle">
            Une équipe passionnée d'experts technologiques et de professionnels
            des affaires dédiés à votre succès.
          </p>
          <blockquote className="team-quote">
            "Nous ne construisons pas seulement des outils, nous construisons des partenariats
            qui durent et des solutions qui évoluent avec vos besoins."
          </blockquote>
          <p className="team-founder">— L'équipe Bayan</p>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">Rejoignez Notre Communauté</h2>
        <p className="cta-desc">
          Découvrez comment Bayan peut transformer votre gestion des réclamations.
        </p>
        <button className="btn-cta-primary" onClick={() => navigate("/login")}>
          Commencer Maintenant
        </button>
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

