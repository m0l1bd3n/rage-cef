<template>
  <base-auth-page>
    <template #message>
      m0l1bd3n, Добро пожаловать!<br>Ваш аккаунт зарегистрирован
    </template>
    <login-form @submit="handleLogin" />
  </base-auth-page>
</template>

<script>
import BaseAuthPage from '@/components/UI/BaseAuthPage.vue';
import LoginForm from '@/components/UI/LoginForm.vue';

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