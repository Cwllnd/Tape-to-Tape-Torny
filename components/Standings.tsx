import React from 'react';
import { StandingsRow } from '../types';

interface StandingsProps {
  data: StandingsRow[];
}

export const Standings: React.FC<StandingsProps> = ({ data }) => {
  return (
    <div className="w-full bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
      <div className="bg-slate-900/50 p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2">
          <span>🏆</span> League Table
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Player</th>
              <th className="px-4 py-3 text-center">GP</th>
              <th className="px-4 py-3 text-center">W</th>
              <th className="px-4 py-3 text-center">L</th>
              <th className="px-4 py-3 text-center">OTL</th>
              <th className="px-4 py-3 text-center hidden sm:table-cell">GF</th>
              <th className="px-4 py-3 text-center hidden sm:table-cell">GA</th>
              <th className="px-4 py-3 text-center">Diff</th>
              <th className="px-4 py-3 text-center font-bold text-white">PTS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {data.map((row, index) => (
              <tr key={row.playerId} className={`hover:bg-slate-700/50 transition-colors ${index < 2 ? 'bg-blue-900/10' : ''}`}>
                <td className="px-4 py-3 font-medium">
                  {index + 1}
                  {index < 2 && <span className="ml-1 text-xs text-blue-400">★</span>}
                </td>
                <td className="px-4 py-3 font-bold text-white">{row.name}</td>
                <td className="px-4 py-3 text-center">{row.played}</td>
                <td className="px-4 py-3 text-center text-green-400">{row.wins}</td>
                <td className="px-4 py-3 text-center text-red-400">{row.losses}</td>
                <td className="px-4 py-3 text-center text-orange-400">{row.otl}</td>
                <td className="px-4 py-3 text-center hidden sm:table-cell text-slate-400">{row.gf}</td>
                <td className="px-4 py-3 text-center hidden sm:table-cell text-slate-400">{row.ga}</td>
                <td className="px-4 py-3 text-center font-mono">{row.diff > 0 ? `+${row.diff}` : row.diff}</td>
                <td className="px-4 py-3 text-center font-bold text-xl text-blue-300">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-3 text-xs text-slate-500 text-center bg-slate-900/30">
        Top 2 advance to finals • 2 Pts for Win • 1 Pt for OT Loss • OTL = Overtime Loss
      </div>
    </div>
  );
};