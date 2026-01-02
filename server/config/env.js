import dotenv from "dotenv";

dotenv.config();

if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY missing");
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET missing");
  process.exit(1);
}

console.log("✅ Environment variables loaded");
