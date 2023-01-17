<template>
  <div class="form recovery-form">
    <span class="title-block">Восстановление пароля</span>
    <div class="input-block">
      <div class="icon-block">
        <img alt="login" src="../../../assets/img/icons/icon_login.svg"/>
      </div>
      <div class="value-block">
        <label>Введите логин/Email</label>
        <input type="text" placeholder="Vanyasha" value=""/>
      </div>
    </div>
    <span class="sub-title_block">На ваш E-mail будет отправлено письмо содержащее новый пароль от аккаунта</span>
    <div class="button-confirm"><p>СБРОСИТЬ ПАРОЛЬ</p></div>
  </div>
</template>

<script>
export default {
  name: "RecoveryPassword"
}
</script>

<style scoped>

</style>
