<template>
  <div class="panel-components">
    <div class="buttons-block">
      <button v-on:click="ComponentActivate('AUTH')">AUTH</button>
<!--      <button v-on:click="ComponentActivate('REGISTRATION')">REGISTRATION</button>-->
      <button v-on:click="ComponentActivate('CHARACTER_SELECTION')">CHARACTER_SELECTION</button>
      <button v-on:click="ComponentActivate('CREATE_CHARACTER')">CREATE_CHARACTER</button>
      <button v-on:click="ComponentActivate('INVENTORY')">INVENTORY</button>
      <button v-on:click="ComponentActivate(null)">СКРЫТЬ КОМПОНЕНТЫ</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PanelComponentsSetting",
  data() {
    return {
      ComponentName: null
    }
  },
  
  methods: {
    ComponentActivate: function (value) {
      
      this.ComponentName = value;
      this.$emit('ComponentActivate', {
        ComponentName: this.ComponentName
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
