<template>
  <base-auth-page>
    <template #message>
      Добро пожаловать!<br>Вам необходимо авторизоваться
    </template>
    <login-form @submit="handleLogin" />
  </base-auth-page>
</template>

<script>
import BaseAuthPage from '@/components/Auth/BaseAuthPage.vue';
import LoginForm from '@/components/Auth/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: { BaseAuthPage, LoginForm },
  methods: {
    handleLogin(formData) {
      localStorage.setItem('userSession', 'true');
      this.$router.push('/select-character');
    },
  },
};
</script>