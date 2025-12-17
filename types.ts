export interface Player {
  id: string;
  name: string;
  seed: number;
  icon?: string; // Icon ID (1-10)
  color?: string; // Hex code or Tailwind class
}

export interface GameSettings {
  teamSize: 1 | 2 | 3;
}

export enum MatchPhase {
  GROUP_STAGE = 'GROUP_STAGE',
  SEMIFINAL = 'SEMIFINAL',
  FINAL = 'FINAL'
}

export interface Match {
  id: string;
  phase: MatchPhase;
  // Team-based match
  team1?: string[]; // Array of player IDs
  team2?: string[]; // Array of player IDs
  // Individual match (playoffs)
  p1Id?: string;
  p2Id?: string;
  // Scores
  team1Score: number | null;
  team2Score: number | null;
  isComplete: boolean;
  isOvertime?: boolean; // True if the game went to overtime
  recap?: string; // AI generated recap
}

export interface StandingsRow {
  playerId: string;
  name: string;
  icon?: string;
  color?: string;
  played: number;
  wins: number;
  losses: number;
  otl: number; // Overtime Losses
  gf: number; // Goals For
  ga: number; // Goals Against
  diff: number; // Goal Differential
  points: number; // 2 for Win, 1 for OT Loss, 0 for Regulation Loss
}

export enum AppView {
  SETUP = 'SETUP',
  DASHBOARD = 'DASHBOARD',
  COMMISSIONER = 'COMMISSIONER'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}