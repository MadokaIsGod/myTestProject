import { createApp } from 'vue'
import { registerApp } from './global'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './service'

const app = createApp(App)

request.request({
  url: '/home/multidata',
  method: 'GET'
})

registerApp(app)
app.use(router)
app.use(store)
app.mount('#app')
