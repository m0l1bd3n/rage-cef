<template>
  <div class="settings-face">
    <h1>Параметры головы</h1>
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
  name: "setHead",
  data() {
    return {
      items: [
        {id: 0, label: "Пятна", min: '0', max: '23', step: '1', value: '255', type: 'headOverlay'},
        {id: 1, label: "Волосы на лице", min: '0', max: '28', step: '1', value: '255', type: 'headOverlay'},
        {id: 2, label: "Брови", min: '0', max: '33', step: '1', value: '255', type: 'headOverlay'},
        {id: 3, label: "Старение", min: '0', max: '14', step: '1', value: '255', type: 'headOverlay'},
        {id: 4, label: "Макияж", min: '0', max: '74', step: '1', value: '255', type: 'headOverlay'},
        {id: 5, label: "Краснеть", min: '0', max: '32', step: '1', value: '255', type: 'headOverlay'},
        {id: 6, label: "Цвет лица", min: '0', max: '11', step: '1', value: '255', type: 'headOverlay'},
        {id: 7, label: "Урон от солнца", min: '0', max: '10', step: '1', value: '255', type: 'headOverlay'},
        {id: 8, label: "Помада", min: '0', max: '9', step: '1', value: '255', type: 'headOverlay'},
        {id: 9, label: "Веснушки", min: '0', max: '17', step: '1', value: '255', type: 'headOverlay'},
        {id: 10, label: "Волосы на груди", min: '0', max: '16', step: '1', value: '255', type: 'headOverlay'},
        {id: 11, label: "Пороки тела", min: '0', max: '11', step: '1', value: '255', type: 'headOverlay'},
        {id: 12, label: "Дефекты тела", min: '0', max: '1', step: '1', value: '255', type: 'headOverlay'},
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
