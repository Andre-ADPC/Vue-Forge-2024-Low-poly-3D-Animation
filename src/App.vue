<script setup lang="ts">
import { useSettingsStore } from './pinia_stores/useSettingsStore'
import { TresCanvas } from '@tresjs/core'
import { PCFSoftShadowMap } from 'three'
import TheScene from './components/TheScene.vue'

import { ref, watch } from 'vue'

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
const settingsStore = useSettingsStore()
// Visibility and Settings States
const isModalOpen = ref(false)
const showAll = ref(true) // Master visibility toggle
const visibility = ref({
  coordinates: true,
  airplane: true,
  clouds: true,
  planet: true,
  airplaneAxes: false, // Euler axes for airplane
  planetAxes: false, // Euler axes for planet
})

// Adjustable Parameters
const rotationSpeed = ref(0.1)
const airplaneDistance = ref(5.0)

// Default Settings
const defaultSettings = {
  visibility: {
    coordinates: true,
    airplane: true,
    clouds: true,
    planet: true,
    airplaneAxes: false,
    planetAxes: false,
  },
  rotationSpeed: 0.1,
  airplaneDistance: 5.0,
}

// Toggle modal visibility
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

// Master visibility toggle
watch(showAll, (newValue) => {
  Object.keys(visibility.value).forEach((key) => {
    visibility.value[key] = newValue
  })
})

// Apply changes from modal
const applySettings = () => {
  isModalOpen.value = false
}

// Reset settings to default
const resetSettings = () => {
  Object.assign(visibility.value, defaultSettings.visibility)
  rotationSpeed.value = defaultSettings.rotationSpeed
  airplaneDistance.value = defaultSettings.airplaneDistance
  showAll.value = true
}
</script>

<template>
  <div>
    <!-- 3D Canvas -->
    <TresCanvas clear-color="#020202" window-size shadows :shadow-map-type="PCFSoftShadowMap">
      <TheScene 
      v-bind="visibility"
        :rotationSpeed="rotationSpeed"
        :airplaneDistance="airplaneDistance"
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
          <label>
            <input type="checkbox" v-model="settingsStore.showAll" @change="settingsStore.setMasterVisibility(settingsStore.showAll)" />
            Show All Components
          </label>
        </div>

        <!-- Component Visibility Toggles -->
        <div class="modal-section">
          <h3>Component Visibility</h3>
          <label>
            <input type="checkbox" v-model="settingsStore.visibility.coordinates" />
            Show Coordinates
          </label>
          <label>
            <input type="checkbox" v-model="settingsStore.visibility.planet" />
            Show Planet
          </label>
          <label>
            <input type="checkbox" v-model="settingsStore.visibility.clouds" />
            Show Clouds
          </label>
          <label>
            <input type="checkbox" v-model="settingsStore.visibility.airplane" />
            Show Airplane
          </label>
        </div>

        <!-- Axis Visibility Toggles -->
        <div class="modal-section">
          <h3>Axes Visibility</h3>
          <label>
            <input type="checkbox" v-model="settingsStore.visibility.planetAxes" />
            Show Planet Axes
          </label>
          <label>
            <input type="checkbox" v-model="settingsStore.visibility.airplaneAxes" />
            Show Airplane Axes
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
/* DaisyUI Styling */
.menu-button {
  @apply fixed top-4 right-4 btn btn-primary;
}
.modal-overlay {
  @apply fixed inset-0 flex justify-center items-center bg-black bg-opacity-75;
}
.modal-content {
  @apply bg-white p-6 rounded-lg shadow-lg w-96;
}
.modal-section {
  @apply mb-4;
}
input.muted {
  @apply text-gray-400;
}
input.dark {
  @apply text-gray-800;
}
</style>
