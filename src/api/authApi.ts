import axios from 'axios';
import { User } from "../types";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getRequestToken = async () => {
  const response = await axios.get(`${BASE_URL}/authentication/token/new`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.request_token;
};

export const validateWithLogin = async (username: string, password: string, requestToken: string) => {
  const response = await axios.post(`${BASE_URL}/authentication/token/validate_with_login`, {
    username,
    password,
    request_token: requestToken,
  }, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.request_token;
};

export const createSession = async (validatedRequestToken: string) => {
  const response = await axios.post(`${BASE_URL}/authentication/session/new`, {
    request_token: validatedRequestToken,
  }, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.session_id;
};

export const validateSession = async (sessionId: string) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/account', {
      params: {
        api_key: API_KEY,
        session_id: sessionId,
      },
    });

    return response.data;

  } catch (error) {
    throw new Error('Sessão inválida');
  }
};

export const fetchAccountData = async (sessionId: string): Promise<User> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionId}`
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  throw new Error('Failed to fetch accountId');
};
