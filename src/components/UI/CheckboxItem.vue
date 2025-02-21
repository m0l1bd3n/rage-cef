<template>
  <div class="checkbox-item" @click="toggleCheckbox">
    <div
        class="custom-checkbox"
        :class="{ 'checked': modelValue, 'has-error': hasError }"
    >
      <svg
          v-if="modelValue"
          class="checkmark"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M2 6L5 9L10 3"
            stroke="#008935"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
      </svg>
    </div>
    <span class="checkbox-text" :style="{ fontSize: textSize }">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: 'CheckboxItem',
  props: {
    modelValue: { type: Boolean, required: true },
    hasError: { type: Boolean, default: false },
    textSize: { type: String, default: '0.875rem' },
  },
  emits: ['update:modelValue'],
  methods: {
    toggleCheckbox() {
      this.$emit('update:modelValue', !this.modelValue);
    },
  },
};
</script>

<style scoped>
.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.3125rem;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.3125rem;
  border: 1px solid #303030;
  background-color: #303030;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
}

/* Состояние checked */
.custom-checkbox.checked {
  border-color: #242424;
  background-color: #242424;
}

/* Состояние ошибки (не отмечен и форма отправлена) */
.custom-checkbox.has-error:not(.checked) {
  border-color: #e20338;
  background-color: rgba(226, 3, 56, 0.1); /* Легкий красный фон для акцента */
}

/* Текст */
.checkbox-text {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
}

.checkbox-text a {
  color: inherit;
  text-decoration: underline;
}

/* Анимация галочки */
.checkmark {
  animation: scaleIn 0.2s ease-in-out;
}

@keyframes scaleIn {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}
</style>