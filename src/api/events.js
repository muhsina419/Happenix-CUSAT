import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/events';

export const eventsAPI = {
  presign: async (contentType) => {
    try {
      const response = await axios.post(`${API_BASE}/presign`, { contentType });
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || err.message };
    }
  },
  create: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE}/create-event`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || err.message };
    }
  },
  search: async (query) => {
    try {
      const response = await axios.get(`${API_BASE}`, { params: { query } });
      return { success: true, data: response.data.items };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || err.message };
    }
  }
};


