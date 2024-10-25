import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use(
  (config) => {
    const persistRoot = localStorage.getItem("persist:root");
    if (persistRoot) {
      const user = JSON.parse(JSON.parse(persistRoot).user);
      const TOKEN = user?.currentUser?.accessToken;
      if (TOKEN) {
        config.headers['Authorization'] = `Bearer ${TOKEN}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
