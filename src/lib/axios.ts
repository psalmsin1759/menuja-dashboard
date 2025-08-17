import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
