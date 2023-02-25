<template>
  <div class="login-container">
    <div class="login-wrapper">
      <a-card class="login-card">
        <h1 class="login-title">Login</h1>
        <a-form ref="registerForm" :form="form" @submit="handleSubmit">
          <a-form-item
            label="First Name"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 14 }"
          >
            <a-input v-model="form.firstName" />
          </a-form-item>
          <a-form-item
            label="Last Name"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 14 }"
          >
            <a-input v-model="form.lastName" />
          </a-form-item>
          <a-form-item
            label="Username"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 14 }"
          >
            <a-input v-model="form.username" />
          </a-form-item>
          <a-form-item
            label="Password"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 14 }"
          >
            <a-input-password v-model="form.password" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
            <a-button type="primary" @click="handleSubmit()">Register</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
    }
  },
  methods: {
    async handleSubmit() {
      const api = `/register`
      await this.$axios
        .post(api, this.form)
        .then((res) => {
          if (res.data.statusCode === 1) {
            this.$message.success(res.data.message)
            setTimeout(() => {
              this.$router.push('/login')
            }, 300)
          } else {
            this.$message.error('เกิดข้อผิดพลาด กรุณาลองใหม่')
          }
        })
        .catch(() => {
          this.$message.error('เกิดข้อผิดพลาด กรุณาลองใหม่')
        })
    },
  },
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
}

.login-card {
  width: 100%;
}

.login-title {
  text-align: center;
}

.login-button {
  width: 100%;
}
</style>
