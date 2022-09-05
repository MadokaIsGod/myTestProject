import { createStore } from 'vuex'
import login from './login/login'
import type { IRootState } from './types'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'haha',
      age: 12
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export default store
