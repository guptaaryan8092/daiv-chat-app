import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { ENGINES } from '../../constants/engines';
import useChatStore from '../../store/chatStore';

/**
 * EngineDropdown — floating card listing available AI engines.
 */
export default function EngineDropdown({ onClose }) {
  const { selectedEngine, setEngine } = useChatStore();
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const handleKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50 animate-scaleIn"
    >
      <div className="px-4 py-3 border-b border-gray-50">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Select Model
        </p>
      </div>

      <div className="p-2">
        {ENGINES.map((engine) => {
          const isActive = engine.id === selectedEngine;
          return (
            <button
              key={engine.id}
              onClick={() => { setEngine(engine.id); onClose(); }}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-150
                ${isActive ? 'bg-primary-50 border border-primary-100' : 'hover:bg-gray-50 border border-transparent'}
              `}
            >
              <span className="text-xl flex-shrink-0 w-8 text-center">{engine.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${isActive ? 'text-primary-700' : 'text-gray-800'}`}>
                  {engine.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{engine.subtitle}</p>
              </div>
              {isActive && <Check size={15} className="text-primary-600 flex-shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
