import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Download } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { generateInterviewQuestion, evaluateAnswer } from "@/lib/ai.functions";

type Eval = { score: number; good: string; improve: string; modelAnswer: string };
type Round = { question: string; answer: string; eval: Eval };

const roles = ["Software Engineer", "Data Analyst", "Marketing", "Sales", "HR", "Other"];
const levels = ["Fresher", "1-3 years", "3+ years"];
const types = ["Technical", "HR", "Case Study"];
const TOTAL = 5;

export function InterviewCoach() {
  const [role, setRole] = useState(roles[0]);
  const [level, setLevel] = useState(levels[0]);
  const [type, setType] = useState(types[0]);
  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [evalResult, setEvalResult] = useState<Eval | null>(null);
  const [history, setHistory] = useState<Round[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const nextQuestion = async () => {
    setLoading(true); setEvalResult(null); setAnswer("");
    try {
      const r = await generateInterviewQuestion({
        data: { role, level, type, previousQuestions: history.map((h) => h.question) },
      });
      setQuestion(r.question);
    } finally { setLoading(false); }
  };

  const start = async () => {
    setStarted(true); setHistory([]); setDone(false);
    await nextQuestion();
  };

  const submit = async () => {
    if (!question || !answer.trim()) return;
    setLoading(true);
    try {
      const e = await evaluateAnswer({ data: { role, question, answer } });
      setEvalResult(e);
      setHistory((h) => [...h, { question, answer, eval: e }]);
    } finally { setLoading(false); }
  };

  const next = async () => {
    if (history.length >= TOTAL) { setDone(true); setQuestion(null); return; }
    await nextQuestion();
  };

  const downloadReport = () => {
    const total = history.reduce((s, r) => s + r.eval.score, 0);
    const avg = (total / history.length).toFixed(1);
    const text = `CareerSaathi AI — Interview Report
Role: ${role} | Level: ${level} | Type: ${type}
Overall Score: ${avg}/10

${history.map((h, i) => `Q${i + 1}: ${h.question}\nYour answer: ${h.answer}\nScore: ${h.eval.score}/10\nGood: ${h.eval.good}\nImprove: ${h.eval.improve}\n`).join("\n")}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "interview-report.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  const avg = history.length ? (history.reduce((s, r) => s + r.eval.score, 0) / history.length).toFixed(1) : "0";

  return (
    <section id="interview" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Practice" title="🎤 AI Interview Coach" subtitle="Realistic AI-generated questions with personalized feedback." />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 rounded-2xl glass-card p-6 sm:p-8">
          {!started && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-semibold text-gold">Job Role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 w-full rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60">
                    {roles.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gold">Experience</label>
                  <select value={level} onChange={(e) => setLevel(e.target.value)} className="mt-1 w-full rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60">
                    {levels.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gold">Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 w-full rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60">
                    {types.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={start} className="w-full rounded-xl gold-gradient-bg px-6 py-3 font-bold text-navy-deep">🚀 Start AI Interview</button>
            </div>
          )}

          {started && !done && (
            <div>
              <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Question {history.length + (evalResult ? 0 : 1)} of {TOTAL}</span>
                <span>Avg score: {avg}/10</span>
              </div>
              {loading && !question && <div className="py-16 grid place-items-center"><Loader2 className="h-10 w-10 animate-spin text-gold" /></div>}

              <AnimatePresence mode="wait">
                {question && (
                  <motion.div key={question} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className="rounded-xl border border-gold/30 bg-gold/5 p-4">
                      <div className="text-xs uppercase tracking-wide text-gold/80">Question</div>
                      <p className="mt-2 font-display text-lg">{question}</p>
                    </div>

                    {!evalResult && (
                      <>
                        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={6} placeholder="Type your answer here..."
                          className="mt-4 w-full rounded-lg border border-gold/20 bg-navy-deep/60 p-3 text-sm outline-none focus:border-gold/60" />
                        <button onClick={submit} disabled={loading || !answer.trim()}
                          className="mt-3 w-full rounded-lg gold-gradient-bg px-6 py-3 font-bold text-navy-deep disabled:opacity-50">
                          {loading ? "Evaluating..." : "Submit Answer"}
                        </button>
                      </>
                    )}

                    {evalResult && (
                      <div className="mt-4 space-y-3">
                        <div className="rounded-xl border border-gold/20 bg-navy-deep/60 p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Score</span>
                            <span className="font-display text-3xl font-bold gold-text">{evalResult.score}/10</span>
                          </div>
                        </div>
                        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs">
                          <div className="font-semibold text-emerald-300">👍 What was good</div>
                          <p className="mt-1 text-foreground/90">{evalResult.good}</p>
                        </div>
                        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs">
                          <div className="font-semibold text-amber-300">📈 What to improve</div>
                          <p className="mt-1 text-foreground/90">{evalResult.improve}</p>
                        </div>
                        <div className="rounded-lg border border-gold/30 bg-gold/5 p-3 text-xs">
                          <div className="font-semibold text-gold">💡 Model answer</div>
                          <p className="mt-1 text-foreground/90">{evalResult.modelAnswer}</p>
                        </div>
                        <button onClick={next} className="w-full rounded-lg gold-gradient-bg px-6 py-3 font-bold text-navy-deep">
                          {history.length >= TOTAL ? "See Final Report →" : "Next Question →"}
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {done && (
            <div className="text-center">
              <div className="font-display text-2xl">🎉 Interview Complete!</div>
              <div className="mt-4 font-display text-6xl font-bold gold-text">{avg}/10</div>
              <p className="mt-2 text-sm text-muted-foreground">Overall Score across {TOTAL} questions</p>
              <div className="mt-6 flex justify-center gap-3">
                <button onClick={() => { setStarted(false); setHistory([]); setEvalResult(null); setQuestion(null); }}
                  className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold">Try Again</button>
                <button onClick={downloadReport}
                  className="inline-flex items-center gap-2 rounded-lg gold-gradient-bg px-4 py-2 text-sm font-bold text-navy-deep">
                  <Download size={14} /> Download Report
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
