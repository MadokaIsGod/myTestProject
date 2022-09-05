import requestUtils from '../index'
import { IAccount, IDataType, ILoginResult } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return requestUtils.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: {
      ...account
    }
  })
}

export function requestUserInfoById(id: number) {
  return requestUtils.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenuByRoleId(id: number) {
  return requestUtils.get<IDataType>({
    url: `${LoginAPI.UserMenus}${id}/menu`,
    showLoading: false
  })
}
