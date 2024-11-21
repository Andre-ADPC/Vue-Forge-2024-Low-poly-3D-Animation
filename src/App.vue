<script setup lang="ts">
import { useSettingsStore } from './pinia_stores/useSettingsStore'
import { TresCanvas } from '@tresjs/core'
import { PCFSoftShadowMap } from 'three'
import TheScene from './components/TheScene.vue'

const settingsStore = useSettingsStore()
</script>

<template>
  <div>
    <!-- 3D Canvas -->
    <TresCanvas clear-color="#020202" window-size shadows :shadow-map-type="PCFSoftShadowMap">
      <TheScene
        v-bind="settingsStore.visibility"
        :rotationSpeed="settingsStore.rotationSpeed"
        :airplaneDistance="settingsStore.airplaneDistance"
      />
    </TresCanvas>

    <!-- Menu Button -->
    <button class="menu-button" @click="settingsStore.toggleModal">Menu</button>

    <!-- Modal -->
    <div v-if="settingsStore.isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h2>Settings</h2>

        <!-- Master Visibility Toggle -->
        <div class="modal-section">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              v-model="settingsStore.showAll"
              @change="settingsStore.setMasterVisibility(settingsStore.showAll)"
            />
            Show All Components
          </label>
        </div>

        <!-- Component Visibility Toggles -->
        <div class="modal-section">
          <h3>Component Visibility</h3>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="settingsStore.visibility.coordinates" />
            Show Coordinates
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="settingsStore.visibility.planet" />
            Show Planet
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="settingsStore.visibility.clouds" />
            Show Clouds
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="settingsStore.visibility.airplane" />
            Show Airplane
          </label>
        </div>

        <!-- Adjustable Parameters -->
        <div class="modal-section">
          <h3>Adjustable Parameters</h3>
          <div>
            <label>Rotation Speed</label>
            <input type="range" v-model="settingsStore.rotationSpeed" min="0.01" max="1.0" step="0.01" />
            <input
              type="number"
              v-model="settingsStore.rotationSpeed"
              :class="settingsStore.rotationSpeed === 0.1 ? 'muted' : 'dark'"
            />
          </div>
          <div>
            <label>Airplane Distance</label>
            <input type="range" v-model="settingsStore.airplaneDistance" min="1" max="10" step="0.1" />
            <input
              type="number"
              v-model="settingsStore.airplaneDistance"
              :class="settingsStore.airplaneDistance === 5.0 ? 'muted' : 'dark'"
            />
          </div>
        </div>

        <!-- Controls -->
        <div class="modal-section">
          <button @click="settingsStore.resetSettings">Reset to Default</button>
          <button @click="settingsStore.toggleModal">Apply</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Refer to style.css */
</style>
