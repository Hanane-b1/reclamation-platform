import { useNavigate } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #F4F5FA; color: #0F1117; }

  .page-shell {
    min-height: 100vh;
    background: linear-gradient(180deg, #F8F9FF 0%, #EFF3FF 100%);
  }
  .page-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 28px 24px 56px;
  }
  .navbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 0 16px;
    background: transparent;
  }
  .nav-link {
    font-size: 13.5px; font-weight: 400; color: #6B7280;
    text-decoration: none; transition: color 0.2s; letter-spacing: 0.01em;
  }
  .nav-link.active { color: #0F1117; font-weight: 600; }
  .nav-link:hover { color: #4F46E5; }
  .btn-connect, .btn-primary-nav {
    border-radius: 8px; padding: 10px 18px; font-size: 13px;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .btn-connect {
    background: #fff; border: 1px solid #D1D5DB; color: #374151;
  }
  .btn-connect:hover { background: #F9FAFB; }
  .btn-primary-nav {
    background: #4F46E5; color: #fff; border: none;
  }
  .btn-primary-nav:hover { background: #4338CA; }

  .hero {
    display: grid; grid-template-columns: 1.1fr 0.9fr;
    gap: 32px; align-items: center;
    background: #fff; border-radius: 28px; border: 1px solid rgba(15,17,23,0.08);
    padding: 46px; box-shadow: 0 24px 80px rgba(15,17,23,0.06);
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: #EEF2FF; border-radius: 999px; padding: 10px 16px;
    color: #3730A3; font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .badge-dot { width: 8px; height: 8px; border-radius: 50%; background: #6366F1; }
  .hero-title { font-family: 'Sora', sans-serif; font-size: 46px; font-weight: 800; line-height: 1.05; color: #0F1117; }
  .hero-title .blue { color: #4F46E5; }
  .hero-desc { margin-top: 18px; font-size: 15px; color: #475569; line-height: 1.8; max-width: 580px; }
  .hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
  .hero-stats { display: flex; gap: 24px; margin-top: 36px; }
  .hero-stat { display: flex; flex-direction: column; gap: 6px; }
  .hero-number { font-family: 'Sora', sans-serif; font-size: 28px; font-weight: 700; color: #0F1117; }
  .hero-label { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #64748B; }

  .demo-visual {
    position: relative; min-height: 420px; background: linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 100%);
    border-radius: 24px; padding: 24px; display: grid; grid-template-rows: auto 1fr auto;
    box-shadow: inset 0 0 0 1px rgba(79,70,229,0.08);
  }
  .demo-visual::before {
    content: '';
    position: absolute; top: 16px; right: 16px;
    width: 100px; height: 100px; border-radius: 50%;
    background: radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 65%);
  }
  .hero-chip { display: inline-flex; align-items: center; gap: 8px; background: #fff; border-radius: 999px; padding: 10px 14px; border: 1px solid rgba(15,17,23,0.06); font-size: 13px; font-weight: 600; }
  .hero-chip span { width: 10px; height: 10px; border-radius: 50%; background: #10B981; }
  .demo-panel {
    margin-top: 28px; display: grid; gap: 16px;
  }
  .panel-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
  .panel-card {
    background: #fff; border-radius: 18px; padding: 16px 18px;
    border: 1px solid rgba(15,17,23,0.04);
  }
  .panel-title { font-size: 12px; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px; }
  .panel-value { font-family: 'Sora', sans-serif; font-size: 19px; font-weight: 700; color: #0F1117; }
  .panel-note { font-size: 12px; color: #64748B; line-height: 1.6; margin-top: 8px; }

  .section { margin-top: 44px; }
  .section-heading { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin-bottom: 22px; }
  .section-heading h2 { font-family: 'Sora', sans-serif; font-size: 28px; font-weight: 700; color: #0F1117; }
  .section-heading p { font-size: 14px; color: #64748B; max-width: 560px; }
  .cards-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
  .story-card {
    background: #fff; border-radius: 22px; border: 1px solid rgba(15,17,23,0.05);
    padding: 28px; box-shadow: 0 20px 60px rgba(15,17,23,0.05);
  }
  .story-badge { font-size: 11px; color: #4F46E5; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
  .story-title { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 700; margin-top: 18px; color: #0F1117; }
  .story-text { font-size: 13.5px; color: #475569; line-height: 1.8; margin-top: 14px; }
  .story-list { margin-top: 20px; display: grid; gap: 10px; }
  .story-item { display: flex; gap: 10px; align-items: flex-start; }
  .story-icon { width: 30px; height: 30px; border-radius: 12px; background: #EEF2FF; display: grid; place-items: center; font-size: 16px; }
  .story-label { font-size: 13px; color: #334155; }

  .callout {
    margin-top: 44px; padding: 34px 34px 34px 34px;
    border-radius: 24px; background: #4F46E5; color: #fff;
    display: flex; justify-content: space-between; align-items: center; gap: 24px;
  }
  .callout-text { max-width: 620px; }
  .callout-text h3 { font-family: 'Sora', sans-serif; font-size: 26px; font-weight: 800; margin-bottom: 10px; }
  .callout-text p { font-size: 15px; color: rgba(255,255,255,0.88); line-height: 1.75; }
  .callout button { background: #fff; color: #4F46E5; border: none; border-radius: 12px; padding: 14px 22px; font-weight: 700; cursor: pointer; }
  .callout button:hover { background: #EDE9FE; }
  .callout-graph { display: grid; gap: 8px; }
  .bar { width: 100%; height: 10px; border-radius: 999px; background: rgba(255,255,255,0.2); }
  .bar.fill1 { width: 84%; background: #C7D2FE; }
  .bar.fill2 { width: 68%; background: #A5B4FC; }
  .bar.fill3 { width: 52%; background: #818CF8; }

  @media (max-width: 980px) {
    .hero { grid-template-columns: 1fr; }
    .demo-visual { min-height: 320px; }
    .cards-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 680px) {
    .navbar { flex-direction: column; align-items: flex-start; gap: 16px; }
    .hero-stats { flex-direction: column; }
    .page-inner { padding: 24px 16px 40px; }
  }
`;

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="#4F46E5" />
      <path d="M8 14C8 10.686 10.686 8 14 8C17.314 8 20 10.686 20 14C20 17.314 17.314 20 14 20" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="14" cy="20" r="1.6" fill="white" />
    </svg>
    <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15.5, color: "#0F1117", letterSpacing: "-0.3px" }}>
      Bayan Demo
    </span>
  </div>
);

const metrics = [
  { value: "15x", label: "Résolution plus rapide" },
  { value: "92%", label: "Satisfaction utilisateurs" },
  { value: "80%", label: "Automatisation des réponses" },
];

export default function Demo() {
  const navigate = useNavigate();

  return (
    <div className="page-shell">
      <style>{CSS}</style>
      <div className="page-inner">
        <nav className="navbar">
          <Logo />
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {[
              { name: "Accueil", path: "/" },
              { name: "Fonctionnalités", path: "/fonctionnalites" },
              { name: "À propos", path: "/a-propos" },
            ].map((item) => (
              <a
                key={item.name}
                href="#"
                className={item.path === "/" ? "nav-link active" : "nav-link"}
                onClick={(e) => { e.preventDefault(); navigate(item.path); }}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-connect" onClick={() => navigate("/login")}>Se connecter</button>
            <button className="btn-primary-nav" onClick={() => navigate("/login")}>Déposer une réclamation</button>
          </div>
        </nav>

        <section className="hero">
          <div>
            <div className="hero-badge">
              <span className="badge-dot" /> Demo / Cas d'usage
            </div>
            <h1 className="hero-title">
              Une plateforme de réclamation qui transforme <br />
              l'expérience interne.
            </h1>
            <p className="hero-desc">
              Découvrez notre savoir-faire avec un aperçu visuel de l'expérience utilisateur,
              des workflows collaboratifs et des actions qui rendent chaque incident plus facile à résoudre.
            </p>
            <div className="hero-ctas">
              <button className="btn-cta-main" style={{ background: "#4F46E5", color: "#fff", border: "none" }} onClick={() => navigate("/login")}>Tester la plateforme</button>
              <button className="btn-cta-sec" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }} onClick={() => navigate("/login")}>Voir les solutions</button>
            </div>
            <div className="hero-stats">
              {metrics.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <div className="hero-number">{stat.value}</div>
                  <div className="hero-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="demo-visual">
            <div className="hero-chip">
              <span /> Gestion de réclamations instantanée
            </div>
            <div className="demo-panel">
              <div className="panel-card">
                <div className="panel-title">Ticket en temps réel</div>
                <div className="panel-value">Serveur noirci</div>
                <div className="panel-note">Suivi des incidents de bout en bout, avec état, priorités et affectations claires.</div>
              </div>
              <div className="panel-row">
                <div className="panel-card">
                  <div className="panel-title">Priorité</div>
                  <div className="panel-value">Urgent</div>
                  <div className="panel-note">Notifications automatiques à l'équipe support et aux responsables.</div>
                </div>
                <div className="panel-card">
                  <div className="panel-title">Statut</div>
                  <div className="panel-value">En cours</div>
                  <div className="panel-note">Mise à jour instantanée dès qu'un commentaire est posté.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <h2>Ce que nous faisons vraiment</h2>
              <p>Notre plateforme met en lumière les cas concrets : détection rapide, collaboration fluide, résolution avec des métriques claires.</p>
            </div>
          </div>
          <div className="cards-grid">
            <div className="story-card">
              <div className="story-badge">Flux intelligent</div>
              <div className="story-title">Réclamations structurées</div>
              <p className="story-text">Des formulaires adaptatifs guident l'utilisateur dans chaque étape, réduisant les erreurs et accélérant la saisie.</p>
              <div className="story-list">
                <div className="story-item"><div className="story-icon">🧭</div><div className="story-label">Parcours utilisateur clair</div></div>
                <div className="story-item"><div className="story-icon">💡</div><div className="story-label">Aide contextuelle intégrée</div></div>
              </div>
            </div>
            <div className="story-card">
              <div className="story-badge">Opérations</div>
              <div className="story-title">Collaboration d'équipe</div>
              <p className="story-text">Chaque ticket devient un espace commun pour commentaires, assignations et validations, sans perte d'information.</p>
              <div className="story-list">
                <div className="story-item"><div className="story-icon">👥</div><div className="story-label">Commentaires instantanés</div></div>
                <div className="story-item"><div className="story-icon">🔔</div><div className="story-label">Alertes intelligentes</div></div>
              </div>
            </div>
            <div className="story-card">
              <div className="story-badge">Impact</div>
              <div className="story-title">Résultats mesurables</div>
              <p className="story-text">Des indicateurs de performance clairs vous montrent l'impact réel : temps de résolution, satisfaction et workflows optimisés.</p>
              <div className="story-list">
                <div className="story-item"><div className="story-icon">📈</div><div className="story-label">Rapports embarqués</div></div>
                <div className="story-item"><div className="story-icon">✅</div><div className="story-label">Suivi des SLA</div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="callout">
          <div className="callout-text">
            <h3>Donnez vie à votre support interne</h3>
            <p>Avec la bonne plateforme, chaque réclamation devient une opportunité d'amélioration continue et de meilleure collaboration.</p>
          </div>
          <div className="callout-graph">
            <div className="bar fill1"></div>
            <div className="bar fill2"></div>
            <div className="bar fill3"></div>
            <button onClick={() => navigate("/login")}>Voir la plateforme</button>
          </div>
        </section>
      </div>
    </div>
  );
}
