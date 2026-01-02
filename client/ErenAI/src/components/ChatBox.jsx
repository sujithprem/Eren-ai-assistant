import { useState } from "react";
import api from "../api/axios";
import Message from "./Message";
import Loader from "./Loader";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/api/ai",
        { message: input });

      const aiMessage = {
        role: "assistant",
        content: res.data.reply,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Message
            key={index}
            role={msg.role}
            content={msg.content}
          />
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 px-4 py-2 rounded-lg">
              <Loader />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 flex gap-2">
        <input
          type="text"
          placeholder="Ask Eren something..."
          className="flex-1 px-4 py-2 rounded bg-gray-800 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
