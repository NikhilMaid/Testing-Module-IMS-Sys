import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { LiveRateTicker } from './components/LiveRateTicker';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { POS } from './pages/POS';
import { Karigar } from './pages/Karigar';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'pos':
        return <POS />;
      case 'karigar':
        return <Karigar />;
      default:
        return <div className="p-6 text-slate-500">Module under development</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <LiveRateTicker />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100/50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;