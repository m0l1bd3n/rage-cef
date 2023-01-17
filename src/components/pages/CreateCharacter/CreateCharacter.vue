<template>
  <div class="create-character">
    <div class="create-character__change-type-block">
      <div class="items-container_item-selection items-setting-character active" v-on:click="changeSetting('genetic')">
        <img alt="+" src="../../../assets/img/icons/genetic.svg">
      </div>
      <div class="items-container_item-selection items-setting-character" v-on:click="changeSetting('faceSetting')">
        <img alt="+" src="../../../assets/img/icons/genetic_face.svg">
      </div>
      <div class="items-container_item-selection items-setting-character" v-on:click="changeSetting('faceCustom')">
        <img alt="+" src="../../../assets/img/icons/genetic_face.svg">
      </div>
    </div>
    <div class="create-character__change-settings">
      <div class="title-container border-radius-top create-character-title">
        <div class="title-container_text">Создание персонажа</div>
      </div>
      <div class="settings-block">
        <genetic-settings v-if="settingType === 'genetic'" />
        <face-settings v-if="settingType === 'faceSetting'" />
        <face-custom v-if="settingType === 'faceCustom'" />
      </div>
    </div>
  </div>

  <!--    <div class="create-character-block">-->
  <!--     <div class="buttons-block-character">-->
  <!--       <button v-on:click="ComponentActivate('FACE')">ЛИЦО</button>-->
  <!--       <button v-on:click="ComponentActivate('HEAD')">Голова</button>-->
  <!--       <button v-on:click="ComponentActivate('COLOR')">Цвета</button>-->
  <!--     </div>-->
  <!--      <set-face v-show="ComponentActive === 'FACE'" />-->
  <!--      <set-color v-show="ComponentActive === 'COLOR'" />-->
  <!--      <set-head v-show="ComponentActive === 'HEAD'" />-->
  <!--    </div>-->
</template>

<script>
import GeneticSettings from "@/components/pages/CreateCharacter/geneticSettings";
let rpc = null;
if (window.mp) {rpc = require('rage-rpc')}
import SetFace from "@/components/pages/CreateCharacter/setFace";
import SetColor from "@/components/pages/CreateCharacter/setColor";
import SetHead from "@/components/pages/CreateCharacter/setHead";
import geneticSettings from "@/components/pages/CreateCharacter/geneticSettings";
import FaceSettings from "@/components/pages/CreateCharacter/faceSettings";
import FaceCustom from "@/components/pages/CreateCharacter/faceCustom";

export default {
  name: "CreateCharacter",
  components: {
    FaceCustom,
    FaceSettings,
    GeneticSettings,
    // SetHead,
    // SetColor,
    // SetFace
  },
  data() {
    return {
      ComponentActive: "FACE",
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
      ],
      settingType: 'genetic'
    }
  },
  mounted() {
    //
  },
  methods: {
    ComponentActivate: function (value){
      this.ComponentActive = value;
    },
    onChangeValue() {
      if (window.mp && rpc !== null) {
        rpc.callClient('Player::setFaceFeature', this.items.map(res => ({
          id: res.id,
          type: res.type,
          value: res.value
        })))
      }
    },
    changeSetting: function (value) {
      this.settingType = value;
    }
  }
};
</script>

<style scoped lang="scss">

</style>
