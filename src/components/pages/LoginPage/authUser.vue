<template>
  <div class="form form-auth">
    <div class="input-block">
      <div class="icon-block">
        <img alt="login" src="../../../assets/img/icons/icon_login.svg" />
      </div>
      <div class="value-block">
        <label>Введите логин</label>
        <input type="text" placeholder="Vanyasha" value="" />
      </div>
    </div>

    <div class="input-block">
      <div class="icon-block">
        <img alt="login" src="../../../assets/img/icons/icon_password.svg" />
      </div>
      <div class="value-block">
        <label>Введите пароль</label>
        <input type="password" placeholder="password2312" value="" />
      </div>
    </div>

    <div class="input-block_helper">
      <div class="save-me">
        <div class="custom-checkbox">
          <label for="cbx" class="label-cbx">
            <input id="cbx" type="checkbox" class="invisible">
            <div class="checkbox">
              <svg width="2.5vh" height="2.5vh" viewBox="0 0 20 20">
                <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                <polyline points="4 11 8 15 16 6"></polyline>
              </svg>
            </div>
          </label>
        </div>
        <p>Запомнить меня</p>
      </div>
      <p class="forgot-pass">Забыли пароль?</p>
    </div>

    <div class="button-confirm"><p>АВТОРИЗОВАТЬСЯ</p></div>
  </div>
<!--  <div class="auth">-->
<!--    <div class="auth-block">-->
<!--      <h1>Авторизация</h1>-->
<!--      <Form class="form" @submit="onSubmit">-->
<!--        <label>Логин</label>-->
<!--        <ErrorMessage class="notification-block" name="login" />-->
<!--        <Field-->
<!--          v-model="login"-->
<!--          name="login"-->
<!--          placeholder="Ввести логин"-->
<!--          :rules="loginRules"-->
<!--        />-->
<!--      -->
<!--        <label>Пароль</label>-->
<!--        <ErrorMessage class="notification-block" name="password" />-->
<!--        <Field-->
<!--          v-model="password"-->
<!--          type="password"-->
<!--          name="password"-->
<!--          placeholder="Ввести пароль"-->
<!--          :rules="passwordRules"-->
<!--        />-->
<!--      -->
<!--        <div class="buttons-block">-->
<!--          <button>Войти</button>-->
<!--          <button type="button" name="registration">Регистрация</button>-->
<!--        </div>-->
<!--      -->
<!--        <div class="notification-send" v-if="notificationText !== null">-->
<!--          {{ notificationText }}-->
<!--        </div>-->
<!--      </Form>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
if (window.mp) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const rpc = require("rage-rpc");
}

export default {
  name: "Auth",
  components: {
    // Form,
    // Field,
    // ErrorMessage,
  },
  data() {
    return {
      login: "",
      password: "",
      notificationText: null,
      loginRules: yup
        .string()
        .required("REQUIRED TEXT")
        .min(3, "Минимальное кол-во символов 3")
        .matches(/^[A-Za-z][A-Za-z0-9_]{3,16}$/, "Недопустимые символы"),
      passwordRules: yup.string().required().min(6)
    };
  },
  methods: {
    onSubmit(values) {
      // rpc
      //   .callServer("Authenticate::login", {
      //     login: this.login,
      //     password: this.password,
      //   })
      //   .then((response) => {
      //     if (!response.success) {
      //       this.notificationText = ""; // Clear Text
      //       Object.entries(response.data).forEach(([key, value]) => {
      //         this.notificationText +=
      //           (Array.isArray(value) ? value.join("\n") : value) + "\n";
      //       });
      //       return;
      //     }
      //     this.notificationText = "Авторизация пройдена успешно!";
      //   });
    },
  },
};
</script>

<style scoped lang="scss">

</style>
