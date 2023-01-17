<template>
  <div style="display: flex; flex-direction: row; width: 100%">
    <div class="create-character__change-type-block create-character__change-face-setting" style="height: 100%; border-right: 1px solid rgba(161, 161, 161, 1); padding-right: 5px; width: 10vh; overflow-y: auto">
      <div class="items-container_item-selection items-setting-character" v-for="index in 10" :key="index" v-on:click="setActiveSetting(index)" >
        <img alt="+" src="../../../assets/img/icons/genetic_face.svg">
      </div>
    </div>
    <eyes v-if="activeSetting === 1"></eyes>
    <brows v-if="activeSetting === 2"></brows>
    <nose v-if="activeSetting === 3"></nose>
    <lips v-if="activeSetting === 4"></lips>
    <cheekbones v-if="activeSetting === 5"></cheekbones>
    <cheeks v-if="activeSetting === 6"></cheeks>
    <jaw v-if="activeSetting === 7"></jaw>
    <chin v-if="activeSetting === 8"></chin>
    <neck v-if="activeSetting === 9"></neck>
    <hair v-if="activeSetting === 10"></hair>
  </div>
  
</template>

<script>

import Eyes from "@/components/pages/CreateCharacter/faceSettings/eyes";
import Brows from "@/components/pages/CreateCharacter/faceSettings/brows";
import Nose from "@/components/pages/CreateCharacter/faceSettings/nose";
import Lips from "@/components/pages/CreateCharacter/faceSettings/lips";
import Cheekbones from "@/components/pages/CreateCharacter/faceSettings/cheekbones";
import Cheeks from "@/components/pages/CreateCharacter/faceSettings/cheeks";
import Jaw from "@/components/pages/CreateCharacter/faceSettings/jaw";
import Chin from "@/components/pages/CreateCharacter/faceSettings/chin";
import Neck from "@/components/pages/CreateCharacter/faceSettings/neck";
import Hair from "@/components/pages/CreateCharacter/faceSettings/hair";
export default {
  name: "faceSettings",
  components: {Hair, Neck, Chin, Jaw, Cheeks, Cheekbones, Lips, Nose, Brows, Eyes},
  data() {
    return {
      activeSetting: 1,
    }
  },
  methods: {
    setActiveSetting(index) {
      this.activeSetting = index
    }
  }
}
</script>

<style scoped>

</style>
