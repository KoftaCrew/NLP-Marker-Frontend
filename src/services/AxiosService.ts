import axios from "axios";
import { User } from "../entities/User";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const setAuthorizationHeader = (token: string) => {
  if (token === "") {
    delete axiosInstance.defaults.headers.common["Authorization"];
    localStorage.removeItem("accessToken");
    return;
  }

  localStorage.setItem("accessToken", token);
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    if (
      error.response.status === 401
      && !originalRequest._retry
      && originalRequest.headers["Authorization"]
    ) {
      originalRequest._retry = true;
      const user: User = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user.refreshToken)
        return Promise.reject(error);

      return axiosInstance
        .post("/auth/refresh-token/", {
          refresh: user.refreshToken
        })
        .then(res => {
          setAuthorizationHeader(res.data.access);
          originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
          return axiosInstance(originalRequest);
        })
        .catch(() => {
          setAuthorizationHeader("");
          window.location.reload();
        });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
