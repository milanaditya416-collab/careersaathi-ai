import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar, type TabId } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Ranker } from "@/components/Ranker";
import { HowItWorks } from "@/components/HowItWorks";
import { Competitive } from "@/components/Competitive";
import { Market } from "@/components/Market";
import { Roadmap } from "@/components/Roadmap";
import { Footer } from "@/components/Footer";
import { FloatingBadge } from "@/components/FloatingBadge";
import { ResumeAnalyzer } from "@/components/ResumeAnalyzer";
import { JDGenerator } from "@/components/JDGenerator";
import { InterviewCoach } from "@/components/InterviewCoach";
import { SalaryInsights } from "@/components/SalaryInsights";
import { ChatWidget } from "@/components/ChatWidget";
import { HackathonBanner } from "@/components/HackathonBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CareerSaathi AI — Hindi-First AI Career Platform for Bharat" },
      { name: "description", content: "AI-powered candidate ranking, resume analysis, interview coaching, and salary insights in Hindi & Hinglish." },
      { property: "og:title", content: "CareerSaathi AI — Apna Career, Apni Bhasha" },
      { property: "og:description", content: "Free AI-powered career guidance, resume building, and interview coaching in Hindi & Hinglish. Built for Bharat." },
    ],
    links: [
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  const [tab, setTab] = useState<TabId>("home");
  const [presetJD, setPresetJD] = useState<string | undefined>(undefined);

  const useJDInRanker = (jd: string) => {
    setPresetJD(jd);
    setTab("rank");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <HackathonBanner />
      <Navbar active={tab} onChange={(t) => { setTab(t); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
            {tab === "home" && (
              <>
                <Hero />
                <Problem />
                <Solution />
                <HowItWorks />
                <Competitive />
                <Market />
                <Roadmap />
              </>
            )}
            {tab === "rank" && <Ranker key={presetJD || "default"} initialJD={presetJD} />}
            {tab === "resume" && <ResumeAnalyzer />}
            {tab === "jd" && <JDGenerator onUseInRanker={useJDInRanker} />}
            {tab === "interview" && <InterviewCoach />}
            {tab === "salary" && <SalaryInsights />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingBadge />
      <ChatWidget />
    </div>
  );
}
