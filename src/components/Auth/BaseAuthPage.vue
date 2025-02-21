<template>
  <div class="auth-container">
    <header class="auth-header">
      <h1 class="server-title">DeLiRiUm</h1>
    </header>
    <main class="auth-modal">
      <p class="welcome-message" lang="ru">
        <slot name="message" />
      </p>
      <slot />
    </main>
  </div>
</template>

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
  animation: fadeIn 1s ease-in-out;
}

.auth-modal {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(1rem, 3vw, 1.5625rem) clamp(1.5rem, 5vw, 3.125rem);
  background-color: var(--modal-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.625rem;
  width: 100%;
  max-width: 31.25rem;
  animation: slideUp 0.5s ease-in-out;
}

.welcome-message {
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 600;
  text-align: center;
  color: rgba(var(--text-color-rgb), 0.75);
  line-height: 1.5;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>