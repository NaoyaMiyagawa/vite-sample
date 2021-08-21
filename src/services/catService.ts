import axios from 'axios';
import aspida from '@aspida/axios';
import api from '../types/api/cat/$api';

const API_KEY = import.meta.env.VITE_CAT_API_KEY;

const axiosConfig = {
  baseURL: 'https://api.thecatapi.com/v1/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    common: {
      'x-api-key': API_KEY,
    },
  },
};
const apiClient = api(aspida(axios, axiosConfig));

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
    const res = await apiClient.images.search.get({ query: { limit: 1, size: 'med' } });

    return res.body[0];
  } catch (err) {
    console.log(err);
  }
};

const getBreedList = async function () {
  try {
    const res = await apiClient.breeds.get({ query: { attach_breed: 0 } });

    return res;
  } catch (err) {
    console.log(err);
  }
};

export { Breed, loadNextImage, getBreedList };
