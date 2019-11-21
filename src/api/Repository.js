import router from '@/router/index';
import Axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_DOMAIN;

const repository = Axios.create({
    baseURL
});

repository.interceptors.response.use(
    response,
    err => {
        if (err.response) {
            if (err.response.status === 401 || err.response.status === 403) {
                router.push('/');
            }

            return Promise.reject(err);
        }

        
    });

export default repository;
