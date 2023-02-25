<template>
  <a-layout style="min-height: 100vh">
    <Header>
      <app-header />
    </Header>
    <a-layout>
      <a-layout-content id="content">
        <nuxt :style="styleContent" />
      </a-layout-content>
    </a-layout>
    <a-layout-footer id="footer">
      <App-Footer />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import AppHeader from '@/components/layouts/AppHeader.vue'
import AppFooter from '@/components/layouts/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      styleContent: {
        'margin-bottom': '0px',
      },
    }
  },
  mounted() {
    this.setContent()
  },
  methods: {
    setContent() {
      const height = document.getElementById('footer').clientHeight
      this.styleContent['margin-bottom'] = `calc(${height}px * 1.5)`
    },
  },
}
</script>
<style scoped>
#footer {
  height: 48px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  left: 0px;
  z-index: 1;
  background-color: #333;
  text-align: center;
}
#content {
  width: 100%;
  padding: 0;
}
</style>
