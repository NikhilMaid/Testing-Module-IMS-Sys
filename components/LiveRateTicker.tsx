import React from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { formatCurrency } from '../utils';

export const LiveRateTicker: React.FC = () => {
  // Mock rates
  const rates = [
    { metal: 'Gold 24K', rate: 7250, change: 1.2 },
    { metal: 'Gold 22K', rate: 6640, change: 0.8 },
    { metal: 'Silver', rate: 88.50, change: -0.5 },
    { metal: 'Platinum', rate: 3200, change: 0.1 },
  ];

  return (
    <div className="bg-white border-b border-gray-200 h-14 flex items-center justify-between px-6 shadow-sm sticky top-0 z-20">
      <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center text-gray-500 text-sm font-semibold uppercase tracking-wider mr-4">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Live Rates (1g)
        </div>
        {rates.map((r) => (
          <div key={r.metal} className="flex items-center space-x-2 text-sm border-r border-gray-100 pr-6 last:border-0">
            <span className="font-medium text-slate-700">{r.metal}</span>
            <span className="font-mono font-bold text-slate-900">{formatCurrency(r.rate)}</span>
            <span className={`text-xs flex items-center ${r.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {r.change >= 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
              {Math.abs(r.change)}%
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center text-xs text-gray-400">
        <RefreshCw size={12} className="mr-1" />
        Updated: 10:45 AM
      </div>
    </div>
  );
};