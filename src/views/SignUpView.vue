<template>
  <base-auth-page>
    <template #message>
      Добро пожаловать!<br>Вам необходимо зарегистрироваться
    </template>
    <sign-up-form @submit="handleSignUp" />
  </base-auth-page>
</template>

<script>
import BaseAuthPage from '@/components/Auth/BaseAuthPage.vue';
import SignUpForm from '@/components/Auth/SignUpForm.vue';

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