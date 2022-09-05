import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestUtilConfig, RequestUtilInterceptors } from './types'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEFAULT_Loading = true

class RequestUtil {
  instance: AxiosInstance
  interceptors?: RequestUtilInterceptors
  showLoading?: boolean
  loading?: ILoadingInstance

  constructor(config: RequestUtilConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_Loading
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
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...'
          })
        }
        return res
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        this.loading?.close()
        // 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('请求错误')
        }
        return err
      }
    )
  }

  request<T>(config: RequestUtilConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = DEFAULT_Loading
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_Loading
          reject(err)
          return err
        })
    })
  }

  get<T>(config: RequestUtilConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: RequestUtilConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
}

export default RequestUtil
