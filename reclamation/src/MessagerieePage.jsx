import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

// ── CSS ─────────────────────────────────────────────────────────────────────
export const MSG_CSS = `
  .msg-layout { display: flex; height: calc(100vh - 112px); overflow: hidden; background: #F4F5FA; }
  .msg-contacts { width: 300px; flex-shrink: 0; background: #fff; border-right: 1px solid rgba(0,0,0,0.06); display: flex; flex-direction: column; }
  .msg-contacts-header { padding: 18px 16px 12px; border-bottom: 1px solid rgba(0,0,0,0.06); }
  .msg-contacts-title { font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 700; color: #0F1117; margin-bottom: 12px; }
  .msg-search { display: flex; align-items: center; gap: 7px; background: #F4F5FA; border: 1px solid #E5E7EB; border-radius: 9px; padding: 8px 11px; }
  .msg-search input { background: none; border: none; outline: none; font-size: 12.5px; color: #0F1117; width: 100%; font-family: 'DM Sans', sans-serif; }
  .msg-search input::placeholder { color: #B0B7C3; }
  .msg-contacts-list { flex: 1; overflow-y: auto; padding: 8px; }
  .msg-contact-item { display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 10px; cursor: pointer; transition: background 0.15s; position: relative; }
  .msg-contact-item:hover { background: #F4F5FA; }
  .msg-contact-item.active { background: #EEF2FF; }
  .msg-av { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 700; color: #fff; flex-shrink: 0; position: relative; }
  .msg-online-dot { position: absolute; bottom: 1px; right: 1px; width: 9px; height: 9px; border-radius: 50%; background: #10B981; border: 1.5px solid #fff; }
  .msg-contact-info { flex: 1; min-width: 0; }
  .msg-contact-name { font-size: 13px; font-weight: 500; color: #111827; margin-bottom: 2px; }
  .msg-contact-preview { font-size: 11.5px; color: #9CA3AF; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .msg-contact-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
  .msg-contact-time { font-size: 10px; color: #B0B7C3; }
  .msg-unread-badge { background: #4F46E5; color: #fff; font-size: 9px; font-weight: 700; border-radius: 99px; padding: 1px 6px; min-width: 16px; text-align: center; }

  .msg-chat { flex: 1; display: flex; flex-direction: column; min-width: 0; height: 100%; }
  .msg-chat-header { height: 62px; background: #fff; border-bottom: 1px solid rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: space-between; padding: 0 22px; flex-shrink: 0; }
  .msg-chat-header-left { display: flex; align-items: center; gap: 10px; }
  .msg-chat-name { font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 700; color: #0F1117; }
  .msg-chat-status { font-size: 11px; color: #10B981; font-weight: 500; }

  .msg-messages { flex: 1; overflow-y: auto; padding: 20px 22px; display: flex; flex-direction: column; gap: 4px; min-height: 0; }
  .msg-messages::-webkit-scrollbar { width: 4px; }
  .msg-messages::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 99px; }

  .msg-date-sep { text-align: center; margin: 12px 0 8px; }
  .msg-date-sep span { font-size: 10.5px; color: #B0B7C3; background: #F4F5FA; padding: 3px 10px; border-radius: 99px; }

  .msg-row { display: flex; align-items: flex-end; gap: 8px; margin-bottom: 2px; }
  .msg-row.mine { flex-direction: row-reverse; }
  .msg-bubble-av { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; color: #fff; flex-shrink: 0; margin-bottom: 2px; }
  .msg-bubble-wrap { max-width: 62%; display: flex; flex-direction: column; }
  .msg-row.mine .msg-bubble-wrap { align-items: flex-end; }
  .msg-sender-name { font-size: 10px; color: #9CA3AF; margin-bottom: 3px; padding-left: 2px; }
  .msg-bubble { padding: 10px 13px; border-radius: 14px; font-size: 13px; line-height: 1.55; word-break: break-word; animation: msgSlideIn 0.2s ease; }
  .msg-bubble.theirs { background: #fff; color: #111827; border: 1px solid rgba(0,0,0,0.06); border-bottom-left-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
  .msg-bubble.mine { background: #4F46E5; color: #fff; border-bottom-right-radius: 4px; }
  .msg-bubble-time { font-size: 9.5px; color: #B0B7C3; margin-top: 3px; padding: 0 3px; }
  .msg-row.mine .msg-bubble-time { text-align: right; color: rgba(79,70,229,0.6); }
  @keyframes msgSlideIn { from { opacity:0; transform: translateY(6px); } to { opacity:1; transform: translateY(0); } }

  .msg-file { display: flex; align-items: center; gap: 9px; background: rgba(255,255,255,0.15); border-radius: 8px; padding: 8px 10px; margin-top: 4px; }
  .msg-bubble.theirs .msg-file { background: #F4F5FA; }
  .msg-file-icon { width: 28px; height: 28px; border-radius: 7px; background: #4F46E5; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .msg-bubble.mine .msg-file-icon { background: rgba(255,255,255,0.25); }
  .msg-file-name { font-size: 11.5px; font-weight: 500; }
  .msg-file-size { font-size: 10px; opacity: 0.65; }

  .msg-typing-dots { display: flex; gap: 3px; padding: 4px 2px; }
  .msg-typing-dots span { width: 6px; height: 6px; border-radius: 50%; background: #B0B7C3; animation: typingBounce 1.2s infinite; }
  .msg-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
  .msg-typing-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typingBounce { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-5px); } }

  .msg-input-bar { background: #fff; border-top: 1px solid rgba(0,0,0,0.06); padding: 12px 16px; display: flex; align-items: flex-end; gap: 10px; flex-shrink: 0; }
  .msg-input-wrap { flex: 1; background: #F4F5FA; border: 1.5px solid #E5E7EB; border-radius: 12px; padding: 10px 12px; display: flex; align-items: flex-end; gap: 8px; transition: border-color 0.2s; }
  .msg-input-wrap.focused { border-color: #4F46E5; background: #fff; }
  .msg-input-wrap textarea { flex: 1; background: none; border: none; outline: none; font-size: 13.5px; font-family: 'DM Sans', sans-serif; color: #0F1117; resize: none; max-height: 120px; line-height: 1.5; }
  .msg-input-wrap textarea::placeholder { color: #B0B7C3; }
  .msg-emoji-btn { width: 26px; height: 26px; border: none; background: none; cursor: pointer; font-size: 15px; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
  .msg-emoji-btn:hover { background: #E5E7EB; }
  .msg-input-attach { width: 26px; height: 26px; border: none; background: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #9CA3AF; border-radius: 6px; }
  .msg-input-attach:hover { background: #E5E7EB; color: #4F46E5; }
  .msg-send-btn { width: 40px; height: 40px; border-radius: 11px; border: none; background: #4F46E5; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; flex-shrink: 0; }
  .msg-send-btn:hover { background: #4338CA; }
  .msg-send-btn:disabled { background: #E5E7EB; cursor: not-allowed; }

  .msg-emoji-picker { position: absolute; bottom: 68px; right: 16px; background: #fff; border: 1px solid #E5E7EB; border-radius: 12px; padding: 10px; box-shadow: 0 8px 28px rgba(0,0,0,0.12); display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; z-index: 100; }
  .msg-emoji-picker button { width: 30px; height: 30px; font-size: 16px; border: none; background: none; cursor: pointer; border-radius: 6px; }
  .msg-emoji-picker button:hover { background: #F4F5FA; }

  .msg-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #B0B7C3; gap: 12px; }
  .msg-empty-icon { width: 56px; height: 56px; border-radius: 16px; background: #F4F5FA; display: flex; align-items: center; justify-content: center; }
  .msg-empty-text { font-size: 13.5px; color: #9CA3AF; }
  .msg-empty-sub { font-size: 12px; color: #C4C9D4; }

  .msg-loading { display: flex; align-items: center; justify-content: center; flex: 1; color: #9CA3AF; font-size: 13px; }
  .msg-error { background: #FEF2F2; border: 1px solid #FECACA; border-radius: 8px; padding: 10px 14px; margin: 12px; font-size: 12.5px; color: #DC2626; }
  .msg-contacts-list::-webkit-scrollbar { width: 3px; }
  .msg-contacts-list::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 99px; }
`;

