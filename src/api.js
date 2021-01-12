import axios from 'axios';


const BASE_URL = `http://catalog.iziway.ru/`;
// const BASE_URL = `http://localhost:31337`;
const REQUEST_TIMEOUT = 0;


const createApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};


export { createApi };
