import axios from "axios";
import api from "./const";

const $api = axios.create({
  withCredentials: true,
  baseURL: api.server + "/",
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.access_token}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    if (config.data == "Unauthorized") {
      window.location.reload();
    }
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      error.config._isRetry !== true
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(api.refresh, {
          withCredentials: true,
        });
        localStorage.access_token = response.data.response.accessToken;
        return $api.request(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    throw error;
  }
);

export default $api;
