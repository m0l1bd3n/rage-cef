<!-- SignUpForm.vue -->
<template>
  <div class="auth-container">
    <form-input
        v-model="form.login"
        type="text"
        placeholder="Введите логин"
        :rules="[requiredRule, loginRule]"
        :show-error="submitted"
        :external-error="loginError"
    />
    <form-input
        v-model="form.email"
        type="email"
        placeholder="Введите почту"
        :rules="[requiredRule, emailRule]"
        :show-error="submitted"
    />
    <form-input
        v-model="form.password"
        type="password"
        placeholder="Введите пароль"
        :rules="[requiredRule, passwordRule]"
        :show-error="submitted"
    />
    <form-input
        v-model="form.confirmPassword"
        type="password"
        placeholder="Повторите пароль"
        :rules="[requiredRule, confirmPasswordRule]"
        :show-error="submitted"
    />
    <form-input
        v-model="form.promoCode"
        type="text"
        placeholder="Введите промокод"
        :rules="[promoCodeRule]"
        :show-error="submitted"
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
      <button class="button button-submit" @click.prevent="submitData">
        Зарегистрироваться
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
  name: 'SignUpForm',
  components: { FormInput, CheckboxItem },
  data: () => ({
    form: {
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
      promoCode: '',
      isCheckedRules: false,
      isCheckedAge: false,
    },
    submitted: false,
    loginError: '', // Состояние для хранения ошибки логина от сервера
  }),
  computed: {
    requiredRule() {
      return (v) => (v ? '' : 'Поле не должно быть пустым');
    },
    promoCodeRule() {
      return (v) => (v.length > 0 ? '' : ''); // Промокод необязателен
    },
    loginRule() {
      return (v) => (/^[a-zA-Z0-9]{5,}$/.test(v) ? '' : 'Логин должен быть минимум 5 символов и содержать только буквы и цифры');
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
          this.loginRule(this.form.login) === '' &&
          this.emailRule(this.form.email) === '' &&
          this.passwordRule(this.form.password) === '' &&
          this.confirmPasswordRule(this.form.confirmPassword) === '' &&
          this.form.isCheckedRules &&
          this.form.isCheckedAge
      );
    },
  },
  mounted() {
    // Регистрируем слушатель события validation.exception
    this.$rpc.register('validation.exception', (data) => {
      console.log('Received validation exception:', data);
      if (data.errors && data.errors.login) {
        this.loginError = data.errors.login[0]; // Устанавливаем первую ошибку для логина
      }
    });
  },
  methods: {
    async submitData() {
      this.submitted = true;
      this.loginError = ''; // Сбрасываем ошибку перед отправкой
      if (this.isFormValid) {
        try {
          const response = await this.$rpc.callServer('authenticate.register.handle', {
            login: this.form.login,
            email: this.form.email,
            password: this.form.password,
            promoCode: this.form.promoCode,
            isCheckedRules: this.form.isCheckedRules,
            isCheckedAge: this.form.isCheckedAge
          });
          console.log('Registration response from Rage MP:', response);
          if (response && response.success) {
            this.$emit('submit', { ...this.form });
          } else {
            console.warn('Registration failed:', response ? response.message : 'No response');
          }
        } catch (error) {
          console.error('Error calling Rage RPC:', error);
        }
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

a {
  text-decoration: none;
  color: white;
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
  background: var(--primary-bg);
  border-color: var(--border-color);
  color: var(--text-color);
}

.button-submit:hover {
  background: var(--secondary-bg);
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

.button-submit:active {
  transform: scale(1);
}
</style>