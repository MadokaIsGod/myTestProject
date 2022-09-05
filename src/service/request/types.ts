import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface RequestUtilInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface RequestUtilConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: RequestUtilInterceptors<T>
  showLoading?: boolean
}
