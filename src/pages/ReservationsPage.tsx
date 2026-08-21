import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { motion, useInView } from "framer-motion";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: string;
  specialRequests: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  partySize?: string;
}

const timeSlots = [
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
  "10:00 PM",
];

const steps = [
  {
    step: "01",
    title: "Make Your Reservation",
    description: "Choose your preferred date, time, and party size. We'll hold the table for you.",
  },
  {
    step: "02",
    title: "Receive Confirmation",
    description: "We confirm within 2 hours via email and phone. A friendly reminder arrives the day before.",
  },
  {
    step: "03",
    title: "Arrive & Enjoy",
    description: "Your table will be ready. Allow our team to guide you through an extraordinary evening.",
  },
];

const fadeUp = {
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

const errorInputStyle: React.CSSProperties = {
  ...inputStyle,
  borderColor: "#ef4444",
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

export default function ReservationsPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "",
    specialRequests: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time";
    if (!formData.partySize) newErrors.partySize = "Please select party size";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const today = new Date().toISOString().split("T")[0];

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
          src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1920&q=80"
          alt="Reserve a table"
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
            Reservations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: "#a8a29e", fontSize: "1.125rem", marginTop: "16px" }}
          >
            Secure your table for an unforgettable evening
          </motion.p>
        </div>
      </section>

      {/* ── MAIN ─────────────────────────────────────────────────────────── */}
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
            {/* ── LEFT: FORM ──────────────────────────────────────────────── */}
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
                  Book Your Table
                </h2>
                <p style={{ color: "#a8a29e", fontSize: "0.9375rem", marginBottom: "36px" }}>
                  Fill in the details below and we'll confirm your reservation within 2 hours.
                </p>

                {submitted ? (
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
                    <div style={{ marginBottom: "20px" }}>
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5" style={{ margin: "0 auto", display: "block" }}>
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3
                      style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: "1.625rem",
                        fontWeight: 700,
                        color: "#fef3c7",
                        marginBottom: "16px",
                      }}
                    >
                      Reservation Received!
                    </h3>
                    <p style={{ color: "#a8a29e", fontSize: "1rem", lineHeight: 1.7 }}>
                      Your reservation request has been received!<br />
                      We'll confirm within 2 hours at <strong style={{ color: "#fef3c7" }}>{formData.email}</strong>.
                    </p>
                    <p style={{ color: "#a8a29e", fontSize: "0.875rem", marginTop: "16px" }}>
                      {formData.date} at {formData.time} &nbsp;·&nbsp; Party of {formData.partySize}
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ firstName: "", lastName: "", email: "", phone: "", date: "", time: "", partySize: "", specialRequests: "" }); }}
                      style={{
                        marginTop: "28px",
                        backgroundColor: "#d97706",
                        color: "#1c1917",
                        border: "none",
                        padding: "12px 28px",
                        borderRadius: "4px",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      Make Another Reservation
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {/* First + Last name */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                      <div>
                        <label style={labelStyle} htmlFor="firstName">First Name *</label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="James"
                          style={errors.firstName ? errorInputStyle : inputStyle}
                          onFocus={(e) => { if (!errors.firstName) (e.currentTarget as HTMLInputElement).style.borderColor = "#d97706"; }}
                          onBlur={(e) => { if (!errors.firstName) (e.currentTarget as HTMLInputElement).style.borderColor = "#44403c"; }}
                        />
                        {errors.firstName && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.firstName}</p>}
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="lastName">Last Name *</label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Harrington"
                          style={errors.lastName ? errorInputStyle : inputStyle}
                          onFocus={(e) => { if (!errors.lastName) (e.currentTarget as HTMLInputElement).style.borderColor = "#d97706"; }}
                          onBlur={(e) => { if (!errors.lastName) (e.currentTarget as HTMLInputElement).style.borderColor = "#44403c"; }}
                        />
                        {errors.lastName && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.lastName}</p>}
                      </div>
                    </div>

                    {/* Email + Phone */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                      <div>
                        <label style={labelStyle} htmlFor="email">Email *</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          style={errors.email ? errorInputStyle : inputStyle}
                          onFocus={(e) => { if (!errors.email) (e.currentTarget as HTMLInputElement).style.borderColor = "#d97706"; }}
                          onBlur={(e) => { if (!errors.email) (e.currentTarget as HTMLInputElement).style.borderColor = "#44403c"; }}
                        />
                        {errors.email && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.email}</p>}
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="phone">Phone *</label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (212) 555-0000"
                          style={errors.phone ? errorInputStyle : inputStyle}
                          onFocus={(e) => { if (!errors.phone) (e.currentTarget as HTMLInputElement).style.borderColor = "#d97706"; }}
                          onBlur={(e) => { if (!errors.phone) (e.currentTarget as HTMLInputElement).style.borderColor = "#44403c"; }}
                        />
                        {errors.phone && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Date + Time + Party size */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                      <div>
                        <label style={labelStyle} htmlFor="date">Date *</label>
                        <input
                          id="date"
                          name="date"
                          type="date"
                          min={today}
                          value={formData.date}
                          onChange={handleChange}
                          style={{
                            ...(errors.date ? errorInputStyle : inputStyle),
                            colorScheme: "dark",
                          }}
                          onFocus={(e) => { if (!errors.date) (e.currentTarget as HTMLInputElement).style.borderColor = "#d97706"; }}
                          onBlur={(e) => { if (!errors.date) (e.currentTarget as HTMLInputElement).style.borderColor = "#44403c"; }}
                        />
                        {errors.date && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.date}</p>}
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="time">Time *</label>
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          style={errors.time ? errorInputStyle : inputStyle}
                          onFocus={(e) => { if (!errors.time) (e.currentTarget as HTMLSelectElement).style.borderColor = "#d97706"; }}
                          onBlur={(e) => { if (!errors.time) (e.currentTarget as HTMLSelectElement).style.borderColor = "#44403c"; }}
                        >
                          <option value="">Select time</option>
                          {timeSlots.map((t) => (
                            <option key={t} value={t} style={{ backgroundColor: "#1c1917" }}>{t}</option>
                          ))}
                        </select>
                        {errors.time && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.time}</p>}
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="partySize">Guests *</label>
                        <select
                          id="partySize"
                          name="partySize"
                          value={formData.partySize}
                          onChange={handleChange}
                          style={errors.partySize ? errorInputStyle : inputStyle}
                          onFocus={(e) => { if (!errors.partySize) (e.currentTarget as HTMLSelectElement).style.borderColor = "#d97706"; }}
                          onBlur={(e) => { if (!errors.partySize) (e.currentTarget as HTMLSelectElement).style.borderColor = "#44403c"; }}
                        >
                          <option value="">Select</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n} style={{ backgroundColor: "#1c1917" }}>{n} {n === 1 ? "guest" : "guests"}</option>
                          ))}
                        </select>
                        {errors.partySize && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.partySize}</p>}
                      </div>
                    </div>

                    {/* Special requests */}
                    <div style={{ marginBottom: "28px" }}>
                      <label style={labelStyle} htmlFor="specialRequests">Special Requests</label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        rows={4}
                        value={formData.specialRequests}
                        onChange={handleChange}
                        placeholder="Dietary requirements, celebrations, accessibility needs..."
                        style={{
                          ...inputStyle,
                          resize: "vertical",
                          minHeight: "100px",
                        }}
                        onFocus={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = "#d97706")}
                        onBlur={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = "#44403c")}
                      />
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
                      Reserve Now
                    </button>
                  </form>
                )}
              </motion.div>
            </SectionWrapper>

            {/* ── RIGHT: INFO ─────────────────────────────────────────────── */}
            <SectionWrapper>
              {/* Steps */}
              <motion.div variants={fadeUp} style={{ marginBottom: "48px" }}>
                <h3
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#fef3c7",
                    marginBottom: "28px",
                  }}
                >
                  What to Expect
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  {steps.map((step) => (
                    <div key={step.step} style={{ display: "flex", gap: "20px" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(217,119,6,0.15)",
                          border: "1.5px solid #d97706",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontFamily: '"Playfair Display", Georgia, serif',
                          fontWeight: 700,
                          color: "#d97706",
                          fontSize: "1rem",
                        }}
                      >
                        {step.step}
                      </div>
                      <div>
                        <h4 style={{ fontWeight: 600, color: "#fef3c7", marginBottom: "4px" }}>{step.title}</h4>
                        <p style={{ color: "#a8a29e", fontSize: "0.9rem", lineHeight: 1.65 }}>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Opening hours */}
              <motion.div
                variants={fadeUp}
                style={{
                  backgroundColor: "#292524",
                  borderRadius: "8px",
                  padding: "28px",
                  marginBottom: "28px",
                }}
              >
                <h3
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#fef3c7",
                    marginBottom: "20px",
                  }}
                >
                  Opening Hours
                </h3>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    {[
                      ["Monday – Thursday", "5:30 PM – 10:00 PM"],
                      ["Friday – Saturday", "5:00 PM – 11:00 PM"],
                      ["Sunday", "5:00 PM – 9:30 PM"],
                    ].map(([day, hours]) => (
                      <tr key={day} style={{ borderBottom: "1px solid #44403c" }}>
                        <td style={{ padding: "10px 0", color: "#a8a29e", fontSize: "0.9rem" }}>{day}</td>
                        <td style={{ padding: "10px 0", color: "#fef3c7", fontSize: "0.9rem", textAlign: "right", fontWeight: 500 }}>{hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              {/* Contact details */}
              <motion.div
                variants={fadeUp}
                style={{
                  backgroundColor: "#292524",
                  borderRadius: "8px",
                  padding: "28px",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#fef3c7",
                    marginBottom: "18px",
                  }}
                >
                  Contact Us
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" style={{ flexShrink: 0 }}>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z" />
                    </svg>
                    <span style={{ color: "#a8a29e", fontSize: "0.9rem" }}>+1 (212) 555-0182</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" style={{ flexShrink: 0 }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span style={{ color: "#a8a29e", fontSize: "0.9rem" }}>reservations@emberandoak.com</span>
                  </div>
                </div>
              </motion.div>

              <motion.p variants={fadeUp} style={{ color: "#a8a29e", fontSize: "0.875rem", fontStyle: "italic", textAlign: "center" }}>
                Walk-ins welcome based on availability.
              </motion.p>
            </SectionWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
