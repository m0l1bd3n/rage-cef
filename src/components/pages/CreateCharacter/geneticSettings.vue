<template>
  <div class="setting-page">
    <div class="group-block">
      <div class="setting-block__item">
        <span class="item-setting_title">Имя</span>
        <div class="item-setting_input">
          <input type="text" class="input-text"/>
        </div>
      </div>
      <div class="setting-block__item">
        <span class="item-setting_title">Фамилия</span>
        <div class="item-setting_input">
          <input type="text" class="input-text"/>
        </div>
      </div>
    </div>
    <div class="group-block">
    <div class="setting-block__item">
      <span class="item-setting_title">Пол</span>
        <div class="item-setting_input">
          <img class="icon-image" alt="М" src="../../../assets/img/icons/icon_M.svg">
          <span>Мужской</span>
        </div>
    </div>
      <div class="setting-block__item">
        <div class="item-setting_input">
          <img class="icon-image" alt="Ж" src="../../../assets/img/icons/icon_ZH.svg">
          <span>Женский</span>
        </div>
      </div>
      </div>
    <div class="setting-block__item">
      <span class="item-setting_title">Возраст</span>
      <div class="range-value"><span>16</span><span>70</span></div>
          <input type="range" class="input-range"/>
    </div>
    <div class="group-block">
      <div class="setting-block__item">
        <span class="item-setting_title">Мать</span>
        <div class="item-setting-block">

        </div>
      </div>
      <div class="setting-block__item">
        <span class="item-setting_title">Отец</span>
        <div class="item-setting-block">

        </div>
      </div>
    </div>
    <div class="setting-block__item">
      <span class="item-setting_title">Схожесть</span>
      <div class="range-value"><span>Мать</span><span>Отец</span></div>
      <input type="range" class="input-range"/>
    </div>
    <div class="setting-block__item">
      <span class="item-setting_title">Цвет кожи</span>
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
  </div>
</template>

<script>
export default {
  name: "geneticSettings"
}
</script>

<style scoped>

</style>