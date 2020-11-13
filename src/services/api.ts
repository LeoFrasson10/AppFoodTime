import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.foodtime.tk/api/',
});

export default api;
