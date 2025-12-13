import api from './api';

export const adminService = {
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data.users;
  },

  updateUser: async (id: string, data: any) => {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data.user;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  getLogs: async (page = 1, limit = 20) => {
    const response = await api.get(`/admin/logs?page=${page}&limit=${limit}`);
    return response.data;
  },
};
