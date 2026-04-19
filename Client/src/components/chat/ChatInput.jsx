import { useState, useRef, useEffect } from 'react';
import { Paperclip, Mic, ArrowUp } from 'lucide-react';
import useChatStore from '../../store/chatStore';

const MAX_CHARS = 4000;

/**
 * ChatInput — fixed bottom input bar with textarea, char counter, and send button.
 */
export default function ChatInput() {
  const { addMessage, isAIResponding, activeChatId } = useChatStore();
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const charCount = text.length;
  const canSend = text.trim().length > 0 && !isAIResponding && !!activeChatId;

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 180) + 'px';
  }, [text]);

  const handleSend = async () => {
    if (!canSend) return;
    const msg = text.trim();
    setText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    await addMessage(msg);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-100 bg-white px-4 py-3">
      {/* Input bar */}
      <div
        className={`
          flex items-end gap-2 rounded-2xl border bg-white px-3 py-2 shadow-sm transition-all duration-150
          ${isAIResponding
            ? 'border-gray-200 opacity-75'
            : 'border-gray-200 hover:border-gray-300 focus-within:border-primary-400 focus-within:shadow-md focus-within:ring-1 focus-within:ring-primary-100'
          }
        `}
      >
        {/* Attachment */}
        <button
          disabled={isAIResponding}
          className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40 flex-shrink-0 mb-0.5"
          title="Attach file"
        >
          <Paperclip size={18} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) setText(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          disabled={isAIResponding || !activeChatId}
          placeholder={isAIResponding ? 'AI is responding…' : 'Message Neural Nexus…'}
          rows={1}
          className="flex-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none leading-relaxed py-1.5 min-h-[36px] max-h-[180px] overflow-y-auto disabled:cursor-not-allowed"
          style={{ resize: 'none' }}
        />

        {/* Mic */}
        <button
          disabled={isAIResponding}
          className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40 flex-shrink-0 mb-0.5"
          title="Voice input"
        >
          <Mic size={18} />
        </button>

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={`
            p-2 rounded-xl flex-shrink-0 mb-0.5 transition-all duration-150
            ${canSend
              ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md active:scale-95'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }
          `}
          title="Send message"
        >
          <ArrowUp size={16} />
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2 px-1">
        <p className="text-xs text-gray-400">
          AI can make mistakes. Consider checking important information.
        </p>
        <span className={`text-xs tabular-nums ${charCount > MAX_CHARS * 0.9 ? 'text-orange-500' : 'text-gray-400'}`}>
          {charCount} / {MAX_CHARS}
        </span>
      </div>
    </div>
  );
}
