import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { optionsApi, AUTH_TYPES  } from './types'
import get from 'lodash-es/get'

export const IS_CLIENT = typeof window !== "undefined";

export class ApiService {
  axiosInstance: AxiosInstance;

  constructor(baseUrl?: string) {
    // init axios instance
    this.axiosInstance = this.setupInterceptors(
      axios.create({
        baseURL: baseUrl || process.env.NEXT_PUBLIC_BASE_API,
        headers: this.getHeaders(),
      })
    );
  }

  // FETCH METHODS
  async get<T>({
    endpoint,
    params = {},
    options = {},
  }: {
    endpoint: string;
    params?: object;
    options?: optionsApi;
  }): Promise<T> {
    try {
      const customUrl = get(options, 'customUrl', '')
      if (customUrl) {
        this.axiosInstance.defaults.baseURL = customUrl;
      }

      return await this.axiosInstance.get(endpoint, { params });
    } catch (error) {
      throw error;
    }
  }

  async post<T>({
    endpoint,
    params = {},
    options = {},
  }: {
    endpoint: string;
    params?: object;
    options?: optionsApi;
  }): Promise<T> {
    try {
      const customUrl = get(options, 'customUrl', '')
      if (customUrl) {
        this.axiosInstance.defaults.baseURL = customUrl;
      }

      return await this.axiosInstance.post(endpoint, params);
    } catch (error) {
      throw error;
    }
  }

  async put<T>({
    endpoint,
    params = {},
    options = {},
  }: {
    endpoint: string;
    params?: object;
    options?: optionsApi;
  }): Promise<T> {
    const customUrl = get(options, 'customUrl', '')
    if (customUrl) {
      this.axiosInstance.defaults.baseURL = customUrl;
    }

    return await this.axiosInstance.put(endpoint, params);
  }

  async delete<T>({
    endpoint,
    params = {},
    options = {},
  }: {
    endpoint: string;
    params?: object;
    options?: optionsApi;
  }): Promise<T> {
    const customUrl = get(options, 'customUrl', '')
    if (customUrl) {
      this.axiosInstance.defaults.baseURL = customUrl;
    }

    return await this.axiosInstance.delete(endpoint, { params });
  }

  storeAuthKey(code: string) {
    if (!IS_CLIENT) return;
    localStorage.setItem(AUTH_TYPES.BASE_JWT, code);
  }

  getAuthKey(type: AUTH_TYPES) {
    try {
      const localItem = localStorage.getItem(type)
      if (IS_CLIENT && localItem) {
        return localItem
      }
      return ''
    } catch (error) {
      console.log("Internal error: ", error)
      return ''
    }
  }

  getHeaders() {
    const onChainSignature = this.getAuthKey(AUTH_TYPES.ON_CHAIN_SIGNATURE);
    return {
      Authorization: "Bearer " + this.getAuthKey(AUTH_TYPES.BASE_JWT),
      Source: "C98ADMNSGWE",
      Accept: "application/json",
      signature: "C98",
      version: "1",
      ...(onChainSignature && {
        onChainSignature,
      }),
    };
  }

  // HELPERS FUNCTIONS
  objectToSearchParams(params: object = {}) {
    const urlSearchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value && Array.isArray(value)) {
        value.forEach((item) => item && urlSearchParams.append(key, item));
      } else if (value) {
        urlSearchParams.append(key, value);
      }
    });

    return urlSearchParams.toString();
  }

  getErrorMessage(err: unknown) {
    return get(err, 'response.data.data.errMess', "Internal Error");
  }

  setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(
      this.onRequest,
      this.onErrorResponse
    );
    axiosInstance.interceptors.response.use(
      this.onResponse,
      this.onErrorResponse
    );
    return axiosInstance;
  }

  onRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    return config;
  }

  onResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  onErrorResponse(error: AxiosError | Error): Promise<AxiosError> {
    console.log("error axios: ", error);
    return Promise.reject(
      get(error, 'response.data.data.errMess', '')
       || get(error, 'response.data.message', '')
       ||  "Internal Error"
    );
  }
}
