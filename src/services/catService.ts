import axios from 'axios';

const API_KEY = import.meta.env.VITE_CAT_API_KEY;

const apiClient = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/images/search',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    common: {
      'x-api-key': API_KEY,
    },
  },
});
console.log('🚀 > apiClient', apiClient);

export default {
  async loadNextImage() {
    try {
      const res = await apiClient.get('', {
        params: { limit: 1 },
      });
      console.log('🚀 > loadNextImage > res', res);

      return res.data[0];
    } catch (err) {
      console.log(err);
    }
  },
};
