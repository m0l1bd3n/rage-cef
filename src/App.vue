<template>
  <div class="app-block">
    <PanelComponentsSetting @ComponentActivate="test" ></PanelComponentsSetting>
    <LoginPage v-if="ComponentName === 'AUTH'"></LoginPage>
    <registration v-if="ComponentName === 'REGISTRATION'"></registration>
    <CharacterSelection v-if="ComponentName === 'CHARACTER_SELECTION'"></CharacterSelection>
    <CreateCharacter v-if="ComponentName === 'CREATE_CHARACTER'"></CreateCharacter>
    <Inventory v-if="ComponentName === 'INVENTORY'"></Inventory>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import registration from "./components/pages/LoginPage/registrationUser.vue";
import auth from "@/components/pages/LoginPage/authUser.vue";
let rpc: { callClient: (arg0: string, arg1: { success: boolean; data: boolean; }) => void; } | null = null;
if (window.mp) {rpc = require('rage-rpc')}

import PanelComponentsSetting from "@/components/common/PanelComponentsSetting.vue";
import CreateCharacter from "@/components/pages/CreateCharacter/CreateCharacter.vue";
import Inventory from "@/components/pages/Inventory/Inventory.vue";
import LoginPage from "@/components/pages/LoginPage/LoginPage.vue";
import CharacterSelection from "@/components/pages/CharacterSelection/CharacterSelection.vue";

@Options({
  components: {
    CharacterSelection,
    LoginPage,
    Inventory,
    CreateCharacter,
    PanelComponentsSetting,
    auth,
    registration,
  },
  data() {
    return {
      ComponentName: null
    }
  },
  methods: {
    test: function (data : any) {
      this.ComponentName = data.ComponentName;
    }
  }
})
export default class App extends Vue {
  mounted() {
    if (window.mp && rpc !== null) {
      rpc.callClient("Browser::ready", {
        success: true,
        data: true,
      });
    }
  }
}
</script>

<style lang="scss">
@import "./assets/css/index.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
