import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.207.143.151/api/',
});

export default api;
