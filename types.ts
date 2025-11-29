export interface Player {
  id: string;
  name: string;
  seed: number;
}

export interface Match {
  id: string;
  p1Id: string;
  p2Id: string;
  p1Score: number | null;
  p2Score: number | null;
  isComplete: boolean;
  isOvertime?: boolean; // True if the game went to overtime
  recap?: string; // AI generated recap
}

export interface StandingsRow {
  playerId: string;
  name: string;
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