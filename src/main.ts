import { createApp } from 'vue'
import { registerApp } from './global'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import request from './service'

const app = createApp(App)

// request.request({
//   url: '/home/multidata',
//   method: 'GET'
// })

registerApp(app)
app.use(router)
app.use(store)
setupStore()
app.mount('#app')
