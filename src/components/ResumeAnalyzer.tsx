import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Copy, Check } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { analyzeResume } from "@/lib/ai.functions";

type Result = Awaited<ReturnType<typeof analyzeResume>>;

function Gauge({ value }: { value: number }) {
  const r = 60;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="oklch(0.26 0.06 268)" strokeWidth="12" fill="none" />
        <motion.circle cx="70" cy="70" r={r} stroke="url(#g)" strokeWidth="12" fill="none" strokeLinecap="round"
          initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1.5, ease: "easeOut" }}
          strokeDasharray={c} />
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="#F4D875" /><stop offset="1" stopColor="#B8901F" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-display text-3xl font-bold gold-text">{value}</div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Overall</div>
        </div>
      </div>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">{label}</span><span className="font-semibold text-gold">{value}%</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-navy-light">
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1 }} className="h-full gold-gradient-bg" />
      </div>
    </div>
  );
}

export function ResumeAnalyzer() {
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const run = async () => {
    if (!resume.trim() || !role.trim()) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const r = await analyzeResume({ data: { resume, jobRole: role } });
      setResult(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally { setLoading(false); }
  };

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.rewrittenSummary);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="resume" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="AI Tool" title="📄 AI Resume Analyzer" subtitle="Get instant AI scoring, gap analysis, and a rewritten summary." />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl glass-card p-6 sm:p-8">
            <label className="text-sm font-semibold text-gold">Paste your resume text</label>
            <textarea value={resume} onChange={(e) => setResume(e.target.value)} rows={14}
              placeholder="Paste your full resume here..."
              className="mt-2 w-full rounded-lg border border-gold/20 bg-navy-deep/60 p-3 text-sm outline-none focus:border-gold/60" />
            <label className="mt-4 block text-sm font-semibold text-gold">Job Role</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Senior Frontend Engineer"
              className="mt-2 w-full rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60" />
            <button onClick={run} disabled={loading || !resume.trim() || !role.trim()}
              className="mt-6 w-full rounded-xl gold-gradient-bg px-6 py-3 font-bold text-navy-deep disabled:opacity-50">
              {loading ? "Analyzing..." : "✨ Analyze with AI"}
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl glass-card p-6 sm:p-8 min-h-[500px]">
            {loading && (
              <div className="flex h-full flex-col items-center justify-center py-32">
                <Loader2 className="h-10 w-10 animate-spin text-gold" />
                <p className="mt-3 text-sm text-muted-foreground">AI is reviewing your resume...</p>
              </div>
            )}
            {error && <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div>}
            {!loading && !result && !error && (
              <div className="flex h-full flex-col items-center justify-center text-center text-sm text-muted-foreground">
                Submit your resume to see AI insights.
              </div>
            )}
            {result && (
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <Gauge value={result.overallScore} />
                  <div className="flex-1 space-y-3">
                    <Bar label="Skills Match" value={result.skillsMatch} />
                    <Bar label="Experience" value={result.experienceRelevance} />
                    <Bar label="Keywords" value={result.keywordsOptimization} />
                    <Bar label="Presentation" value={result.presentationScore} />
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold text-emerald-400">✅ Strengths</h4>
                  <div className="space-y-2">
                    {result.strengths.map((s, i) => (
                      <div key={i} className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs">{s}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold text-amber-400">⚠️ Improvements</h4>
                  <div className="space-y-2">
                    {result.improvements.map((s, i) => (
                      <div key={i} className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs">{s}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold text-rose-400">🎯 Missing Keywords</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map((k, i) => (
                      <span key={i} className="rounded-full border border-rose-500/40 bg-rose-500/10 px-2 py-1 text-xs text-rose-300">{k}</span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-gold/30 bg-gold/5 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gold">✨ AI Rewrite Suggestion</h4>
                    <button onClick={copy} className="inline-flex items-center gap-1 text-xs text-gold hover:underline">
                      {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <p className="text-xs leading-relaxed text-foreground/90">{result.rewrittenSummary}</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
