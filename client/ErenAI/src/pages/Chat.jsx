import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import ChatBox from "../components/ChatBox";
import Message from "../components/Message";
import Loader from "../components/Loader";
import eren from '../assets/eren.png';

const Chat = () => {
  const { messages, loading } = useContext(ChatContext);
  const { user, logout } = useContext(AuthContext);

  const bottomRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* 🔹 Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg">
            <img src={eren} alt="Eren AI" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-blue-700">Eren AI Assistant</h1>
            <p className="text-xs text-green-400">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300 hidden sm:block">
            {user?.name || "User"}
          </span>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 transition px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* 🔹 Messages */}
      <main className="flex-1  px-4 py-1 space-y-1 scrollbar-thin scrollbar-thumb-gray-700">

        {messages.length === 0 && (
          <div className="text-center text-blue-400 mt-20">
            <p className="text-lg">👋 Welcome {user?.name}</p>
            <p className="text-sm mt-2">
              Ask anything. I’m here to help.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <Message
            key={index}
            role={msg.role}
            content={msg.content}
          />
        ))}

        {loading && <Loader />}

        <div ref={bottomRef} />
      </main>

      {/* 🔹 Input */}
      <footer className="border-t border-gray-800 bg-gray-900">
        <ChatBox />
      </footer>
    </div>
  );
};

export default Chat;
