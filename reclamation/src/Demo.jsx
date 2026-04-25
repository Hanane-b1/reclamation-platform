import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:    #0F1117;
    --paper:  #F4F5FA;
    --indigo: #4F46E5;
    --violet: #4338CA;
    --mint:   #10B981;
    --amber:  #F59E0B;
    --rose:   #F43F5E;
    --muted:  #6B7280;
    --border: rgba(0,0,0,0.06);
    --card:   #FFFFFF;
    --grain:  url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); overflow-x: hidden; }

  /* ── NOISE OVERLAY ── */
  .noise-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: var(--grain);
    opacity: 0.2;
  }

  /* ── NAV ── */
  .demo-nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 64px;
    background: rgba(255,255,255,0.88); backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }
  .demo-logo { display: flex; align-items: center; gap: 9px; text-decoration: none; }
  .demo-logo span { font-family: 'Sora', sans-serif; font-weight: 800; font-size: 15px; color: #0F1117; letter-spacing: -0.4px; }
  .demo-nav-links { display: flex; gap: 28px; }
  .demo-nav-link { font-size: 13px; color: #6B7280; text-decoration: none; font-weight: 400; transition: color 0.2s; letter-spacing: 0.01em; }
  .demo-nav-link:hover { color: #0F1117; }
  .demo-nav-link.active { color: #0F1117; font-weight: 500; }
  .demo-nav-btns { display: flex; gap: 10px; }
  .nav-btn-ghost { background: none; border: 1px solid rgba(0,0,0,0.12); border-radius: 8px; padding: 8px 16px; font-size: 12.5px; color: #374151; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .nav-btn-ghost:hover { background: rgba(0,0,0,0.05); border-color: #6B7280; }
  .nav-btn-solid { background: #1C1C2E; color: #fff; border: none; border-radius: 8px; padding: 8px 16px; font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: 'Sora', sans-serif; transition: background 0.2s; }
  .nav-btn-solid:hover { background: #2D2D44; }

  /* ── HERO ── */
  .demo-hero {
    position: relative; overflow: hidden;
    min-height: 92vh; display: flex; align-items: center;
    padding: 80px 48px;
    background: var(--paper);
  }
  .demo-hero-glow {
    position: absolute; pointer-events: none;
  }
  .demo-hero-glow.g1 {
    top: -120px; left: -80px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 65%);
    border-radius: 50%;
    animation: glowPulse 6s ease-in-out infinite;
  }
  .demo-hero-glow.g2 {
    bottom: -100px; right: -60px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(67,56,202,0.06) 0%, transparent 65%);
    border-radius: 50%;
    animation: glowPulse 8s ease-in-out infinite reverse;
  }
  .demo-hero-glow.g3 {
    top: 40%; left: 40%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 65%);
    border-radius: 50%;
  }
  @keyframes glowPulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.12); opacity: 0.7; }
  }

  .demo-hero-inner { position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }

  .demo-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 28px; }
  .demo-eyebrow-pill { background: #F0F0FF; border: 1px solid #C7C5FF; border-radius: 99px; padding: 6px 14px; font-size: 10.5px; font-weight: 700; color: #4F46E5; letter-spacing: 1.2px; text-transform: uppercase; font-family: 'Space Mono', monospace; }
  .demo-eyebrow-line { width: 40px; height: 1px; background: #4F46E5; }

  .demo-hero-title { font-family: 'Sora', sans-serif; font-size: 56px; font-weight: 900; line-height: 1.0; color: #0F1117; letter-spacing: -2px; }
  .demo-hero-title .accent { color: transparent; background: linear-gradient(135deg, #4F46E5, #7C3AED); -webkit-background-clip: text; background-clip: text; }
  .demo-hero-title .line2 { display: block; color: #6B7280; font-weight: 300; font-style: italic; }

  .demo-hero-sub { margin-top: 22px; font-size: 15px; color: #6B7280; line-height: 1.8; max-width: 460px; }

  .demo-hero-ctas { display: flex; gap: 12px; margin-top: 36px; }
  .hero-cta-primary { background: #4F46E5; color: #fff; border: none; border-radius: 10px; padding: 14px 24px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Sora', sans-serif; transition: all 0.2s; display: flex; align-items: center; gap: 8px; }
  .hero-cta-primary:hover { background: #4338CA; transform: translateY(-1px); box-shadow: 0 12px 32px rgba(79,70,229,0.35); }
  .hero-cta-ghost { background: #F9FAFB; color: #374151; border: 1px solid #E5E7EB; border-radius: 10px; padding: 14px 24px; font-size: 14px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .hero-cta-ghost:hover { background: #F3F4F6; border-color: #9CA3AF; }

  .demo-hero-metrics { display: flex; gap: 32px; margin-top: 48px; padding-top: 32px; border-top: 1px solid rgba(0,0,0,0.08); }
  .demo-metric { }
  .demo-metric-val { font-family: 'Sora', sans-serif; font-size: 26px; font-weight: 800; color: #0F1117; letter-spacing: -0.8px; }
  .demo-metric-lbl { font-size: 10.5px; color: #B0B7C3; letter-spacing: 0.8px; text-transform: uppercase; margin-top: 4px; }

  /* ── LIVE DEMO PANEL ── */
  .demo-panel-wrap {
    position: relative;
  }
  .demo-panel-frame {
    background: rgba(255,255,255,0.6);
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 20px;
    padding: 3px;
    backdrop-filter: blur(10px);
  }
  .demo-panel-inner {
    background: #FFFFFF;
    border-radius: 18px;
    overflow: hidden;
  }
  .demo-panel-topbar {
    display: flex; align-items: center; gap: 7px;
    padding: 12px 16px;
    background: rgba(0,0,0,0.02);
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }
  .demo-panel-dot { width: 10px; height: 10px; border-radius: 50%; }
  .demo-panel-title { font-family: 'Space Mono', monospace; font-size: 10px; color: #6B7280; margin-left: 8px; }
  .demo-panel-body { padding: 20px; display: flex; flex-direction: column; gap: 12px; }

  .demo-ticket-card {
    background: rgba(0,0,0,0.02);
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 12px;
    padding: 14px 16px;
    transition: all 0.3s;
    cursor: default;
    animation: ticketSlide 0.5s ease both;
  }
  .demo-ticket-card:hover { background: rgba(0,0,0,0.04); border-color: rgba(79,70,229,0.3); }
  .demo-ticket-card.featured { border-color: rgba(79,70,229,0.3); background: rgba(79,70,229,0.08); }
  @keyframes ticketSlide {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .dtc-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
  .dtc-id { font-family: 'Space Mono', monospace; font-size: 9.5px; color: #6B7280; }
  .dtc-badge { font-size: 8.5px; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.4px; }
  .dtc-badge.urgent { background: rgba(244,63,94,0.15); color: #F43F5E; }
  .dtc-badge.cours  { background: rgba(245,158,11,0.15); color: #F59E0B; }
  .dtc-badge.resolu { background: rgba(16,185,129,0.15); color: #10B981; }

  .dtc-title { font-size: 12.5px; font-weight: 500; color: #0F1117; margin-bottom: 4px; }
  .dtc-sub   { font-size: 10.5px; color: #6B7280; }

  .dtc-progress { margin-top: 10px; }
  .dtc-progress-bar { height: 3px; background: rgba(0,0,0,0.06); border-radius: 99px; overflow: hidden; }
  .dtc-progress-fill { height: 3px; border-radius: 99px; background: linear-gradient(90deg, #4F46E5, #7C3AED); transition: width 1s ease; }
  .dtc-avatars { display: flex; margin-top: 8px; }
  .dtc-av { width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid #FFFFFF; margin-left: -5px; display: flex; align-items: center; justify-content: center; font-size: 7px; font-weight: 700; color: #fff; }
  .dtc-av:first-child { margin-left: 0; }

  /* ── SECTION: HOW IT WORKS ── */
  .demo-section { padding: 100px 48px; }
  .demo-section-inner { max-width: 1200px; margin: 0 auto; }

  .section-kicker { font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; color: #4F46E5; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 14px; }
  .section-title { font-family: 'Sora', sans-serif; font-size: 40px; font-weight: 800; color: #0F1117; letter-spacing: -1.2px; line-height: 1.1; }
  .section-title .muted { color: #6B7280; font-weight: 300; }
  .section-sub { font-size: 15px; color: #6B7280; line-height: 1.8; max-width: 520px; margin-top: 16px; }

  /* STEPS */
  .steps-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2px; margin-top: 60px; background: rgba(0,0,0,0.06); border-radius: 20px; overflow: hidden; }
  .step-card { background: #FFFFFF; padding: 32px 28px; position: relative; transition: background 0.2s; }
  .step-card:hover { background: #FAFBFF; }
  .step-num { font-family: 'Space Mono', monospace; font-size: 11px; color: #4F46E5; font-weight: 700; margin-bottom: 16px; letter-spacing: 0.5px; }
  .step-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 18px; }
  .step-icon.i1 { background: #EEF2FF; }
  .step-icon.i2 { background: #ECFDF5; }
  .step-icon.i3 { background: #FFF7ED; }
  .step-icon.i4 { background: #FFF1F2; }
  .step-title { font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 700; color: #0F1117; margin-bottom: 10px; }
  .step-desc  { font-size: 13px; color: #6B7280; line-height: 1.7; }

  /* ── ROLES ── */
  .roles-section { padding: 0 48px 100px; }
  .roles-inner { max-width: 1200px; margin: 0 auto; }
  .roles-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; margin-top: 52px; }
  .role-card { border-radius: 22px; padding: 32px 28px; position: relative; overflow: hidden; transition: transform 0.22s, box-shadow 0.22s; cursor: default; }
  .role-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
  .role-card.rc-admin  { background: linear-gradient(135deg, #1C1C2E 0%, #2D2D44 100%); }
  .role-card.rc-resp   { background: linear-gradient(135deg, #064E3B 0%, #065F46 100%); }
  .role-card.rc-emp    { background: linear-gradient(135deg, #1E3A5F 0%, #1E40AF 100%); }
  .role-card::before { content: ''; position: absolute; top: -40px; right: -40px; width: 160px; height: 160px; border-radius: 50%; background: rgba(255,255,255,0.04); }
  .role-tag { display: inline-flex; align-items: center; gap: 6px; border-radius: 99px; padding: 5px 12px; font-size: 10px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 20px; }
  .rc-admin .role-tag  { background: rgba(165,180,252,0.15); color: #A5B4FC; }
  .rc-resp  .role-tag  { background: rgba(52,211,153,0.15);  color: #34D399; }
  .rc-emp   .role-tag  { background: rgba(147,197,253,0.15); color: #93C5FD; }
  .role-title { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 700; color: #F8FAFC; margin-bottom: 12px; }
  .role-desc { font-size: 13px; color: rgba(248,250,252,0.7); line-height: 1.75; margin-bottom: 22px; }
  .role-features { display: flex; flex-direction: column; gap: 8px; }
  .role-feat { display: flex; align-items: center; gap: 9px; font-size: 12.5px; color: rgba(248,250,252,0.85); }
  .role-feat-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0; opacity: 0.6; }
  .role-cta { margin-top: 28px; padding: 10px 0; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.15); border-radius: 9px; font-size: 13px; font-weight: 600; color: #fff; cursor: pointer; width: 100%; font-family: 'Sora', sans-serif; transition: background 0.2s; }
  .role-cta:hover { background: rgba(255,255,255,0.18); }

  /* ── DEMO CTA ── */
  .demo-cta-section {
    padding: 0 48px 100px;
  }
  .demo-cta-inner {
    max-width: 1200px; margin: 0 auto;
    background: #1C1C2E; border-radius: 28px;
    padding: 72px 64px;
    display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 60px;
    position: relative; overflow: hidden;
  }
  .demo-cta-inner::before {
    content: '';
    position: absolute; top: -80px; right: 200px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 65%);
    border-radius: 50%;
  }
  .demo-cta-inner::after {
    content: '';
    position: absolute; bottom: -60px; right: -60px;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(67,56,202,0.15) 0%, transparent 65%);
    border-radius: 50%;
  }
  .demo-cta-text { position: relative; z-index: 2; }
  .demo-cta-kicker { font-family: 'Space Mono', monospace; font-size: 10px; color: #A5B4FC; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 700; margin-bottom: 16px; }
  .demo-cta-title { font-family: 'Sora', sans-serif; font-size: 42px; font-weight: 900; color: #F8FAFC; letter-spacing: -1.5px; line-height: 1.05; }
  .demo-cta-title em { font-style: italic; color: #818CF8; font-weight: 300; }
  .demo-cta-sub { font-size: 15px; color: rgba(248,250,252,0.7); line-height: 1.8; margin-top: 16px; max-width: 480px; }
  .demo-cta-btns { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 12px; flex-shrink: 0; }
  .cta-btn-main { background: #4F46E5; color: #fff; border: none; border-radius: 12px; padding: 16px 28px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Sora', sans-serif; transition: all 0.2s; white-space: nowrap; }
  .cta-btn-main:hover { background: #4338CA; box-shadow: 0 16px 40px rgba(79,70,229,0.4); }
  .cta-btn-sec { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 16px 28px; font-size: 14px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; white-space: nowrap; }
  .cta-btn-sec:hover { background: rgba(255,255,255,0.15); color: #fff; }

  /* ── FOOTER ── */
  .demo-footer {
    border-top: 1px solid #E5E7EB;
    padding: 24px 48px;
    display: flex; align-items: center; justify-content: space-between;
    background: #F9FAFB;
  }
  .footer-links { display: flex; gap: 22px; }
  .footer-links a { font-size: 11.5px; color: #6B7280; text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: #0F1117; }
  .footer-copy { font-size: 11.5px; color: #6B7280; }
`;

const Logo = () => (
  <div style={{ display:"flex", alignItems:"center", gap:9 }}>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="#4F46E5"/>
      <path d="M8 14C8 10.686 10.686 8 14 8C17.314 8 20 10.686 20 14C20 17.314 17.314 20 14 20" stroke="white" strokeWidth="1.9" strokeLinecap="round"/>
      <circle cx="14" cy="20" r="1.6" fill="white"/>
    </svg>
    <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:15.5, color:"var(--ink)", letterSpacing:"-0.4px" }}>Bayan</span>
  </div>
);

const DEMO_TICKETS = [
  { id:"VCL-8821", titre:"Panne serveur principal", service:"Informatique", statut:"urgent", pct:48, avs:[["#4F46E5","KA"],["#10B981","ZA"],["#F59E0B","SL"]], delay:"0s", featured:true },
  { id:"RC-3921",  titre:"Remboursement médical",   service:"RH",           statut:"cours",  pct:72, avs:[["#EC4899","AS"]],                               delay:"0.15s" },
  { id:"LG-5540",  titre:"Stock insuffisant",       service:"Logistique",   statut:"resolu", pct:100,avs:[["#8B5CF6","OM"]],                               delay:"0.3s" },
];

const STEPS = [
  { num:"01", icon:"📝", cls:"i1", title:"Déposer",   desc:"Créez une réclamation en 30 secondes avec nos formulaires intelligents." },
  { num:"02", icon:"🎯", cls:"i2", title:"Assigner",  desc:"Le responsable assigne automatiquement au bon intervenant." },
  { num:"03", icon:"⚡", cls:"i3", title:"Traiter",   desc:"L'équipe collabore, commente et résout en temps réel." },
  { num:"04", icon:"✅", cls:"i4", title:"Clôturer",  desc:"Ticket résolu, rapport généré, satisfaction mesurée." },
];

const ROLES = [
  {
    cls:"rc-admin", tag:"👑 Admin", title:"Administrateur",
    desc:"Vue globale sur toute la plateforme. Gère les utilisateurs, statistiques et configurations.",
    feats:["Dashboard analytics complet","Gestion de tous les tickets","Ajout / suppression d'utilisateurs","Rapports et exports"],
  },
  {
    cls:"rc-resp", tag:"🏢 Responsable", title:"Responsable Service",
    desc:"Supervise tous les services, assigne les tickets aux intervenants et suit les KPIs.",
    feats:["Vue multi-services","Assignation des intervenants","Chatbot IA intégré","Activité en temps réel"],
  },
  {
    cls:"rc-emp", tag:"👤 Employé", title:"Employé / Intervenant",
    desc:"Dépose des réclamations ou traite les tickets assignés selon son rôle.",
    feats:["Dépôt de réclamations","Suivi de mes tickets","Messagerie interne","Historique des actions"],
  },
];

export default function Demo() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({ 0: 48, 1: 72, 2: 100 });

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => ({
        0: Math.min(100, p[0] + Math.floor(Math.random() * 3)),
        1: p[1],
        2: p[2],
      }));
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div className="noise-bg"/>

      {/* NAV */}
      <nav className="demo-nav">
        <Logo/>
        <div className="demo-nav-links">
          {[["Accueil","/"],["Fonctionnalités","/fonctionnalites"],["À propos","/a-propos"],["Démo","/demo"]].map(([n,p]) => (
            <a key={n} href="#" className={`demo-nav-link${p==="/demo"?" active":""}`} onClick={e=>{e.preventDefault();navigate(p)}}>{n}</a>
          ))}
        </div>
        <div className="demo-nav-btns">
          <button className="nav-btn-ghost" onClick={()=>navigate("/login")}>Se connecter</button>
          <button className="nav-btn-solid" onClick={()=>navigate("/login")}>Déposer une réclamation</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="demo-hero">
        <div className="demo-hero-glow g1"/>
        <div className="demo-hero-glow g2"/>
        <div className="demo-hero-glow g3"/>
        <div className="demo-hero-inner">
          <div>
            <div className="demo-hero-eyebrow">
              <div className="demo-eyebrow-line"/>
              <div className="demo-eyebrow-pill">Découvrez la plateforme</div>
            </div>
            <h1 className="demo-hero-title">
              Gérez chaque
              <br/><span className="accent">réclamation</span>
              <br/><span className="line2">avec précision.</span>
            </h1>
            <p className="demo-hero-sub">
              Une interface conçue pour les équipes modernes — rapide, intuitive et collaborative.
              De la saisie à la résolution, tout en un seul endroit.
            </p>
            <div className="demo-hero-ctas">
              <button className="hero-cta-primary" onClick={()=>navigate("/login")}>
                Tester maintenant
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="hero-cta-ghost" onClick={()=>navigate("/")}>← Retour accueil</button>
            </div>
            <div className="demo-hero-metrics">
              {[["99.9%","Uptime garanti"],["< 24h","Délai de résolution"],["15k+","Tickets résolus/mois"]].map(([v,l]) => (
                <div className="demo-metric" key={l}>
                  <div className="demo-metric-val">{v}</div>
                  <div className="demo-metric-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* LIVE DEMO PANEL */}
          <div className="demo-panel-wrap">
            <div className="demo-panel-frame">
              <div className="demo-panel-inner">
                <div className="demo-panel-topbar">
                  <div className="demo-panel-dot" style={{background:"#F43F5E"}}/>
                  <div className="demo-panel-dot" style={{background:"#F59E0B"}}/>
                  <div className="demo-panel-dot" style={{background:"#10B981"}}/>
                  <span className="demo-panel-title">bayan.ma / dashboard — live</span>
                </div>
                <div className="demo-panel-body">
                  {DEMO_TICKETS.map((t, i) => (
                    <div key={t.id} className={`demo-ticket-card${t.featured?" featured":""}`} style={{animationDelay:t.delay}}>
                      <div className="dtc-top">
                        <span className="dtc-id">{t.id}</span>
                        <span className={`dtc-badge ${t.statut}`}>{t.statut === "urgent" ? "Urgent" : t.statut === "cours" ? "En cours" : "Résolu"}</span>
                      </div>
                      <div className="dtc-title">{t.titre}</div>
                      <div className="dtc-sub">{t.service} · mis à jour à l'instant</div>
                      {t.statut !== "resolu" && (
                        <div className="dtc-progress">
                          <div className="dtc-progress-bar">
                            <div className="dtc-progress-fill" style={{width:`${i===0?progress[0]:t.pct}%`}}/>
                          </div>
                        </div>
                      )}
                      <div className="dtc-avatars">
                        {t.avs.map(([bg,txt],j) => (
                          <div key={j} className="dtc-av" style={{background:bg}}>{txt}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="demo-section">
        <div className="demo-section-inner">
          <div className="section-kicker">Comment ça marche</div>
          <h2 className="section-title">4 étapes. <span className="muted">Rien de plus.</span></h2>
          <p className="section-sub">De la création à la résolution, chaque action est tracée et visible par toute l'équipe.</p>
          <div className="steps-grid">
            {STEPS.map(s => (
              <div key={s.num} className="step-card">
                <div className="step-num">{s.num} ——</div>
                <div className={`step-icon ${s.cls}`}>{s.icon}</div>
                <div className="step-title">{s.title}</div>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="roles-section">
        <div className="roles-inner">
          <div className="section-kicker">Espaces personnalisés</div>
          <h2 className="section-title">Un espace dédié<br/><span className="muted">pour chaque rôle.</span></h2>
          <p className="section-sub">Admin, Responsable, Employé ou Intervenant — chacun voit exactement ce dont il a besoin.</p>
          <div className="roles-grid">
            {ROLES.map(r => (
              <div key={r.title} className={`role-card ${r.cls}`}>
                <div className="role-tag">{r.tag}</div>
                <div className="role-title">{r.title}</div>
                <p className="role-desc">{r.desc}</p>
                <div className="role-features">
                  {r.feats.map(f => (
                    <div key={f} className="role-feat">
                      <div className="role-feat-dot"/>
                      {f}
                    </div>
                  ))}
                </div>
                <button className="role-cta" onClick={()=>navigate("/login")}>Accéder →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="demo-cta-section">
        <div className="demo-cta-inner">
          <div className="demo-cta-text">
            <div className="demo-cta-kicker">Prêt à commencer ?</div>
            <h2 className="demo-cta-title">Transformez vos<br/><em>réclamations</em><br/>en opportunités.</h2>
            <p className="demo-cta-sub">Connectez-vous et découvrez une plateforme pensée pour la performance et la collaboration.</p>
          </div>
          <div className="demo-cta-btns">
            <button className="cta-btn-main" onClick={()=>navigate("/login")}>Se connecter maintenant</button>
            <button className="cta-btn-sec" onClick={()=>navigate("/")}>← Retour à l'accueil</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="demo-footer">
        <Logo/>
        <p className="footer-copy">© 2026 Bayan. All rights reserved.</p>
        <div className="footer-links">
          {["Privacy Policy","Terms of Service","Cookie Policy","Security"].map(l => <a key={l} href="#">{l}</a>)}
        </div>
      </footer>
    </>
  );
}