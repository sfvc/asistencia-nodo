import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // O tu URL en producción
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;