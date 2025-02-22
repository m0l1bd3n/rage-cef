<!-- InventoryView.vue -->
<template>
  <div
      class="inventory-grid"
      ref="gridRef"
      @dragover="handleDragOver"
      @drop="handleDrop"
      @dragleave="handleDragLeave"
  >
    <!-- Фоновая сетка -->
    <div
        v-for="cell in gridCells"
        :key="`cell-${cell.x}-${cell.y}`"
        class="grid-cell"
        :style="{ 'grid-column': cell.x, 'grid-row': cell.y }"
    ></div>
    <!-- Предметы -->
    <div
        v-for="(item, index) in items"
        :key="`item-${item.id}`"
        class="inventory-item"
        :style="getItemStyle(item)"
        :draggable="true"
        @dragstart="handleDragStart($event, index)"
        @dragenter="handleDragEnter($event, index)"
        @dragend="handleDragEnd"
        @dblclick="rotateItem(index)"
        @contextmenu.prevent="showContextMenu($event, index)"
    >
      <img
          v-if="item.image"
          :src="item.image"
          :alt="item.name"
          draggable="false"
          :style="getImageStyle(item)"
      >
    </div>
    <!-- Контекстное меню -->
    <div
        v-if="contextMenu.visible"
        class="context-menu"
        :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }"
        @click.stop
    >
      <div class="context-item" @click="useItem">Использовать</div>
      <div class="context-item" @click="toQuickSlot">В быстрый слот</div>
      <div class="context-item" @click="dropItem">Выбросить</div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref } from 'vue';

