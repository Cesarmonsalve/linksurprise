'use client';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-big-text">LINKSURPRISE</div>
      <div className="footer-content">
        <div className="footer-links">
          <a href="#templates">Plantillas</a>
          <a href="#pricing">Precios</a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
        </div>
        <span className="footer-copy">
          © {new Date().getFullYear()} LinkSurprise. Hecho con 💜
        </span>
      </div>
    </footer>
  );
}
