<template>
  <form @submit.prevent="submitForm" class="auth-form">
    <form-input
        v-model="form.email"
        type="email"
        placeholder="Введите почту"
        :rules="[requiredRule, emailRule]"
    />
    <form-input
        v-model="form.password"
        type="password"
        placeholder="Введите пароль"
        :rules="[requiredRule, passwordRule]"
    />
    <form-input
        v-model="form.confirmPassword"
        type="password"
        placeholder="Повторите пароль"
        :rules="[requiredRule, confirmPasswordRule]"
    />
    <form-input
        v-model="form.promoCode"
        type="text"
        placeholder="Введите промокод"
        :rules="[promoCodeRule]"
    />
    <div class="checkbox-group">
      <checkbox-item v-model="form.isCheckedRules" :has-error="submitted && !form.isCheckedRules">
        Я ознакомлен и согласен с <a href="#">правилами сервера</a>
      </checkbox-item>
      <checkbox-item v-model="form.isCheckedAge" :has-error="submitted && !form.isCheckedAge">
        Я подтверждаю, что мне есть 18 лет
      </checkbox-item>
    </div>
    <div class="form-actions">
      <button type="submit" class="button button-submit" :disabled="!isFormValid">
        Зарегистрироваться
      </button>
      <button type="button" class="button button-cancel" @click="$router.push('/')">
        Отмена
      </button>
    </div>
  </form>
</template>

<script>
import FormInput from '@/components/Auth/FormInput.vue';
import CheckboxItem from '@/components/UI/CheckboxItem.vue';

export default {
  name: 'SignUpForm',
  components: { FormInput, CheckboxItem },
  data: () => ({
    form: {
      email: '',
      password: '',
      confirmPassword: '',
      promoCode: '',
      isCheckedRules: false,
      isCheckedAge: false,
    },
    submitted: false,
  }),
  computed: {
    requiredRule() {
      return (v) => (v ? '' : 'Поле не должно быть пустым');
    },
    promoCodeRule() {
      return (v) => (v.length > 0 ? '' : ''); // Промокод необязателен
    },
    emailRule() {
      return (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Некорректная почта');
    },
    passwordRule() {
      return (v) => (v.length >= 6 && v.length <= 32 ? '' : 'Пароль должен быть от 6 до 32 символов');
    },
    confirmPasswordRule() {
      return (v) => (v === this.form.password ? '' : 'Пароли не совпадают');
    },
    isFormValid() {
      return (
          this.emailRule(this.form.email) === '' &&
          this.passwordRule(this.form.password) === '' &&
          this.confirmPasswordRule(this.form.confirmPassword) === '' &&
          this.form.isCheckedRules &&
          this.form.isCheckedAge
      );
    },
  },
  methods: {
    submitForm() {
      this.submitted = true;
      if (this.isFormValid) {
        this.$emit('submit', { ...this.form });
      }
    },
  },
};
</script>

<style scoped>
.auth-form { display: flex; flex-direction: column; gap: 1.25rem; }
.checkbox-group { display: flex; flex-direction: column; gap: 0.625rem; }
.form-actions { display: flex; gap: 0.625rem; }

.button {
  flex: 1;
  padding: 0.9375rem;
  text-align: center;
  border-radius: 0.625rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.3s ease-in-out;
}

.button-submit { background: var(--primary-bg); border-color: var(--border-color); color: var(--text-color); }
.button-submit:hover { background: var(--secondary-bg); }
.button-cancel { background: var(--primary-bg); border-color: var(--error-color); color: var(--text-color); }
.button-cancel:hover { background: var(--error-color); color: var(--text-color); }
</style>