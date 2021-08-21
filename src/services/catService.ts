import axios from 'axios';

const API_KEY = import.meta.env.VITE_CAT_API_KEY;

const apiClient = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    common: {
      'x-api-key': API_KEY,
    },
  },
});

type Breed = {
  id: string;
  name: string;
  temperant: string;
  life_span: string;
  alt_names: string;
  wikipedia_url: string;
  origin: string;
  weight_imperial: string;
};

const loadNextImage = async function () {
  try {
    const res = await apiClient.get('images/search', {
      params: { limit: 1, size: 'med' },
    });

    return res.data[0];
  } catch (err) {
    console.log(err);
  }
};

export { Breed, loadNextImage };
