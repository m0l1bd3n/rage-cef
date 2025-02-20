<template>
  <base-auth-page>
    <template #message>
      m0l1bd3n, Добро пожаловать!<br>Вам необходимо зарегистрироваться
    </template>
    <sign-up-form @submit="handleSignUp" />
  </base-auth-page>
</template>

<script>
import BaseAuthPage from '@/components/UI/BaseAuthPage.vue';
import SignUpForm from '@/components/UI/SignUpForm.vue';

export default {
  name: 'SignUpPage',
  components: { BaseAuthPage, SignUpForm },
  methods: {
    handleSignUp(formData) {
      localStorage.setItem('hasLoggedIn', 'true');
      this.$router.push('/login');
    },
  },
};
</script>