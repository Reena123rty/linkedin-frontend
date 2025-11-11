import axios from "axios";

const api = axios.create({
  baseURL: "https://linkedin-backend-r464.onrender.com", // 🔥 Render backend URL
});

export default api;
