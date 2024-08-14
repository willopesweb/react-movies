import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (page: number = 1) => {
  //const response = await axios.get(`${BASE_URL}/movie/popular?language=pt-BR&api_key=${API_KEY}`);

  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      include_adult: false,
      language: 'pt-BR',
      page: page
    },
  });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages
  }
};

export const fetchGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list?language=pt-BR&api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchMovieDetails = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}?language=pt-BR&api_key=${API_KEY}`);
  return response.data;
};

export const fetchMoviesBySearch = async (query: string, page: number = 1) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
      include_adult: false,
      language: 'pt-BR',
      page: page
    },
  });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages
  }
};