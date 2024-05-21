import { ofetch } from 'ofetch';

const OFetchInstance = ofetch.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        Accept: 'application/json',
    },
});

export default OFetchInstance;
