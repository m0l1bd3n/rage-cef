<template>
  <div class="setting-page">
    <div class="setting-block__item">
      <div class="setting-block__item">
        <span class="item-setting_title">Прически</span>
        <div>
          <div class="items-container">
            <item-square v-for="index in 50" :key="index"></item-square>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemSquare from "../../../elements/itemSquare";
export default {
  name: "hair",
  components: {ItemSquare}
}
</script>

<style scoped>

</style>
