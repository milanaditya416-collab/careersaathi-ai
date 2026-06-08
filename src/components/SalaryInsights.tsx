import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { salaryInsights } from "@/lib/ai.functions";

const cities = ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Indore"];

type Result = Awaited<ReturnType<typeof salaryInsights>>;

export function SalaryInsights() {
  const [form, setForm] = useState({ role: "Frontend Engineer", city: "Bangalore", experience: "2", skills: "React, TypeScript" });
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true); setError(null); setResult(null);
    try { setResult(await salaryInsights({ data: form })); }
    catch (e) { setError(e instanceof Error ? e.message : "Failed"); }
    finally { setLoading(false); }
  };

  const pct = result ? Math.min(100, Math.max(0, ((result.estimatedLPA - result.minLPA) / Math.max(0.1, result.maxLPA - result.minLPA)) * 100)) : 0;

  return (
    <section id="salary" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="AI Insights" title="💰 Smart Salary Insights" subtitle="Know your worth. AI-powered Indian salary intelligence." />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 rounded-2xl glass-card p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-xs font-semibold text-gold">Job Role</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gold">City</label>
              <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60">
                {cities.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gold">Experience (years)</label>
              <input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gold">Skills</label>
              <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60" />
            </div>
          </div>
          <button onClick={run} disabled={loading}
            className="mt-6 w-full rounded-xl gold-gradient-bg px-6 py-3 font-bold text-navy-deep disabled:opacity-50">
            {loading ? "Crunching numbers..." : "💎 Get Salary Insights"}
          </button>

          {loading && <div className="mt-8 grid place-items-center"><Loader2 className="h-10 w-10 animate-spin text-gold" /></div>}
          {error && <div className="mt-6 rounded-lg border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div>}

          {result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-6">
              <div className="rounded-xl border border-gold/30 bg-gold/5 p-6">
                <div className="text-center">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Your estimated worth</div>
                  <div className="mt-1 font-display text-4xl font-bold gold-text">₹{result.estimatedLPA} LPA</div>
                </div>
                <div className="mt-6">
                  <div className="relative h-3 rounded-full bg-navy-light overflow-hidden">
                    <div className="absolute inset-0 gold-gradient-bg opacity-30" />
                    <motion.div initial={{ left: 0 }} animate={{ left: `${pct}%` }} transition={{ duration: 1.2 }}
                      className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full gold-gradient-bg gold-glow border-2 border-white" />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>₹{result.minLPA} LPA</span>
                    <span>Avg ₹{result.avgLPA} LPA</span>
                    <span>₹{result.maxLPA} LPA</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-gold/20 bg-navy-deep/40 p-4">
                  <h4 className="text-sm font-semibold text-gold">🚀 Top salary-boosting skills</h4>
                  <ul className="mt-2 space-y-1 text-xs">
                    {result.topSkills.map((s, i) => <li key={i}>• {s}</li>)}
                  </ul>
                </div>
                <div className="rounded-xl border border-gold/20 bg-navy-deep/40 p-4">
                  <h4 className="text-sm font-semibold text-gold">🏢 Companies hiring</h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {result.companies.map((c, i) => <span key={i} className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-xs">{c}</span>)}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gold/20 bg-navy-deep/40 p-4">
                <h4 className="text-sm font-semibold text-gold">💬 Negotiation tips</h4>
                <ul className="mt-2 space-y-2 text-xs">
                  {result.negotiationTips.map((t, i) => <li key={i}>{i + 1}. {t}</li>)}
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
