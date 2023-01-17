<template>
  <div class="setting-page">
    <div class="setting-block__item">
      <span class="item-setting_title">Брови</span>
      <div>
        <div class="items-container">
          <item-square v-for="index in 12" :key="index" />
        </div>
      </div>
    </div>
    <div class="setting-block__item">
      <input-range></input-range>
    </div>
    <div class="setting-block__item">
      <input-range></input-range>
    </div>
  </div>
</template>

<script>

import itemSquare from "@/components/elements/itemSquare";
import inputRange from "@/components/elements/inputRange";
export default {
  name: "brows",
  components: {itemSquare, inputRange}
}
</script>

<style scoped>

</style>
