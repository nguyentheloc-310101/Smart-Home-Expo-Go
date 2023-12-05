import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  req.headers['Content-Type'] = 'application/json';
  return req;
});

export const setFan = (value) => API.post('/api/data/setFan', value);

export const setLight = (value) => API.post('/api/data/toggleLed', value);

export const getFan = () => API.get('/api/data/dataFan');

export const getLed = () => API.get('/api/data/dataLed');
