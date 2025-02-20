<template>
  <div
      class="intro-container"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
      @keydown.space="navigateToSignUp"
      tabindex="0"
  >
    <div class="intro-content">
      <div class="server-title">DeLiRiUm</div>
      <div class="bottom-text">
        <p class="space-prompt">
          Нажмите <span>SPACE</span> для продолжения
        </p>
        <p class="disclaimer">
          Archway.GG не связан и не одобрен Rockstar North, Take-Two Interactive
          или другими правообладателями. Любые используемые товарные знаки
          принадлежат их соответствующим владельцам.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import backgroundImage from '@/assets/images/background.jpeg';

// Простая реализация debounce
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default {
  name: 'Intro',
  data() {
    return {
      backgroundImage
    };
  },
  methods: {
    checkSession() {
      // Пример: получаем данные от alt:V или localStorage
      const hasSession = localStorage.getItem('userSession'); // Замените на реальную проверку
      const isFirstLogin = !localStorage.getItem('hasLoggedIn'); // Пример флага первого входа

      if (hasSession) {
        this.$router.push('/select-character');
      } else if (isFirstLogin) {
        this.$router.push('/sign-up');
      } else {
        this.$router.push('/login');
      }
    },
    navigateToSignUp: debounce(function() {
      this.checkSession();
    }, 200)
  }
};
</script>

<style scoped>
.intro-container {
  height: 100vh;
  display: flex;
  background: no-repeat center/cover;
}

.intro-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.server-title {
  font-family: 'Archway', sans-serif;
  font-size: clamp(64px, 10vw, 128px);
  font-weight: 400;
  animation: fadeIn 2s ease-in-out;
}

.bottom-text {
  position: absolute;
  bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.space-prompt {
  font-size: 32px;
  font-weight: 600;
  animation: bounce 2s infinite alternate;
}

.space-prompt span {
  background-color: white;
  color: #000;
  padding: 0 15px;
  border-radius: 15px;
}

.disclaimer {
  width: min(700px, 90vw);
  color: rgba(255, 255, 255, 0.75);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-15px);
  }
}
</style>