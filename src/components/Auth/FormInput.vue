<template>
  <label class="form-field">
    <input
        :type="type"
        class="field-input"
        :placeholder="placeholder"
        v-model="inputValue"
        :class="{ 'has-error': hasError }"
    />
    <p v-if="hasError" class="error-message">{{ displayedErrorMessage }}</p>
  </label>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    modelValue: { type: String, default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, required: true },
    rules: { type: Array, default: () => [] },
    showError: { type: Boolean, default: false }, // Управляет отображением ошибок
    externalError: { type: String, default: '' }, // Новый проп для внешних ошибок от сервера
  },
  emits: ['update:modelValue', 'input'],
  data: () => ({
    hasError: false,
    errorMessage: '',
  }),
  computed: {
    inputValue: {
      get() { return this.modelValue; },
      set(value) { this.$emit('update:modelValue', value); },
    },
    displayedErrorMessage() {
      // Приоритет внешней ошибки над внутренней валидацией
      return this.showError && this.externalError ? this.externalError : this.errorMessage;
    },
  },
  watch: {
    modelValue() {
      this.validateInput(); // Валидация при изменении значения
    },
    showError() {
      this.validateInput(); // Перепроверка при изменении showError
    },
    externalError() {
      // Обновляем hasError, если есть внешняя ошибка
      this.hasError = this.showError && (this.externalError !== '' || this.errorMessage !== '');
    },
  },
  methods: {
    validateInput() {
      // Проверяем правила только если нет внешней ошибки
      if (!this.showError || this.externalError) {
        this.hasError = this.externalError !== '';
        this.errorMessage = '';
        return;
      }
      this.hasError = false;
      this.errorMessage = '';
      for (const rule of this.rules) {
        const result = rule(this.inputValue);
        if (result) {
          this.hasError = true;
          this.errorMessage = result;
          break;
        }
      }
      this.$emit('input', this.inputValue);
    },
  },
};
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-input {
  padding: 1.25rem 1.5625rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  background-color: var(--primary-bg);
  color: #fff;
  transition: all 0.3s ease-in-out;
}

.field-input:hover {
  background: var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.field-input:focus {
  background: var(--secondary-bg);
  outline: none;
}

.field-input.has-error {
  border-color: var(--error-color);
}

.error-message {
  margin-left: 0.3125rem;
  color: var(--error-color);
  font-size: 0.875rem;
  font-weight: 600;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(-5px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>