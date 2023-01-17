<template>
  <div class="form">
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
        <img alt="login" src="../../../assets/img/icons/icon_email.svg" />
      </div>
      <div class="value-block">
        <label>Введите E-mail</label>
        <input type="email" placeholder="mailtemp@mail.ru" value="" />
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

    <div class="input-block">
      <div class="icon-block">
        <img alt="login" src="../../../assets/img/icons/icon_password.svg" />
      </div>
      <div class="value-block">
        <label>Повторите пароль</label>
        <input type="password" placeholder="*******" value="" />
      </div>
    </div>

    <div class="button-confirm"><p>ЗАРЕГИСТРИРОВАТЬСЯ</p></div>
  </div>
<!--  <div class="registration">-->
<!--    <div class="registration-block">-->
<!--      <h1>Регистрация</h1>-->
<!--      <Form class="form" @submit="onSubmit">-->
<!--        <label>Логин</label>-->
<!--        <ErrorMessage class="notification-block" name="login" />-->
<!--        <Field-->
<!--          v-model="login"-->
<!--          class="login-input"-->
<!--          name="login"-->
<!--          placeholder="Ввести логин"-->
<!--          :rules="loginRules"-->
<!--        />-->
<!--      -->
<!--        <label>Email</label>-->
<!--        <ErrorMessage class="notification-block" name="email" />-->
<!--        <Field-->
<!--          v-model="email"-->
<!--          class="login-input"-->
<!--          type="email"-->
<!--          name="email"-->
<!--          placeholder="Ввести email"-->
<!--          :rules="emailRules"-->
<!--        />-->
<!--      -->
<!--        <label>Пароль</label>-->
<!--        <ErrorMessage class="notification-block" name="password" />-->
<!--        <Field-->
<!--          v-model="password"-->
<!--          class="login-input"-->
<!--          type="password"-->
<!--          name="password"-->
<!--          placeholder="Ввести пароль"-->
<!--          :rules="passwordRules"-->
<!--        />-->
<!--      -->
<!--        <Field-->
<!--          v-model="confirmation"-->
<!--          class="login-input"-->
<!--          type="password"-->
<!--          name="confirmation"-->
<!--          placeholder="Повторить пароль"-->
<!--          :rules="passwordRules"-->
<!--        />-->
<!--      -->
<!--        <div class="buttons-block">-->
<!--          <button type="button" name="login">Войти</button>-->
<!--          <button>Регистрация</button>-->
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
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const rpc = require("rage-rpc");
// import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "RegisterUser",
  components: {
    // Form,
    // Field,
    // ErrorMessage,
  },
  data() {
    return {
      login: "",
      email: "",
      password: "",
      confirmation: "",
      notificationText: null,
      loginRules: yup
        .string()
        .required("REQUIRED LOGIN")
        .min(3, "Минимальное кол-во символов 3")
        .matches(/^[A-Za-z][A-Za-z0-9_]{3,16}$/, "Недопустимые символы"),
      emailRules: yup.string().required().min(2),
      passwordRules: yup.string().required().min(6),
    };
  },
  methods: {
    onSubmit(values) {
      if (this.password === this.confirmation) {
        // rpc
        //   .callServer("Authenticate::create", {
        //     login: this.login,
        //     email: this.email,
        //     password: this.password,
        //   })
        //   .then((response) => {
        //     if (!response.success) {
        //       this.notificationText = ""; // Clear Text
        //       Object.entries(response.data).forEach(([key, value]) => {
        //         this.notificationText +=
        //           (Array.isArray(value) ? value.join("\n") : value) + "\n";
        //       });
        //
        //       return;
        //     }
        //     this.notificationText = "Регистрация пройдена успешно!";
        //   });
      } else {
        this.notificationText = "ERROR REPEAT PASSWORD";
      }
    },
  },
};
</script>

<style scoped lang="scss">


</style>
