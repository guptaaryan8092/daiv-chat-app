<div align="center">

# 🤖 DaivAI — AI Chat Assistant

**A full-featured ChatGPT-like AI chat web app built with React, Tailwind CSS, and Zustand.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://daiv-chat-app.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/Zustand-State%20Management-orange?style=for-the-badge)](https://zustand-demo.pmnd.rs)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vite.dev)

</div>

---

## 🔗 Live Demo

> **[https://daiv-chat-app.vercel.app](https://daiv-chat-app.vercel.app)**

---

## 📸 Preview

![DaivAI Chat App Preview](./preview.png)

> _Two-panel layout: Collapsible sidebar with chat history on the left, full chat area on the right._

---

## ✨ Features

### 💬 Chat
- Create unlimited chat sessions
- Switch between chats seamlessly
- Auto-titles chats from your first message
- Simulated AI responses with a 1–2 second typing delay
- Animated **typing indicator** (bouncing dots) while AI responds
- **Auto-scrolls** to the latest message

### 📝 Message Management
- **Edit** any user message via modal
- **Delete** messages with a confirmation dialog
- Hover to reveal edit / delete action buttons

### 🗂️ Sidebar
- **New Chat** button
- Full **chat history** list with timestamps
- **Inline rename** — click the pencil, type, press Enter
- **Delete chat** with confirmation modal
- User section with avatar and **3-dot dropdown menu**:
  - My Account · Upgrade Plan · Settings · Help & Support · Log Out

### 🧠 AI Engine Selector
- Floating dropdown to switch AI models:
  - 🧠 **Neural Nexus** — Balanced & Fast (default)
  - ⚡ **Cerebral Prime** — High Reasoning
  - ✨ **Synapse Ultra** — Creative & Verbose
  - 🔷 **Logic Core** — Precise & Concise

### 📱 Responsive Design
- Desktop: static collapsible sidebar
- Mobile: sidebar becomes a slide-in overlay with backdrop

### 💾 Persistence
- All chats and messages saved to **localStorage** — survives page refresh

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **React 19** | UI framework (functional components + hooks) |
| **Vite 8** | Build tool and dev server |
| **Tailwind CSS 3** | Utility-first styling |
| **Zustand 5** | Lightweight global state management |
| **lucide-react** | Icon library |

---

## 📁 Project Structure

```
Client/
├── public/
├── src/
│   ├── constants/
│   │   ├── engines.js          # AI engine options list
│   │   └── aiResponses.js      # Mock AI response pool
│   ├── store/
│   │   └── chatStore.js        # Zustand store + localStorage persist
│   ├── components/
│   │   ├── ChatLayout.jsx       # Right panel wrapper
│   │   ├── sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatHistoryItem.jsx
│   │   │   └── UserMenu.jsx
│   │   ├── header/
│   │   │   ├── Header.jsx
│   │   │   └── EngineDropdown.jsx
│   │   ├── chat/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageItem.jsx
│   │   │   ├── MessageActions.jsx
│   │   │   └── ChatInput.jsx
│   │   └── modals/
│   │       ├── EditMessageModal.jsx
│   │       ├── DeleteModal.jsx
│   │       └── DeleteChatModal.jsx
│   ├── App.jsx                  # Root layout (sidebar + chat)
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind directives + global styles
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or later
- **npm** v9 or later

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/guptaaryan8092/daiv-chat-app.git

# 2. Navigate to the Client directory
cd daiv-chat-app/Client

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

Output will be in the `Client/dist/` folder — ready to deploy to Vercel, Netlify, or any static host.

---

## ☁️ Deploy to Vercel

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import from GitHub
3. Set **Root Directory** to `Client`
4. Click **Deploy** — Vercel auto-detects Vite

> No environment variables are required. The app runs entirely in the browser.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Enter` | Send message |
| `Shift + Enter` | New line in input |
| `Escape` | Close any open modal |
| `Enter` (in rename) | Save chat title |
| `Escape` (in rename) | Cancel rename |

---

## 🗺️ Roadmap

- [ ] Real AI API integration (OpenAI / Gemini)
- [ ] User authentication
- [ ] Message search
- [ ] Code block syntax highlighting
- [ ] Dark mode
- [ ] File/image attachments
- [ ] Export chat as PDF / Markdown

---

## 📄 License

MIT © [Aryan Gupta](https://github.com/guptaaryan8092)

---

<div align="center">
  Made with ❤️ and a lot of ☕ &nbsp;|&nbsp; <a href="https://daiv-chat-app.vercel.app">Live Demo</a>
</div>
