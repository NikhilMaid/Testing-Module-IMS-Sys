import React, { useEffect, useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Coins, ShoppingBag, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils';
import { getMarketSentiment } from '../services/geminiService';

const data = [
  { name: 'Mon', sales: 400000, goldRate: 6500 },
  { name: 'Tue', sales: 300000, goldRate: 6520 },
  { name: 'Wed', sales: 200000, goldRate: 6480 },
  { name: 'Thu', sales: 278000, goldRate: 6550 },
  { name: 'Fri', sales: 189000, goldRate: 6600 },
  { name: 'Sat', sales: 639000, goldRate: 6640 },
  { name: 'Sun', sales: 549000, goldRate: 6620 },
];

export const Dashboard: React.FC = () => {
  const [aiInsight, setAiInsight] = useState<string>("Analyzing market data...");

  useEffect(() => {
    // Simulate AI fetch
    const fetchAi = async () => {
      const sentiment = await getMarketSentiment(data);
      setAiInsight(sentiment);
    };
    fetchAi();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
          <p className="text-slate-500 text-sm">Overview of inventory, sales, and market trends.</p>
        </div>
        <div className="flex items-center bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-2 rounded-lg shadow-sm max-w-lg">
            <Sparkles className="w-5 h-5 mr-3 text-indigo-500 flex-shrink-0" />
            <p className="text-sm italic">{aiInsight}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Sales (Today)', value: 245000, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Gold Stock (22K)', value: '4,250.500 g', icon: Coins, color: 'text-gold-600', bg: 'bg-gold-50' },
          { label: 'Avg. Rate Today', value: 6640, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Pending Repairs', value: 12, icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
              <div className={`p-3 rounded-full ${stat.bg} mr-4`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-800 font-mono">
                  {typeof stat.value === 'number' && (stat.label.includes('Sales') || stat.label.includes('Rate')) 
                    ? formatCurrency(stat.value) 
                    : stat.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Sales Trends (Weekly)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#cf8636" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#cf8636" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="sales" stroke="#cf8636" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Gold Rate vs. Footfall</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="goldRate" stroke="#0f172a" strokeWidth={2} dot={{r: 4, fill: '#0f172a'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};