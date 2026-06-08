import { motion } from "framer-motion";
import { FileText, Target, Mic } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Mandala } from "./Mandala";

const features = [
  {
    icon: FileText,
    title: "AI Resume Builder",
    desc: "Describe yourself in Hindi — CareerSaathi instantly creates a professional resume. No English needed, no templates.",
    badge: "Hindi NLP Powered",
  },
  {
    icon: Target,
    title: "Smart Job Matching",
    desc: "Access 15M+ live job listings matched to your skills, city, and language — all explained clearly in Hindi.",
    badge: "15M+ Jobs",
  },
  {
    icon: Mic,
    title: "AI Interview Coach",
    desc: "Practice mock interviews fully in Hindi and Hinglish. Get instant feedback, build confidence, get hired.",
    badge: "Hinglish Ready",
  },
];

export function Solution() {
  return (
    <section id="solution" className="relative overflow-hidden py-24 sm:py-32">
      <Mandala className="-right-40 top-20" size={500} opacity={0.05} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Our Solution"
          title="What CareerSaathi AI Does"
          subtitle="Three powerful tools, one mission: empower every Indian student in their own language."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl glass-card p-8 hover:glass-card-hover"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl gold-gradient-bg text-navy-deep shadow-lg"
              >
                <f.icon size={30} strokeWidth={2.2} />
              </motion.div>
              <h3 className="font-display text-2xl font-bold">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              <span className="mt-6 inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold">
                {f.badge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
