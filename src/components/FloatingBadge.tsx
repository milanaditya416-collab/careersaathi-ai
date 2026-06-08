import { motion } from "framer-motion";

export function FloatingBadge() {
  return (
    <motion.a
      href="#demo"
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.5, type: "spring" }}
      whileHover={{ scale: 1.05 }}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full gold-gradient-bg px-4 py-2.5 text-xs font-bold text-navy-deep shadow-xl gold-glow"
    >
      🏆 Hackathon 2026
    </motion.a>
  );
}
