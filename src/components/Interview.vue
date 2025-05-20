<!-- src/components/Interview.vue -->
<template>
  <div class="interview-container">
    <div class="markdown-content" v-html="renderedContent"></div>
    <button class="next-button" @click="$emit('next-step')">下一步</button>
  </div>
</template>

<script>
import { marked } from 'marked'

export default {
  name: 'Interview',
  data() {
    return {
      markdownContent: `
# 面试流程说明

## 欢迎参加 infist 技术面试挑战

在这个环节中，你将完成以下任务：

1. **创建个人账号**：在下一步中提供你的 GitHub ID 和电子邮箱
2. **接受编码挑战**：完成一个小型 Web 应用程序
3. **提交你的作品**：分享你的 GitHub 仓库和 Vercel 部署链接

## 评估标准

我们将从以下几个方面评估你的表现：

* 代码质量和组织结构
* 功能完整性
* UI/UX 设计
* 响应式设计（移动端适配）

## 时间安排

该挑战没有严格的时间限制，但我们建议你在收到挑战后的 7 天内完成提交。

**准备好了吗？点击"下一步"按钮继续！**
      `
    }
  },
  computed: {
    renderedContent() {
      return marked(this.markdownContent)
    }
  }
}
</script>

<style scoped>
.interview-container {
  max-width: 800px;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.markdown-content {
  margin-bottom: 2rem;
}

.markdown-content :deep(h1) {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.markdown-content :deep(h2) {
  color: #3498db;
  margin: 1.5rem 0 1rem;
}

.markdown-content :deep(ul) {
  padding-left: 1.5rem;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5rem;
}

.next-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.next-button:hover {
  background-color: #2980b9;
}
</style>