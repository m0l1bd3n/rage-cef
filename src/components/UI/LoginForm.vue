<template>
  <form @submit.prevent="submitForm" class="auth-form">
    <form-input
        type="email"
        placeholder="Введите почту"
        :rules="[requiredRule, emailRule]"
        @input="form.email = $event"
    />
    <form-input
        type="password"
        placeholder="Введите пароль"
        :rules="[requiredRule, passwordRule]"
        @input="form.password = $event"
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
      <button type="button" class="button button-cancel" @click="$router.push('/intro')">
        Отмена
      </button>
    </div>
  </form>
</template>

<script>
import FormInput from '@/components/UI/FormInput.vue';
import CheckboxItem from '@/components/UI/CheckboxItem.vue';

export default {
  name: 'LoginForm',
  components: { FormInput, CheckboxItem },
  data: () => ({
    form: {
      email: '',
      password: '',
      isCheckedDamp: false
    }
  }),
  computed: {
    requiredRule: () => v => v ? '' : 'Поле не должно быть пустым',
    emailRule: () => v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Некорректная почта',
    passwordRule: () => v => (v.length >= 6 && v.length <= 32) ? '' : 'Пароль должен быть от 6 до 32 символов',
    isFormValid() {
      return this.form.email && this.form.password;
    }
  },
  methods: {
    submitForm() {
      if (this.isFormValid) {
        this.$emit('submit', { ...this.form });
      }
    }
  }
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
}

.button-submit { background: #151515; border-color: #1b1b1b; color: #fff; }
.button-cancel { background: #151515; border-color: #e20338; color: #fff; }
</style>