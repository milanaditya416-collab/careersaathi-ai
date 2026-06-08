import { motion } from "framer-motion";
import { Languages, Users, IndianRupee } from "lucide-react";
import { Mandala } from "./Mandala";
import { SectionTitle } from "./SectionTitle";

const items = [
  {
    icon: Languages,
    stat: "65%",
    desc: "of Indian students from Hindi/regional medium backgrounds are locked out of English-only career platforms.",
  },
  {
    icon: Users,
    stat: "20 Cr+",
    desc: "students with zero access to Hindi career guidance or AI-powered tools.",
  },
  {
    icon: IndianRupee,
    stat: "₹0",
    desc: "free Hindi AI career counselling available in India today. Zero.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="relative overflow-hidden py-24 sm:py-32">
      <Mandala className="-left-32 top-1/3" size={420} opacity={0.05} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="The Gap" title="The Problem We're Solving" />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl glass-card p-8 hover:glass-card-hover"
            >
              <motion.div
                whileHover={{ y: -8, rotate: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/30"
              >
                <it.icon size={28} />
              </motion.div>
              <div className="font-display text-5xl font-bold gold-text">{it.stat}</div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
