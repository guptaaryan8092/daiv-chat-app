import { useEffect, useRef } from 'react';
import { Bot, MessageSquare } from 'lucide-react';
import useChatStore from '../../store/chatStore';
import MessageItem from './MessageItem';

/**
 * TypingIndicator — three animated dots shown while AI is responding.
 */
function TypingIndicator() {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
        <Bot size={15} className="text-white" />
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5 h-5">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  );
}

/**
 * EmptyState — shown when there are no messages in the active chat.
 */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4 shadow-lg">
        <MessageSquare size={28} className="text-white" />
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Start a conversation</h2>
      <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
        Type a message below to begin chatting with your AI assistant.
      </p>
    </div>
  );
}

/**
 * ChatWindow — scrollable message list with auto-scroll and typing indicator.
 */
export default function ChatWindow() {
  const { chats, activeChatId, isAIResponding } = useChatStore();
  const bottomRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const messages = activeChat?.messages ?? [];

  // Auto-scroll to bottom on new messages or typing state change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isAIResponding]);

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        Select or create a chat to get started.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
      {messages.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} chatId={activeChatId} />
          ))}
          {isAIResponding && <TypingIndicator />}
        </>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
