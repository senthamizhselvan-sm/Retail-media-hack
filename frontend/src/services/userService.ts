import api from './api';

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data.user;
  },

  updateProfile: async (data: { name?: string; avatar?: string }) => {
    const response = await api.put('/users/profile', data);
    return response.data.user;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.put('/users/password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};
