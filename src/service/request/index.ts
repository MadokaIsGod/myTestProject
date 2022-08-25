import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestUtilConfig, RequestUtilInterceptors } from './types'

class RequestUtil {
  instance: AxiosInstance
  interceptors?: RequestUtilInterceptors

  constructor(config: RequestUtilConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (res) => {
        console.log('所有实例：请求拦截成功')
        return res
      },
      (err) => {
        console.log('所有实例：请求拦截失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例：响应拦截成功')
        return res
      },
      (err) => {
        console.log('所有实例：响应拦截失败')
        return err
      }
    )
  }



  request(config: RequestUtilConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}

export default RequestUtil
