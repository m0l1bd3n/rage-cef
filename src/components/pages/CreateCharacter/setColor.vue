<template>
  <div class="settings-face">
    <h1>Параметры цвета</h1>
    <div class="input-element" v-for="item in items" v-bind:key="item.id">
      <label>{{ item.label }}</label>
      <input
        v-on:change="onChangeValue"
        type="range"
        min="{{ item.min }}"
        max="{{ item.max }}"
        step="{{ item.step }}"
        v-model="item.value"
      />
    </div>
  </div>
</template>

<script>
let rpc = null;
if (window.mp) {rpc = require('rage-rpc')}

export default {
  name: "setColor",
  data() {
    return {
      items: [
        {id: 0, label: "Дефекты тела", min: '0', max: '100', step: '1', value: '0', type: 'headOverlayColor'},
        {id: 1, label: "Цвет пятен", min: '0', max: '255', step: '1', value: '0', type: 'headOverlayColor'},
        {id: 2, label: "Волосы на лице", min: '0', max: '1', step: '1', value: '0', type: 'headOverlayColor'},
        {id: 3, label: "Брови", min: '0', max: '100', step: '1', value: '0', type: 'headOverlayColor'},
        {id: 4, label: "Старение", min: '0', max: '100', step: '1', value: '0', type: 'headOverlayColor'},
        {id: 5, label: "Макияж", min: '0', max: '100', step: '1', value: '0', type: 'headOverlayColor'},
        {id: 6, label: "Краснеть", min: '0', max: '100', step: '1', value: '0', type: 'headOverlayColor'},
        {id: 7, label: "Цвет лица", min: '0', max: '100', step: '1', value: '0', type: 'headOverlayColor'},
        {id: 8, label: "Урон от солнца", min: '0', max: '100', step: '1', value: '0', type: 'headOverlayColor'},
        {id: 9, label: "помада", min: '0', max: '100', step: '1', value: '0', type: 'headOverlayColor'},
        {id: 10, label: "Веснушки", min: '0', max: '100', step: '1', value: '0', type: 'headOverlayColor'},
        {id: 11, label: "Волосы на груди", min: '0', max: '100', step: '1', value: '0', type: 'headOverlayColor'},
        {id: 12, label: "Пороки тела", min: '0', max: '100', step: '1', value: '0', type: 'headOverlayColor'},
        {id: 13, label: "Цвет глаз", min: '0', max: '32', step: '1', value: '0', type: 'eye'},
        {id: 14, label: "Цвет волос", min: '0', max: '32', step: '1', value: '0', type: 'hairColor'}
      ]
    }
  },
  mounted() {
    //
  },
  methods: {
    onChangeValue() {
      if (window.mp && rpc !== null) {
        rpc.callClient('Player::setFaceFeature', this.items.map(res => ({
          id: res.id,
          type: res.type,
          value: res.value
        })))
      }
    },
  }
}
</script>

<style scoped>

</style>
