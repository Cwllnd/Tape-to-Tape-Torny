import React, { useState } from 'react';
import { Match, Player, MatchPhase } from '../types';

interface MatchCardProps {
  match: Match;
  players: Player[];
  onUpdateScore: (matchId: string, s1: number, s2: number, isOvertime: boolean) => void;
  isUpdating: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, players, onUpdateScore, isUpdating }) => {
  const [s1, setS1] = useState<string>(match.team1Score?.toString() || '');
  const [s2, setS2] = useState<string>(match.team2Score?.toString() || '');
  const [isOvertime, setIsOvertime] = useState<boolean>(match.isOvertime || false);
  const [isEditing, setIsEditing] = useState(!match.isComplete);

  const handleSave = () => {
    const score1 = parseInt(s1);
    const score2 = parseInt(s2);
    if (!isNaN(score1) && !isNaN(score2)) {
      onUpdateScore(match.id, score1, score2, isOvertime);
      setIsEditing(false);
    }
  };

  const isTeamMatch = match.phase === MatchPhase.GROUP_STAGE && match.team1 && match.team2;
  const isPlayoffMatch = (match.phase === MatchPhase.SEMIFINAL || match.phase === MatchPhase.FINAL) && match.p1Id && match.p2Id;

  // Get phase label
  const getPhaseLabel = () => {
    if (match.phase === MatchPhase.SEMIFINAL) return 'SEMIFINAL';
    if (match.phase === MatchPhase.FINAL) return 'CHAMPIONSHIP';
    return null;
  };

  const phaseLabel = getPhaseLabel();

  if (isTeamMatch) {
    // Team-based match
    const team1Players = players.filter(p => match.team1!.includes(p.id));
    const team2Players = players.filter(p => match.team2!.includes(p.id));

    return (
      <div className={`relative flex flex-col bg-slate-800 rounded-lg border ${match.isComplete ? 'border-slate-700' : 'border-blue-500/30'} shadow-md overflow-hidden transition-all hover:shadow-lg`}>
        {match.isComplete && !isEditing && (
          <div className="absolute top-0 right-0 p-1">
            <button onClick={() => setIsEditing(true)} className="text-xs text-slate-500 hover:text-white p-1">Edit</button>
          </div>
        )}

        <div className="p-4">
          {/* Team Names */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <div className="flex flex-wrap gap-1 justify-start">
                {team1Players.map(p => (
                  <span key={p.id} className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded border border-blue-500/30">
                    {p.name}
                  </span>
                ))}
              </div>
            </div>

            <span className="mx-4 text-slate-600 text-sm font-bold">VS</span>

            <div className="flex-1">
              <div className="flex flex-wrap gap-1 justify-end">
                {team2Players.map(p => (
                  <span key={p.id} className="text-xs bg-red-600/20 text-red-300 px-2 py-1 rounded border border-red-500/30">
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Score Area */}
          <div className="flex items-center justify-center gap-3">
            {isEditing ? (
              <>
                <input
                  type="number"
                  value={s1}
                  onChange={(e) => setS1(e.target.value)}
                  className="w-16 h-14 bg-slate-900 text-white text-center text-2xl font-bold rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
                  placeholder="0"
                />
                <span className="text-slate-500 font-bold text-xl">-</span>
                <input
                  type="number"
                  value={s2}
                  onChange={(e) => setS2(e.target.value)}
                  className="w-16 h-14 bg-slate-900 text-white text-center text-2xl font-bold rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
                  placeholder="0"
                />
              </>
            ) : (
              <div className="flex items-center gap-4 bg-slate-900/50 px-6 py-3 rounded-lg border border-slate-700/50">
                <span className={`text-3xl font-bold ${match.team1Score! > match.team2Score! ? 'text-white' : 'text-slate-500'}`}>
                  {match.team1Score}
                </span>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-slate-600 text-xs uppercase tracking-widest">VS</span>
                  {match.isOvertime && <span className="text-orange-500 text-xs font-bold">OT</span>}
                </div>
                <span className={`text-3xl font-bold ${match.team2Score! > match.team1Score! ? 'text-white' : 'text-slate-500'}`}>
                  {match.team2Score}
                </span>
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <>
            <div className="px-4 pb-2 flex items-center justify-center gap-2">
              <input
                type="checkbox"
                id={`ot-${match.id}`}
                checked={isOvertime}
                onChange={(e) => setIsOvertime(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-900 border-slate-600 rounded focus:ring-blue-500"
              />
              <label htmlFor={`ot-${match.id}`} className="text-sm text-slate-300 cursor-pointer">
                Overtime
              </label>
            </div>
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 text-sm font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {isUpdating ? 'Recording...' : 'Finalize Score'}
            </button>
          </>
        )}
      </div>
    );
  } else if (isPlayoffMatch) {
    // Individual playoff match
    const p1 = players.find(p => p.id === match.p1Id)!;
    const p2 = players.find(p => p.id === match.p2Id)!;

    return (
      <div className={`relative flex flex-col bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border-2 ${match.isComplete ? 'border-yellow-600/50' : 'border-yellow-500/60'} shadow-xl overflow-hidden transition-all hover:shadow-2xl`}>
        {phaseLabel && (
          <div className="bg-yellow-600/20 border-b border-yellow-500/30 px-4 py-2 text-center">
            <span className="text-yellow-400 font-black text-sm tracking-widest">{phaseLabel}</span>
          </div>
        )}

        {match.isComplete && !isEditing && (
          <div className="absolute top-2 right-2">
            <button onClick={() => setIsEditing(true)} className="text-xs text-slate-500 hover:text-white p-1">Edit</button>
          </div>
        )}

        <div className="flex items-center justify-between p-4 gap-4">
          {/* Player 1 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-lg font-bold text-white mb-2 border-2 border-blue-400 shadow-lg">
              {p1.name.substring(0, 2).toUpperCase()}
            </div>
            <span className={`text-sm font-semibold text-center ${match.isComplete && (match.team1Score || 0) > (match.team2Score || 0) ? 'text-yellow-400 font-bold' : 'text-slate-200'}`}>
              {p1.name}
            </span>
          </div>

          {/* Score Area */}
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <input
                  type="number"
                  value={s1}
                  onChange={(e) => setS1(e.target.value)}
                  className="w-16 h-16 bg-slate-900 text-white text-center text-2xl font-bold rounded border-2 border-slate-600 focus:border-yellow-500 focus:outline-none"
                  placeholder="0"
                />
                <span className="text-slate-500 font-bold text-xl">-</span>
                <input
                  type="number"
                  value={s2}
                  onChange={(e) => setS2(e.target.value)}
                  className="w-16 h-16 bg-slate-900 text-white text-center text-2xl font-bold rounded border-2 border-slate-600 focus:border-yellow-500 focus:outline-none"
                  placeholder="0"
                />
              </>
            ) : (
              <div className="flex items-center gap-4 bg-black/30 px-6 py-3 rounded-lg border border-yellow-500/30">
                <span className={`text-3xl font-bold ${match.team1Score! > match.team2Score! ? 'text-yellow-400' : 'text-slate-500'}`}>
                  {match.team1Score}
                </span>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-slate-600 text-xs uppercase tracking-widest">VS</span>
                  {match.isOvertime && <span className="text-orange-500 text-xs font-bold">OT</span>}
                </div>
                <span className={`text-3xl font-bold ${match.team2Score! > match.team1Score! ? 'text-yellow-400' : 'text-slate-500'}`}>
                  {match.team2Score}
                </span>
              </div>
            )}
          </div>

          {/* Player 2 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-lg font-bold text-white mb-2 border-2 border-red-400 shadow-lg">
              {p2.name.substring(0, 2).toUpperCase()}
            </div>
            <span className={`text-sm font-semibold text-center ${match.isComplete && (match.team2Score || 0) > (match.team1Score || 0) ? 'text-yellow-400 font-bold' : 'text-slate-200'}`}>
              {p2.name}
            </span>
          </div>
        </div>

        {isEditing && (
          <>
            <div className="px-4 pb-2 flex items-center justify-center gap-2">
              <input
                type="checkbox"
                id={`ot-${match.id}`}
                checked={isOvertime}
                onChange={(e) => setIsOvertime(e.target.checked)}
                className="w-4 h-4 text-yellow-600 bg-slate-900 border-slate-600 rounded focus:ring-yellow-500"
              />
              <label htmlFor={`ot-${match.id}`} className="text-sm text-slate-300 cursor-pointer">
                Overtime
              </label>
            </div>
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-slate-900 py-3 text-sm font-black uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {isUpdating ? 'Recording...' : 'Finalize Score'}
            </button>
          </>
        )}
      </div>
    );
  }

  return null;
};
