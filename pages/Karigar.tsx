import React from 'react';
import { Hammer, ArrowRight, Scale } from 'lucide-react';

export const Karigar: React.FC = () => {
    // Mock Karigars
    const karigars = [
        { id: 'K01', name: 'Ramesh Babu', pendingGold: 145.200, pendingSilver: 0, pendingCash: -5000 },
        { id: 'K02', name: 'Suresh Art', pendingGold: 22.500, pendingSilver: 500.00, pendingCash: 12000 },
    ];

    return (
        <div className="p-6">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Manufacturing (Karigar)</h2>
                <div className="space-x-3">
                    <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700">
                        Issue Metal
                    </button>
                    <button className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
                        Receive Ornament
                    </button>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {karigars.map((k) => (
                     <div key={k.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-3">
                                    <Hammer className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{k.name}</h3>
                                    <p className="text-xs text-slate-400 font-mono">ID: {k.id}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${k.pendingCash < 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                Cash: {k.pendingCash}
                            </span>
                        </div>
                        
                        <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 flex items-center"><Scale className="w-3 h-3 mr-1"/> Metal Due (Gold)</span>
                                <span className="font-mono font-bold text-slate-800">{k.pendingGold.toFixed(3)} g</span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-gold-500 h-full" style={{width: '45%'}}></div>
                            </div>
                        </div>

                        <div className="mt-4 flex space-x-2">
                             <button className="flex-1 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded hover:bg-slate-50">View Ledger</button>
                             <button className="flex-1 py-2 text-xs font-bold text-white bg-slate-800 rounded hover:bg-slate-700 flex items-center justify-center">
                                Settlement <ArrowRight className="w-3 h-3 ml-1"/>
                             </button>
                        </div>
                     </div>
                 ))}
             </div>
        </div>
    );
}