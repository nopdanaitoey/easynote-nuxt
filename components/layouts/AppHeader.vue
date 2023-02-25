<template>
  <div>
    <ul>
      <li>Easy Note</li>
      <li class="logout-button">
        <a-button @click="handdleLogout"> Logout </a-button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },

  methods: {
    async handdleLogout() {
      try {
        localStorage.removeItem('token')
        await this.$auth.logout()
        this.$router.push('/login')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 15px;
}

li :hover {
  background-color: #111;
}

li.logout-button {
  float: right;
}
</style>
