import axios from 'axios'

// axios 配置
axios.defaults.baseURL = 'http://123.207.32.32:8000'
axios.defaults.timeout = 30000

axios.get('/home/multidata').then((res) => {
  console.log(res)
})
