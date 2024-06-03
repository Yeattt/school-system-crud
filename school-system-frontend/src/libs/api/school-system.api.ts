import axios from 'axios';

const API_URL: string = import.meta.env.VITE_API_URL;

const schoolSystemApi = axios.create({
  baseURL: API_URL,
});

export default schoolSystemApi;
