<template>
  <label class="checkbox-item">
    <input
        type="checkbox"
        class="checkbox-input"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="custom-checkbox"></span>
    <span class="checkbox-text" :style="{ fontSize: textSize }">
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  name: 'CheckboxItem',
  props: {
    modelValue: { type: Boolean, required: true },
    hasError: { type: Boolean, default: false },
    textSize: { type: String, default: '0.875rem' }
  },
  computed: {
    styles() {
      return { borderColor: this.hasError ? '#e20338' : '#1b1b1b' };
    }
  }
};
</script>

<style scoped>
.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.3125rem;
  position: relative;
}

.checkbox-input {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.3125rem;
  border: 1px solid #303030;
  background-color: #303030;
  cursor: pointer;
}

.checkbox-input:checked {
  border-color: #242424;
  background: #242424 url('@/assets/images/checkmark.svg') no-repeat center;
}

.checkbox-text {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
}

.checkbox-text a {
  color: inherit;
  text-decoration: underline;
}
</style>