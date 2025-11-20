import React, { useState } from 'react';
import { Search, Trash2, CreditCard, Banknote, Wallet, ScanLine, ArrowRightLeft, Calculator } from 'lucide-react';
import { CartItem, MetalType, Purity, ItemCategory, StockStatus } from '../types';
import { formatCurrency, formatWeight, calculatePrice } from '../utils';

export const POS: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock Cart
  const [cart, setCart] = useState<CartItem[]>([
    {
      tagId: 'NK-982210',
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
      price: 286184, // Pre-calculated for demo
      makingChargesTotal: 19395,
      taxAmount: 8585
    }
  ]);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const taxTotal = cart.reduce((sum, item) => sum + item.taxAmount, 0);
  const grandTotal = subtotal + taxTotal;

  return (
    <div className="h-full flex flex-col md:flex-row bg-slate-50">
      {/* Left: Item Catalog / Scanner */}
      <div className="w-full md:w-7/12 p-6 flex flex-col border-r border-slate-200">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Billing & Checkout</h2>
          <div className="flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Scan Tag or Search Item..." 
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
            </div>
            <button className="px-4 bg-slate-800 text-white rounded-xl hover:bg-slate-700 flex items-center">
                <ScanLine className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Pick Categories */}
        <div className="grid grid-cols-3 gap-4 mb-6">
            {['Gold 22K', 'Diamond', 'Silver', 'Coins', 'Loose Stones', 'Offers'].map(cat => (
                <button key={cat} className="p-4 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-gold-400 hover:text-gold-600 transition-all shadow-sm">
                    {cat}
                </button>
            ))}
        </div>
        
        <div className="flex-1 bg-indigo-50 rounded-xl border border-indigo-100 p-6 flex flex-col items-center justify-center text-center text-indigo-400">
            <ScanLine className="w-12 h-12 mb-3 opacity-50" />
            <p>Ready to Scan. Use RFID reader or Handheld Scanner.</p>
        </div>
      </div>

      {/* Right: Cart & Payment */}
      <div className="w-full md:w-5/12 bg-white flex flex-col h-full shadow-xl z-10">
        
        {/* Customer Info */}
        <div className="p-6 border-b border-slate-100">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Customer</h3>
                <button className="text-gold-600 text-sm font-medium">+ Add New</button>
            </div>
            <div className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold mr-3">
                    JD
                </div>
                <div>
                    <p className="font-bold text-slate-800">John Doe</p>
                    <p className="text-xs text-slate-500">+91 98765 43210 | Membership: Platinum</p>
                </div>
            </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start pb-4 border-b border-slate-100 last:border-0">
                    <div>
                        <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                        <p className="text-xs text-slate-500 font-mono mt-1">
                            {item.tagId} | {formatWeight(item.netWeight)}g Net
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-slate-800 font-mono">{formatCurrency(item.price)}</p>
                        <p className="text-xs text-slate-400 mt-1">MC: {formatCurrency(item.makingChargesTotal)}</p>
                    </div>
                    <button className="text-slate-300 hover:text-red-500 ml-2 mt-1">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>

        {/* Payment & Totals */}
        <div className="bg-slate-50 border-t border-slate-200 p-6">
            {/* Old Gold Exchange Teaser */}
            <div className="mb-4">
                <button className="w-full py-3 px-4 bg-white border border-gold-200 text-gold-700 rounded-lg shadow-sm text-sm font-medium flex items-center justify-center hover:bg-gold-50 transition-colors">
                    <ArrowRightLeft className="w-4 h-4 mr-2" /> Exchange Old Gold
                </button>
            </div>

            <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                    <span>GST (3%)</span>
                    <span className="font-mono">{formatCurrency(taxTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold text-lg pt-2 border-t border-slate-200">
                    <span>Total Payable</span>
                    <span className="font-mono">{formatCurrency(grandTotal)}</span>
                </div>
            </div>

            <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-transform active:scale-95 flex items-center justify-center">
                <Wallet className="w-5 h-5 mr-2" /> 
                Proceed to Pay {formatCurrency(grandTotal)}
            </button>
        </div>
      </div>
    </div>
  );
};