import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "About Us", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Reservations", path: "/reservations" },
  { label: "Contact", path: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0f0e0d", color: "#fef3c7" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Col 1: Logo + description */}
          <div>
            <div
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#d97706",
                letterSpacing: "0.08em",
                marginBottom: "12px",
              }}
            >
              EMBER &amp; OAK
            </div>
            <p
              style={{
                fontStyle: "italic",
                color: "#fbbf24",
                fontSize: "0.9375rem",
                marginBottom: "16px",
                fontFamily: '"Playfair Display", Georgia, serif',
              }}
            >
              "Where every bite tells a story"
            </p>
            <p style={{ color: "#a8a29e", fontSize: "0.875rem", lineHeight: 1.7 }}>
              Modern American fine dining rooted in seasonal ingredients, artful
              technique, and genuine hospitality. Join us for an evening you'll
              never forget.
            </p>
          </div>

          {/* Col 2: Quick links */}
          <div>
            <h3
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#d97706",
                marginBottom: "20px",
              }}
            >
              Quick Links
            </h3>
            <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    color: "#a8a29e",
                    textDecoration: "none",
                    fontSize: "0.9375rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fbbf24")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#a8a29e")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Contact + hours */}
          <div>
            <h3
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#d97706",
                marginBottom: "20px",
              }}
            >
              Find Us
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#a8a29e", fontSize: "0.9rem" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>142 Oak & Ember Lane,<br />New York, NY 10012</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z" />
                </svg>
                <span>+1 (212) 555-0182</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>reservations@emberandoak.com</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <div style={{ color: "#fef3c7", fontWeight: 500, marginBottom: "6px" }}>Hours</div>
                <div>Mon–Thu: 5:30 PM – 10:00 PM</div>
                <div>Fri–Sat: 5:00 PM – 11:00 PM</div>
                <div>Sunday: 5:00 PM – 9:30 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div style={{ height: "1px", backgroundColor: "#d97706", opacity: 0.35, marginBottom: "28px" }} />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <p style={{ color: "#a8a29e", fontSize: "0.8125rem" }}>
            © {new Date().getFullYear()} Ember &amp; Oak. All rights reserved.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "20px" }}>
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              style={{ color: "#a8a29e", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#d97706")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#a8a29e")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              style={{ color: "#a8a29e", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#d97706")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#a8a29e")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Twitter / X */}
            <a
              href="#"
              aria-label="Twitter"
              style={{ color: "#a8a29e", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#d97706")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#a8a29e")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
