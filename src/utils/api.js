import axios from 'axios';

const api = axios.create({
  baseURL: '/',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export const setToken = (token) => {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export const removeToken = () => {
  api.defaults.headers.common['Authorization'] = null;
}

setToken(localStorage.getItem('token'));

export default api;