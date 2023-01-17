<template>
  <div class="craft-container_item-info">
    <div class="craft-container_item-image">
      <img alt="Изображение" src="../../../assets/img/inventory/test_shapka.png">
    </div>
    <div class="craft-container_item-information">
      <div class="craft-container_item-title">
        Кепка
      </div>
      <div class="craft-container_item-text">
        Мужской головной убор с широким и плоским козырьком, твёрдым околышем,
        мягкой тульёй и небольшим круглым или овальным донышком. Мужской головной убор
        с широким и плоским козырьком, твёрдым околышем, мягкой тульёй и небольшим круглым
        или овальным донышком.
      </div>
    </div>
    <div class="close-button"></div>
  </div>
  <div class="title-container">
    <div class="title-container_text">
      Материалы
    </div>
  </div>
  <div class="craft-container_items-list">
    <div class="items-container">
      <div class="items-container_item craft-item" v-for="item in itemsCraftList" :key="item.text">
        <div class="items-container_item-image">
          <img alt="IMG" src="../../../assets/img/inventory/test_shapka.png">
        </div>
        <div class="items-container_item-info-block">
          <span class="items-container_item-title">{{ item.text }}</span>
          <div class="indication-weight_block-text">
            <span class="indication-weight_num few">10</span>
            <span class="indication-weight_num taken">/70 </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="buttons-craft">
    <div class="buttons-craft_select-count">
      <div class="button-minus">
        <div class="icon-minus"></div>
      </div>
      <div class="input-count">
        1
      </div>
      <div class="button-plus">
        <div class="icon-plus"></div>
      </div>
    </div>
    <div class="button collect-item">
      Собрать
    </div>
  </div>
</template>

<script>
export default {
  name: "craftItem",
  props: {
    itemsCraftList: String,
  }
}
</script>

<style scoped>

</style>
