import axios from "axios";

export const BASE_URL = "http://localhost:3000";
const $api = axios.create({ baseURL: BASE_URL, withCredentials: true });

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default $api