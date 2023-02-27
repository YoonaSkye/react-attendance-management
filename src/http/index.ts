import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

const instnce = axios.create({
  baseURL: 'http://api.h5ke.top',
  timeout: 5000,
});

// Add a request interceptor
instnce.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instnce.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

interface Data {
  [index: string]: unknown;
}

interface Http {
  get: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  post: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  put: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  patch: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  delete: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
}

const http: Http = {
  get(url, data, config) {
    return instnce.get(url, {
      params: data,
      ...config,
    });
  },
  post(url, data, config) {
    return instnce.post(url, data, config);
  },
  put(url, data, config) {
    return instnce.put(url, data, config);
  },
  patch(url, data, config) {
    return instnce.patch(url, data, config);
  },
  delete(url, data, config) {
    return instnce.delete(url, {
      data,
      ...config,
    });
  },
};

export default http;
