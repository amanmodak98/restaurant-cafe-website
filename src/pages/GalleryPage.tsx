import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

type FilterCategory = "All" | "Cuisine" | "Ambiance" | "Events" | "Behind the Scenes";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: Exclude<FilterCategory, "All">;
  span?: "wide" | "tall";
}

const images: GalleryImage[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Elegant dining room", category: "Ambiance", span: "wide" },
  { id: 2, src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", alt: "Grilled meat dish", category: "Cuisine" },
  { id: 3, src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80", alt: "Restaurant interior", category: "Ambiance" },
  { id: 4, src: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80", alt: "Chef plating dish", category: "Behind the Scenes" },
  { id: 5, src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80", alt: "Fine dining setup", category: "Ambiance" },
  { id: 6, src: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80", alt: "Pan-roasted fish", category: "Cuisine", span: "wide" },
  { id: 7, src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80", alt: "Colourful salad", category: "Cuisine" },
  { id: 8, src: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80", alt: "Private dining event", category: "Events" },
  { id: 9, src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80", alt: "Wine tasting event", category: "Events" },
  { id: 10, src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80", alt: "Sous chef at work", category: "Behind the Scenes" },
  { id: 11, src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80", alt: "Dessert plating", category: "Cuisine" },
  { id: 12, src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80", alt: "Bar area ambiance", category: "Ambiance" },
  { id: 13, src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", alt: "Kitchen brigade", category: "Behind the Scenes" },
  { id: 14, src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80", alt: "Seasonal starter", category: "Cuisine" },
  { id: 15, src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80", alt: "Celebration dinner", category: "Events" },
];

const filterCategories: FilterCategory[] = ["All", "Cuisine", "Ambiance", "Events", "Behind the Scenes"];


export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-60px" });

  const filtered = activeFilter === "All" ? images : images.filter((img) => img.category === activeFilter);

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);
  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "50vh",
          minHeight: "380px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&q=80"
          alt="Gallery hero"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(28,25,23,0.72)" }} />
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
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: "#a8a29e", fontSize: "1.125rem", marginTop: "16px", fontStyle: "italic" }}
          >
            A visual feast of moments and memories
          </motion.p>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1c1917", padding: "80px 24px 96px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Filter buttons */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginBottom: "56px" }}>
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: "10px 22px",
                  backgroundColor: activeFilter === cat ? "#d97706" : "transparent",
                  color: activeFilter === cat ? "#1c1917" : "#a8a29e",
                  border: `1.5px solid ${activeFilter === cat ? "#d97706" : "#44403c"}`,
                  borderRadius: "4px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== cat) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#d97706";
                    (e.currentTarget as HTMLButtonElement).style.color = "#d97706";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== cat) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#44403c";
                    (e.currentTarget as HTMLButtonElement).style.color = "#a8a29e";
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* CSS Grid gallery */}
          <motion.div
            ref={gridRef}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              columns: "3 280px",
              gap: "16px",
            }}
          >
            <AnimatePresence>
              {filtered.map((img, idx) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  onClick={() => openLightbox(idx)}
                  style={{
                    position: "relative",
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    marginBottom: "16px",
                    breakInside: "avoid",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{
                      width: "100%",
                      display: "block",
                      borderRadius: "8px",
                      transition: "transform 0.5s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(28,25,23,0.85) 0%, transparent 50%)",
                      opacity: 0,
                      transition: "opacity 0.3s",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "16px",
                      borderRadius: "8px",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "1")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "0")}
                  >
                    <span style={{ color: "#fef3c7", fontSize: "0.875rem", fontWeight: 500 }}>{img.alt}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.92)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                cursor: "pointer",
                color: "#fef3c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                zIndex: 101,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(217,119,6,0.7)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              style={{
                position: "absolute",
                left: "16px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                cursor: "pointer",
                color: "#fef3c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                zIndex: 101,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(217,119,6,0.7)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              style={{ maxWidth: "90vw", maxHeight: "85vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src.replace("w=800", "w=1200")}
                alt={filtered[lightboxIndex].alt}
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  borderRadius: "8px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <p style={{ textAlign: "center", color: "#a8a29e", marginTop: "12px", fontSize: "0.875rem" }}>
                {filtered[lightboxIndex].alt} &nbsp;·&nbsp; {lightboxIndex + 1} / {filtered.length}
              </p>
            </motion.div>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              style={{
                position: "absolute",
                right: "16px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                cursor: "pointer",
                color: "#fef3c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                zIndex: 101,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(217,119,6,0.7)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
