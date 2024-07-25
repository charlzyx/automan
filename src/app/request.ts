import { notification } from "antd";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export type { AxiosRequestConfig } from "axios";
export const AuthHeader = {
  kv: {
    token: "",
  },
  check() {
    return Boolean(AuthHeader.kv.token);
  },
};

const base = axios.create({
  baseURL: "/api",
  headers: {
    ...AuthHeader.kv,
  },
});

base.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    if (!config.ignoreAuthHeader && !AuthHeader.check()) {
      window.location.href = "/login";
      return Promise.reject("401");
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

base.interceptors.response.use(
  (resp) => {
    if (resp.config.rawResponse) {
      return resp;
    }
    // 2xx 范围内的状态码都会触发该函数。
    return resp.data?.data ?? resp.data;
  },
  (error: AxiosError) => {
    if (error.config?.silentOnError) {
      return Promise.reject(error);
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    notification.error({
      message: `请求出错啦! ${error.config?.method}->${error.config?.url}\n ${error.message}`,
    });
    return Promise.reject(error);
  },
);

export const request = {
  request<T>(...params: Parameters<typeof base.request>): Promise<T> {
    return base.request(...params);
  },
  head<T>(...params: Parameters<typeof base.head>): Promise<T> {
    return base.head(...params);
  },
  options<T>(...params: Parameters<typeof base.options>): Promise<T> {
    return base.options(...params);
  },
  get<T>(...params: Parameters<typeof base.get>): Promise<T> {
    return base.get(...params);
  },
  put<T>(...params: Parameters<typeof base.put>): Promise<T> {
    return base.put(...params);
  },
  delete<T>(...params: Parameters<typeof base.delete>): Promise<T> {
    return base.delete(...params);
  },
  patch<T>(...params: Parameters<typeof base.patch>): Promise<T> {
    return base.patch(...params);
  },
  post<T>(...params: Parameters<typeof base.post>): Promise<T> {
    return base.post(...params);
  },
};
