import { useState, useRef, useEffect } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import useChatStore from '../../store/chatStore';
import DeleteChatModal from '../modals/DeleteChatModal';

/**
 * ChatHistoryItem — single row in the sidebar chat list.
 * Shows edit/delete icons on hover.
 */
export default function ChatHistoryItem({ chat, isActive, onClick }) {
  const { renameChat, deleteChat } = useChatStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(chat.title);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const inputRef = useRef(null);

  // Focus input when edit mode starts
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleRename = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== chat.title) renameChat(chat.id, trimmed);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleRename();
    if (e.key === 'Escape') {
      setEditValue(chat.title);
      setIsEditing(false);
    }
  };

  // Format date label
  const dateLabel = (() => {
    const d = new Date(chat.createdAt);
    const today = new Date();
    const diff = Math.floor((today - d) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  })();

  return (
    <>
      <div
        onClick={!isEditing ? onClick : undefined}
        className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
          isActive
            ? 'bg-primary-50 border border-primary-100'
            : 'hover:bg-gray-100 border border-transparent'
        }`}
      >
        {isEditing ? (
          /* Inline rename input */
          <div className="flex flex-1 items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-0 text-sm text-gray-800 bg-white border border-primary-400 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
            <button
              onClick={handleRename}
              className="p-1 text-primary-600 hover:text-primary-700 rounded-md hover:bg-primary-50"
            >
              <Check size={14} />
            </button>
            <button
              onClick={() => { setEditValue(chat.title); setIsEditing(false); }}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${isActive ? 'text-primary-700' : 'text-gray-700'}`}>
                {chat.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{dateLabel}</p>
            </div>

            {/* Hover actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                title="Rename chat"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setShowDeleteModal(true); }}
                className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete chat"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </>
        )}
      </div>

      {showDeleteModal && (
        <DeleteChatModal
          chatTitle={chat.title}
          onConfirm={() => deleteChat(chat.id)}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
