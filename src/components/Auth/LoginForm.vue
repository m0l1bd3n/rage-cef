<template>
  <div class="auth-container">
    <form-input
        v-model="form.login"
        type="text"
        placeholder="Введите логин"
        :rules="[requiredRule, loginRule]"
        :show-error="submitted"
    />
    <form-input
        v-model="form.password"
        type="password"
        placeholder="Введите пароль"
        :rules="[requiredRule, passwordRule]"
        :show-error="submitted"
    />
    <div class="checkbox-group">
      <checkbox-item v-model="form.isCheckedDamp">
        Запомнить меня
      </checkbox-item>
    </div>
    <div class="form-actions">
      <button class="button button-submit" @click="submitData">
        Авторизоваться
      </button>
      <button class="button button-cancel" @click="$router.push('/')">
        Отмена
      </button>
    </div>
  </div>
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
    submitted: false, // Добавлено для управления ошибками
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
    submitData() {
      this.submitted = true; // Ошибки отображаются после клика
      if (this.isFormValid) {
        this.$emit('submit', { ...this.form });
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.form-actions {
  display: flex;
  gap: 0.625rem;
}

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

.button-submit {
  background: var(--secondary-bg);
  border-color: var(--border-color);
  color: var(--text-color);
}

.button-submit:hover {
  background: var(--primary-bg); /* Инвертировал hover для разнообразия */
}

.button-cancel {
  background: var(--primary-bg);
  border-color: var(--error-color);
  color: var(--text-color);
}

.button-cancel:hover {
  background: var(--error-color);
  color: var(--text-color);
}
</style>