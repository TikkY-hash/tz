import axios from "axios";
import { useAuth } from "@/store/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuth.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      const auth = useAuth.getState();

      try {
        auth.setIsRefreshing(true);

        const refreshToken = auth.refreshToken;

        if (!refreshToken) {
          auth.clearTokens();
          return Promise.reject(error);
        }

        const response = await api.post("/auth/refresh", { refreshToken });

        const { accessToken, refreshToken: newRefresh } = response.data;

        auth.setTokens({ accessToken, refreshToken: newRefresh });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        auth.clearTokens();
        return Promise.reject(refreshError);
      } finally {
        auth.setIsRefreshing(false);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
