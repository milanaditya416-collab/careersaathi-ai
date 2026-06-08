import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Loader2, Plus, Sparkles, Download, Trash2 } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Mandala } from "./Mandala";

type Candidate = {
  id: string;
  name: string;
  skills: string;
  experience: string;
  location: string;
  education: string;
};

type Ranked = Candidate & {
  score: number;
  reasons: string[];
};

const seed: Candidate[] = [
  { id: "1", name: "Rahul Sharma", skills: "React, Node.js", experience: "3", location: "Mumbai", education: "B.Tech CSE" },
  { id: "2", name: "Priya Patel", skills: "Python, ML", experience: "2", location: "Bangalore", education: "M.Tech AI" },
  { id: "3", name: "Amit Kumar", skills: "React, CSS", experience: "1", location: "Delhi", education: "BCA" },
  { id: "4", name: "Sneha Rao", skills: "JavaScript, Vue", experience: "4", location: "Pune", education: "B.Tech IT" },
  { id: "5", name: "Vikram Singh", skills: "React, TypeScript", experience: "5", location: "Mumbai", education: "B.Tech CSE" },
];

const expOptions = ["0-1", "1-2", "2-3", "3-5", "5+"];

function scoreCandidate(jd: string, c: Candidate): { score: number; reasons: string[] } {
  const jdLower = jd.toLowerCase();
  const skills = c.skills.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);

  // Skills (40)
  const matched = skills.filter((s) => s && jdLower.includes(s));
  const skillScore = Math.min(40, matched.length * 14);

  // Experience (30)
  const expNum = parseFloat(c.experience) || 0;
  const expMatch = jdLower.match(/(\d+)\s*(?:\+)?\s*(?:year|yr)/);
  let expScore = 20;
  if (expMatch) {
    const need = parseInt(expMatch[1]);
    const diff = Math.abs(expNum - need);
    expScore = Math.max(0, 30 - diff * 6);
  } else {
    expScore = Math.min(30, 15 + expNum * 3);
  }

  // Location (20)
  const locScore = c.location && jdLower.includes(c.location.toLowerCase()) ? 20 : 6;

  // Education (10)
  const eduScore = c.education ? 10 : 0;

  const total = Math.min(100, Math.round(skillScore + expScore + locScore + eduScore));

  const reasons: string[] = [];
  if (matched.length) reasons.push(`Matches skills: ${matched.join(", ")}`);
  else reasons.push("No direct skill keywords matched");
  if (locScore === 20) reasons.push(`Located in target city: ${c.location}`);
  if (expScore >= 24) reasons.push(`Strong experience fit (${c.experience} yrs)`);
  else if (expScore < 15) reasons.push(`Experience may not align (${c.experience} yrs)`);

  return { score: total, reasons: reasons.slice(0, 3) };
}

function rankBadge(rank: number) {
  if (rank === 1) return { bg: "bg-gradient-to-br from-yellow-300 to-yellow-600", label: "#1" };
  if (rank === 2) return { bg: "bg-gradient-to-br from-slate-200 to-slate-400", label: "#2" };
  if (rank === 3) return { bg: "bg-gradient-to-br from-amber-600 to-amber-800", label: "#3" };
  return { bg: "bg-navy-light border border-gold/30", label: `#${rank}` };
}

