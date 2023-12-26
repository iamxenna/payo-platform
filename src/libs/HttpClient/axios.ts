import { default as axiosLib } from "axios";
import { Cookie, COOKIE_KEYS } from "libs/Cookie";

export const axios = axiosLib.create({
  baseURL: process.env.REACT_APP_API_HOST || "",
  withCredentials: true,
});

axios.interceptors.request.use(function (config) {
  const token = Cookie.get(COOKIE_KEYS.JWT_TOKEN);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (reject) => {
    if (!reject.response) {
      return Promise.reject(reject);
    }
    return Promise.reject(reject.response);
  },
);
