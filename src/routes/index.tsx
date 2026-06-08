import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CareerSaathi AI — Hindi-First AI Career Platform for Bharat" },
      {
        name: "description",
        content:
          "India's first Hindi-first AI career platform. Free AI resume builder, 15M+ job matching, and Hinglish interview coach for 20 Crore+ students.",
      },
      { property: "og:title", content: "CareerSaathi AI — Apna Career, Apni Bhasha" },
      {
        property: "og:description",
        content:
          "Free AI-powered career guidance, resume building, and interview coaching in Hindi & Hinglish. Built for Bharat.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Ranker />
        <HowItWorks />
        <Competitive />
        <Market />
        <Roadmap />
      </main>
      <Footer />
      <FloatingBadge />
    </div>
  );
}
