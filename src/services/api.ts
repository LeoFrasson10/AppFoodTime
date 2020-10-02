import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.2.107/foodtime/public/api/',
});

export default api;
