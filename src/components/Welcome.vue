<!-- src/components/Welcome.vue -->
<template>
  <div class="welcome-container">
    <img src="../assets/images/logo.png" alt="Infist Logo" class="logo">
    <h1 class="welcome-text">欢迎来到 infist 线上面试环节，期待你的加入！</h1>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.logo {
  width: 150px;
  margin-bottom: 2rem;
}

.welcome-text {
  font-size: 1.8rem;
  color: #333;
  max-width: 600px;
}
</style>