import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

const cols = ["Feature", "LinkedIn", "Naukri", "Internshala", "CareerSaathi AI ✨"];
type Cell = "yes" | "no" | "partial";
const rows: { feature: string; values: Cell[] }[] = [
  { feature: "Hindi Language Support", values: ["no", "no", "no", "yes"] },
  { feature: "Mobile-First Design", values: ["partial", "yes", "yes", "yes"] },
  { feature: "AI Resume Builder", values: ["no", "partial", "no", "yes"] },
  { feature: "Free to Use", values: ["no", "partial", "partial", "yes"] },
  { feature: "AI Interview Coach", values: ["no", "no", "no", "yes"] },
  { feature: "Hinglish Chat", values: ["no", "no", "no", "yes"] },
  { feature: "Tier 2/3 Focus", values: ["no", "partial", "partial", "yes"] },
];

function Cell({ v, highlight }: { v: Cell; highlight?: boolean }) {
  const base = "inline-flex h-7 min-w-[60px] items-center justify-center rounded-md px-2 text-xs font-semibold";
  if (v === "yes")
    return (
      <span className={`${base} ${highlight ? "gold-gradient-bg text-navy-deep" : "bg-emerald-500/20 text-emerald-300"}`}>
        ✓ Yes
      </span>
    );
  if (v === "partial")
    return <span className={`${base} bg-amber-500/15 text-amber-300`}>~ Partial</span>;
  return <span className={`${base} bg-red-500/15 text-red-300`}>✗ No</span>;
}

export function Competitive() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="The Edge" title="Why CareerSaathi Wins" />
        <div className="mt-14 overflow-x-auto rounded-2xl glass-card">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-gold/20">
                {cols.map((c, i) => (
                  <th
                    key={c}
                    className={`px-5 py-4 text-left font-semibold ${
                      i === cols.length - 1 ? "gold-text text-base" : "text-muted-foreground"
                    }`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <motion.tr
                  key={r.feature}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08 }}
                  className="border-b border-gold/10 last:border-0"
                >
                  <td className="px-5 py-4 font-medium">{r.feature}</td>
                  {r.values.map((v, vi) => (
                    <td
                      key={vi}
                      className={`px-5 py-4 ${
                        vi === r.values.length - 1 ? "bg-gold/5" : ""
                      }`}
                    >
                      <Cell v={v} highlight={vi === r.values.length - 1} />
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
