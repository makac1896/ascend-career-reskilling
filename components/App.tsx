import React, { useState } from 'react';
import MainDashboard from './MainDashboard';
import InsightsDashboard from './components/InsightsDashboard';
import ObserveDashboard from './components/ObserveDashboard';
import CurriculumDashboard from './components/CurriculumDashboard';
import ReportsDashboard from './components/ReportsDashboard';
import StudentDashboard from './components/StudentDashboard';
import LandingPage from './components/LandingPage';
import DesignWorkshopModal from './components/DesignWorkshopModal';
import Toast, { ToastProps } from './components/Toast';
import { 
    Search, 
    Bell, 
    Settings, 
    Home, 
    BarChart2, 
    Layers, 
    FileText,
    HelpCircle,
    PanelLeftClose,
    PanelLeftOpen,
    ChevronLeft,
    ChevronRight,
    Eye
} from 'lucide-react';

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; collapsed?: boolean; onClick?: () => void }> = ({ icon, label, active, collapsed, onClick }) => (
    <div 
        onClick={onClick}
        className={`flex items-center gap-4 px-3.5 py-3.5 rounded-pill cursor-pointer transition-all mb-2 relative group ${active ? 'nav-item-active' : 'nav-item-inactive'} ${collapsed ? 'justify-center' : ''}`}
    >
        <div className="w-5 h-5 flex-shrink-0">{icon}</div>
        {!collapsed && <span className="font-bold text-sm tracking-wide whitespace-nowrap overflow-hidden">{label}</span>}
        
        {/* Tooltip for collapsed state */}
        {collapsed && (
            <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                {label}
            </div>
        )}
    </div>
);

