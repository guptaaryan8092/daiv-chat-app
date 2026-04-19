import Header from './header/Header';
import ChatWindow from './chat/ChatWindow';
import ChatInput from './chat/ChatInput';

/**
 * ChatLayout — assembles the right panel: Header + scrollable ChatWindow + ChatInput.
 */
export default function ChatLayout({ onToggleSidebar }) {
  return (
    <div className="flex flex-col flex-1 min-w-0 h-full bg-gray-50">
      <Header onToggleSidebar={onToggleSidebar} />
      <ChatWindow />
      <ChatInput />
    </div>
  );
}
