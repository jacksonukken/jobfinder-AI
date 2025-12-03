import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Job } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Schema for Job Generation
const jobSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      company: { type: Type.STRING },
      location: { type: Type.STRING },
      type: { type: Type.STRING, enum: ['Full-time', 'Part-time', 'Contract', 'Freelance'] },
      salaryRange: { type: Type.STRING },
      description: { type: Type.STRING },
      requirements: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING } 
      },
      postedAt: { type: Type.STRING },
      isRemote: { type: Type.BOOLEAN },
    },
    required: ['title', 'company', 'location', 'type', 'salaryRange', 'description', 'requirements', 'postedAt', 'isRemote']
  }
};

export const searchJobsWithGemini = async (query: string, location: string): Promise<Job[]> => {
  if (!apiKey) {
    console.error("API Key is missing");
    return [];
  }

  const prompt = `
    Generate 6 realistic job postings based on the search query: "${query}" and location: "${location}".
    If the query is empty, generate 6 trending tech or creative jobs.
    Make the companies sound realistic but fictional or use generic big tech names.
    Ensure descriptions are professional and detailed (approx 50-80 words).
    Current date is ${new Date().toLocaleDateString()}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: jobSchema,
        systemInstruction: "You are a job board backend API. You generate high-quality, realistic job data for a demo application.",
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const rawJobs = JSON.parse(text) as Omit<Job, 'id' | 'logoUrl'>[];
    
    // Process jobs: Add unique IDs and images
    return rawJobs.map((job, index) => {
      // Create a deterministic but unique-enough ID for this session
      const uniqueId = `job-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        ...job,
        id: uniqueId,
        logoUrl: `https://picsum.photos/seed/${job.company.replace(/\s/g, '')}${index}/100/100`
      };
    });

  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
};

export const generateCoverLetter = async (job: Job, userProfile: { name: string; experience: string; skills: string }) => {
  if (!apiKey) return "Error: API Key missing.";

  const prompt = `
    Write a professional, persuasive cover letter for:
    Applicant Name: ${userProfile.name}
    Applicant Skills: ${userProfile.skills}
    Applicant Experience: ${userProfile.experience}

    Target Job: ${job.title} at ${job.company}
    Job Description: ${job.description}
    Requirements: ${job.requirements.join(", ")}

    The tone should be enthusiastic, professional, and tailored specifically to the job details provided.
    Keep it under 300 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Could not generate cover letter.";
  } catch (error) {
    console.error("Gemini Cover Letter Error:", error);
    return "Error generating cover letter. Please try again.";
  }
};
