import axios from "axios";


export const baseURL = import.meta.env.VITE_API_BASE_URL;


export const api = axios.create({
    baseURL,
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");
        if (token) {
            config.headers.Authorization = `JWT ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)


