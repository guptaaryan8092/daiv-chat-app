import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getRandomAIResponse } from '../constants/aiResponses';

// ─── Helpers ───────────────────────────────────────────────────────────────

const genId = () => crypto.randomUUID();

const now = () => new Date().toISOString();

const formatTimestamp = (iso) => {
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export { formatTimestamp };

// ─── Initial welcome chat ───────────────────────────────────────────────────

const makeWelcomeChat = () => {
  const id = genId();
  return {
    id,
    title: 'Welcome to DaivAI',
    createdAt: now(),
    messages: [
      {
        id: genId(),
        role: 'ai',
        content:
          "👋 Hello! I'm **Neural Nexus**, your AI assistant. How can I help you today?\n\nYou can ask me anything — coding, writing, research, brainstorming, and more!",
        timestamp: now(),
      },
    ],
  };
};

// ─── Store ──────────────────────────────────────────────────────────────────

const useChatStore = create(
  persist(
    (set, get) => ({
      chats: [makeWelcomeChat()],
      activeChatId: null,
      selectedEngine: 'neural-nexus',
      isAIResponding: false,

      // ── Initialise activeChatId after hydration ──
      _hydrated: false,
      _onHydrate: () => {
        const { chats, activeChatId } = get();
        if (!activeChatId && chats.length > 0) {
          set({ activeChatId: chats[0].id, _hydrated: true });
        } else {
          set({ _hydrated: true });
        }
      },

      // ── Engine ──────────────────────────────────
      setEngine: (engineId) => set({ selectedEngine: engineId }),

      // ── Chat CRUD ───────────────────────────────
      createChat: () => {
        const chat = {
          id: genId(),
          title: 'New Chat',
          createdAt: now(),
          messages: [],
        };
        set((state) => ({
          chats: [chat, ...state.chats],
          activeChatId: chat.id,
        }));
      },

      deleteChat: (chatId) => {
        set((state) => {
          const remaining = state.chats.filter((c) => c.id !== chatId);
          const newActive =
            state.activeChatId === chatId
              ? remaining.length > 0
                ? remaining[0].id
                : null
              : state.activeChatId;
          return { chats: remaining, activeChatId: newActive };
        });
      },

      renameChat: (chatId, newTitle) => {
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === chatId ? { ...c, title: newTitle } : c
          ),
        }));
      },

      setActiveChat: (chatId) => set({ activeChatId: chatId }),

      // ── Messages ─────────────────────────────────
      addMessage: async (content) => {
        const { activeChatId, chats, selectedEngine, isAIResponding } = get();
        if (!activeChatId || isAIResponding) return;

        const activeChat = chats.find((c) => c.id === activeChatId);
        if (!activeChat) return;

        // User message
        const userMsg = {
          id: genId(),
          role: 'user',
          content,
          timestamp: now(),
        };

        // Auto-title chat from first user message (first 40 chars)
        const isFirstUserMsg = activeChat.messages.every((m) => m.role === 'ai');
        const newTitle = isFirstUserMsg
          ? content.slice(0, 40) + (content.length > 40 ? '…' : '')
          : activeChat.title;

        set((state) => ({
          isAIResponding: true,
          chats: state.chats.map((c) =>
            c.id === activeChatId
              ? { ...c, title: newTitle, messages: [...c.messages, userMsg] }
              : c
          ),
        }));

        // Simulate AI delay (1–2 sec)
        const delay = 1000 + Math.random() * 1000;
        await new Promise((r) => setTimeout(r, delay));

        const aiMsg = {
          id: genId(),
          role: 'ai',
          content: getRandomAIResponse(),
          timestamp: now(),
        };

        set((state) => ({
          isAIResponding: false,
          chats: state.chats.map((c) =>
            c.id === activeChatId
              ? { ...c, messages: [...c.messages, aiMsg] }
              : c
          ),
        }));
      },

      editMessage: (chatId, messageId, newContent) => {
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === chatId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === messageId ? { ...m, content: newContent } : m
                  ),
                }
              : c
          ),
        }));
      },

      deleteMessage: (chatId, messageId) => {
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === chatId
              ? {
                  ...c,
                  messages: c.messages.filter((m) => m.id !== messageId),
                }
              : c
          ),
        }));
      },
    }),
    {
      name: 'daivai-chat-store',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._onHydrate();
        }
      },
    }
  )
);

export default useChatStore;
