import { createServerFn } from "@tanstack/react-start";
import { generateObject, generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const MODEL = "google/gemini-3-flash-preview";

function getModel() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  return createLovableAiGatewayProvider(key)(MODEL);
}

/* ----------------- RANK CANDIDATES ----------------- */
const CandidateSchema = z.object({
  id: z.string(),
  name: z.string(),
  skills: z.string(),
  experience: z.string(),
  location: z.string(),
  education: z.string(),
});

export const rankCandidates = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      jd: z.string().min(5),
      candidates: z.array(CandidateSchema).min(1).max(20),
    }),
  )
  .handler(async ({ data }) => {
    const { object } = await generateObject({
      model: getModel(),
      schema: z.object({
        rankings: z.array(
          z.object({
            id: z.string(),
            score: z.number(),
            recommendation: z.enum(["Strong Hire", "Consider", "Pass"]),
            summary: z.string(),
            reasons: z.array(z.string()),
            skillsGap: z.array(z.string()),
          }),
        ),
      }),
      prompt: `You are an expert AI recruiter. Rank these candidates for the job below.

JOB DESCRIPTION:
${data.jd}

CANDIDATES:
${data.candidates.map((c) => `- id:${c.id} | ${c.name} | Skills: ${c.skills} | Exp: ${c.experience}y | Loc: ${c.location} | Edu: ${c.education}`).join("\n")}

For each candidate provide: score (0-100), recommendation, one-line summary, 3 specific reasons, and skills they're missing. Sort by score desc.`,
    });
    return object;
  });

/* ----------------- RESUME ANALYZER ----------------- */
export const analyzeResume = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      resume: z.string().min(20),
      jobRole: z.string().min(2),
    }),
  )
  .handler(async ({ data }) => {
    const { object } = await generateObject({
      model: getModel(),
      schema: z.object({
        overallScore: z.number(),
        skillsMatch: z.number(),
        experienceRelevance: z.number(),
        keywordsOptimization: z.number(),
        presentationScore: z.number(),
        strengths: z.array(z.string()),
        improvements: z.array(z.string()),
        missingKeywords: z.array(z.string()),
        rewrittenSummary: z.string(),
      }),
      prompt: `Analyze this resume for a "${data.jobRole}" role.

RESUME:
${data.resume}

Score 0-100 for each dimension. Give 3 strengths, 3 improvements, 5-8 missing keywords, and rewrite the professional summary section to be stronger and more impactful.`,
    });
    return object;
  });

/* ----------------- JD GENERATOR ----------------- */
export const generateJD = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      title: z.string(),
      companyType: z.string(),
      skills: z.string(),
      experience: z.string(),
      location: z.string(),
      salary: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { text } = await generateText({
      model: getModel(),
      prompt: `Write a complete, professional job description in markdown for:
Title: ${data.title}
Company Type: ${data.companyType}
Required Skills: ${data.skills}
Experience: ${data.experience}
Location: ${data.location}
Salary: ${data.salary}

Include sections: About the Role, Responsibilities, Required Skills, Nice to Have, What We Offer. Be specific and inclusive.`,
    });
    return { jd: text };
  });

/* ----------------- INTERVIEW COACH ----------------- */
export const generateInterviewQuestion = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      role: z.string(),
      level: z.string(),
      type: z.string(),
      previousQuestions: z.array(z.string()).default([]),
    }),
  )
  .handler(async ({ data }) => {
    const { object } = await generateObject({
      model: getModel(),
      schema: z.object({ question: z.string() }),
      prompt: `Generate ONE realistic ${data.type} interview question for a ${data.level} ${data.role}. Do not repeat any of these: ${data.previousQuestions.join(" | ") || "none"}`,
    });
    return object;
  });

export const evaluateAnswer = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      role: z.string(),
      question: z.string(),
      answer: z.string().min(2),
    }),
  )
  .handler(async ({ data }) => {
    const { object } = await generateObject({
      model: getModel(),
      schema: z.object({
        score: z.number(),
        good: z.string(),
        improve: z.string(),
        modelAnswer: z.string(),
      }),
      prompt: `You are an interview coach for a ${data.role} role.
QUESTION: ${data.question}
CANDIDATE ANSWER: ${data.answer}

Give score (1-10), what was good, what to improve, and a model answer.`,
    });
    return object;
  });

/* ----------------- SALARY INSIGHTS ----------------- */
export const salaryInsights = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      role: z.string(),
      city: z.string(),
      experience: z.string(),
      skills: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { object } = await generateObject({
      model: getModel(),
      schema: z.object({
        minLPA: z.number(),
        avgLPA: z.number(),
        maxLPA: z.number(),
        estimatedLPA: z.number(),
        topSkills: z.array(z.string()),
        companies: z.array(z.string()),
        negotiationTips: z.array(z.string()),
      }),
      prompt: `Provide realistic Indian salary insights (in LPA = lakhs per annum) for:
Role: ${data.role}
City: ${data.city}
Experience: ${data.experience} years
Skills: ${data.skills}

Provide min/avg/max LPA, the user's estimated worth, top 3 salary-boosting skills, 4-6 hiring companies in that city, and 3 negotiation tips specific to this profile.`,
    });
    return object;
  });

/* ----------------- HINGLISH CHAT (one-shot) ----------------- */
export const chatReply = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() })),
    }),
  )
  .handler(async ({ data }) => {
    const { text } = await generateText({
      model: getModel(),
      system:
        "You are CareerSaathi AI, a friendly career guidance assistant for Hindi-medium students in India. Always respond in a mix of Hindi and English (Hinglish). Be encouraging, practical, and specific. Give actionable career advice. Address the user as 'aap'. Keep responses concise and friendly.",
      messages: data.messages,
    });
    return { reply: text };
  });
