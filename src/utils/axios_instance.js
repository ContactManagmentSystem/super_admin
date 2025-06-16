import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth-spadmin-token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data && config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
