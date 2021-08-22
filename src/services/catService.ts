import axios from 'axios';
import aspida from '@aspida/axios';
import api from '../types/api/cat/$api';
import { Query as ImagesSearchQuery } from '../types/api/cat/images/search';
import { Query as CategoriesQuery } from '../types/api/cat/categories';
import { Query as BreedsQuery } from '../types/api/cat/breeds/index';

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

export async function loadNextImage() {
  try {
    const res = await apiClient.images.search.get({ query: { limit: 1, size: 'med' } });

    return res.body[0];
  } catch (err) {
    console.log(err);
  }
}

export async function getImageList(query: ImagesQuery) {
  try {
    const res = await apiClient.images.search.get({ query });

    return res.body;
  } catch (err) {
    console.log(err);
  }
}

export async function getBreedList(query: BreedsQuery) {
  try {
    const res = await apiClient.breeds.get({ query });

    return res.body;
  } catch (err) {
    console.log(err);
  }
}

export async function getCategoryList(query: CategoriesQuery) {
  try {
    const res = await apiClient.categories.get({ query });

    return res.body;
  } catch (err) {
    console.log(err);
  }
}
