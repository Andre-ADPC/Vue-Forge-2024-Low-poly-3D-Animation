<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { PCFSoftShadowMap } from 'three'
import TheScene from './components/TheScene.vue'

import { ref } from 'vue'

// Render Various Scenes Individually or Combined by Building other Scene Versions.
// The entry Vue files we will use are:
// App.vue with a UI Modal view accessible via a menu icon at the top-right of the rendered page.
// TheScene.vue
// Planet.vue
// Clouds.vue
// Airplane.vue

// import TheScene from './components/TheSceneOrigins.vue'
// import TheScene from './components/TheSceneAirplane.vue'
// import TheScene from './components/ThePlanet.vue'

// Modal UI State
const isModalOpen = ref(false)
const toggleModal = () => (isModalOpen.value = !isModalOpen.value)
</script>

<template>
  <div>
    <!-- 3D Canvas -->
    <TresCanvas clear-color="#020202" window-size shadows :shadow-map-type="PCFSoftShadowMap">
      <TheScene />
    </TresCanvas>

    <!-- Menu Button -->
    <button class="menu-button" @click="toggleModal">Menu</button>

    <!-- Modal UI -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h2>Scene Settings</h2>
        <label>
          <input type="checkbox" />
          Toggle Coordinates
        </label>
        <label>
          <input type="checkbox" />
          Toggle Airplane
        </label>
        <label>
          <input type="checkbox" />
          Toggle Clouds
        </label>
        <label>
          <input type="checkbox" />
          Toggle Planet
        </label>
        <button @click="toggleModal">Close</button>
      </div>
    </div>
  </div>
</template>

<style>
.menu-button {
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 10px 15px;
  background-color: #444;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>
