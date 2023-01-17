<template>
  <div class="login-page">
    <div class="main-container">
      <div class="switch-buttons">
        <div class="button-registration" v-on:click="changeLogin('registration')"><p>РЕГИСТРАЦИЯ</p></div>
        <div class="button-auth" v-on:click="changeLogin('auth')"><p>АВТОРИЗАЦИЯ</p></div>
      </div>
      <registration-user v-if="loginType === 'registration'"/>
      <auth-user v-if="loginType === 'auth'" />
    </div>
    <div class="image-container">
      <img alt="background" src="../../../assets/img/backgrounds/zombie_background.jpg" />
    </div>
  </div>
  <recovery-password v-if="loginType === 'recovery'"></recovery-password>
</template>

<script>
import registrationUser from "@/components/pages/LoginPage/registrationUser";
import authUser from "@/components/pages/LoginPage/authUser";
import RecoveryPassword from "@/components/pages/LoginPage/recoveryPassword";
export default {
  name: "LoginPage",
  components: {
    RecoveryPassword,
    registrationUser,
    authUser
  },
  data() {
    return {
      loginType: 'auth'
    }
  },
  methods: {
    changeLogin: function (value) {
      this.loginType = value;
    }
  }
}
</script>

<style scoped>

</style>
