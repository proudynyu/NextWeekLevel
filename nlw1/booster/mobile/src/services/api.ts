import axios from 'axios';

const api = axios.create({
    baseURL: '192.168.0.60:3333'
});

export default api;