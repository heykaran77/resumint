import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // For local development
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:5000";
  }
  // For production (same origin as frontend)
  return window.location.origin;
};

const api = axios.create({
  baseURL: getBaseURL(),
});

export default api;
