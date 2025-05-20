<!-- src/components/CompleteChallenge.vue -->
<template>
  <div class="complete-challenge-container">
    <h1>提交作品</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="repoUrl">GitHub 仓库 URL:</label>
        <input 
          type="url" 
          id="repoUrl" 
          v-model="form.repoUrl" 
          required
          placeholder="https://github.com/username/repo"
        >
      </div>
      
      <div class="form-group">
        <label for="vercelUrl">Vercel 在线体验地址:</label>
        <input 
          type="url" 
          id="vercelUrl" 
          v-model="form.vercelUrl" 
          required
          placeholder="https://your-project.vercel.app"
        >
      </div>
      
      <button 
        type="submit" 
        class="submit-button" 
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? '提交中...' : '提交作品' }}
      </button>
      
      <p v-if="error" class="error-message">{{ error }}</p>
      <p v-if="success" class="success-message">{{ success }}</p>
    </form>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

export default {
  name: 'CompleteChallenge',
  props: ['userData'],
  data() {
    return {
      form: {
        repoUrl: this.userData.repoUrl || '',
        vercelUrl: this.userData.vercelUrl || ''
      },
      isSubmitting: false,
      error: null,
      success: null,
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
      this.success = null
      
      try {
        // 验证表单
        if (!this.form.repoUrl.trim() || !this.form.vercelUrl.trim()) {
          throw new Error('所有字段都是必填的')
        }
        
        // 验证 URL 格式
        if (!this.isValidUrl(this.form.repoUrl) || !this.isValidUrl(this.form.vercelUrl)) {
          throw new Error('请输入有效的 URL')
        }
        
        // 更新用户数据
        this.$emit('update-user-data', {
          repoUrl: this.form.repoUrl,
          vercelUrl: this.form.vercelUrl
        })
        
        // 提交到 Supabase
        const { data, error } = await this.supabase
          .from('submissions')
          .insert([
            { 
              github_id: this.userData.githubId,
              email: this.userData.email,
              repo_url: this.form.repoUrl,
              vercel_url: this.form.vercelUrl,
              status: 'submitted'
            }
          ])
          .select()
        
        if (error) throw error
        
        this.success = '恭喜！你的作品已成功提交，我们将尽快进行评审。'
      } catch (err) {
        this.error = err.message || '提交失败，请稍后重试'
        console.error('Error submitting form:', err)
      } finally {
        this.isSubmitting = false
      }
    },
    
    isValidUrl(string) {
      try {
        new URL(string)
        return true
      } catch (_) {
        return false
      }
    }
  }
}
</script>

<style scoped>
.complete-challenge-container {
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
  .complete-challenge-container {
    max-width: 600px;
  }
}

/* 移动端样式 */
@media (max-width: 767px) {
  .complete-challenge-container {
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

.success-message {
  color: #2ecc71;
  margin-top: 1rem;
  text-align: center;
  font-weight: bold;
}
</style>