import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Match, Player, StandingsRow } from '../types';

// Initialize the client. API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are 'Slapshot', a gritty, intense, and slightly sarcastic hockey tournament commissioner from the 1980s. 
You love physical play, big goals, and tape-to-tape passes. 
You critique players, predict outcomes based on stats, and provide "color commentary" on match results.
Keep responses concise (under 3 sentences) unless asked for a full analysis.
Never break character.
`;

export const generateMatchRecap = async (match: Match, p1: Player, p2: Player): Promise<string> => {
  try {
    const prompt = `
      Write a 2-sentence match recap for a hockey game.
      Home: ${p1.name} (Score: ${match.p1Score})
      Away: ${p2.name} (Score: ${match.p2Score})
      Winner: ${match.p1Score! > match.p2Score! ? p1.name : p2.name}
      Make it sound like a post-game interview or broadcast highlight.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      }
    });

    return response.text || "Game played. No comment available.";
  } catch (error) {
    console.error("Error generating recap:", error);
    return "The transmission from the rink is fuzzy. Game recorded.";
  }
};

export const chatWithCommissioner = async (
  message: string, 
  context: { standings: StandingsRow[], matches: Match[] }
): Promise<string> => {
  try {
    // Construct a context string to give the AI awareness of the tournament state
    const standingsContext = context.standings.map((s, i) => 
      `${i+1}. ${s.name} (${s.wins}-${s.losses}, ${s.points}pts)`
    ).join('\n');
    
    const recentMatches = context.matches
      .filter(m => m.isComplete)
      .slice(-3)
      .map(m => `Match: ${m.p1Score}-${m.p2Score} (Winner undetermined without name lookup but score is ${m.p1Score}-${m.p2Score})`)
      .join('\n');

    const prompt = `
      Current Standings:
      ${standingsContext}

      Recent Activity:
      ${recentMatches || "No games played yet."}

      User says: "${message}"
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // fast model for chat
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I'm out to lunch. Try again later.";
  } catch (error) {
    console.error("Error chatting with commissioner:", error);
    return "My whistle is broken. Ask me later.";
  }
};