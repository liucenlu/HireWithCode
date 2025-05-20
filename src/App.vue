<!-- src/App.vue -->
<template>
  <div class="app-container">
    <component 
      :is="currentComponent" 
      @next-step="nextStep" 
      @update-user-data="updateUserData"
      :userData="userData"
    ></component>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'
import Welcome from './components/Welcome.vue'
import Interview from './components/Interview.vue'
import AcceptChallenge from './components/AcceptChallenge.vue'
import CompleteChallenge from './components/CompleteChallenge.vue'

export default {
  name: 'App',
  components: {
    Welcome,
    Interview,
    AcceptChallenge,
    CompleteChallenge
  },
  data() {
    return {
      currentStep: 1,
      userData: {
        githubId: '',
        email: '',
        repoUrl: '',
        vercelUrl: ''
      },
      supabase: null
    }
  },
  computed: {
    currentComponent() {
      switch (this.currentStep) {
        case 1: return 'Welcome'
        case 2: return 'Interview'
        case 3: return 'AcceptChallenge'
        case 4: return 'CompleteChallenge'
        default: return 'Welcome'
      }
    }
  },
  methods: {
    nextStep() {
      this.currentStep++
    },
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
    // 欢迎页面2秒后自动进入下一页
    if (this.currentStep === 1) {
      setTimeout(() => {
        this.nextStep()
      }, 2000)
    }
  }
}
</script>

<style>
.app-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;
}
</style>