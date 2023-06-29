import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const setAuthorizationHeader = (token: string) => {
  if (token === "") {
    delete axiosInstance.defaults.headers.common["Authorization"];
    return;
  }

  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default axiosInstance;
