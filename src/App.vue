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
    <button class="fixed px-4 py-2 font-bold text-white bg-blue-500 rounded btn top-4 right-4" @click="settingsStore.toggleModal">Menu</button>

    <!-- Modal -->
    <div v-if="settingsStore.isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div class="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2>Settings</h2>

        <!-- Master Visibility Toggle -->
        <div class="mb-4">
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
        <div class="mb-4">
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
        <div class="mb-4">
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
        <div class="mb-4">
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
