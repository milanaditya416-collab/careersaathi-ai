import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { chatReply } from "@/lib/ai.functions";

type Msg = { role: "user" | "assistant"; content: string };

const starters = [
  "Resume kaise banaye?",
  "Interview tips do",
  "Best jobs for freshers",
  "Salary negotiation tips",
  "LinkedIn profile tips",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" }); }, [msgs, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs(next); setInput(""); setLoading(true);
    try {
      const r = await chatReply({ data: { messages: next } });
      setMsgs([...next, { role: "assistant", content: r.reply }]);
    } catch (e) {
      setMsgs([...next, { role: "assistant", content: "Sorry aap, kuch problem aa gayi. Please try again." }]);
    } finally { setLoading(false); }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full gold-gradient-bg text-navy-deep shadow-2xl gold-glow animate-pulse-glow"
        aria-label="Open chat">
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-gold/30 bg-navy-deep">
              <div className="flex items-center justify-between border-b border-gold/20 bg-navy/80 p-4">
                <div>
                  <div className="font-display font-bold flex items-center gap-2">CareerSaathi AI Assistant 🤖</div>
                  <div className="text-xs text-muted-foreground">Ask me anything in Hindi or English</div>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-gold/10 hover:text-gold">
                  <X size={18} />
                </button>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                {msgs.length === 0 && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Namaste! 🙏 Try a starter prompt:</p>
                    <div className="flex flex-wrap gap-2">
                      {starters.map((s) => (
                        <button key={s} onClick={() => send(s)}
                          className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs text-gold hover:bg-gold/20">
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {msgs.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                      m.role === "user"
                        ? "gold-gradient-bg text-navy-deep font-medium"
                        : "glass-card text-foreground"
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="glass-card rounded-2xl px-4 py-3 flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span key={i} className="h-2 w-2 rounded-full bg-gold"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="flex gap-2 border-t border-gold/20 bg-navy/60 p-3">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question..."
                  className="flex-1 rounded-lg border border-gold/20 bg-navy-deep/60 px-3 py-2 text-sm outline-none focus:border-gold/60" />
                <button type="submit" disabled={loading || !input.trim()}
                  className="grid h-10 w-10 place-items-center rounded-lg gold-gradient-bg text-navy-deep disabled:opacity-50">
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
