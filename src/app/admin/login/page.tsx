"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Cesar2001.") {
      document.cookie = "admin_token=auth_cesar_2001; path=/; max-age=86400";
      router.push("/admin");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text)",
        fontFamily: "var(--font-inter), sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <nav style={{ background: 'transparent', border: 'none' }}>
        <Link href="/" className="nav-brand">
          <div className="nav-logo">LS</div>
          <span className="nav-name">LINKSURPRISE</span>
        </Link>
        <div className="nav-cta">
          <button className="lang-switch" onClick={toggleLanguage}>
            {language === "es" ? "EN" : "ES"}
          </button>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="editor-shell"
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "40px",
          background: "var(--bg2)",
          position: 'relative',
          zIndex: 1
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ 
            width: 60, height: 60, borderRadius: '50%', 
            background: 'var(--pink-dim)', border: '1px solid var(--border-pink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: '24px'
          }}>
            🔐
          </div>
          <h1 style={{ 
            fontFamily: "var(--font-montserrat)", 
            fontSize: "24px", 
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.02em" 
          }}>
            {language === 'es' ? 'ACCESO ADMIN' : 'ADMIN LOGIN'}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "8px" }}>
            {language === 'es' ? 'Solo personal autorizado' : 'Authorized personnel only'}
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "24px" }}>
            <label className="section-label" style={{ fontSize: '10px', marginBottom: 8, display: 'block', padding: 0, background: 'none', border: 'none' }}>
              {language === 'es' ? 'CONTRASEÑA' : 'PASSWORD'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                background: "var(--surface)",
                border: error ? "1px solid #ff5f57" : "1px solid var(--border)",
                color: "var(--text)",
                outline: "none",
                transition: "all 0.3s",
                fontSize: "14px"
              }}
              placeholder="••••••••"
            />
            {error && (
              <span style={{ color: "#ff5f57", fontSize: "12px", marginTop: "8px", display: "block", fontWeight: 600 }}>
                {language === 'es' ? 'Contraseña incorrecta' : 'Incorrect password'}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "14px"
            }}
          >
            {language === 'es' ? 'ENTRAR' : 'SIGN IN'}
          </button>
        </form>
        
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Link href="/" style={{ fontSize: 12, color: 'var(--text-dim)', textDecoration: 'none' }}>
            {language === 'es' ? '← Volver al inicio' : '← Back to home'}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
