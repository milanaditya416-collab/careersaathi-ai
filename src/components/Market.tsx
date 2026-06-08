import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

const stats = [
  { v: "200M+", l: "Students underserved by English platforms" },
  { v: "₹4,200 Cr+", l: "Indian EdTech market size" },
  { v: "Zero", l: "Dedicated Hindi AI career tools at scale" },
];

// Approximate normalized positions on a stylized India outline (viewBox 0 0 400 460)
const cities = [
  { name: "Jaipur", x: 150, y: 165 },
  { name: "Lucknow", x: 235, y: 175 },
  { name: "Patna", x: 290, y: 195 },
  { name: "Varanasi", x: 260, y: 200 },
  { name: "Bhopal", x: 185, y: 230 },
  { name: "Indore", x: 165, y: 240 },
  { name: "Nagpur", x: 215, y: 265 },
];

export function Market() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Market" title="The Opportunity" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl glass-card p-8 text-center hover:glass-card-hover"
            >
              <div className="font-display text-5xl font-bold gold-text">{s.v}</div>
              <p className="mt-3 text-sm text-muted-foreground">{s.l}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl glass-card p-8"
        >
          <h3 className="text-center font-display text-2xl font-bold">
            Lighting up <span className="gold-text">Tier 2 & 3 Bharat</span>
          </h3>
          <div className="mx-auto mt-6 max-w-md">
            <svg viewBox="0 0 400 460" className="h-auto w-full">
              <defs>
                <radialGradient id="cityGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.87 0.16 88)" stopOpacity="1" />
                  <stop offset="100%" stopColor="oklch(0.87 0.16 88)" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Stylized India outline */}
              <path
                d="M120 60 Q140 50 175 55 Q210 50 240 65 Q275 60 305 80 Q330 100 320 135 Q335 165 320 195 Q335 220 320 250 Q310 290 280 320 Q255 360 220 395 Q200 430 180 425 Q165 410 175 380 Q160 360 145 335 Q120 310 110 275 Q95 245 105 215 Q90 185 100 155 Q95 120 110 90 Z"
                fill="oklch(0.78 0.14 85 / 0.06)"
                stroke="oklch(0.78 0.14 85 / 0.4)"
                strokeWidth="1.5"
              />
              {cities.map((c, i) => (
                <g key={c.name}>
                  <circle cx={c.x} cy={c.y} r="14" fill="url(#cityGlow)">
                    <animate
                      attributeName="r"
                      values="10;18;10"
                      dur="2.5s"
                      begin={`${i * 0.3}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx={c.x} cy={c.y} r="3" fill="oklch(0.87 0.16 88)" />
                  <text
                    x={c.x + 8}
                    y={c.y + 3}
                    fontSize="11"
                    fill="oklch(0.95 0.005 90)"
                    fontWeight="500"
                  >
                    {c.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