export function Ranker() {
  const [jd, setJd] = useState(
    "Looking for a React developer with 2 years experience in Mumbai. Must know TypeScript and modern frontend tooling.",
  );
  const [candidates, setCandidates] = useState<Candidate[]>(seed);
  const [form, setForm] = useState<Omit<Candidate, "id">>({
    name: "",
    skills: "",
    experience: "1-2",
    location: "",
    education: "",
  });
  const [ranked, setRanked] = useState<Ranked[] | null>(null);
  const [loading, setLoading] = useState(false);

  const addCandidate = () => {
    if (!form.name.trim()) return;
    setCandidates((c) => [...c, { ...form, id: Date.now().toString() }]);
    setForm({ name: "", skills: "", experience: "1-2", location: "", education: "" });
  };
  const removeCandidate = (id: string) => setCandidates((c) => c.filter((x) => x.id !== id));

  const rank = () => {
    setLoading(true);
    setRanked(null);
    setTimeout(() => {
      const scored = candidates
        .map((c) => ({ ...c, ...scoreCandidate(jd, c) }))
        .sort((a, b) => b.score - a.score);
      setRanked(scored);
      setLoading(false);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#F4D875", "#B8901F", "#FFFFFF"],
      });
    }, 1500);
  };

  const exportCSV = () => {
    if (!ranked) return;
    const rows = [
      ["Rank", "Name", "Score", "Location", "Skills", "Reasons"],
      ...ranked.map((r, i) => [
        i + 1,
        r.name,
        r.score,
        r.location,
        r.skills,
        r.reasons.join(" | "),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "careersaathi-rankings.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="demo" className="relative overflow-hidden py-24 sm:py-32">
      <Mandala className="-left-48 top-20" size={500} opacity={0.05} />
      <Mandala className="-right-48 bottom-20" size={500} opacity={0.05} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Live Demo"
          title="🎯 Live AI Candidate Ranker"
          subtitle="Paste a job description, add candidates, watch AI rank them in real time."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* LEFT - input */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl glass-card p-6 sm:p-8"
          >
            <label className="text-sm font-semibold text-gold">Job Description</label>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              rows={4}
              placeholder="e.g. Looking for a React developer with 2 years experience in Mumbai..."
              className="mt-2 w-full rounded-lg border border-gold/20 bg-navy-deep/60 p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-gold/60"
            />

            <h4 className="mt-8 text-sm font-semibold text-gold">Add Candidates</h4>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                className="rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60"
              />
              <input
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
                placeholder="Skills (comma separated)"
                className="rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60"
              />
              <select
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60"
              >
                {expOptions.map((o) => (
                  <option key={o} value={o.includes("+") ? "5" : o.split("-")[1]}>
                    {o} yrs
                  </option>
                ))}
              </select>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Location"
                className="rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60"
              />
              <input
                value={form.education}
                onChange={(e) => setForm({ ...form, education: e.target.value })}
                placeholder="Education"
                className="rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60 sm:col-span-2"
              />
            </div>
            <button
              onClick={addCandidate}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gold/50 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold transition-all hover:bg-gold/20"
            >
              <Plus size={16} /> Add Candidate
            </button>

            <div className="mt-6 space-y-2 max-h-60 overflow-y-auto pr-1">
              {candidates.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-lg border border-gold/15 bg-navy-deep/40 px-3 py-2 text-xs"
                >
                  <div>
                    <span className="font-semibold text-foreground">{c.name}</span>
                    <span className="ml-2 text-muted-foreground">
                      {c.skills} · {c.experience} yrs · {c.location}
                    </span>
                  </div>
                  <button
                    onClick={() => removeCandidate(c.id)}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <motion.button
              onClick={rank}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 w-full rounded-xl gold-gradient-bg px-6 py-4 text-base font-bold text-navy-deep shadow-xl gold-glow animate-pulse-glow"
            >
              🚀 Rank Candidates with AI
            </motion.button>
          </motion.div>

          {/* RIGHT - results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl glass-card p-6 sm:p-8 min-h-[600px]"
          >
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Sparkles className="text-gold" size={20} /> AI Rankings
            </h3>

            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-32"
                >
                  <Loader2 className="h-12 w-12 animate-spin text-gold" />
                  <p className="mt-4 text-sm text-muted-foreground">AI is analyzing candidates...</p>
                </motion.div>
              )}

              {!loading && !ranked && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-32 text-center"
                >
                  <div className="grid h-20 w-20 place-items-center rounded-2xl border border-gold/30 bg-gold/10">
                    <Sparkles className="text-gold" size={32} />
                  </div>
                  <p className="mt-6 max-w-xs text-sm text-muted-foreground">
                    Click "Rank Candidates with AI" to see live AI-powered rankings appear here.
                  </p>
                </motion.div>
              )}

              {!loading && ranked && (
                <motion.div key="ranked" className="mt-6 space-y-4">
                  {ranked.map((r, i) => {
                    const badge = rankBadge(i + 1);
                    return (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.12 }}
                        className={`rounded-xl border bg-navy-deep/60 p-4 ${
                          i === 0 ? "border-gold gold-glow" : "border-gold/15"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-sm font-bold text-navy-deep ${badge.bg}`}
                          >
                            {badge.label}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <div>
                                <div className="font-semibold">{r.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {r.location} · {r.experience} yrs
                                </div>
                              </div>
                              <div className="font-display text-2xl font-bold gold-text">
                                {r.score}%
                              </div>
                            </div>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-navy-light">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${r.score}%` }}
                                transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: "easeOut" }}
                                className="h-full gold-gradient-bg"
                              />
                            </div>
                            <ul className="mt-3 space-y-1">
                              {r.reasons.map((reason, ri) => (
                                <li key={ri} className="text-xs text-muted-foreground">
                                  • {reason}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {r.skills.split(",").map((s, si) => (
                                <span
                                  key={si}
                                  className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] text-gold"
                                >
                                  {s.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  <button
                    onClick={exportCSV}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gold/50 bg-gold/10 px-4 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold/20"
                  >
                    <Download size={16} /> Export Rankings as CSV
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
