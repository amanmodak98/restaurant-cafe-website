import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
          backgroundColor: scrolled ? "rgba(41, 37, 36, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
            {/* Logo */}
            <Link
              to="/"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "1.375rem",
                fontWeight: 700,
                color: "#d97706",
                textDecoration: "none",
                letterSpacing: "0.08em",
              }}
            >
              EMBER &amp; OAK
            </Link>

            {/* Desktop nav */}
            <nav style={{ display: "flex", gap: "36px", alignItems: "center" }} className="hidden-mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    textDecoration: "none",
                    color: isActive(link.path) ? "#d97706" : "#fef3c7",
                    transition: "color 0.2s",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={(e) => { if (!isActive(link.path)) (e.currentTarget as HTMLAnchorElement).style.color = "#fbbf24"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = isActive(link.path) ? "#d97706" : "#fef3c7"; }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Reserve button + hamburger */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Link
                to="/reservations"
                style={{
                  backgroundColor: "#d97706",
                  color: "#1c1917",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "transform 0.2s, background-color 0.2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)";
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#b45309";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#d97706";
                }}
                className="reserve-btn"
              >
                Reserve a Table
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  color: "#fef3c7",
                  display: "none",
                }}
                className="hamburger-btn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {mobileOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: "320px",
              backgroundColor: "#1c1917",
              zIndex: 60,
              padding: "80px 32px 32px",
              borderLeft: "1px solid #292524",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.5)",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: "1.25rem",
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: isActive(link.path) ? 700 : 400,
                    color: isActive(link.path) ? "#d97706" : "#fef3c7",
                    textDecoration: "none",
                    padding: "12px 0",
                    borderBottom: "1px solid #292524",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/reservations"
                style={{
                  marginTop: "24px",
                  backgroundColor: "#d97706",
                  color: "#1c1917",
                  padding: "14px 24px",
                  borderRadius: "4px",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  textAlign: "center",
                  display: "block",
                }}
              >
                Reserve a Table
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 55,
            }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .hamburger-btn { display: block !important; }
          .reserve-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
