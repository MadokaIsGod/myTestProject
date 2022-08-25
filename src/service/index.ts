// service 统一出口
import requestUtils from './request'
import { BASE_URL, TIME_OUT } from './request/config'

export default new requestUtils({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch(err) {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor(config) {
      console.log('响应成功的拦截')
      return config
    },
    responseInterceptorCatch(err) {
      console.log('响应失败的拦截')
      return err
    }
  }
})
