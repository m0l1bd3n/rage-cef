<template>
  <div class="setting-page">
    <div class="setting-block__item">
      <div class="setting-block__item">
        <span class="item-setting_title">Губы</span>
        <div>
          <div class="items-container">
            <item-square v-for="index in 12" :key="index" />
          </div>
        </div>
      </div>
    </div>
    <div class="setting-block__item">
      <div class="setting-block__item">
        <span class="item-setting_title">Помада</span>
        <div>
          <div class="items-container">
            <item-square v-for="index in 12" :key="index" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import ItemSquare from "@/components/elements/itemSquare";
export default {
  name: "lips",
  components: {ItemSquare}
}
</script>

<style scoped>

</style>
