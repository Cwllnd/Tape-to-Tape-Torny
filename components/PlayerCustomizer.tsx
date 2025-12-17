import React from 'react';
import { ICONS, COLORS } from './Icons';
import { Player } from '../types';

interface PlayerCustomizerProps {
    player: Player;
    onUpdate: (updated: Partial<Player>) => void;
    onClose: () => void;
}

export const PlayerCustomizer: React.FC<PlayerCustomizerProps> = ({ player, onUpdate, onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl w-full max-w-sm shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    ✕
                </button>

                <h3 className="text-xl font-bold text-white mb-6 text-center">Customize {player.name || `Player ${player.seed}`}</h3>

                <div className="space-y-6">
                    {/* Icon Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-400 uppercase tracking-wider">Select Icon</label>
                        <div className="grid grid-cols-5 gap-3">
                            {Object.keys(ICONS).map(id => {
                                const Icon = ICONS[id];
                                const isSelected = player.icon === id;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => onUpdate({ icon: id })}
                                        className={`aspect-square rounded-lg flex items-center justify-center transition-all ${isSelected
                                                ? 'bg-slate-200 text-slate-900 scale-110 shadow-lg ring-2 ring-blue-500'
                                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                            }`}
                                    >
                                        <Icon className="w-6 h-6" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-400 uppercase tracking-wider">Select Color</label>
                        <div className="grid grid-cols-5 gap-3">
                            {COLORS.map(color => {
                                const isSelected = player.color === color;
                                return (
                                    <button
                                        key={color}
                                        onClick={() => onUpdate({ color })}
                                        style={{ backgroundColor: color }}
                                        className={`aspect-square rounded-full transition-transform ${isSelected
                                                ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900 shadow-lg'
                                                : 'hover:scale-110 opacity-80 hover:opacity-100'
                                            }`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition"
                >
                    Done
                </button>
            </div>
        </div>
    );
};
