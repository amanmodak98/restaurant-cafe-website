import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { Variants, motion, useInView } from "framer-motion";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactErrors {
  [key: string]: string | undefined;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

function SectionWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#1c1917",
  border: "1.5px solid #44403c",
  borderRadius: "6px",
  padding: "14px 16px",
  color: "#fef3c7",
  fontSize: "0.9375rem",
  fontFamily: "Inter, system-ui, sans-serif",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8125rem",
  fontWeight: 500,
  color: "#a8a29e",
  marginBottom: "6px",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

const contactDetails = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.75">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Address",
    value: "142 Oak & Ember Lane, New York, NY 10012",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.75">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z" />
      </svg>
    ),
    label: "Phone",
    value: "+1 (212) 555-0182",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.75">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "hello@emberandoak.com",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.75">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Hours",
    value: "Mon–Thu 5:30–10 PM · Fri–Sat 5–11 PM · Sun 5–9:30 PM",
  },
];

const directions = [
  { landmark: "From Times Square", instruction: "Take the A/C/E subway south to Canal St, then walk 5 minutes east along Canal St and turn right onto Oak & Ember Lane." },
  { landmark: "From Grand Central", instruction: "Board the 4/5/6 express downtown to Brooklyn Bridge–City Hall, then a short 8-minute walk west." },
  { landmark: "By Car", instruction: "Exit I-678 at Canal Street heading east. Metered parking available on adjacent streets. Valet available Fri–Sat from 6 PM." },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);

  const validate = (): boolean => {
    const e: ContactErrors = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Please enter a valid email";
    }
    if (!formData.subject) e.subject = "Please select a subject";
    if (!formData.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) setSent(true);
  };

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "45vh",
          minHeight: "360px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80"
          alt="Contact Ember & Oak"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(28,25,23,0.78)" }} />
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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: "#a8a29e", fontSize: "1.125rem", marginTop: "16px" }}
          >
            We'd love to hear from you
          </motion.p>
        </div>
      </section>

      {/* ── MAIN SPLIT ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1c1917", padding: "80px 24px 96px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "64px",
              alignItems: "start",
            }}
          >
            {/* ── LEFT: MAP + DETAILS ─────────────────────────────────────── */}
            <SectionWrapper>
              {/* Map placeholder */}
              <motion.div
                variants={fadeUp}
                style={{
                  position: "relative",
                  height: "320px",
                  backgroundColor: "#292524",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginBottom: "32px",
                  border: "1px solid #44403c",
                }}
              >
                {/* Decorative grid lines for map feel */}
                <svg
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}
                  viewBox="0 0 400 320"
                  preserveAspectRatio="none"
                >
                  {[...Array(8)].map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="#a8a29e" strokeWidth="1" />
                  ))}
                  {[...Array(10)].map((_, i) => (
                    <line key={`v${i}`} x1={i * 44} y1="0" x2={i * 44} y2="320" stroke="#a8a29e" strokeWidth="1" />
                  ))}
                  <path d="M200 80 Q280 120 240 180 Q200 240 160 180 Q120 120 200 80Z" fill="rgba(217,119,6,0.08)" stroke="#d97706" strokeWidth="1.5" />
                  <path d="M100 160 L200 160" stroke="#d97706" strokeWidth="1.5" strokeDasharray="6 3" />
                  <path d="M200 80 L200 160" stroke="#d97706" strokeWidth="1.5" strokeDasharray="6 3" />
                </svg>

                {/* Pin */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -60%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#d97706" stroke="#b45309" strokeWidth="1">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" fill="#1c1917" />
                  </svg>
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{
                      backgroundColor: "#292524",
                      border: "1px solid #44403c",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      marginTop: "8px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "#fef3c7", fontSize: "0.875rem", fontFamily: '"Playfair Display", Georgia, serif' }}>
                      EMBER &amp; OAK
                    </div>
                    <div style={{ color: "#a8a29e", fontSize: "0.75rem", marginTop: "2px" }}>142 Oak &amp; Ember Lane</div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Contact detail cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {contactDetails.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "flex-start",
                      backgroundColor: "#292524",
                      borderRadius: "8px",
                      padding: "18px 20px",
                      border: "1px solid #44403c",
                    }}
                  >
                    <div style={{ flexShrink: 0, marginTop: "1px" }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#d97706", marginBottom: "4px" }}>
                        {item.label}
                      </div>
                      <div style={{ color: "#a8a29e", fontSize: "0.9rem", lineHeight: 1.5 }}>{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social media */}
              <motion.div variants={fadeUp} style={{ marginTop: "32px" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#d97706", marginBottom: "14px" }}>
                  Follow Us
                </p>
                <div style={{ display: "flex", gap: "16px" }}>
                  {[
                    {
                      label: "Instagram",
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      ),
                    },
                    {
                      label: "Facebook",
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      ),
                    },
                    {
                      label: "Twitter",
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                        </svg>
                      ),
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href="#"
                      aria-label={s.label}
                      style={{
                        width: "44px",
                        height: "44px",
                        backgroundColor: "#292524",
                        border: "1.5px solid #44403c",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#a8a29e",
                        textDecoration: "none",
                        transition: "border-color 0.2s, color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#d97706";
                        (e.currentTarget as HTMLAnchorElement).style.color = "#d97706";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#44403c";
                        (e.currentTarget as HTMLAnchorElement).style.color = "#a8a29e";
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </SectionWrapper>

            {/* ── RIGHT: CONTACT FORM ─────────────────────────────────────── */}
            <SectionWrapper>
              <motion.div variants={fadeUp}>
                <h2
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#fef3c7",
                    marginBottom: "8px",
                  }}
                >
                  Send a Message
                </h2>
                <p style={{ color: "#a8a29e", fontSize: "0.9375rem", marginBottom: "36px" }}>
                  Have a question or special request? We'll respond within 24 hours.
                </p>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      backgroundColor: "#292524",
                      border: "1px solid #d97706",
                      borderRadius: "8px",
                      padding: "40px 32px",
                      textAlign: "center",
                    }}
                  >
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5" style={{ margin: "0 auto 20px", display: "block" }}>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <h3
                      style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: "1.625rem",
                        fontWeight: 700,
                        color: "#fef3c7",
                        marginBottom: "14px",
                      }}
                    >
                      Message Sent!
                    </h3>
                    <p style={{ color: "#a8a29e", fontSize: "1rem", lineHeight: 1.7 }}>
                      Thank you, <strong style={{ color: "#fef3c7" }}>{formData.name}</strong>. We've received your message
                      and will get back to you at <strong style={{ color: "#fef3c7" }}>{formData.email}</strong> within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSent(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                      style={{
                        marginTop: "28px",
                        backgroundColor: "transparent",
                        color: "#d97706",
                        border: "1.5px solid #d97706",
                        padding: "12px 28px",
                        borderRadius: "4px",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ marginBottom: "20px" }}>
                      <label style={labelStyle} htmlFor="name">Your Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="James Harrington"
                        style={{ ...inputStyle, borderColor: errors.name ? "#ef4444" : "#44403c" }}
                        onFocus={(e) => { if (!errors.name) (e.currentTarget as HTMLInputElement).style.borderColor = "#d97706"; }}
                        onBlur={(e) => { if (!errors.name) (e.currentTarget as HTMLInputElement).style.borderColor = "#44403c"; }}
                      />
                      {errors.name && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.name}</p>}
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={labelStyle} htmlFor="contactEmail">Email *</label>
                      <input
                        id="contactEmail"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        style={{ ...inputStyle, borderColor: errors.email ? "#ef4444" : "#44403c" }}
                        onFocus={(e) => { if (!errors.email) (e.currentTarget as HTMLInputElement).style.borderColor = "#d97706"; }}
                        onBlur={(e) => { if (!errors.email) (e.currentTarget as HTMLInputElement).style.borderColor = "#44403c"; }}
                      />
                      {errors.email && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.email}</p>}
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={labelStyle} htmlFor="subject">Subject *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        style={{ ...inputStyle, borderColor: errors.subject ? "#ef4444" : "#44403c" }}
                        onFocus={(e) => { if (!errors.subject) (e.currentTarget as HTMLSelectElement).style.borderColor = "#d97706"; }}
                        onBlur={(e) => { if (!errors.subject) (e.currentTarget as HTMLSelectElement).style.borderColor = "#44403c"; }}
                      >
                        <option value="">Select a subject</option>
                        {[
                          "General Enquiry",
                          "Reservation Question",
                          "Private Dining & Events",
                          "Press & Media",
                          "Feedback",
                          "Partnership",
                        ].map((s) => (
                          <option key={s} value={s} style={{ backgroundColor: "#1c1917" }}>{s}</option>
                        ))}
                      </select>
                      {errors.subject && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.subject}</p>}
                    </div>

                    <div style={{ marginBottom: "28px" }}>
                      <label style={labelStyle} htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        style={{
                          ...inputStyle,
                          borderColor: errors.message ? "#ef4444" : "#44403c",
                          resize: "vertical",
                          minHeight: "140px",
                        }}
                        onFocus={(e) => { if (!errors.message) (e.currentTarget as HTMLTextAreaElement).style.borderColor = "#d97706"; }}
                        onBlur={(e) => { if (!errors.message) (e.currentTarget as HTMLTextAreaElement).style.borderColor = "#44403c"; }}
                      />
                      {errors.message && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: "100%",
                        backgroundColor: "#d97706",
                        color: "#1c1917",
                        border: "none",
                        padding: "16px",
                        borderRadius: "6px",
                        fontWeight: 700,
                        fontSize: "1rem",
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "background-color 0.2s, transform 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#b45309";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#d97706";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                      }}
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </motion.div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* ── HOW TO FIND US ───────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#292524", padding: "80px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <SectionWrapper>
            <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ color: "#d97706", fontSize: "0.8125rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px", fontWeight: 500 }}>
                Getting Here
              </p>
              <h2
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  color: "#fef3c7",
                  fontWeight: 700,
                }}
              >
                How to Find Us
              </h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
              {directions.map((dir) => (
                <motion.div
                  key={dir.landmark}
                  variants={fadeUp}
                  style={{
                    backgroundColor: "#1c1917",
                    borderRadius: "8px",
                    padding: "24px",
                    borderTop: "3px solid #d97706",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: "1.0625rem",
                      fontWeight: 700,
                      color: "#d97706",
                      marginBottom: "12px",
                    }}
                  >
                    {dir.landmark}
                  </h4>
                  <p style={{ color: "#a8a29e", fontSize: "0.9rem", lineHeight: 1.7 }}>{dir.instruction}</p>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>
    </div>
  );
}
