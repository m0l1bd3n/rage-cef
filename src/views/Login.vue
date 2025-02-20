<template>
  <div class="auth-container">
    <header class="auth-header">
      <h1 class="server-title">ARCHWAY</h1>
    </header>
    <main class="auth-modal">
      <p class="welcome-message" lang="ru">
        m0l1bd3n, Добро пожаловать!<br>
        Ваш аккаунт зарегистрирован
      </p>
      <login-form @submit="handleLogin" />
    </main>
  </div>
</template>

<script>
import LoginForm from '@/components/UI/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: { LoginForm },
  methods: {
    handleLogin(formData) {
      // Замените на реальную логику авторизации
      localStorage.setItem('userSession', 'true');
      this.$router.push('/select-character');
    }
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: clamp(0.625rem, 2vw, 1.25rem);
}

.auth-header {
  margin-bottom: 1.5625rem;
}

.server-title {
  font-family: 'Archway', sans-serif;
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 400;
  text-align: center;
}

.auth-modal {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(1rem, 3vw, 1.5625rem) clamp(1.5rem, 5vw, 3.125rem);
  background-color: #101010;
  border: 1px solid #1b1b1b;
  border-radius: 0.625rem;
  width: 100%;
  max-width: 31.25rem;
}

.welcome-message {
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 600;
  text-align: center;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
}
</style>