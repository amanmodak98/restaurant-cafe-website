import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const dishes = [
  {
    name: "Seared Duck Breast",
    description: "Cherry reduction, roasted root vegetables, crispy skin, micro herbs",
    price: "$42",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
  },
  {
    name: "Pan-Roasted Sea Bass",
    description: "Saffron beurre blanc, fennel confit, caperberries, lemon oil",
    price: "$38",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
  },
  {
    name: "Wagyu Beef Tenderloin",
    description: "Truffle jus, pomme purée, asparagus, bone marrow butter",
    price: "$68",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
  },
];

const stats = [
  { number: "15", suffix: " Years", label: "Of Excellence" },
  { number: "3", suffix: "", label: "Michelin Stars" },
  { number: "200+", suffix: "", label: "Wine Labels" },
  { number: "50k+", suffix: "", label: "Happy Guests" },
];

const testimonials = [
  {
    name: "Sophia Harrington",
    role: "Food Critic, NYT",
    quote:
      "Ember & Oak redefines what fine dining means in the modern era. Every plate is a canvas, every bite a revelation.",
  },
  {
    name: "Marcus Chen",
    role: "James Beard Judge",
    quote:
      "The most extraordinary dining experience I've had in years. Chef Harrington's vision is nothing short of genius.",
  },
  {
    name: "Isabelle Laurent",
    role: "Wine Connoisseur",
    quote:
      "Impeccable service, world-class wine program, and food that makes you close your eyes in disbelief. Simply unmissable.",
  },
];

function SectionWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          alt="Ember & Oak restaurant interior"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(28,25,23,0.55) 0%, rgba(28,25,23,0.72) 60%, rgba(28,25,23,0.95) 100%)",
          }}
        />
        <div style={{ position: "relative", textAlign: "center", padding: "0 24px", maxWidth: "900px" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: "0.8125rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#d97706",
              marginBottom: "20px",
              fontWeight: 500,
            }}
          >
            Modern American Fine Dining
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 700,
              color: "#fef3c7",
              lineHeight: 1.12,
              marginBottom: "24px",
            }}
          >
            An Unforgettable<br />Dining Experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{ color: "#a8a29e", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "40px", maxWidth: "580px", margin: "0 auto 40px" }}
          >
            Where seasonal ingredients meet artful technique. Experience the harmony
            of flavour, craft, and genuine hospitality at Ember &amp; Oak.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link
              to="/reservations"
              style={{
                backgroundColor: "#d97706",
                color: "#1c1917",
                padding: "14px 32px",
                borderRadius: "4px",
                fontWeight: 600,
                fontSize: "0.9375rem",
                letterSpacing: "0.06em",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "background-color 0.2s, transform 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#b45309";
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#d97706";
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              }}
            >
              Reserve a Table
            </Link>
            <Link
              to="/menu"
              style={{
                border: "1.5px solid #d97706",
                color: "#d97706",
                padding: "14px 32px",
                borderRadius: "4px",
                fontWeight: 600,
                fontSize: "0.9375rem",
                letterSpacing: "0.06em",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "background-color 0.2s, color 0.2s, transform 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(217,119,6,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              }}
            >
              View Menu
            </Link>
          </motion.div>
        </div>

        {/* Scroll arrow */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "36px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#d97706",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ── FEATURED DISHES ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1c1917", padding: "96px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <SectionWrapper>
            <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "56px" }}>
              <p style={{ color: "#d97706", fontSize: "0.8125rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px", fontWeight: 500 }}>
                Signature Selections
              </p>
              <h2
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#fef3c7",
                  fontWeight: 700,
                }}
              >
                From Our Kitchen
              </h2>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "32px",
              }}
            >
              {dishes.map((dish) => (
                <motion.div
                  key={dish.name}
                  variants={fadeUp}
                  style={{
                    backgroundColor: "#292524",
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
                >
                  <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                    />
                    <div style={{ position: "absolute", top: "16px", right: "16px", backgroundColor: "#d97706", color: "#1c1917", padding: "6px 14px", borderRadius: "20px", fontWeight: 700, fontSize: "0.9375rem" }}>
                      {dish.price}
                    </div>
                  </div>
                  <div style={{ padding: "24px" }}>
                    <h3
                      style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: "1.3125rem",
                        fontWeight: 700,
                        color: "#fef3c7",
                        marginBottom: "10px",
                      }}
                    >
                      {dish.name}
                    </h3>
                    <p style={{ color: "#a8a29e", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "20px" }}>{dish.description}</p>
                    <button
                      style={{
                        border: "1.5px solid #d97706",
                        color: "#d97706",
                        backgroundColor: "transparent",
                        padding: "10px 24px",
                        borderRadius: "4px",
                        fontWeight: 600,
                        fontSize: "0.8125rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "background-color 0.2s, color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#d97706";
                        (e.currentTarget as HTMLButtonElement).style.color = "#1c1917";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color = "#d97706";
                      }}
                    >
                      Add to Order
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ── OUR STORY TEASER ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#292524", padding: "96px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <SectionWrapper>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "64px",
                alignItems: "center",
              }}
            >
              <motion.div variants={fadeUp} style={{ borderRadius: "8px", overflow: "hidden", aspectRatio: "4/3" }}>
                <img
                  src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80"
                  alt="Chef at work"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <p style={{ color: "#d97706", fontSize: "0.8125rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px", fontWeight: 500 }}>
                  Our Philosophy
                </p>
                <h2
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                    color: "#fef3c7",
                    fontWeight: 700,
                    marginBottom: "24px",
                    lineHeight: 1.2,
                  }}
                >
                  Rooted in Craft,<br />Guided by Seasons
                </h2>
                <blockquote
                  style={{
                    borderLeft: "3px solid #d97706",
                    paddingLeft: "24px",
                    marginBottom: "28px",
                    fontStyle: "italic",
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: "1.125rem",
                    color: "#fbbf24",
                    lineHeight: 1.7,
                  }}
                >
                  "I believe every ingredient has a voice. My job is simply to help it
                  speak clearly."
                  <cite style={{ display: "block", marginTop: "8px", fontSize: "0.875rem", color: "#a8a29e", fontStyle: "normal", fontFamily: "Inter, sans-serif" }}>
                    — Chef James Harrington
                  </cite>
                </blockquote>
                <p style={{ color: "#a8a29e", fontSize: "0.9375rem", lineHeight: 1.75, marginBottom: "32px" }}>
                  Since opening in 2009, Ember &amp; Oak has championed the art of intentional cooking.
                  We source hyper-locally, partner with small farms, and let the seasons dictate our creativity.
                </p>
                <Link
                  to="/about"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#d97706",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    transition: "gap 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.gap = "14px")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.gap = "8px")}
                >
                  Meet the Team
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1c1917", padding: "72px 24px", borderTop: "1px solid #44403c", borderBottom: "1px solid #44403c" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <SectionWrapper>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "40px", textAlign: "center" }}>
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp}>
                  <div
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 700,
                      color: "#d97706",
                      lineHeight: 1,
                      marginBottom: "8px",
                    }}
                  >
                    {stat.number}{stat.suffix}
                  </div>
                  <div style={{ color: "#a8a29e", fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#292524", padding: "96px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <SectionWrapper>
            <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "56px" }}>
              <p style={{ color: "#d97706", fontSize: "0.8125rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px", fontWeight: 500 }}>
                What Guests Say
              </p>
              <h2
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "#fef3c7",
                  fontWeight: 700,
                }}
              >
                Stories Around the Table
              </h2>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
              {testimonials.map((t) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  style={{
                    backgroundColor: "#1c1917",
                    borderRadius: "8px",
                    padding: "32px",
                    border: "1px solid #44403c",
                  }}
                >
                  <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#d97706" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p
                    style={{
                      fontStyle: "italic",
                      fontFamily: '"Playfair Display", Georgia, serif',
                      color: "#fef3c7",
                      fontSize: "1.0625rem",
                      lineHeight: 1.75,
                      marginBottom: "24px",
                    }}
                  >
                    "{t.quote}"
                  </p>
                  <div>
                    <div style={{ fontWeight: 600, color: "#fef3c7", fontSize: "0.9375rem" }}>{t.name}</div>
                    <div style={{ color: "#a8a29e", fontSize: "0.8125rem", marginTop: "2px" }}>{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ── RESERVATION CTA ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#d97706", padding: "96px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <SectionWrapper>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#1c1917",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              Ready for an Extraordinary Evening?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ color: "#292524", fontSize: "1.0625rem", lineHeight: 1.7, marginBottom: "36px" }}
            >
              Secure your table at Ember &amp; Oak and let us craft an evening tailored
              to every sense. Limited seatings available.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/reservations"
                style={{
                  display: "inline-block",
                  backgroundColor: "#1c1917",
                  color: "#fef3c7",
                  padding: "16px 40px",
                  borderRadius: "4px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  letterSpacing: "0.07em",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "background-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#292524";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1c1917";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                }}
              >
                Make a Reservation
              </Link>
            </motion.div>
          </SectionWrapper>
        </div>
      </section>
    </div>
  );
}
