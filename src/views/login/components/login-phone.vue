<template>
  <div class="login-phone">
    <el-form label-position="left" label-width="auto" :model="phone" ref="ref">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'

export default defineComponent({
  setup() {
    const store = useStore()

    const phone = reactive({
      number: '',
      code: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeyPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('手机验证通过')
          store.dispatch('login/phoneLoginAction', { ...phone })
        }
      })
    }

    return {
      phone,
      loginAction
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}
.get-btn {
  margin-left: 8px;
}
</style>
