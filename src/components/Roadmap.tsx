import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

const milestones = [
  { period: "Month 1-2", title: "Hindi WhatsApp Chatbot MVP", pct: 25 },
  { period: "Month 3", title: "Resume Builder + Job Matching Live", pct: 50 },
  { period: "Month 4", title: "Interview Coach Added", pct: 75 },
  { period: "Month 5-6", title: "1 Lakh Users — 10 Hindi-belt Cities", pct: 100 },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="What's Next" title="6-Month Roadmap" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="rounded-2xl glass-card p-6 hover:glass-card-hover"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                  {m.period}
                </span>
                <span className="font-display text-2xl font-bold gold-text">{m.pct}%</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold">{m.title}</h3>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-navy-light">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${m.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: "easeOut" }}
                  className="h-full gold-gradient-bg"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
