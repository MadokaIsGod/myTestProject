interface IAccount {
  name: string
  password: string
}

interface IDataType<T = any> {
  code: number
  data: T
}

interface ILoginResult {
  token: string
  id: number
}

export { IAccount, IDataType, ILoginResult }
