import { useState } from 'react';
import { Bot, User } from 'lucide-react';
import { formatTimestamp } from '../../store/chatStore';
import useChatStore from '../../store/chatStore';
import MessageActions from './MessageActions';
import EditMessageModal from '../modals/EditMessageModal';
import DeleteModal from '../modals/DeleteModal';

/**
 * MessageItem — renders one message bubble (user or AI).
 * Supports Markdown-ish bold (**text**) basic rendering.
 */
function formatContent(text) {
  // Very lightweight: bold **text** → <strong>
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Preserve line breaks
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}

export default function MessageItem({ message, chatId }) {
  const { editMessage, deleteMessage } = useChatStore();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const isUser = message.role === 'user';

  return (
    <>
      <div className={`group flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start`}>
        {/* Avatar */}
        <div
          className={`
            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm
            ${isUser
              ? 'bg-gradient-to-br from-primary-500 to-primary-700'
              : 'bg-gradient-to-br from-gray-700 to-gray-900'}
          `}
        >
          {isUser
            ? <User size={15} className="text-white" />
            : <Bot size={15} className="text-white" />
          }
        </div>

        {/* Content */}
        <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
          {/* Name + time */}
          <div className={`flex items-center gap-2 mb-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-xs font-semibold text-gray-600">
              {isUser ? 'You' : 'Neural Nexus'}
            </span>
            <span className="text-xs text-gray-400">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>

          {/* Bubble */}
          <div
            className={`
              relative px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
              ${isUser
                ? 'bg-primary-600 text-white rounded-tr-sm'
                : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
              }
            `}
          >
            <div className={`whitespace-pre-wrap break-words ${isUser ? 'font-[450]' : ''}`}>
              {formatContent(message.content)}
            </div>
          </div>

          {/* Edit/Delete actions (user only) */}
          {isUser && (
            <MessageActions
              onEdit={() => setShowEdit(true)}
              onDelete={() => setShowDelete(true)}
            />
          )}
        </div>
      </div>

      {showEdit && (
        <EditMessageModal
          initialContent={message.content}
          onSave={(newContent) => editMessage(chatId, message.id, newContent)}
          onClose={() => setShowEdit(false)}
        />
      )}

      {showDelete && (
        <DeleteModal
          onConfirm={() => deleteMessage(chatId, message.id)}
          onClose={() => setShowDelete(false)}
        />
      )}
    </>
  );
}
