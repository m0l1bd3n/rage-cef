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
    type: { type: String, default: 'text' },
    placeholder: { type: String, required: true },
    rules: { type: Array, default: () => [] }
  },
  data: () => ({
    inputValue: '',
    hasError: false,
    errorMessage: ''
  }),
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
    }
  }
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
  border: 1px solid #1b1b1b;
  background-color: #151515;
  color: #fff;
  transition: background 0.3s, border-color 0.3s;
}

.field-input:hover { background: #1b1b1b; }
.field-input:focus { background: #242424; outline: none; }
.field-input.has-error { border-color: #e20338; }

.error-message {
  margin-left: 0.3125rem;
  color: #e20338;
  font-size: 0.875rem;
  font-weight: 600;
}
</style>