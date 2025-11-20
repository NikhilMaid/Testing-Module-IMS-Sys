import React from 'react';
import { 
  LayoutDashboard, 
  Tags, 
  ShoppingCart, 
  Hammer, 
  BarChart3, 
  Settings, 
  LogOut,
  Gem
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'inventory', icon: Tags, label: 'Inventory & Tags' },
    { id: 'pos', icon: ShoppingCart, label: 'Point of Sale' },
    { id: 'karigar', icon: Hammer, label: 'Manufacturing' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-slate-850 text-slate-300 h-screen flex flex-col flex-shrink-0 transition-all duration-300 border-r border-slate-800">
      <div className="h-16 flex items-center px-6 bg-slate-900 border-b border-slate-800">
        <Gem className="w-8 h-8 text-gold-400 mr-3" />
        <div>
          <h1 className="font-bold text-white text-lg tracking-tight">AURUM</h1>
          <p className="text-xs text-slate-500">Enterprise ERP</p>
        </div>
      </div>

      <div className="flex-1 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-gold-500/10 text-gold-400 border-r-2 border-gold-400' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-gold-400' : 'text-slate-500'}`} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};