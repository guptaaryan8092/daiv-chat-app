import { useState } from 'react';
import { Plus, X, MoreHorizontal, MessageSquare } from 'lucide-react';
import useChatStore from '../../store/chatStore';
import ChatHistoryItem from './ChatHistoryItem';
import UserMenu from './UserMenu';

/**
 * Sidebar — left panel with logo, new chat button, history list, and user section.
 */
export default function Sidebar({ onClose }) {
  const { chats, activeChatId, createChat, setActiveChat } = useChatStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleNewChat = () => {
    createChat();
    onClose?.(); // close sidebar on mobile after creating chat
  };

  return (
    <aside className="flex flex-col h-full bg-gray-50 border-r border-gray-200 w-72 flex-shrink-0">
      {/* ── Header ────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm">
            <MessageSquare size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">DaivAI</span>
        </div>
        {/* Close button — visible on mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* ── New Chat Button ───────────────────────── */}
      <div className="px-3 py-3">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold shadow-sm transition-all duration-150 hover:shadow-md active:scale-95"
        >
          <Plus size={16} />
          New Chat
        </button>
      </div>

      {/* ── Chat History ──────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center px-4">
            <MessageSquare size={28} className="text-gray-300 mb-2" />
            <p className="text-xs text-gray-400">No chats yet. Start a new one!</p>
          </div>
        ) : (
          chats.map((chat) => (
            <ChatHistoryItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === activeChatId}
              onClick={() => {
                setActiveChat(chat.id);
                onClose?.(); // close sidebar on mobile after switching
              }}
            />
          ))
        )}
      </div>

      {/* ── User Section ──────────────────────────── */}
      <div className="relative px-3 py-3 border-t border-gray-100">
        {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)} />}

        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-default">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-white text-sm font-bold">U</span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">User</p>
            <p className="text-xs text-gray-400 truncate">user@daivai.com</p>
          </div>

          {/* 3-dot menu trigger */}
          <button
            onClick={() => setShowUserMenu((v) => !v)}
            className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="User menu"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
