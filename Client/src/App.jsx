import { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import ChatLayout from './components/ChatLayout';
import useChatStore from './store/chatStore';

export default function App() {
  const { chats, activeChatId, _hydrated, _onHydrate } = useChatStore();

  // Hydrate activeChatId if it wasn't set during rehydration
  useEffect(() => {
    if (!_hydrated) _onHydrate();
  }, [_hydrated, _onHydrate]);

  // Sidebar visibility state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // On smaller viewports, default sidebar to closed
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    if (mq.matches) setSidebarOpen(false);
    const handler = (e) => { if (e.matches) setSidebarOpen(false); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* ── Sidebar ─────────────────────────────── */}
      {/* Desktop: static in layout */}
      <div className={`hidden lg:flex flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-0 overflow-hidden'}`}>
        {sidebarOpen && <Sidebar />}
      </div>

      {/* Mobile: overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
            onClick={closeSidebar}
          />
          {/* Sidebar panel */}
          <div className="relative z-10 sidebar-slide">
            <Sidebar onClose={closeSidebar} />
          </div>
        </div>
      )}

      {/* ── Chat Area ────────────────────────────── */}
      <ChatLayout onToggleSidebar={toggleSidebar} />
    </div>
  );
}