export default {
  name: 'InventoryView',
  setup() {
    const gridRef = ref(null);

    const state = reactive({
      items: [
        { id: 1, name: 'Винтовка', type: 'weapon', x: 1, y: 1, size_x: 3, size_y: 1, image: require('@/assets/images/weapon.png'), isRotated: false },
        { id: 2, name: 'Бронижилет', type: 'armor', x: 4, y: 1, size_x: 2, size_y: 2, image: require('@/assets/images/armor.png'), isRotated: false },
        { id: 3, name: 'Пистолет', type: 'secondary_weapon', x: 1, y: 3, size_x: 1, size_y: 1, image: require('@/assets/images/pistol.png'), isRotated: false },
        { id: 4, name: 'Аптечка', type: 'medkit', x: 3, y: 4, size_x: 2, size_y: 1, image: require('@/assets/images/medkit.webp'), isRotated: false }
      ],
      draggedIndex: null,
      highlightedCells: [],
      dragOffset: { x: 0, y: 0 },
      contextMenu: {
        visible: false,
        x: 0,
        y: 0,
        selectedIndex: null
      }
    });

    const gridCells = computed(() => {
      const cells = [];
      for (let y = 1; y <= 10; y++) {
        for (let x = 1; x <= 5; x++) {
          cells.push({ x, y });
        }
      }
      return cells;
    });

    const getItemStyle = (item) => ({
      'grid-column': `${item.x} / span ${item.size_x}`,
      'grid-row': `${item.y} / span ${item.size_y}`,
      width: `${item.size_x * 70}px`,
      height: `${item.size_y * 70}px`
    });

    const getImageStyle = (item) => {
      const baseWidth = item.size_x * 70 * 0.8;
      const baseHeight = item.size_y * 70 * 0.8;
      return {
        transform: item.isRotated ? 'rotate(90deg)' : 'rotate(0deg)',
        width: item.isRotated ? `${baseHeight}px` : `${baseWidth}px`,
        height: item.isRotated ? `${baseWidth}px` : `${baseHeight}px`
      };
    };

    const handleDragStart = (event, index) => {
      state.draggedIndex = index;
      event.dataTransfer.setData('text/plain', index);
      event.target.style.opacity = '0.5';
      event.target.style.cursor = 'grabbing';

      const item = state.items[index];
      const rect = event.target.getBoundingClientRect();
      state.dragOffset.x = Math.floor((event.clientX - rect.left) / 70);
      state.dragOffset.y = Math.floor((event.clientY - rect.top) / 70);

      console.log(`Drag Start: Item "${item.name}" at index ${index}, offset (${state.dragOffset.x}, ${state.dragOffset.y})`);
    };

    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDragEnter = (event, index) => {
      event.preventDefault();
      const draggedItem = state.items[state.draggedIndex];
      if (!gridRef.value) {
        console.error('Drag Enter: Grid reference not found');
        return;
      }

      const rect = gridRef.value.getBoundingClientRect();
      const cursorX = Math.floor((event.clientX - rect.left) / 70) + 1;
      const cursorY = Math.floor((event.clientY - rect.top) / 70) + 1;
      const newX = Math.max(1, Math.min(5 - draggedItem.size_x + 1, cursorX - state.dragOffset.x));
      const newY = Math.max(1, Math.min(10 - draggedItem.size_y + 1, cursorY - state.dragOffset.y));

      console.log(`Drag Enter: Attempting to highlight at (${newX}, ${newY}) for "${draggedItem.name}"`);

      state.highlightedCells = [];
      for (let y = 0; y < draggedItem.size_y; y++) {
        for (let x = 0; x < draggedItem.size_x; x++) {
          state.highlightedCells.push({ x: newX + x, y: newY + y });
        }
      }

      const canPlace = canPlaceItem(draggedItem, newX, newY, state.draggedIndex);
      highlightCells(canPlace ? '#303030' : '#ff3333');
    };

    const handleDragLeave = () => {
      console.log('Drag Leave: Clearing highlight');
      clearHighlight();
      state.highlightedCells = [];
    };

    const handleDrop = (event) => {
      event.preventDefault();
      const sourceIndex = state.draggedIndex;
      const draggedItem = state.items[sourceIndex];
      if (!gridRef.value) {
        console.error('Drop: Grid reference not found');
        return;
      }

      const rect = gridRef.value.getBoundingClientRect();
      const cursorX = Math.floor((event.clientX - rect.left) / 70) + 1;
      const cursorY = Math.floor((event.clientY - rect.top) / 70) + 1;
      const newX = Math.max(1, Math.min(5 - draggedItem.size_x + 1, cursorX - state.dragOffset.x));
      const newY = Math.max(1, Math.min(10 - draggedItem.size_y + 1, cursorY - state.dragOffset.y));

      console.log(`Drop: Attempting to place "${draggedItem.name}" at (${newX}, ${newY})`);

      // Проверяем, можно ли разместить предмет напрямую
      if (canPlaceItem(draggedItem, newX, newY, sourceIndex)) {
        draggedItem.x = newX;
        draggedItem.y = newY;
        console.log(`Drop Success: "${draggedItem.name}" moved to (${newX}, ${newY})`);
      } else {
        // Ищем предмет, занимающий место
        const overlappingItemIndex = state.items.findIndex((item, idx) =>
            idx !== sourceIndex &&
            item.x <= newX && newX < item.x + item.size_x &&
            item.y <= newY && newY < item.y + item.size_y
        );

        if (overlappingItemIndex !== -1) {
          const overlappingItem = state.items[overlappingItemIndex];
          console.log(`Overlap detected with "${overlappingItem.name}" at (${overlappingItem.x}, ${overlappingItem.y})`);

          // Пробуем поменять местами
          const oldX = draggedItem.x;
          const oldY = draggedItem.y;

          draggedItem.x = newX;
          draggedItem.y = newY;

          overlappingItem.x = oldX;
          overlappingItem.y = oldY;

          // Проверяем, возможен ли обмен
          if (canPlaceItem(draggedItem, newX, newY, sourceIndex) && canPlaceItem(overlappingItem, oldX, oldY, overlappingItemIndex)) {
            console.log(`Swap Success: "${draggedItem.name}" to (${newX}, ${newY}), "${overlappingItem.name}" to (${oldX}, ${oldY})`);
          } else {
            // Если обмен невозможен, ищем свободное место для вытесненного предмета
            const freeSpot = findFreeSpot(overlappingItem);
            if (freeSpot) {
              overlappingItem.x = freeSpot.x;
              overlappingItem.y = freeSpot.y;
              draggedItem.x = newX;
              draggedItem.y = newY;
              console.log(`Displacement Success: "${draggedItem.name}" to (${newX}, ${newY}), "${overlappingItem.name}" to (${freeSpot.x}, ${freeSpot.y})`);
            } else {
              // Если свободного места нет, отменяем перемещение
              draggedItem.x = oldX;
              draggedItem.y = oldY;
              console.error(`Drop Failed: No free spot for "${overlappingItem.name}"`);
            }
          }
        } else {
          console.error(`Drop Failed: Cannot place "${draggedItem.name}" at (${newX}, ${newY})`);
        }
      }

      clearHighlight();
      state.highlightedCells = [];
    };

    const handleDragEnd = (event) => {
      event.target.style.opacity = '1';
      event.target.style.cursor = 'grab';
      state.draggedIndex = null;
      state.dragOffset = { x: 0, y: 0 };
      console.log('Drag End: Drag operation completed');
      clearHighlight();
      state.highlightedCells = [];
    };

    const canPlaceItem = (item, x, y, excludeIndex) => {
      if (x < 1 || y < 1 || x + item.size_x - 1 > 5 || y + item.size_y - 1 > 10) {
        console.warn(`CanPlaceItem: Out of bounds for "${item.name}" at (${x}, ${y})`);
        return false;
      }

      for (let row = 0; row < item.size_y; row++) {
        for (let col = 0; col < item.size_x; col++) {
          const checkX = x + col;
          const checkY = y + row;
          const cellOccupied = state.items.some((otherItem, idx) =>
              idx !== excludeIndex &&
              otherItem.x <= checkX && checkX < otherItem.x + otherItem.size_x &&
              otherItem.y <= checkY && checkY < otherItem.y + otherItem.size_y
          );
          if (cellOccupied) {
            console.warn(`CanPlaceItem: Collision detected for "${item.name}" at (${checkX}, ${checkY})`);
            return false;
          }
        }
      }
      console.log(`CanPlaceItem: Placement allowed for "${item.name}" at (${x}, ${y})`);
      return true;
    };

    const findFreeSpot = (item) => {
      for (let y = 1; y <= 10 - item.size_y + 1; y++) {
        for (let x = 1; x <= 5 - item.size_x + 1; x++) {
          if (canPlaceItem(item, x, y, state.items.indexOf(item))) {
            return { x, y };
          }
        }
      }
      return null; // Нет свободного места
    };

    const highlightCells = (color) => {
      clearHighlight();
      state.highlightedCells.forEach(cell => {
        const el = document.querySelector(`.grid-cell[style*="grid-column: ${cell.x};"][style*="grid-row: ${cell.y};"]`);
        if (el) {
          el.style.background = color;
          console.log(`Highlighting cell at (${cell.x}, ${cell.y}) with color ${color}`);
        } else {
          console.warn(`Highlight failed: Cell not found at (${cell.x}, ${cell.y})`);
        }
      });
    };

    const clearHighlight = () => {
      document.querySelectorAll('.grid-cell').forEach(el => {
        el.style.background = '#101010';
      });
      console.log('ClearHighlight: All highlights cleared');
    };

    const rotateItem = (index) => {
      const item = state.items[index];

      if (item.size_x === item.size_y) {
        console.log(`Cannot rotate square item: ${item.name} (size: ${item.size_x}x${item.size_y})`);
        return;
      }

      console.log(`Rotating item: ${item.name}, current size: ${item.size_x}x${item.size_y}`);

      const originalSizeX = item.size_x;
      const originalSizeY = item.size_y;

      item.size_x = originalSizeY;
      item.size_y = originalSizeX;
      item.isRotated = !item.isRotated;

      item.x = Math.min(item.x, 5 - item.size_x + 1);
      item.y = Math.min(item.y, 10 - item.size_y + 1);

      if (!canPlaceItem(item, item.x, item.y, index)) {
        console.warn(`Cannot place "${item.name}" at (${item.x}, ${item.y}) after rotation, reverting`);
        item.size_x = originalSizeX;
        item.size_y = originalSizeY;
        item.isRotated = !item.isRotated;
      } else {
        console.log(`Rotated to size: ${item.size_x}x${item.size_y}, position: (${item.x}, ${item.y})`);
      }
    };

    const showContextMenu = (event, index) => {
      event.preventDefault();
      state.contextMenu = {
        visible: true,
        x: event.clientX,
        y: event.clientY,
        selectedIndex: index
      };

      const closeMenu = () => {
        state.contextMenu.visible = false;
        document.removeEventListener('click', closeMenu);
      };
      setTimeout(() => document.addEventListener('click', closeMenu), 0);
    };

    const useItem = () => {
      const item = state.items[state.contextMenu.selectedIndex];
      console.log(`Using item: ${item.name}`);
      state.contextMenu.visible = false;
    };

    const toQuickSlot = () => {
      const item = state.items[state.contextMenu.selectedIndex];
      console.log(`Moving ${item.name} to quick slot`);
      state.contextMenu.visible = false;
    };

    const dropItem = () => {
      const index = state.contextMenu.selectedIndex;
      const item = state.items[index];
      console.log(`Dropping item: ${item.name}`);
      state.items.splice(index, 1);
      state.contextMenu.visible = false;
    };

    return {
      gridRef,
      gridCells,
      items: state.items,
      getItemStyle,
      getImageStyle,
      handleDragStart,
      handleDragOver,
      handleDragEnter,
      handleDragLeave,
      handleDrop,
      handleDragEnd,
      rotateItem,
      showContextMenu,
      contextMenu: state.contextMenu,
      useItem,
      toQuickSlot,
      dropItem
    };
  }
};
</script>

<style scoped>
.inventory-grid {
  width: 350px;
  height: 700px;
  display: grid;
  grid-template-columns: repeat(5, 70px);
  grid-template-rows: repeat(10, 70px);
  position: relative;
}

.grid-cell {
  width: 70px;
  height: 70px;
  background: #101010;
  border: 1px solid #1B1B1B;
  border-radius: 3px;
  box-sizing: border-box;
}

.inventory-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(50, 50, 50, 0.8);
  border: 1px solid #1B1B1B;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: grab;
  transition: opacity 0.2s ease;
  z-index: 1;
}

.inventory-item:hover {
  background: rgba(70, 70, 70, 0.8);
}

.inventory-item img {
  object-fit: contain;
}

.context-menu {
  position: fixed;
  background: #2a2a2a;
  border: 1px solid #1B1B1B;
  border-radius: 3px;
  z-index: 1000;
  min-width: 150px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.context-item {
  padding: 8px 12px;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.context-item:hover {
  background: #404040;
}
</style>