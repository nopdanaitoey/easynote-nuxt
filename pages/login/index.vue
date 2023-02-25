<template>
  <div class="login-container">
    <div class="login-wrapper">
      <a-card class="login-card">
        <h1 class="login-title">Login</h1>
        <a-form :form="form" @submit.prevent="onSubmit">
          <a-form-item :label="'Email'" :colon="false">
            <a-input v-model="form.username" placeholder="username" />
          </a-form-item>
          <a-form-item :label="'Password'" :colon="false">
            <a-input
              v-model="form.password"
              type="password"
              placeholder="Password"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              class="login-button"
              @click="onSubmit(form)"
              >Login</a-button
            >
            <a-button type="primary" html-type="submit" class="login-button">
              <NuxtLink to="/register">Register</NuxtLink></a-button
            >
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
    onSubmit(v) {
      this.$auth
        .loginWith('local', {
          data: v,
        })
        .then((res) => {
          localStorage.setItem('token', res.data.token)

          setTimeout(() => {
            this.$router.push('/')
          }, 300)
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
