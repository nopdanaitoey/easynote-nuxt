export default function ({ $axios, store }) {
  // Add a request interceptor
  $axios.interceptors.request.use((config) => {
    const token = localStorage.token
    if (token) {
      const auth = 'Authorization'
      config.headers.common[`${auth}`] = `Bearer ${token}`
    }
    return config
  })
}

// export default function ({ $axios, $auth, redirect, store }) {
//   $axios.onRequest((config) => {
//     const token = localStorage.token
//     config.headers = {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Authorization: `Bearer ${token}`, // refers to nuxt.config.js->auth.token
//     }
//   })
// }
