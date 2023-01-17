<template>
  <div class="setting-page">
    <div class="setting-block__item">
      <span class="item-setting_title">Пятна</span>
      <input type="range" class="input-range"/>
    </div>
    <div class="setting-block__item">
      <span class="item-setting_title">Цвет пятен</span>
      <div class="color-block">
        <div class="item-color-setting"></div>
        <div class="item-color-setting"></div>
        <div class="item-color-setting"></div>
        <div class="item-color-setting"></div>
        <div class="item-color-setting"></div>
        <div class="item-color-setting"></div>
        <div class="item-color-setting"></div>
        <div class="item-color-setting"></div>
      </div>
    </div>
    <div class="setting-block__item">
      <span class="item-setting_title">Волосы на лице</span>
      <input type="range" class="input-range"/>
    </div>
    <div class="setting-block__item">
      <span class="item-setting_title">Старение</span>
      <input type="range" class="input-range"/>
    </div>
    <div class="setting-block__item">
      <span class="item-setting_title">Макияж</span>
      <div>
        <div class="items-container">
          <item-square v-for="index in 15" :key="index" />
        </div>
      </div>
    </div>
    <div class="setting-block__item">
      <span class="item-setting_title">Краснеть</span>
      <input type="range" class="input-range"/>
    </div>
    <div class="setting-block__item">
      <span class="item-setting_title">Цвет лица</span>
      <div class="color-block">
        <div class="item-color-setting"></div>
        <div class="item-color-setting"></div>
        <div class="item-color-setting"></div>
        <div class="item-color-setting"></div>
        <div class="item-color-setting"></div>
        <div class="item-color-setting"></div>
        <div class="item-color-setting"></div>
        <div class="item-color-setting"></div>
      </div>
    </div>
    <div class="setting-block__item">
      <span class="item-setting_title">Урон от солнца</span>
      <input type="range" class="input-range"/>
    </div>
    <div class="setting-block__item">
      <span class="item-setting_title">Веснушки</span>
      <div class="items-container">
        <item-square v-for="index in 15" :key="index" />
      </div>
    </div>
    <div class="setting-block__item">
      <span class="item-setting_title">Волосы на груди</span>
      <input type="range" class="input-range"/>
    </div>
    <div class="setting-block__item">
      <span class="item-setting_title">Пороки тела</span>
      <input type="range" class="input-range"/>
    </div>
    <div class="setting-block__item">
      <span class="item-setting_title">Дефекты тела</span>
      <input type="range" class="input-range"/>
    </div>
  </div>
</template>

<script>
import ItemSquare from "@/components/elements/itemSquare";
export default {
  name: "faceCustom",
  components: {ItemSquare}
}
</script>

<style scoped>

</style>
