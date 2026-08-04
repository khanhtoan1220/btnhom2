
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer 1234567890", 
  },
});

export default api;