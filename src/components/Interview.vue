<!-- src/components/Interview.vue -->
<template>
  <div class="interview-container">
    <div class="markdown-content" v-html="renderedContent"></div>
    <button class="next-button" @click="goToAcceptChallenge">下一步</button>
  </div>
</template>

<script>
import { marked } from 'marked'

export default {
  name: 'Interview',
  data() {
    return {
      markdownContent: `
# HireWithCode - 面试者挑战项目

欢迎来到 \`HireWithCode\` 项目！这是一个专为技术面试者设计的真实项目挑战。目前，这个仓库刚刚起步，没有任何代码——只有待实现的功能（TODOs）。你的任务是将这些TODOs转变为实际的代码，提交你的Pull Request（PR）就是你面试的一部分挑战。

## 产品功能 TODOs
产品是一个 Web 网站（PC端、移动端兼容），分为 4 个步骤的页面：
- [ ] **欢迎语**：Logo + 一句话欢迎语（垂直水平居中，2 秒后自动进入下一页 *面试引导*）\`欢迎来到 infist 线上面试环节，期待你的加入！\` [logo](src\\assets\\images\\logo.png) 
- [ ] **面试引导**：介绍面试的流程和说明（Markdown 文案展示，需要渲染为富文本样式）[页面文案 markdown](https://raw.githubusercontent.com/InfiniteStatesInc/HireWithCode/refs/heads/main/README.md)
- [ ] **接受挑战**：表单，\`input\`(用户输入自己的 github id) 、\`input\`(邮箱)、\`submit button\`(接受挑战)
- [ ] **完成挑战**：表单，\`input\`(github 仓库 url)、\`input\`([Vercel](https://vercel.app/) 在线体验地址)、\`submit button\`(提交作品)

## 如何参与？

1. 克隆仓库到你的本地机器。
2. 按照你对这个产品的理解，自行开发 TODO
4. 确保你的代码是可以运行的
5. 完成挑战后，通过Pull Request将你的代码提交给我们。
6. 在PR中附上你的Vercel在线体验链接。

> 备注说明：
> 这个项目的步骤 3、4 是是需要服务端能力的（API + 数据库），如果你不具备全栈的经验，可以考虑使用 [supabase](https://supabase.com/) 作为本项目的服务端（或者仅仅实现前端静态网页）

我们会审查每一个PR，并以此作为面试的一部分。我们期待看到你的创意和技术实力！

祝你好运！
      `
    }
  },
  computed: {
    renderedContent() {
      return marked(this.markdownContent)
    }
  },
  methods: {
    goToAcceptChallenge() {
      this.$router.push('/accept-challenge')
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