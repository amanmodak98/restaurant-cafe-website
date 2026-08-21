import { useRef } from "react";
import { Variants, motion, useInView } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

function SectionWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  );
}

const awards = [
  { year: "2015", title: "First Michelin Star", body: "Michelin Guide New York" },
  { year: "2018", title: "James Beard Award", body: "Best Chef: New York City" },
  { year: "2019", title: "Second Michelin Star", body: "Michelin Guide New York" },
  { year: "2022", title: "Third Michelin Star", body: "Michelin Guide New York" },
  { year: "2024", title: "Wine Spectator Award", body: "Award of Excellence — Grand Award" },
];

const teamMembers = [
  {
    name: "James Harrington",
    title: "Executive Chef & Founder",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",
  },
  {
    name: "Sophie Leclerc",
    title: "Sous Chef",
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&q=80",
  },
  {
    name: "Matteo Romano",
    title: "Sous Chef — Pastry",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  },
  {
    name: "Claire Beaumont",
    title: "Restaurant Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Daniel Park",
    title: "Head Sommelier",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    name: "Nina Torres",
    title: "Guest Relations",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
];

const pillars = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.75">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Seasonal Ingredients",
    description:
      "We build every menu around what's growing right now. Direct relationships with local farms mean ingredients arrive hours, not days, after harvest.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.75">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
    title: "Wine Pairing",
    description:
      "Our head sommelier curates a cellar of 200+ labels. Each pairing is chosen to complement and elevate every bite on the plate.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.75">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Impeccable Service",
    description:
      "From the first greeting to the final farewell, our team anticipates needs before they arise. Warmth and precision in equal measure.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "55vh",
          minHeight: "420px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80"
          alt="Ember & Oak kitchen"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(28,25,23,0.65) 0%, rgba(28,25,23,0.85) 100%)",
          }}
        />
        <div style={{ position: "relative", textAlign: "center", padding: "0 24px" }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 700,
              color: "#fef3c7",
            }}
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: "#a8a29e", fontSize: "1.125rem", marginTop: "16px", fontStyle: "italic", fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Fifteen years of passion, precision, and hospitality
          </motion.p>
        </div>
      </section>

      {/* ── RESTAURANT HISTORY ───────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1c1917", padding: "96px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <SectionWrapper>
            <motion.p variants={fadeUp} style={{ color: "#d97706", fontSize: "0.8125rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px", fontWeight: 500 }}>
              Founded 2009
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                color: "#fef3c7",
                fontWeight: 700,
                marginBottom: "32px",
              }}
            >
              From a Neighbourhood Dream to a World-Class Destination
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: "#a8a29e", fontSize: "1rem", lineHeight: 1.85, marginBottom: "24px" }}>
              Ember &amp; Oak was born from a simple conviction: that fine dining should feel alive — never precious, always personal.
              In the spring of 2009, Chef James Harrington converted a 19th-century warehouse in lower Manhattan into a 60-seat
              dining room defined by exposed oak beams, amber candlelight, and the intoxicating aroma of a wood-fired hearth.
            </motion.p>
            <motion.p variants={fadeUp} style={{ color: "#a8a29e", fontSize: "1rem", lineHeight: 1.85, marginBottom: "24px" }}>
              The first year was a labour of love. James sourced directly from Hudson Valley farms, wrote the menu by hand each
              morning based on what arrived, and served tables himself on weekends. Word spread quickly. Within 18 months a
              reservation was one of the most coveted in the city, and the restaurant had been featured in every major food publication.
            </motion.p>
            <motion.p variants={fadeUp} style={{ color: "#a8a29e", fontSize: "1rem", lineHeight: 1.85, marginBottom: "40px" }}>
              Today, Ember &amp; Oak holds three Michelin stars, a James Beard Award, and a devoted following that spans continents.
              Yet the spirit remains unchanged: extraordinary ingredients treated with respect, cooked with skill, and shared with joy.
              Every evening, every table, every single bite still tells its own story.
            </motion.p>
            <motion.blockquote
              variants={fadeUp}
              style={{
                borderLeft: "4px solid #d97706",
                paddingLeft: "28px",
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: "italic",
                fontSize: "1.25rem",
                color: "#fbbf24",
                lineHeight: 1.65,
              }}
            >
              "A restaurant is only as good as the people who pass through its doors — the ones who cook, who serve, and who sit down
              to share a meal together."
            </motion.blockquote>
          </SectionWrapper>
        </div>
      </section>

      {/* ── CHEF SECTION ─────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#292524", padding: "96px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionWrapper>
            <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "56px" }}>
              <p style={{ color: "#d97706", fontSize: "0.8125rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px", fontWeight: 500 }}>
                The Culinary Mind
              </p>
              <h2
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "#fef3c7",
                  fontWeight: 700,
                }}
              >
                Meet Chef James Harrington
              </h2>
            </motion.div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "56px",
                alignItems: "center",
                marginBottom: "64px",
              }}
            >
              <motion.div
                variants={fadeUp}
                style={{ borderRadius: "8px", overflow: "hidden", aspectRatio: "3/4", maxWidth: "400px", margin: "0 auto" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80"
                  alt="Chef James Harrington"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <h3
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "#fef3c7",
                    marginBottom: "6px",
                  }}
                >
                  James Harrington
                </h3>
                <p style={{ color: "#d97706", fontSize: "0.9rem", marginBottom: "24px", letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 500 }}>
                  Executive Chef &amp; Founder
                </p>
                <p style={{ color: "#a8a29e", fontSize: "0.9375rem", lineHeight: 1.8, marginBottom: "18px" }}>
                  Born in Vermont, James's love of food began at his grandmother's kitchen table. He trained under legendary chefs
                  at Restaurant Daniel in New York and later at L'Arpège in Paris, where he developed a reverence for classical
                  French technique applied to hyper-seasonal American ingredients.
                </p>
                <p style={{ color: "#a8a29e", fontSize: "0.9375rem", lineHeight: 1.8, marginBottom: "18px" }}>
                  James believes cooking is an act of listening — to the land, the season, and the guest. His menus change with the
                  availability of each harvest and are never repeated in exactly the same form twice.
                </p>
                <p style={{ color: "#a8a29e", fontSize: "0.9375rem", lineHeight: 1.8 }}>
                  When not in the kitchen, James mentors young cooks through the New York Culinary Foundation and lectures at the
                  International Culinary Center. He lives in Brooklyn with his wife and two children.
                </p>
              </motion.div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ── PHILOSOPHY ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1c1917", padding: "96px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionWrapper>
            <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "56px" }}>
              <p style={{ color: "#d97706", fontSize: "0.8125rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px", fontWeight: 500 }}>
                Our Principles
              </p>
              <h2
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "#fef3c7",
                  fontWeight: 700,
                }}
              >
                Three Pillars of Excellence
              </h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "32px" }}>
              {pillars.map((p) => (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  style={{
                    backgroundColor: "#292524",
                    borderRadius: "8px",
                    padding: "36px 28px",
                    border: "1px solid #44403c",
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#d97706")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#44403c")}
                >
                  <div style={{ marginBottom: "20px" }}>{p.icon}</div>
                  <h3
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#fef3c7",
                      marginBottom: "14px",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ color: "#a8a29e", fontSize: "0.9375rem", lineHeight: 1.75 }}>{p.description}</p>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ── AWARDS ───────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#292524", padding: "96px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <SectionWrapper>
            <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "56px" }}>
              <p style={{ color: "#d97706", fontSize: "0.8125rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px", fontWeight: 500 }}>
                Recognition
              </p>
              <h2
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "#fef3c7",
                  fontWeight: 700,
                }}
              >
                Awards &amp; Accolades
              </h2>
            </motion.div>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "80px",
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  backgroundColor: "#44403c",
                }}
              />
              {awards.map((award, idx) => (
                <motion.div
                  key={award.year}
                  variants={fadeUp}
                  style={{
                    display: "flex",
                    gap: "32px",
                    alignItems: "flex-start",
                    marginBottom: idx < awards.length - 1 ? "40px" : 0,
                    paddingLeft: "8px",
                  }}
                >
                  <div style={{ width: "72px", textAlign: "right", flexShrink: 0 }}>
                    <span
                      style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: "1.125rem",
                        fontWeight: 700,
                        color: "#d97706",
                      }}
                    >
                      {award.year}
                    </span>
                  </div>
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: "#d97706",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  />
                  <div>
                    <h4
                      style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: "1.125rem",
                        fontWeight: 700,
                        color: "#fef3c7",
                        marginBottom: "4px",
                      }}
                    >
                      {award.title}
                    </h4>
                    <p style={{ color: "#a8a29e", fontSize: "0.875rem" }}>{award.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1c1917", padding: "96px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionWrapper>
            <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "56px" }}>
              <p style={{ color: "#d97706", fontSize: "0.8125rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px", fontWeight: 500 }}>
                The People Behind the Magic
              </p>
              <h2
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "#fef3c7",
                  fontWeight: 700,
                }}
              >
                Our Team
              </h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "28px" }}>
              {teamMembers.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  style={{ textAlign: "center" }}
                >
                  <div
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      margin: "0 auto 16px",
                      border: "3px solid #44403c",
                      transition: "border-color 0.3s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#d97706")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#44403c")}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "#fef3c7",
                      marginBottom: "4px",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p style={{ color: "#a8a29e", fontSize: "0.8125rem" }}>{member.title}</p>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>
    </div>
  );
}
