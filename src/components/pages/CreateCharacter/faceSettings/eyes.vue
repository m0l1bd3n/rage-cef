<template>
  <div class="setting-page">
    <div class="setting-block__item">
      <span class="item-setting_title">Глаза</span>
      <div>
        <div class="items-container">
          <item-square v-for="index in 12" :key="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemSquare from "@/components/elements/itemSquare";
export default {
  name: "eyes",
  components: {itemSquare}
}
</script>

<style scoped>

</style>
