import axios from "axios";

const callApiUrl = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
  },
});

callApiUrl.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

callApiUrl.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);

export default callApiUrl;
