import api from './api';

export const favoriteService = {
  getFavorites: async () => {
    const response = await api.get('/favorites');
    return response.data.favorites;
  },

  addFavorite: async (data: {
    imageUrl: string;
    prompt?: string;
    type: string;
    metadata?: any;
  }) => {
    const response = await api.post('/favorites', data);
    return response.data.favorite;
  },

  removeFavorite: async (id: string) => {
    const response = await api.delete(`/favorites/${id}`);
    return response.data;
  },
};
