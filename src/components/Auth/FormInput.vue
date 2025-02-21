<template>
  <label class="form-field">
    <input
        :type="type"
        class="field-input"
        :placeholder="placeholder"
        v-model="inputValue"
        @blur="validateInput"
        :class="{ 'has-error': hasError }"
    />
    <p v-if="hasError" class="error-message">{{ errorMessage }}</p>
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
  },
  methods: {
    validateInput() {
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

.field-input:hover { background: var(--border-color); box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
.field-input:focus { background: var(--secondary-bg); outline: none; }
.field-input.has-error { border-color: var(--error-color); }

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