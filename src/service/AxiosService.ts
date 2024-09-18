import axios from 'axios';

export class AxiosService {
    getInstance()
    {
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:4000/api'
        });

        axiosInstance.interceptors.request.use((config) => {
            const accessToken = localStorage.getItem('ACCESS_TOKEN');

            if(accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }

            return config;
        });

        axiosInstance.interceptors.response.use((response) => {
            return response;
        }, async (erro) => {
            if(erro?.response?.status == 401){
                localStorage.removeItem('ACCESS_TOKEN');
                window.location.reload();
            }

            return Promise.reject(erro);
        });

        return axiosInstance;
    }
} 