import React, { useState, useEffect, useMemo } from 'react';
import { Player, Match, AppView } from './types';
import { generateRoundRobinSchedule, calculateStandings } from './utils/tournamentLogic';
import { Standings } from './components/Standings';
import { MatchCard } from './components/MatchCard';

// Icons
const TrophyIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4l2 7 2-7h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M9 21v-2a2 2 0 012-2h2a2 2 0 012 2v2" /></svg>; // Actually generic schedule icon

const App: React.FC = () => {
  // State
  const [view, setView] = useState<AppView>(AppView.SETUP);
  const [playerCount, setPlayerCount] = useState<number>(5);
  const [players, setPlayers] = useState<Player[]>([
    { id: 'p1', name: '', seed: 1 },
    { id: 'p2', name: '', seed: 2 },
    { id: 'p3', name: '', seed: 3 },
    { id: 'p4', name: '', seed: 4 },
    { id: 'p5', name: '', seed: 5 },
  ]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [updatingMatchId, setUpdatingMatchId] = useState<string | null>(null);

  // Update players array when player count changes
  useEffect(() => {
    setPlayers(prev => {
      // If increasing player count, add new players
      if (prev.length < playerCount) {
        const newPlayers = [...prev];
        for (let i = prev.length; i < playerCount; i++) {
          newPlayers.push({ id: `p${i + 1}`, name: '', seed: i + 1 });
        }
        return newPlayers;
      }
      // If decreasing player count, remove players from the end
      if (prev.length > playerCount) {
        return prev.slice(0, playerCount);
      }
      return prev;
    });
  }, [playerCount]);

  // Load from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('tapeToTapeData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setPlayers(parsed.players);
      setMatches(parsed.matches);
      setPlayerCount(parsed.playerCount || parsed.players.length);
      if (parsed.matches.length > 0) {
        setView(AppView.DASHBOARD);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (matches.length > 0) {
      localStorage.setItem('tapeToTapeData', JSON.stringify({ players, matches, playerCount }));
    }
  }, [players, matches, playerCount]);

  const handleStartTournament = () => {
    // Validate names
    if (players.some(p => !p.name.trim())) {
      alert(`Please enter all ${playerCount} player names!`);
      return;
    }
    
    // Generate schedule
    const newMatches = generateRoundRobinSchedule(players);
    setMatches(newMatches);
    setView(AppView.DASHBOARD);
  };

  const updatePlayerName = (id: string, name: string) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, name } : p));
  };

  const handleUpdateScore = async (matchId: string, s1: number, s2: number, isOvertime: boolean) => {
    setUpdatingMatchId(matchId);

    // Update match with score
    setMatches(prev => prev.map(m => {
        if (m.id === matchId) {
            return { ...m, p1Score: s1, p2Score: s2, isOvertime, isComplete: true };
        }
        return m;
    }));

    setUpdatingMatchId(null);
  };

  const standings = useMemo(() => calculateStandings(players, matches), [players, matches]);
  const upcomingMatches = matches.filter(m => !m.isComplete);
  const completedMatches = matches.filter(m => m.isComplete);

  const handleReset = () => {
    if (confirm("Are you sure? This will delete all tournament data.")) {
        localStorage.removeItem('tapeToTapeData');
        window.location.reload();
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏒</span>
            <h1 className="text-xl font-black italic tracking-tighter text-white">
              PUCK<span className="text-blue-500">DROP</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4">
        {view === AppView.SETUP && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white">New Tournament</h2>
              <p className="text-slate-400">Choose player count and enter names.</p>
            </div>

            <div className="w-full max-w-md space-y-4 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-2xl">
              {/* Player Count Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Number of Players</label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 3, 4, 5, 6, 7, 8, 10].map(count => (
                    <button
                      key={count}
                      onClick={() => setPlayerCount(count)}
                      className={`py-2 px-3 rounded-lg font-semibold transition ${
                        playerCount === count
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4">
                <label className="block text-sm font-medium text-slate-300 mb-3">Player Names</label>
              </div>

              {players.map((p, i) => (
                <div key={p.id} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-400 text-sm">
                    {i + 1}
                  </div>
                  <input
                    type="text"
                    placeholder={`Player ${i + 1} Name`}
                    value={p.name}
                    onChange={(e) => updatePlayerName(p.id, e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-600 rounded px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              ))}
              
              <button
                onClick={handleStartTournament}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 rounded-lg shadow-lg transform transition active:scale-95 mt-4"
              >
                Drop The Puck
              </button>
            </div>
          </div>
        )}

        {view === AppView.DASHBOARD && (
          <div className="space-y-8">
            <Standings data={standings} />
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Active Schedule
              </h3>
              
              {upcomingMatches.length === 0 && completedMatches.length > 0 && (
                  <div className="p-8 text-center bg-slate-800/50 rounded-xl border border-slate-700">
                      <p className="text-xl font-bold text-white mb-2">Regular Season Complete!</p>
                      <p className="text-slate-400">The top 2 players ({standings[0]?.name} & {standings[1]?.name}) should now play a Best of 3 Final!</p>
                  </div>
              )}

              {upcomingMatches.map(match => (
                <MatchCard 
                    key={match.id}
                    match={match}
                    p1={players.find(p => p.id === match.p1Id)!}
                    p2={players.find(p => p.id === match.p2Id)!}
                    onUpdateScore={handleUpdateScore}
                    isUpdating={updatingMatchId === match.id}
                />
              ))}

              {completedMatches.length > 0 && (
                  <div className="pt-8">
                    <h3 className="text-lg font-bold text-slate-400 mb-4">Completed Games</h3>
                    <div className="space-y-4 opacity-80">
                        {completedMatches.map(match => (
                            <MatchCard 
                                key={match.id}
                                match={match}
                                p1={players.find(p => p.id === match.p1Id)!}
                                p2={players.find(p => p.id === match.p2Id)!}
                                onUpdateScore={handleUpdateScore}
                                isUpdating={updatingMatchId === match.id}
                            />
                        ))}
                    </div>
                  </div>
              )}
            </div>
            
            <div className="pt-12 pb-4 text-center">
                <button onClick={handleReset} className="text-xs text-red-500 hover:text-red-400 underline">
                    Reset Tournament Data
                </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;