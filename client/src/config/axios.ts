import axios, { isAxiosError } from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance, isAxiosError };
