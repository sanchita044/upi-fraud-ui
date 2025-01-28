import axios from "axios";

//export const BASE_URL = 'http://127.0.0.1:8000';
export const BASE_URL = 'https://upi-fraud-app-production.up.railway.app';

export const Axios = axios.create({
    baseURL: BASE_URL
});