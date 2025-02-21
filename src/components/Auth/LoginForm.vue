<template>
  <form @submit.prevent="submitForm" class="auth-form">
    <form-input
        v-model="form.login"
        type="text"
        placeholder="Введите логин"
        :rules="[requiredRule, loginRule]"
    />
    <form-input
        v-model="form.password"
        type="password"
        placeholder="Введите пароль"
        :rules="[requiredRule, passwordRule]"
    />
    <div class="checkbox-group">
      <checkbox-item v-model="form.isCheckedDamp">
        Запомнить меня
      </checkbox-item>
    </div>
    <div class="form-actions">
      <button type="submit" class="button button-submit" :disabled="!isFormValid">
        Авторизоваться
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
  name: 'LoginForm',
  components: { FormInput, CheckboxItem },
  data: () => ({
    form: {
      login: '',
      password: '',
      isCheckedDamp: false,
    },
  }),
  computed: {
    requiredRule() {
      return (v) => (v ? '' : 'Поле не должно быть пустым');
    },
    loginRule() {
      return (v) => (/^[a-zA-Z0-9]{5,}$/.test(v) ? '' : 'Логин должен быть минимум 5 символов и содержать только буквы и цифры');
    },
    passwordRule() {
      return (v) => (v.length >= 6 && v.length <= 32 ? '' : 'Пароль должен быть от 6 до 32 символов');
    },
    isFormValid() {
      return this.loginRule(this.form.login) === '' && this.passwordRule(this.form.password) === '';
    },
  },
  methods: {
    submitForm() {
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
  transition: all 0.3s ease-in-out; /* Добавлена анимация */
}

.button-submit { background: var(--secondary-bg); border-color: var(--border-color); color: var(--text-color); }
.button-submit:hover { background: var(--secondary-bg); }
.button-cancel { background: var(--primary-bg); border-color: var(--error-color); color: var(--text-color); }
.button-cancel:hover { background: var(--error-color); color:var(--text-color); }
</style>