import React, { useState } from 'react';
import { Match, Player } from '../types';

interface MatchCardProps {
  match: Match;
  p1: Player;
  p2: Player;
  onUpdateScore: (matchId: string, s1: number, s2: number, isOvertime: boolean) => void;
  isUpdating: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, p1, p2, onUpdateScore, isUpdating }) => {
  const [s1, setS1] = useState<string>(match.p1Score?.toString() || '');
  const [s2, setS2] = useState<string>(match.p2Score?.toString() || '');
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

  return (
    <div className={`relative flex flex-col bg-slate-800 rounded-lg border ${match.isComplete ? 'border-slate-700' : 'border-blue-500/30'} shadow-md overflow-hidden transition-all hover:shadow-lg`}>
      {match.isComplete && !isEditing && (
         <div className="absolute top-0 right-0 p-1">
             <button onClick={() => setIsEditing(true)} className="text-xs text-slate-500 hover:text-white p-1">Edit</button>
         </div>
      )}
      
      <div className="flex items-center justify-between p-4 gap-4">
        {/* Player 1 */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-lg font-bold text-blue-400 mb-2 border border-slate-600">
            {p1.name.substring(0, 2).toUpperCase()}
          </div>
          <span className={`text-sm font-semibold text-center ${match.isComplete && (match.p1Score || 0) > (match.p2Score || 0) ? 'text-green-400' : 'text-slate-200'}`}>
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
                        className="w-12 h-12 bg-slate-900 text-white text-center text-xl font-bold rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
                    />
                    <span className="text-slate-500 font-bold">-</span>
                    <input 
                        type="number" 
                        value={s2} 
                        onChange={(e) => setS2(e.target.value)}
                        className="w-12 h-12 bg-slate-900 text-white text-center text-xl font-bold rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
                    />
                </>
            ) : (
                <div className="flex items-center gap-4 bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/50">
                    <span className={`text-2xl font-bold ${match.p1Score! > match.p2Score! ? 'text-white' : 'text-slate-500'}`}>{match.p1Score}</span>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-slate-600 text-xs uppercase tracking-widest">VS</span>
                        {match.isOvertime && <span className="text-orange-500 text-xs font-bold">OT</span>}
                    </div>
                    <span className={`text-2xl font-bold ${match.p2Score! > match.p1Score! ? 'text-white' : 'text-slate-500'}`}>{match.p2Score}</span>
                </div>
            )}
        </div>

        {/* Player 2 */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-lg font-bold text-red-400 mb-2 border border-slate-600">
            {p2.name.substring(0, 2).toUpperCase()}
          </div>
          <span className={`text-sm font-semibold text-center ${match.isComplete && (match.p2Score || 0) > (match.p1Score || 0) ? 'text-green-400' : 'text-slate-200'}`}>
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

      {/* AI Recap */}
      {!isEditing && match.recap && (
        <div className="bg-slate-900/80 p-3 border-t border-slate-700">
             <div className="flex items-start gap-2">
                <span className="text-lg">🎙️</span>
                <p className="text-xs text-slate-400 italic leading-relaxed">"{match.recap}"</p>
             </div>
        </div>
      )}
    </div>
  );
};