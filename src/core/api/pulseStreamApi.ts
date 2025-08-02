import { env } from "@/config/env";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const pulseStreamApp = axios.create({
  baseURL: env.VITE_BASE_URL,
});

pulseStreamApp.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { pulseStreamApp };
