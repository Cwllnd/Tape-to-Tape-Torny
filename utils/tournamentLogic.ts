import { Player, Match, StandingsRow, MatchPhase } from '../types';

// Shuffle array helper
const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Generate team-based matches for group stage
const generateGroupStageMatches = (players: Player[]): Match[] => {
  const matches: Match[] = [];
  const playerIds = players.map(p => p.id);
  const playerCount = playerIds.length;
  const teamSize = Math.floor(playerCount / 2);

  // Target: 5-6 group stage matches
  const targetMatches = playerCount <= 4 ? 4 : playerCount <= 6 ? 5 : 6;

  for (let matchNum = 0; matchNum < targetMatches; matchNum++) {
    // Shuffle and split players into two teams
    const shuffled = shuffleArray(playerIds);
    const team1 = shuffled.slice(0, teamSize);
    const team2 = shuffled.slice(teamSize, teamSize * 2);

    matches.push({
      id: `group-${matchNum}-${Date.now()}-${Math.random()}`,
      phase: MatchPhase.GROUP_STAGE,
      team1,
      team2,
      team1Score: null,
      team2Score: null,
      isComplete: false,
    });
  }

  return matches;
};

// Generate playoff matches based on standings
export const generatePlayoffMatches = (standings: StandingsRow[]): Match[] => {
  const matches: Match[] = [];

  if (standings.length < 3) {
    // Not enough players for playoffs, just have top 2 play final
    if (standings.length === 2) {
      matches.push({
        id: `final-${Date.now()}`,
        phase: MatchPhase.FINAL,
        p1Id: standings[0].playerId,
        p2Id: standings[1].playerId,
        team1Score: null,
        team2Score: null,
        isComplete: false,
      });
    }
    return matches;
  }

  // Semifinal: #2 vs #3
  matches.push({
    id: `semifinal-${Date.now()}`,
    phase: MatchPhase.SEMIFINAL,
    p1Id: standings[1].playerId,
    p2Id: standings[2].playerId,
    team1Score: null,
    team2Score: null,
    isComplete: false,
  });

  return matches;
};

// Generate final match after semifinal is complete
export const generateFinalMatch = (semifinalMatch: Match, firstPlaceId: string): Match => {
  // Determine semifinal winner
  const winnerId = semifinalMatch.team1Score! > semifinalMatch.team2Score!
    ? semifinalMatch.p1Id!
    : semifinalMatch.p2Id!;

  return {
    id: `final-${Date.now()}`,
    phase: MatchPhase.FINAL,
    p1Id: firstPlaceId,
    p2Id: winnerId,
    team1Score: null,
    team2Score: null,
    isComplete: false,
  };
};

// Main function to generate tournament schedule
export const generateTournamentSchedule = (players: Player[]): Match[] => {
  // For now, just generate group stage matches
  // Playoffs will be generated dynamically when group stage completes
  return generateGroupStageMatches(players);
};

// Calculate standings from all matches (team and individual)
export const calculateStandings = (players: Player[], matches: Match[]): StandingsRow[] => {
  const standings: Record<string, StandingsRow> = {};

  // Initialize all players
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
    if (!m.isComplete || m.team1Score === null || m.team2Score === null) {
      return;
    }

    // Determine winning/losing teams
    const team1Won = m.team1Score > m.team2Score;
    const team2Won = m.team2Score > m.team1Score;
    const isTie = m.team1Score === m.team2Score;

    if (m.phase === MatchPhase.GROUP_STAGE && m.team1 && m.team2) {
      // Team-based match
      const team1Players = m.team1;
      const team2Players = m.team2;

      team1Players.forEach(playerId => {
        standings[playerId].played += 1;
        standings[playerId].gf += m.team1Score!;
        standings[playerId].ga += m.team2Score!;
        standings[playerId].diff += (m.team1Score! - m.team2Score!);

        if (team1Won) {
          standings[playerId].wins += 1;
          standings[playerId].points += 2;
        } else if (team2Won) {
          if (m.isOvertime) {
            standings[playerId].otl += 1;
            standings[playerId].points += 1;
          } else {
            standings[playerId].losses += 1;
          }
        } else if (isTie) {
          standings[playerId].points += 1;
        }
      });

      team2Players.forEach(playerId => {
        standings[playerId].played += 1;
        standings[playerId].gf += m.team2Score!;
        standings[playerId].ga += m.team1Score!;
        standings[playerId].diff += (m.team2Score! - m.team1Score!);

        if (team2Won) {
          standings[playerId].wins += 1;
          standings[playerId].points += 2;
        } else if (team1Won) {
          if (m.isOvertime) {
            standings[playerId].otl += 1;
            standings[playerId].points += 1;
          } else {
            standings[playerId].losses += 1;
          }
        } else if (isTie) {
          standings[playerId].points += 1;
        }
      });
    } else if ((m.phase === MatchPhase.SEMIFINAL || m.phase === MatchPhase.FINAL) && m.p1Id && m.p2Id) {
      // Individual playoff match
      const p1Id = m.p1Id;
      const p2Id = m.p2Id;

      // Player 1 stats
      standings[p1Id].played += 1;
      standings[p1Id].gf += m.team1Score!;
      standings[p1Id].ga += m.team2Score!;
      standings[p1Id].diff += (m.team1Score! - m.team2Score!);

      // Player 2 stats
      standings[p2Id].played += 1;
      standings[p2Id].gf += m.team2Score!;
      standings[p2Id].ga += m.team1Score!;
      standings[p2Id].diff += (m.team2Score! - m.team1Score!);

      if (m.team1Score! > m.team2Score!) {
        // Player 1 wins
        standings[p1Id].wins += 1;
        standings[p1Id].points += 2;

        // Player 2 loses
        if (m.isOvertime) {
          standings[p2Id].otl += 1;
          standings[p2Id].points += 1;
        } else {
          standings[p2Id].losses += 1;
        }
      } else if (m.team2Score! > m.team1Score!) {
        // Player 2 wins
        standings[p2Id].wins += 1;
        standings[p2Id].points += 2;

        // Player 1 loses
        if (m.isOvertime) {
          standings[p1Id].otl += 1;
          standings[p1Id].points += 1;
        } else {
          standings[p1Id].losses += 1;
        }
      } else {
        // Tie
        standings[p1Id].points += 1;
        standings[p2Id].points += 1;
      }
    }
  });

  return Object.values(standings).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.diff - a.diff;
  });
};
