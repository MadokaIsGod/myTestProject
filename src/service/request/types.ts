import type {  AxiosRequestConfig, AxiosResponse } from 'axios'
export interface RequestUtilInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (err: any) => any
}

export interface RequestUtilConfig extends AxiosRequestConfig {
  interceptors?: RequestUtilInterceptors
}
