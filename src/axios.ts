import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'http://admin.aist.abetadev.beget.tech/api',
    headers: {
        Accept: 'application/json',
    },
});

export default AxiosInstance;
