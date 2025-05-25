<!-- src/App.vue -->
<template>
  <div class="app-container">
    <router-view 
      :userData="userData"
      @update-user-data="updateUserData"
    ></router-view>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  data() {
    return {
      userData: {
        githubId: '',
        email: '',
        repoUrl: '',
        vercelUrl: ''
      },
      supabase: null
    }
  },
  methods: {
    updateUserData(data) {
      this.userData = { ...this.userData, ...data }
    }
  },
  created() {
    // 初始化 Supabase 客户端
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
    this.supabase = createClient(supabaseUrl, supabaseKey)
  },
  mounted() {
    const router = useRouter()
    // 如果当前路径是 '/welcome' 或 '/'，2秒后跳转到 Interview 页面
    if (this.$route.path === '/' || this.$route.path === '/welcome') {
      setTimeout(() => {
        router.push('/interview')
      }, 2000)
    }
  }
}
</script>

<style>
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;
  padding: 1rem;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .app-container {
    padding: 0.5rem;
    align-items: center;
  }
}
</style>