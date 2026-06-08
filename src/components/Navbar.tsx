import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#demo", label: "Demo" },
  { href: "#roadmap", label: "Roadmap" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gold/20 bg-navy-deep/85 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg gold-gradient-bg font-display text-lg font-bold text-navy-deep">
            C
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Career<span className="gold-text">Saathi</span> AI
          </span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#demo"
            className="rounded-md gold-gradient-bg px-4 py-2 text-sm font-semibold text-navy-deep transition-transform hover:scale-105"
          >
            Try Demo
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
