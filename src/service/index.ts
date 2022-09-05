// service 统一出口
import requestUtils from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localcatch from '@/utils/cache'

const request = new requestUtils({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      const token = localcatch.getCache('token')
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch(err) {
      return err
    },
    responseInterceptor(config) {
      return config
    },
    responseInterceptorCatch(err) {
      return err
    }
  }
})

export default request
