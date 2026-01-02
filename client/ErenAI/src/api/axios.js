import axios from "axios";

const api = axios.create({
  baseURL: "https://eren-ai-assistant-1.onrender.com",
  withCredentials: true,
});

export default api;
