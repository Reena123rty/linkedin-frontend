import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ Correct URL
});

export default api;
