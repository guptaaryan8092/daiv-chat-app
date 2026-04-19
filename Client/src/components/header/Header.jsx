import { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { ENGINES } from '../../constants/engines';
import useChatStore from '../../store/chatStore';
import EngineDropdown from './EngineDropdown';

/**
 * Header — top bar with hamburger toggle and engine selector dropdown.
 */
export default function Header({ onToggleSidebar }) {
  const { selectedEngine } = useChatStore();
  const [showEngineDropdown, setShowEngineDropdown] = useState(false);

  const activeEngine = ENGINES.find((e) => e.id === selectedEngine) || ENGINES[0];

  return (
    <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
      {/* Hamburger */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Engine selector */}
      <div className="relative">
        <button
          onClick={() => setShowEngineDropdown((v) => !v)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition-all duration-150
            ${showEngineDropdown
              ? 'border-primary-300 bg-primary-50 text-primary-700 shadow-sm'
              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          <span className="text-base">{activeEngine.icon}</span>
          <span>{activeEngine.name}</span>
          <ChevronDown
            size={15}
            className={`transition-transform duration-200 ${showEngineDropdown ? 'rotate-180' : ''}`}
          />
        </button>

        {showEngineDropdown && (
          <EngineDropdown onClose={() => setShowEngineDropdown(false)} />
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Optional: active engine badge */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
        <span className="text-xs font-medium text-primary-600">{activeEngine.name}</span>
      </div>
    </header>
  );
}
