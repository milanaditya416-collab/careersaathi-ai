import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type TabId = "home" | "rank" | "resume" | "jd" | "interview" | "salary";

const tabs: { id: TabId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "rank", label: "Rank" },
  { id: "resume", label: "Resume" },
  { id: "jd", label: "JD Gen" },
  { id: "interview", label: "Interview" },
  { id: "salary", label: "Salary" },
];

export function Navbar({ active, onChange }: { active: TabId; onChange: (t: TabId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "border-b border-gold/20 bg-navy-deep/90 backdrop-blur-lg" : "bg-navy-deep/40 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button onClick={() => onChange("home")} className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-lg gold-gradient-bg font-display text-lg font-bold text-navy-deep">C</span>
          <span className="font-display text-base sm:text-lg font-semibold tracking-tight">
            Career<span className="gold-text">Saathi</span> AI
          </span>
        </button>
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => onChange(t.id)}
              className={`relative shrink-0 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                active === t.id ? "text-navy-deep" : "text-muted-foreground hover:text-gold"
              }`}>
              {active === t.id && (
                <motion.div layoutId="navpill" className="absolute inset-0 -z-10 rounded-full gold-gradient-bg" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
