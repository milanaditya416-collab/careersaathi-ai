import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Copy, Check, ArrowRight } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { generateJD } from "@/lib/ai.functions";

export function JDGenerator({ onUseInRanker }: { onUseInRanker: (jd: string) => void }) {
  const [form, setForm] = useState({
    title: "Frontend Engineer", companyType: "Startup", skills: "React, TypeScript, Tailwind",
    experience: "Junior", location: "Bangalore", salary: "8-15 LPA",
  });
  const [jd, setJd] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true); setError(null);
    try {
      const r = await generateJD({ data: form });
      setJd(r.jd);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally { setLoading(false); }
  };

  const copy = () => {
    if (!jd) return;
    navigator.clipboard.writeText(jd);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const fields: [keyof typeof form, string, string[]?][] = [
    ["title", "Job Title"], ["companyType", "Company Type", ["Startup", "MNC", "Government"]],
    ["skills", "Required Skills"], ["experience", "Experience Level", ["Fresher", "Junior", "Senior"]],
    ["location", "Location"], ["salary", "Salary Range"],
  ];

  return (
    <section id="jd" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="For Recruiters" title="📝 AI Job Description Generator" subtitle="Generate inclusive, professional JDs in seconds." />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl glass-card p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map(([key, label, options]) => (
                <div key={key} className={key === "skills" ? "sm:col-span-2" : ""}>
                  <label className="text-xs font-semibold text-gold">{label}</label>
                  {options ? (
                    <select value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60">
                      {options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60" />
                  )}
                </div>
              ))}
            </div>
            <button onClick={run} disabled={loading}
              className="mt-6 w-full rounded-xl gold-gradient-bg px-6 py-3 font-bold text-navy-deep disabled:opacity-50">
              {loading ? "Generating..." : "✨ Generate JD with AI"}
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl glass-card p-6 sm:p-8 min-h-[400px]">
            {loading && (
              <div className="flex h-full items-center justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-gold" /></div>
            )}
            {error && <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div>}
            {!loading && !jd && !error && (
              <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">Your AI-generated JD will appear here.</div>
            )}
            {jd && (
              <div>
                <div className="max-h-96 overflow-y-auto whitespace-pre-wrap rounded-lg border border-gold/20 bg-navy-deep/40 p-4 text-xs leading-relaxed">{jd}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={copy} className="inline-flex items-center gap-1 rounded-lg border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold text-gold hover:bg-gold/20">
                    {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy JD"}
                  </button>
                  <button onClick={() => onUseInRanker(jd)} className="inline-flex items-center gap-1 rounded-lg gold-gradient-bg px-4 py-2 text-xs font-bold text-navy-deep hover:scale-105 transition">
                    Use in Ranker <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
