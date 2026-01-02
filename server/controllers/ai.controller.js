console.log("USING GROQ KEY:", process.env.GROQ_API_KEY.slice(0, 10));

import Groq from "groq-sdk";
import Chat from "../models/Chat.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const askAI = async (req, res) => {
  console.log("👉 AI HIT");
  console.log("👉 USER:", req.user);
  console.log("👉 BODY:", req.body);
  try {
    // 🔐 Auth check
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { message } = req.body;

    // 🧪 Validation
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    // 📜 Fetch last 10 messages
    const history = await Chat.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // 🔄 Oldest → newest
    const messages = history
      .reverse()
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    // ➕ Add new user message
    messages.push({ role: "user", content: message });

    // 🤖 Groq AI call (FREE)
    const completion = await groq.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    { role: "system", content: "You are Eren, a helpful AI assistant." },
    { role: "user", content: message }
  ],
});

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    // 💾 Save conversation
    await Chat.insertMany([
      { userId: req.user._id, role: "user", content: message },
      { userId: req.user._id, role: "assistant", content: reply },
    ]);

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("🔥 AI ERROR:", err);
    return res.status(500).json({
      error: "AI service failed. Please try again later.",
    });
  }
};
