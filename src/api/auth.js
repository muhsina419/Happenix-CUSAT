import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const authAPI = {
  login: (data) => axios.post(`${API}/auth/login`, data),
  register: (data) => axios.post(`${API}/auth/register`, data),
  confirm: (data) => axios.post(`${API}/auth/confirm`, data),
};
