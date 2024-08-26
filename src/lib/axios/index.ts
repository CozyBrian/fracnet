import { API_URL } from "@/constants";
import axios from "axios";

export default axios.create({
  baseURL: API_URL,
  // withCredentials: true,
});

export const axiosAuth = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
})
