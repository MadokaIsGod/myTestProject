<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div>
      <el-tabs type="border-card" stretch v-model="tabName">
        <el-tab-pane name="account">
          <template #label>
            <span>
              <i class="el-icon-user-solid"></i>
              账号登录
            </span>
          </template>
          <login-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span>
              <i class="el-icon-mobile-phone"></i>
              手机登录
            </span>
          </template>
          <login-phone ref="phoneRef" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="account-control">
      <el-checkbox v-model="isKeyPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-button" type="primary" @click="handleLoginClick">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElTabs, ElTabPane, ElCheckbox, ElLink } from 'element-plus'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    ElTabs,
    ElTabPane,
    LoginAccount,
    LoginPhone,
    ElCheckbox,
    ElLink
  },
  setup() {
    const isKeyPassword = ref(true)
    const tabName = ref('account')
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    const handleLoginClick = () => {
      console.log('立即登录', tabName.value)
      tabName.value === 'account'
        ? accountRef.value?.loginAction(isKeyPassword.value)
        : phoneRef.value?.loginAction(isKeyPassword.value)
    }

    return {
      isKeyPassword,
      handleLoginClick,
      accountRef,
      phoneRef,
      tabName
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;
  .title {
    text-align: center;
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-button {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
