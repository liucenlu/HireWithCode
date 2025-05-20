<!-- src/components/AcceptChallenge.vue -->
<template>
  <div class="accept-challenge-container">
    <h1>接受挑战</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="githubId">GitHub ID:</label>
        <input 
          type="text" 
          id="githubId" 
          v-model="form.githubId" 
          required
          placeholder="请输入你的 GitHub ID"
        >
      </div>
      
      <div class="form-group">
        <label for="email">电子邮箱:</label>
        <input 
          type="email" 
          id="email" 
          v-model="form.email" 
          required
          placeholder="请输入你的电子邮箱"
        >
      </div>
      
      <button 
        type="submit" 
        class="submit-button" 
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? '提交中...' : '接受挑战' }}
      </button>
      
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

export default {
  name: 'AcceptChallenge',
  props: ['userData'],
  data() {
    return {
      form: {
        githubId: this.userData.githubId || '',
        email: this.userData.email || ''
      },
      isSubmitting: false,
      error: null,
      supabase: null
    }
  },
  created() {
    // 初始化 Supabase 客户端
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
    this.supabase = createClient(supabaseUrl, supabaseKey)
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true
      this.error = null
      
      try {
        // 验证表单
        if (!this.form.githubId.trim() || !this.form.email.trim()) {
          throw new Error('所有字段都是必填的')
        }
        
        // 更新用户数据
        this.$emit('update-user-data', {
          githubId: this.form.githubId,
          email: this.form.email
        })
        
        // 提交到 Supabase
        const { data, error } = await this.supabase
          .from('candidates')
          .insert([
            { 
              github_id: this.form.githubId, 
              email: this.form.email,
              status: 'accepted'
            }
          ])
          .select()
        
        if (error) throw error
        
        // 进入下一步
        this.$emit('next-step')
      } catch (err) {
        this.error = err.message || '提交失败，请稍后重试'
        console.error('Error submitting form:', err)
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
.accept-challenge-container {
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%; /* 或设置一个具体值，如 800px */
  max-width: 1200px; /* 限制最大宽度 */
  margin: 0 auto; /* 居中显示 */
}

/* PC端样式 */
@media (min-width: 768px) {
  .accept-challenge-container {
    max-width: 600px;
  }
}

/* 移动端样式 */
@media (max-width: 767px) {
  .accept-challenge-container {
    width: 90%;
    max-width: 100%; /* 防止超出屏幕宽度 */
  }
}

h1 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.submit-button {
  width: 100%;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover:not(:disabled) {
  background-color: #2980b9;
}

.submit-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
}
</style>