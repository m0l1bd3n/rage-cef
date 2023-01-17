<template>
  <div class="settings-face">
    <h1>Параметры лица</h1>
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
  name: "setFace",
  data() {
    return {
      items: [
        {id: 0, label: "Ширина носа", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 1, label: "Высота носа", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 2, label: "Длина носа", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 3, label: "Носовая перемычка", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 4, label: "Кончик носа", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 5, label: "Сдвиг переносицы", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 6, label: "Высота бровей", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 7, label: "Ширина бровей", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 8, label: "Высота скул", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 9, label: "Ширина скул", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 10, label: "Ширина щек", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 11, label: "Глаза", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 12, label: "Губы", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 13, label: "Ширина челюсти", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 14, label: "Высота челюсти", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 15, label: "Длина подбородка", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 16, label: "Положение подбородка", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 17, label: "Ширина подбородка", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 18, label: "Форма подбородка", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 19, label: "Обхват шеи", min: '-1', max: '1', step: '0.01', value: '0', type: 'face'},
        {id: 20, label: "Прическа", min: '0', max: '76', step: '1', value: '0', type: 'hair'},
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
