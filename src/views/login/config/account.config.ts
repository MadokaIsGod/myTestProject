export const rules = {
  name: [
    {
      required: true,
      message: '*请输入用户账号',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9A-Z]{5,10}$/,
      message: '*用户账号必须是5-10个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '*请输入用户密码',
      trigger: 'blur'
    },
    {
      pattern: /[a-z0-9A-Z]{6,}$/,
      message: '*用户密码必须是6个字母或数字以上',
      trigger: 'blur'
    }
  ]
}
