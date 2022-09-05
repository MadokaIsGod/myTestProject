import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'
import LocalCache from '@/utils/cache'
import router from '@/router'
import { IAccount } from '@/service/login/types'
import type { ILoginState } from './types'
import type { IRootState } from '../types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  actions: {
    async accountLogin({ commit }, payload: IAccount) {
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      LocalCache.setCache('token', token)

      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)

      const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)

      router.push('/main')
    },
    phoneLogin({ commit }, payload: any) {
      console.log('执行phoneLogin', payload)
    },
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache('token')
      const userInfo = LocalCache.getCache('userInfo')
      const userMenus = LocalCache.getCache('userMenus')
      if (token) {
        commit('changeToken', token)
      }
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  getters: {}
}

export default loginModule
