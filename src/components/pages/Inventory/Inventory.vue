<template>
  <div class="inventory">
    <div class="inventory-container">
      <div class="title-container border-radius-top">
        <div class="title-container_text">
          ПРЕДМЕТЫ РЯДОМ
        </div>
      </div>
      <div class="inventory-container_things-beside">
        <div class="items-container">
          <div class="items-container_item" v-for="item in itemsBeside" :key="item.text">
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
      <div class="title-container">
        <div class="title-container_text">
          ИНВЕНТАРЬ
        </div>
        <div class="indication-weight">
          <div class="indication-weight_block-text">
            <span class="indication-weight_num taken">10</span>
            <span class="indication-weight_num free">/70 кг</span>
          </div>
          <progress class="indication-weight_progress"></progress>
        </div>
      </div>
      <div class="inventory-container_things-inventory">
        <div class="items-container">
          <div class="items-container_item" v-for="item in itemsInventory" :key="item.text">
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
      <div class="title-container border-radius-bottom">
        <div class="title-container_text">
          БЫСТРЫЙ СЛОТ
        </div>
      </div>
      <div class="inventory-container_things-fast-slot">
        <div class="items-container">
          <div class="items-container_item" v-for="item in itemsFast" :key="item.text">
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="character-container">
      <div class="character-container_head">
        <div class="items-container items-character-top">
          <div class="items-container_item" v-for="item in itemsCharacterHead" :key="item.text">
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
      <div class="character-container_things-cloth">
        <div class="items-container items-character-left">
          <div class="items-container_item" v-for="item in itemsCharacterCloths" :key="item.text">
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
      <div class="character-container_things-weapon">
        <div class="items-container items-character-right">
          <div class="items-container_item" v-for="item in itemsCharacterWeapons" :key="item.text">
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
      <div class="character-container_things-shoes">
        <div class="items-container items-character-bottom">
          <div class="items-container_item" v-for="item in itemsCharacterShoes" :key="item.text">
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="inventory-container craft-container">
      <craft-item v-bind:itemsCraftList="itemsCraftList"></craft-item>
      <craft-menu v-if="itemsCraftList === 0" v-bind:itemsCraftPick="itemsCraftPick"
                  v-bind:itemsCraftList="itemsCraftList"></craft-menu>
    </div>
  </div>
</template>

<script>
import CraftItem from "@/components/pages/Inventory/craftItem";
import CraftMenu from "@/components/pages/Inventory/craftMenu";

export default {
  name: "Inventory",
  components: {CraftMenu, CraftItem},
  data() {
    return {
      isActive: false,
      itemsBeside: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      itemsInventory: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      itemsFast: ['1', '1', '1', '1', '1', '1'],
      itemsCharacterHead: ['1'],
      itemsCharacterCloths: ['1', '1', '1', '1', '1'],
      itemsCharacterWeapons: ['1', '1', '1', '1', '1'],
      itemsCharacterShoes: ['1'],
      itemsCraftPick: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      itemsCraftList: [
        {text: 'Шапка'},
        {text: 'Кросы'},
        {text: 'Рубашка'},
        {text: 'Майка'},
        {text: 'Анус Влада'},
        {text: 'Предмет'},
        {text: 'Предмет с '},
        {text: 'Предмет с!'},
        {text: 'Чебурек'},
        {text: 'Рубашка'},
        {text: 'Шашлычок'},
        {text: 'Круасан'},
        {text: 'Шапка'},
        {text: 'Шапка'},
        {text: 'Шапка'},
        {text: 'Шапка'},
        {text: 'Шапка'},
        {text: 'Шапка'},
        {text: 'Шапка'},
        {text: 'Шапка'},
        {text: 'Шапка'},
        {text: 'Шапка'},
        {text: 'Шапка'},
        {text: 'Шапка'},
        {text: 'Шапка'},
      ]
    }
  },
}
</script>

<style scoped>

</style>
