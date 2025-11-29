import { Match, Player, StandingsRow } from '../types';

// Simplified version without AI - no API key required
export const generateMatchRecap = async (match: Match, p1: Player, p2: Player): Promise<string> => {
  // No AI recap - return empty string
  return "";
};

export const chatWithCommissioner = async (
  message: string,
  context: { standings: StandingsRow[], matches: Match[] }
): Promise<string> => {
  // No AI chat - return simple message
  return "AI Commissioner is disabled. No API key configured.";
};