const EMOJIS = ["😊","👍","🙏","❤️","🔥","😂","😮","👀","✅","⚡","🚀","💡","📎","🎉","😎","🤝"];
const COLORS  = ["#4F46E5","#10B981","#F59E0B","#8B5CF6","#EC4899","#0EA5E9","#EF4444","#14B8A6"];

const getInitials = (nom) => nom?.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase() || "??";
const getColor    = (id)  => COLORS[id % COLORS.length];

const BASE_URL = "http://localhost:8000/api";
const getHeaders = () => {
  const token = localStorage.getItem("bayan_token");
  return { "Content-Type":"application/json", Accept:"application/json", ...(token ? { Authorization:`Bearer ${token}` } : {}) };
};

const apiFetch = async (endpoint, options = {}) => {
  const res  = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers: getHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur");
  return data;
};

export default function MessagerieePage() {
  const { currentUser } = useAuth();

  const [contacts,       setContacts]       = useState([]);
  const [activeContact,  setActiveContact]  = useState(null);
  const [messages,       setMessages]       = useState([]);
  const [searchQ,        setSearchQ]        = useState("");
  const [inputText,      setInputText]      = useState("");
  const [inputFocused,   setInputFocused]   = useState(false);
  const [showEmoji,      setShowEmoji]      = useState(false);
  const [typing,         setTyping]         = useState(false);
  const [loadingMsgs,    setLoadingMsgs]    = useState(false);
  const [loadingContacts,setLoadingContacts]= useState(true);
  const [sending,        setSending]        = useState(false);
  const [error,          setError]          = useState("");

  const messagesEndRef = useRef(null);
  const textareaRef    = useRef(null);
  const typingTimer    = useRef(null);
  const fileInputRef   = useRef(null);
  const pollRef        = useRef(null);

  // ── Fetch contacts ────────────────────────────────────────────
  const fetchContacts = useCallback(async () => {
    try {
      const data = await apiFetch("/messages/contacts");
      setContacts(data);
    } catch (_) {}
    finally { setLoadingContacts(false); }
  }, []);

  useEffect(() => {
    fetchContacts();
    // Poll contacts every 5s for unread updates
    pollRef.current = setInterval(fetchContacts, 5000);
    return () => clearInterval(pollRef.current);
  }, [fetchContacts]);

  // ── Fetch messages when contact changes ───────────────────────
  const fetchMessages = useCallback(async (contactId) => {
    if (!contactId) return;
    setLoadingMsgs(true);
    try {
      const data = await apiFetch(`/messages/${contactId}`);
      setMessages(data);
    } catch (_) {}
    finally { setLoadingMsgs(false); }
  }, []);

  // Poll messages every 3s when chat open
  useEffect(() => {
    if (!activeContact) return;
    fetchMessages(activeContact.id);
    const interval = setInterval(() => fetchMessages(activeContact.id), 3000);
    return () => clearInterval(interval);
  }, [activeContact, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const selectContact = (contact) => {
    setActiveContact(contact);
    setShowEmoji(false);
    setError("");
    // Reset unread locally
    setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, unread: 0 } : c));
  };

  // ── Send message ──────────────────────────────────────────────
  const sendMessage = async (fichier = null) => {
    if ((!inputText.trim() && !fichier) || !activeContact || sending) return;
    setSending(true);
    const text = inputText.trim() || (fichier ? "Fichier joint" : "");
    setInputText("");

    try {
      const payload = {
        receiver_id:    activeContact.id,
        contenu:        text,
        fichier_nom:    fichier?.name    || null,
        fichier_taille: fichier?.size    || null,
      };
      const newMsg = await apiFetch("/messages", { method: "POST", body: JSON.stringify(payload) });
      setMessages(prev => [...prev, newMsg]);
      fetchContacts();
    } catch (err) {
      setError("Erreur envoi message.");
    } finally {
      setSending(false);
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const insertEmoji = (emoji) => {
    setInputText(prev => prev + emoji);
    setShowEmoji(false);
    textareaRef.current?.focus();
  };

  const handleAttachFile = (e) => {
    const file = e.target.files?.[0];
    if (!file || !activeContact) return;
    const sizeKo = Math.max(1, Math.round(file.size / 1024));
    sendMessage({ name: file.name, size: `${sizeKo} Ko` });
    e.target.value = "";
  };

  const filteredContacts = contacts.filter(c =>
    c.nom.toLowerCase().includes(searchQ.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQ.toLowerCase())
  );

  const totalUnread = contacts.reduce((a, c) => a + (c.unread || 0), 0);

  // Group messages by date
  const groupedMsgs = [];
  let lastDate = null;
  messages.forEach(m => {
    if (m.date !== lastDate) { groupedMsgs.push({ type: "date", date: m.date }); lastDate = m.date; }
    groupedMsgs.push({ type: "msg", ...m });
  });

  return (
    <div className="msg-layout">
      <style>{MSG_CSS}</style>

      {/* ── CONTACT LIST ── */}
      <div className="msg-contacts">
        <div className="msg-contacts-header">
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div className="msg-contacts-title">Messages</div>
            {totalUnread > 0 && (
              <span style={{ background:"#EF4444", color:"#fff", fontSize:10, fontWeight:700, borderRadius:99, padding:"1px 7px" }}>
                {totalUnread} nouveau{totalUnread > 1 ? "x" : ""}
              </span>
            )}
          </div>
          <div className="msg-search" style={{ marginTop:10 }}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="#B0B7C3" strokeWidth="1.4"/>
              <path d="M9.5 9.5L12 12" stroke="#B0B7C3" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input placeholder="Rechercher..." value={searchQ} onChange={e => setSearchQ(e.target.value)}/>
          </div>
        </div>

        <div className="msg-contacts-list">
          {loadingContacts ? (
            <div className="msg-loading">Chargement...</div>
          ) : filteredContacts.map(contact => {
            const isActive = activeContact?.id === contact.id;
            return (
              <div key={contact.id} className={`msg-contact-item${isActive ? " active" : ""}`} onClick={() => selectContact(contact)}>
                <div className="msg-av" style={{ background: getColor(contact.id) }}>
                  {getInitials(contact.nom)}
                  <div className="msg-online-dot"/>
                </div>
                <div className="msg-contact-info">
                  <div className="msg-contact-name">{contact.nom}</div>
                  <div className="msg-contact-preview">
                    {contact.last_msg
                      ? (contact.last_msg.sender_id === currentUser?.id ? "Vous : " : "") + contact.last_msg.contenu
                      : <span style={{ fontStyle:"italic", color:"#C4C9D4" }}>Démarrer une conversation</span>
                    }
                  </div>
                </div>
                <div className="msg-contact-meta">
                  {contact.last_msg && <div className="msg-contact-time">{contact.last_msg.created_at}</div>}
                  {contact.unread > 0 && <div className="msg-unread-badge">{contact.unread}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CHAT AREA ── */}
      {activeContact ? (
        <div className="msg-chat" style={{ position:"relative" }}>
          <div className="msg-chat-header">
            <div className="msg-chat-header-left">
              <div className="msg-av" style={{ background: getColor(activeContact.id), width:36, height:36, fontSize:10.5 }}>
                {getInitials(activeContact.nom)}
                <div className="msg-online-dot"/>
              </div>
              <div>
                <div className="msg-chat-name">{activeContact.nom}</div>
                <div className="msg-chat-status">● En ligne · {activeContact.role}</div>
              </div>
            </div>
          </div>

          {error && <div className="msg-error">{error}</div>}

          <div className="msg-messages">
            {loadingMsgs && messages.length === 0 ? (
              <div className="msg-loading">Chargement des messages...</div>
            ) : groupedMsgs.map((item, i) => {
              if (item.type === "date") return (
                <div className="msg-date-sep" key={`date-${i}`}><span>{item.date}</span></div>
              );
              const isMe    = item.from === "me";
              const contact = contacts.find(c => c.id === item.sender_id);
              return (
                <div className={`msg-row${isMe ? " mine" : ""}`} key={item.id}>
                  <div style={{ width:26, flexShrink:0 }}>
                    {!isMe && (
                      <div className="msg-bubble-av" style={{ background: getColor(activeContact.id) }}>
                        {getInitials(activeContact.nom)}
                      </div>
                    )}
                  </div>
                  <div className="msg-bubble-wrap">
                    <div className={`msg-bubble ${isMe ? "mine" : "theirs"}`}>
                      {item.contenu}
                      {item.fichier_nom && (
                        <div className="msg-file">
                          <div className="msg-file-icon">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M9 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V6L9 1z" stroke="white" strokeWidth="1.3"/>
                              <path d="M9 1v5h5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                            </svg>
                          </div>
                          <div>
                            <div className="msg-file-name">{item.fichier_nom}</div>
                            <div className="msg-file-size">{item.fichier_taille}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="msg-bubble-time">{item.time}</div>
                  </div>
                </div>
              );
            })}

            {typing && (
              <div className="msg-row">
                <div style={{ width:26, flexShrink:0 }}>
                  <div className="msg-bubble-av" style={{ background: getColor(activeContact.id) }}>
                    {getInitials(activeContact.nom)}
                  </div>
                </div>
                <div className="msg-bubble-wrap">
                  <div className="msg-bubble theirs" style={{ padding:"10px 14px" }}>
                    <div className="msg-typing-dots"><span/><span/><span/></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef}/>
          </div>

          <div className="msg-input-bar" style={{ position:"relative" }}>
            {showEmoji && (
              <div className="msg-emoji-picker">
                {EMOJIS.map(e => <button key={e} onClick={() => insertEmoji(e)}>{e}</button>)}
              </div>
            )}
            <div className={`msg-input-wrap${inputFocused ? " focused" : ""}`}>
              <textarea
                ref={textareaRef}
                rows={1}
                placeholder={`Message à ${activeContact.nom}...`}
                value={inputText}
                onChange={e => {
                  setInputText(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
              />
              <button className="msg-emoji-btn" onClick={() => setShowEmoji(v => !v)}>😊</button>
              <input ref={fileInputRef} type="file" style={{ display:"none" }} onChange={handleAttachFile}/>
              <button className="msg-input-attach" onClick={() => fileInputRef.current?.click()} title="Joindre">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M14 8.5l-5.5 5.5a4 4 0 01-5.66-5.66L8 3a2.5 2.5 0 013.54 3.54L6 12a1 1 0 01-1.41-1.41L9.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <button className="msg-send-btn" onClick={() => sendMessage()} disabled={!inputText.trim() || sending}>
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M16 2L2 7.5l5.5 1.5L10 16l6-14z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="msg-chat">
          <div className="msg-empty">
            <div className="msg-empty-icon">
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <path d="M4 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H8l-4 4V6z" stroke="#C4C9D4" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M8 10h12M8 14h8" stroke="#C4C9D4" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="msg-empty-text">Sélectionnez une conversation</div>
            <div className="msg-empty-sub">Choisissez un collègue pour démarrer un échange</div>
          </div>
        </div>
      )}
    </div>
  );
}