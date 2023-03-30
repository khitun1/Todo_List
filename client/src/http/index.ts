import axios from "axios";
import type {AxiosInstance} from "axios";

const host: AxiosInstance = axios.create({
    baseURL: 'http://localhost:7000/api/',
});

const firstHost: AxiosInstance = axios.create({
    baseURL: 'http://localhost:7000/api/',
});

const interceptor = (config: any)=> {
    config.headers.authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
}

host.interceptors.request.use(interceptor);

export {
    host,
    firstHost,
}