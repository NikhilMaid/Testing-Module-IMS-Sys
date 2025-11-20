import React, { useState } from 'react';
import { Plus, Search, Printer, Filter, Save, X } from 'lucide-react';
import { MetalType, Purity, ItemCategory, JewelleryItem, StockStatus } from '../types';
import { generateTagId, formatWeight } from '../utils';

export const Inventory: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock Inventory
  const [inventory, setInventory] = useState<JewelleryItem[]>([
    {
      tagId: 'NK-982210',
      huid: 'HU8829A',
      name: 'Antique Temple Necklace',
      category: ItemCategory.NECKLACE,
      metalType: MetalType.GOLD,
      purity: Purity.K22,
      grossWeight: 45.200,
      stoneWeight: 2.100,
      netWeight: 43.100,
      wastagePercent: 12,
      makingChargesPerGram: 450,
      status: StockStatus.IN_STOCK,
      imageUrl: 'https://picsum.photos/100/100'
    },
    {
        tagId: 'RG-112934',
        huid: 'HU9911B',
        name: 'Diamond Solitaire Ring',
        category: ItemCategory.RING,
        metalType: MetalType.GOLD,
        purity: Purity.K18,
        grossWeight: 4.500,
        stoneWeight: 0.400,
        netWeight: 4.100,
        wastagePercent: 14,
        makingChargesPerGram: 800,
        status: StockStatus.IN_STOCK
      }
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    // In a real app, gather form data and update state
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Inventory Management</h2>
        <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">
                <Filter className="w-4 h-4 mr-2" /> Filter
            </button>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg shadow-sm text-sm font-medium transition-colors"
            >
                <Plus className="w-4 h-4 mr-2" /> New Stock Entry
            </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search by Tag ID, HUID, or Name..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Item Details</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Purity</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Gross Wt</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Stone Wt</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Net Wt</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inventory.map((item) => (
              <tr key={item.tagId} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded bg-slate-200 mr-3 overflow-hidden flex-shrink-0">
                        {item.imageUrl ? <img src={item.imageUrl} alt="" className="h-full w-full object-cover" /> : null}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-500 font-mono">TAG: {item.tagId} {item.huid && `| HUID: ${item.huid}`}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm text-slate-600">{item.purity}</td>
                <td className="px-6 py-4 text-right font-mono text-sm text-slate-700">{formatWeight(item.grossWeight)} g</td>
                <td className="px-6 py-4 text-right font-mono text-sm text-slate-500">{formatWeight(item.stoneWeight)} g</td>
                <td className="px-6 py-4 text-right font-mono text-sm font-bold text-slate-900">{formatWeight(item.netWeight)} g</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {item.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                   <button className="text-slate-400 hover:text-blue-600 transition-colors" title="Print Tag">
                      <Printer className="w-4 h-4" />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Tag Generation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">Generate New Tag</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Metal Group</label>
                  <select className="w-full rounded-lg border-slate-300 bg-slate-50 p-2.5 text-sm focus:ring-gold-500 focus:border-gold-500 border">
                    {Object.values(MetalType).map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Purity / Fineness</label>
                  <select className="w-full rounded-lg border-slate-300 bg-slate-50 p-2.5 text-sm focus:ring-gold-500 focus:border-gold-500 border">
                    {Object.values(Purity).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                  <input type="text" className="w-full rounded-lg border-slate-300 border p-2.5 text-sm focus:ring-gold-500 focus:border-gold-500" placeholder="e.g., Antique Peacock Bangle" />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select className="w-full rounded-lg border-slate-300 bg-slate-50 p-2.5 text-sm focus:ring-gold-500 focus:border-gold-500 border">
                    {Object.values(ItemCategory).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">HUID (Optional)</label>
                  <input type="text" className="w-full rounded-lg border-slate-300 border p-2.5 text-sm focus:ring-gold-500 focus:border-gold-500 uppercase" placeholder="XX00XX" />
                </div>

                {/* Weight Section */}
                <div className="col-span-2 bg-orange-50/50 p-4 rounded-xl border border-orange-100 grid grid-cols-3 gap-4">
                   <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Gross Wt (g)</label>
                      <input type="number" step="0.001" className="w-full font-mono rounded-md border-slate-300 border p-2 text-sm" placeholder="0.000" />
                   </div>
                   <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Stone Wt (g)</label>
                      <input type="number" step="0.001" className="w-full font-mono rounded-md border-slate-300 border p-2 text-sm" placeholder="0.000" />
                   </div>
                   <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Net Wt (g)</label>
                      <input type="number" step="0.001" disabled className="w-full font-mono rounded-md border-slate-300 bg-slate-100 border p-2 text-sm font-bold text-slate-700" placeholder="Auto-calc" />
                   </div>
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Wastage (%)</label>
                    <input type="number" className="w-full rounded-lg border-slate-300 border p-2.5 text-sm" placeholder="e.g., 12" />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Making Charges (Per Gram)</label>
                    <input type="number" className="w-full rounded-lg border-slate-300 border p-2.5 text-sm" placeholder="e.g., 450" />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-lg bg-gold-500 text-white hover:bg-gold-600 font-medium shadow-lg shadow-gold-500/30 flex items-center">
                   <Save className="w-4 h-4 mr-2" /> Save & Print Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};