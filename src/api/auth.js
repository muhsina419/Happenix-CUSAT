import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/auth'; // match your backend port

export const authAPI = {
  login: async ({ email, password }) => {
    try {
      const response = await axios.post(`${API_BASE}/login`, { email, password });
      // Ensure token exists; treat empty/204-like responses as failure
      const token = response?.data?.token;
      if (!token) {
        return {
          success: false,
          error: 'Login succeeded but no token was returned. Please try again.',
          status: response?.status,
        };
      }
      return { success: true, data: { token }, status: response?.status };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.error || err.message,
        status: err.response?.status
      };
    }
  },

  register: async ({ fullname, email, password, confirmPassword, department }) => {
    try {
      const response = await axios.post(`${API_BASE}/register`, { fullname, email, password, confirmPassword, department });
      return { success: true, data: response.data };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.error || err.message 
      };
    }
  },

  confirm: async ({ email, code }) => {
    try {
      const response = await axios.post(`${API_BASE}/confirm`, { email, code });
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || err.message };
    }
  },

  forgotPassword: async ({ email }) => {
    try {
      const response = await axios.post(`${API_BASE}/forgot-password`, { email });
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || err.message };
    }
  },

  confirmPassword: async ({ email, code, newPassword }) => {
    try {
      const response = await axios.post(`${API_BASE}/confirm-password`, { email, code, newPassword });
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || err.message };
    }
  },
};
