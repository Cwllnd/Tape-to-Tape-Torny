import { Player, Match, StandingsRow } from '../types';

export const generateRoundRobinSchedule = (players: Player[]): Match[] => {
  const matches: Match[] = [];
  // Simple Round Robin for 5 players (everyone plays everyone once = 10 games)
  // We use a simple double loop
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      matches.push({
        id: `m-${i}-${j}-${Date.now()}`,
        p1Id: players[i].id,
        p2Id: players[j].id,
        p1Score: null,
        p2Score: null,
        isComplete: false,
      });
    }
  }
  
  // Shuffle matches slightly so one player isn't playing 4 games in a row immediately visually
  // Deterministic shuffle based on seed would be better, but random is fine for this scale
  return matches.sort(() => Math.random() - 0.5);
};

export const calculateStandings = (players: Player[], matches: Match[]): StandingsRow[] => {
  const standings: Record<string, StandingsRow> = {};

  // Initialize
  players.forEach(p => {
    standings[p.id] = {
      playerId: p.id,
      name: p.name,
      played: 0,
      wins: 0,
      losses: 0,
      otl: 0,
      gf: 0,
      ga: 0,
      diff: 0,
      points: 0
    };
  });

  matches.forEach(m => {
    if (m.isComplete && m.p1Score !== null && m.p2Score !== null) {
      // Player 1 stats
      standings[m.p1Id].played += 1;
      standings[m.p1Id].gf += m.p1Score;
      standings[m.p1Id].ga += m.p2Score;
      standings[m.p1Id].diff += (m.p1Score - m.p2Score);

      // Player 2 stats
      standings[m.p2Id].played += 1;
      standings[m.p2Id].gf += m.p2Score;
      standings[m.p2Id].ga += m.p1Score;
      standings[m.p2Id].diff += (m.p2Score - m.p1Score);

      if (m.p1Score > m.p2Score) {
        // Player 1 wins
        standings[m.p1Id].wins += 1;
        standings[m.p1Id].points += 2;

        // Player 2 loses
        if (m.isOvertime) {
          standings[m.p2Id].otl += 1;
          standings[m.p2Id].points += 1; // OT loss = 1 point
        } else {
          standings[m.p2Id].losses += 1; // Regulation loss = 0 points
        }
      } else if (m.p2Score > m.p1Score) {
        // Player 2 wins
        standings[m.p2Id].wins += 1;
        standings[m.p2Id].points += 2;

        // Player 1 loses
        if (m.isOvertime) {
          standings[m.p1Id].otl += 1;
          standings[m.p1Id].points += 1; // OT loss = 1 point
        } else {
          standings[m.p1Id].losses += 1; // Regulation loss = 0 points
        }
      } else {
        // Draw (Unlikely in tape to tape usually, but handling it as 1pt each)
        standings[m.p1Id].points += 1;
        standings[m.p2Id].points += 1;
      }
    }
  });

  return Object.values(standings).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.diff - a.diff; // Tie breaker: Goal Diff
  });
};