import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

type Category = "Starters" | "Mains" | "Desserts" | "Drinks";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  dietary?: ("V" | "GF")[];
}

const menuData: Record<Category, MenuItem[]> = {
  Starters: [
    {
      name: "Foie Gras Torchon",
      description: "Sauternes gelée, brioche toast, pickled pear, micro greens",
      price: "$24",
    },
    {
      name: "Burrata Caprese",
      description: "Heirloom tomatoes, aged balsamic, basil oil, sea salt",
      price: "$18",
      dietary: ["V"],
    },
    {
      name: "Truffle Arancini",
      description: "Crispy risotto balls, black truffle, parmesan, garlic aioli",
      price: "$22",
      dietary: ["V"],
    },
    {
      name: "Lobster Bisque",
      description: "Maine lobster, cognac cream, tarragon, crème fraîche",
      price: "$28",
    },
    {
      name: "Tuna Tartare",
      description: "Yellowfin tuna, avocado, soy-ginger emulsion, sesame crisp",
      price: "$26",
    },
    {
      name: "Artisan Bread Board",
      description: "House-baked sourdough, whipped cultured butter, olive tapenade",
      price: "$14",
      dietary: ["V"],
    },
  ],
  Mains: [
    {
      name: "Wagyu Beef Tenderloin",
      description: "Truffle jus, pomme purée, asparagus, bone marrow butter",
      price: "$68",
    },
    {
      name: "Pan-Roasted Sea Bass",
      description: "Saffron beurre blanc, fennel confit, caperberries, lemon oil",
      price: "$38",
      dietary: ["GF"],
    },
    {
      name: "Duck Confit",
      description: "Cherry reduction, roasted root vegetables, crispy skin, micro herbs",
      price: "$42",
      dietary: ["GF"],
    },
    {
      name: "Mushroom Risotto",
      description: "Wild mushrooms, truffle, parmesan, chive oil, crispy sage",
      price: "$32",
      dietary: ["V", "GF"],
    },
    {
      name: "Rack of Lamb",
      description: "Herb crust, red wine reduction, potato gratin, broccolini",
      price: "$56",
    },
    {
      name: "Grilled Lobster",
      description: "Whole Maine lobster, drawn butter, lemon, seasonal vegetables",
      price: "$72",
      dietary: ["GF"],
    },
  ],
  Desserts: [
    {
      name: "Chocolate Soufflé",
      description: "Dark chocolate, vanilla crème anglaise, gold leaf",
      price: "$18",
      dietary: ["V"],
    },
    {
      name: "Crème Brûlée",
      description: "Madagascar vanilla, caramelized sugar, fresh berries",
      price: "$16",
      dietary: ["V", "GF"],
    },
    {
      name: "Lemon Tart",
      description: "Meyer lemon curd, Italian meringue, candied zest, shortbread",
      price: "$15",
      dietary: ["V"],
    },
    {
      name: "Cheese Board",
      description: "Selection of artisanal cheeses, fig jam, honeycomb, crackers",
      price: "$22",
      dietary: ["V"],
    },
    {
      name: "Seasonal Sorbet",
      description: "Chef's daily selection, fresh fruit, mint, edible flowers",
      price: "$14",
      dietary: ["V", "GF"],
    },
    {
      name: "Tiramisu",
      description: "Espresso-soaked ladyfingers, mascarpone, cocoa dust",
      price: "$17",
      dietary: ["V"],
    },
  ],
  Drinks: [
    {
      name: "Sommelier's Selection",
      description: "Curated wine pairing per course, rotating seasonal selection",
      price: "$18",
    },
    {
      name: "Classic Negroni",
      description: "Gin, Campari, sweet vermouth, orange twist",
      price: "$22",
    },
    {
      name: "Champagne Rosé",
      description: "Veuve Clicquot, crisp and elegant, notes of red berries",
      price: "$28",
    },
    {
      name: "Craft Mocktails",
      description: "House-made non-alcoholic creations, fresh herbs, seasonal fruit",
      price: "$14",
    },
    {
      name: "Artisan Coffee",
      description: "Single-origin espresso, cappuccino, latte, or macchiato",
      price: "$8",
    },
    {
      name: "French Press",
      description: "Specialty roast, served tableside with cream and sugar",
      price: "$12",
    },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Starters");
  const menuRef = useRef<HTMLDivElement>(null);
  const inView = useInView(menuRef, { once: true, margin: "-80px" });

  const categories: Category[] = ["Starters", "Mains", "Desserts", "Drinks"];

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "50vh",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
          alt="Menu at Ember & Oak"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(28,25,23,0.7) 0%, rgba(217,119,6,0.35) 100%)",
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
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: "#fef3c7", fontSize: "1.125rem", marginTop: "16px", fontStyle: "italic" }}
          >
            A curated journey through seasonal flavours
          </motion.p>
        </div>
      </section>

      {/* ── MENU SECTION ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1c1917", padding: "80px 24px 96px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Category tabs */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px", marginBottom: "64px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "12px 28px",
                  backgroundColor: activeCategory === cat ? "#d97706" : "transparent",
                  color: activeCategory === cat ? "#1c1917" : "#a8a29e",
                  border: `1.5px solid ${activeCategory === cat ? "#d97706" : "#44403c"}`,
                  borderRadius: "4px",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#d97706";
                    (e.currentTarget as HTMLButtonElement).style.color = "#d97706";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#44403c";
                    (e.currentTarget as HTMLButtonElement).style.color = "#a8a29e";
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu items */}
          <motion.div
            ref={menuRef}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "32px",
            }}
          >
            <AnimatePresence mode="wait">
              {menuData[activeCategory].map((item, idx) => (
                <motion.div
                  key={`${activeCategory}-${item.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  style={{
                    backgroundColor: "#292524",
                    padding: "28px",
                    borderRadius: "8px",
                    border: "1px solid #44403c",
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#d97706")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#44403c")}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <h3
                      style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "#fef3c7",
                      }}
                    >
                      {item.name}
                    </h3>
                    <span
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 700,
                        color: "#d97706",
                        marginLeft: "12px",
                        flexShrink: 0,
                      }}
                    >
                      {item.price}
                    </span>
                  </div>
                  <p style={{ color: "#a8a29e", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "12px" }}>
                    {item.description}
                  </p>
                  {item.dietary && item.dietary.length > 0 && (
                    <div style={{ display: "flex", gap: "8px" }}>
                      {item.dietary.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "3px 10px",
                            backgroundColor: "#1c1917",
                            color: "#fbbf24",
                            fontSize: "0.6875rem",
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            borderRadius: "12px",
                            border: "1px solid #44403c",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Footer note */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              marginTop: "64px",
              padding: "24px",
              backgroundColor: "#292524",
              borderRadius: "8px",
              borderLeft: "4px solid #d97706",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#a8a29e", fontSize: "0.875rem", lineHeight: 1.7 }}>
              <strong style={{ color: "#fef3c7" }}>V</strong> = Vegetarian &nbsp;•&nbsp;{" "}
              <strong style={{ color: "#fef3c7" }}>GF</strong> = Gluten-Free
            </p>
            <p style={{ color: "#a8a29e", fontSize: "0.875rem", lineHeight: 1.7, marginTop: "8px" }}>
              Dietary information available on request. All prices exclusive of service charge.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
