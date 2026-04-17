import axios from "axios";

axios.defaults.withCredentials = true;

const AxiosIntance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

AxiosIntance.interceptors.request.use((config) => {
  const token = localStorage.getItem("Token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

AxiosIntance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("Token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default AxiosIntance;
