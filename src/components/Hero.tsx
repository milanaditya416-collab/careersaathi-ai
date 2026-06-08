import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mandala } from "./Mandala";

function useCountUp(target: number, duration = 2000, suffix = "") {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return `${val}${suffix}`;
}

function Typewriter({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, 55);
    }, delay);
    return () => clearTimeout(start);
  }, [text, delay]);
  return <span className={className}>{shown}<span className="opacity-60">|</span></span>;
}

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 8,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold-bright"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 12px oklch(0.87 0.16 88 / 0.8)",
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}

function PhoneMockup() {
  const messages = [
    { from: "user", text: "Mujhe software job chahiye, mujhe coding aati hai" },
    { from: "ai", text: "✅ Resume ban gaya! Aapke liye 10 best jobs mile hain Indore mein" },
    { from: "ai", text: "Interview preparation shuru karein? 🎯" },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div className="absolute -inset-8 rounded-[3rem] bg-gold/20 blur-3xl" />
      <div className="relative rounded-[2.5rem] border-4 border-navy-light bg-navy-deep p-3 shadow-2xl gold-glow">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-navy to-navy-deep">
          <div className="flex items-center justify-between px-5 pt-4 text-[10px] text-muted-foreground">
            <span>9:41</span>
            <span>CareerSaathi</span>
          </div>
          <div className="space-y-3 px-4 py-6 min-h-[420px]">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.5 + i * 1.2, duration: 0.5 }}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                    m.from === "user"
                      ? "gold-gradient-bg text-navy-deep rounded-br-sm"
                      : "bg-navy-light text-foreground rounded-bl-sm border border-gold/20"
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const students = useCountUp(20, 1800);
  const jobs = useCountUp(15, 1800);
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <Mandala className="-left-40 top-10" size={600} opacity={0.07} />
      <Mandala className="-right-40 bottom-10" size={500} opacity={0.06} />
      <Particles />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium text-gold backdrop-blur">
            🏆 India Runs Hackathon 2026
          </span>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block">India's First</span>
            <span className="block gold-text">
              <Typewriter text="Hindi-First AI" delay={600} />
            </span>
            <span className="block">Career Platform</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            <span className="font-semibold text-foreground">Apna Career, Apni Bhasha</span> — Empowering
            20 Crore+ Hindi-medium students with AI-powered career guidance, job matching, and interview
            coaching. Free. Mobile-first. Built for Bharat.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#demo"
              className="rounded-lg gold-gradient-bg px-6 py-3 text-sm font-bold text-navy-deep shadow-lg transition-all hover:scale-105 hover:gold-glow"
            >
              Try Live Demo →
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-gold/50 px-6 py-3 text-sm font-bold text-gold transition-all hover:bg-gold/10 hover:scale-105"
            >
              View on GitHub
            </a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-gold/15 pt-8">
            {[
              { v: `${students} Cr+`, l: "Students Underserved" },
              { v: `${jobs}M+`, l: "Live Job Listings" },
              { v: "₹0", l: "Cost to Students" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
              >
                <div className="font-display text-2xl font-bold gold-text sm:text-3xl">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}