const App: React.FC = () => {
  const [viewState, setViewState] = useState<'landing' | 'admin' | 'student'>('landing');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  // Toast State
  const [toast, setToast] = useState<Omit<ToastProps, 'onClose'>>({
      message: '',
      type: 'info',
      isVisible: false
  });

  const showToast = (message: string, type: 'success' | 'info' | 'loading' = 'info') => {
      setToast({ message, type, isVisible: true });
  };

  const handleDeepAnalysis = () => {
      showToast("Generating Deep Analysis Report...", "loading");
      setTimeout(() => {
          showToast("Report Sent to Dean of Engineering.", "success");
      }, 2000);
  };

  const handleMarketAction = (action: string, item: string) => {
      if (action === 'plan') {
          setIsWorkshopOpen(true);
      } else if (action === 'report') {
          showToast(`Downloading Market Report for ${item}...`, 'loading');
          setTimeout(() => showToast("PDF Downloaded Successfully", "success"), 1500);
      } else if (action === 'analyze') {
          showToast(`Running correlation analysis on ${item}...`, 'loading');
          setTimeout(() => showToast("Correlation found: 94% match with Alumni data", "info"), 2000);
      }
  };

  const handleDismissOpportunity = () => {
      showToast("Opportunity dismissed.", "info");
  };

  const handleAutoDraft = () => {
      showToast("AI Auto-Drafting Proposal...", "loading");
      setTimeout(() => showToast("Proposal Draft Saved to Workbench", "success"), 2500);
  };

  const handleViewDeck = () => {
      showToast("Entering Presentation Mode...", "info");
  };

  const handleWorkshopComplete = () => {
      setIsWorkshopOpen(false);
      showToast("🚀 Intervention Launched Successfully!", "success");
  };

  const handleCandidateClick = (name: string) => {
      showToast(`Opening profile: ${name}`, "info");
  };

  const handleViewPipeline = () => {
      showToast("Redirecting to Talent CRM...", "loading");
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
          showToast(`Searching global database for "${e.currentTarget.value}"...`, "loading");
          setTimeout(() => showToast("Search filters updated", "success"), 1000);
      }
  };

  const handleEnterAdmin = () => {
      setViewState('admin');
  };

  const handleEnterStudent = () => {
      setViewState('student');
  };

  const renderContent = () => {
      switch(activeTab) {
          case 'Dashboard':
              return (
                <MainDashboard 
                    onAction={handleMarketAction}
                    onDeepAnalysis={handleDeepAnalysis}
                    onLaunchWorkshop={() => setIsWorkshopOpen(true)}
                    onDismissOpportunity={handleDismissOpportunity}
                    onViewDeck={handleViewDeck}
                    onAutoDraft={handleAutoDraft}
                    onCandidateClick={handleCandidateClick}
                    onViewPipeline={handleViewPipeline}
                />
              );
          case 'Insights Engine':
              return <InsightsDashboard onAction={handleMarketAction} />;
          case 'Observation Deck':
              return <ObserveDashboard />;
          case 'Curriculum':
              return <CurriculumDashboard />;
          case 'Reports':
              return <ReportsDashboard />;
          default:
              return (
                  <div className="flex items-center justify-center h-[60vh] flex-col gap-4 text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                          <Layers className="w-8 h-8 text-ascend-subtext" />
                      </div>
                      <h3 className="text-xl font-bold text-ascend-text">Module Loading...</h3>
                      <p className="text-ascend-subtext max-w-sm">The {activeTab} module is currently being provisioned by the orchestration engine.</p>
                  </div>
              );
      }
  };

  if (viewState === 'landing') {
      return <LandingPage onEnterAdmin={handleEnterAdmin} onEnterStudent={handleEnterStudent} />;
  }

  if (viewState === 'student') {
      return <StudentDashboard />;
  }

  // Admin View
  return (
    <div className="min-h-screen flex bg-ascend-bg font-sans overflow-hidden animate-in fade-in duration-700">
      
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />

      {/* Modals */}
      <DesignWorkshopModal 
        isOpen={isWorkshopOpen} 
        onClose={() => setIsWorkshopOpen(false)} 
        onComplete={handleWorkshopComplete}
      />

      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-[88px]' : 'w-[290px]'} bg-white h-screen fixed left-0 top-0 hidden lg:flex flex-col p-6 z-50 border-r border-ascend-border shadow-sm transition-all duration-300 ease-in-out`}>
        
        {/* Logo Area */}
        <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} mb-10 px-1 mt-2 transition-all`}>
             <div className="flex items-center gap-3">
                 <div className="w-9 h-9 flex-shrink-0 bg-gradient-to-br from-ascend-blue to-[#663CFF] rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg">W</div>
                 {!isSidebarCollapsed && (
                     <div>
                        <span className="text-2xl font-bold text-ascend-text tracking-tight whitespace-nowrap block lowercase">waypoint</span>
                        <span className="text-[9px] text-ascend-subtext font-bold uppercase tracking-wider block">An Ascend Platform</span>
                     </div>
                 )}
             </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
             <SidebarItem 
                icon={<Home />} 
                label="Dashboard" 
                active={activeTab === 'Dashboard'} 
                collapsed={isSidebarCollapsed} 
                onClick={() => { setActiveTab('Dashboard'); showToast("System Overview Loaded", "info"); }}
             />
             <SidebarItem 
                icon={<BarChart2 />} 
                label="Insights Engine" 
                active={activeTab === 'Insights Engine'} 
                collapsed={isSidebarCollapsed} 
                onClick={() => { setActiveTab('Insights Engine'); }}
             />
             <SidebarItem 
                icon={<Eye />} 
                label="Observation Deck" 
                active={activeTab === 'Observation Deck'} 
                collapsed={isSidebarCollapsed} 
                onClick={() => { setActiveTab('Observation Deck'); showToast("Syncing with Active Labs...", "loading"); }}
             />
             <SidebarItem 
                icon={<Layers />} 
                label="Curriculum" 
                active={activeTab === 'Curriculum'} 
                collapsed={isSidebarCollapsed} 
                onClick={() => { setActiveTab('Curriculum'); showToast("Loading Curriculum Modules...", "loading"); }}
             />
             <SidebarItem 
                icon={<FileText />} 
                label="Reports" 
                active={activeTab === 'Reports'} 
                collapsed={isSidebarCollapsed} 
                onClick={() => { setActiveTab('Reports'); showToast("Fetching Report Data...", "loading"); }}
             />
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto space-y-1">
            <SidebarItem icon={<Settings />} label="Settings" collapsed={isSidebarCollapsed} onClick={() => showToast("Opening Settings...", "info")} />
            <SidebarItem icon={<HelpCircle />} label="Help Center" collapsed={isSidebarCollapsed} onClick={() => showToast("Connecting to Support...", "info")} />
            
            <div className="pt-4 border-t border-gray-100 mt-2">
                <button 
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="w-full flex items-center justify-center p-2 rounded-xl text-ascend-subtext hover:bg-gray-50 hover:text-ascend-blue transition-colors"
                >
                    {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
            </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarCollapsed ? 'lg:ml-[88px]' : 'lg:ml-[290px]'} p-6 lg:p-10 flex flex-col h-screen overflow-y-auto transition-all duration-300 ease-in-out`}>
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
                <p className="text-ascend-subtext text-xs font-bold uppercase tracking-wider mb-1">Waypoint / {activeTab}</p>
                <h2 className="text-4xl font-bold text-ascend-text tracking-tight">{activeTab === 'Dashboard' ? 'System Overview' : activeTab}</h2>
            </div>

            <div className="bg-white p-2 rounded-full shadow-sm border border-ascend-border flex items-center gap-3">
                <div className="relative bg-ascend-light-blue rounded-full px-5 py-2.5 flex items-center group focus-within:ring-2 ring-ascend-blue/20 transition-all">
                    <Search className="w-4 h-4 text-ascend-subtext mr-2 group-focus-within:text-ascend-blue" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        onKeyDown={handleSearch}
                        className="bg-transparent outline-none text-sm text-ascend-text w-48 placeholder:text-ascend-subtext font-medium" 
                    />
                </div>
                <div className="h-6 w-px bg-gray-200"></div>
                <button 
                    onClick={() => showToast("Notifications Cleared", "info")}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <Bell className="w-5 h-5 text-ascend-subtext hover:text-ascend-blue" />
                </button>
                <div 
                    onClick={() => showToast("Logged in as Admin", "info")}
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px] cursor-pointer hover:scale-105 transition-transform"
                >
                     <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                     </div>
                </div>
            </div>
        </header>

        {/* Content Render Logic */}
        {renderContent()}

      </main>
    </div>
  );
};

export default App;