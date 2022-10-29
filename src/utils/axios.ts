import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const initAxios = (): AxiosInstance => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('axios', axios);
  const instance = axios.create(config);

  instance.interceptors.request.use(function (error) {
    return Promise.reject(error);
  });
  return instance;
};
