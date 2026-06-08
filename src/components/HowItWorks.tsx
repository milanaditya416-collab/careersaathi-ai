import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Rocket } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

const steps = [
  {
    icon: MessageCircle,
    title: "DESCRIBE",
    text: "Student types in Hindi: \"Mujhe software job chahiye, mujhe coding aati hai\"",
  },
  {
    icon: Sparkles,
    title: "AI BUILDS",
    text: "CareerSaathi instantly creates a professional resume + matches top 10 jobs from 15M+ listings.",
  },
  {
    icon: Rocket,
    title: "LAUNCH",
    text: "Daily job alerts + AI mock interview via Hinglish chat. Student gets hired.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="The Journey" title="How CareerSaathi Works" />
        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-10 hidden h-0.5 md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
              className="h-full gold-gradient-bg"
            />
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.25 }}
                className="relative text-center"
              >
                <div className="relative z-10 mx-auto grid h-20 w-20 place-items-center rounded-full gold-gradient-bg text-navy-deep shadow-xl gold-glow">
                  <s.icon size={32} strokeWidth={2.3} />
                </div>
                <div className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-gold">
                  Step {i + 1} · {s.title}
                </div>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
