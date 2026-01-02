import { createContext, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

const API_URL = "http://localhost:5000/api/ai";

const ChatProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Send message to AI
  const sendMessage = async (text) => {
    if (!text?.trim() || !user) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/ask`,
        { message: text },
        { withCredentials: true }
      );

      const aiMessage = {
        role: "assistant",
        content: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
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

  // ✅ Clear chat
  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        loading,
        sendMessage,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
