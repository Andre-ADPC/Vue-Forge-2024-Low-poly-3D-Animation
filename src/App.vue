<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { PCFSoftShadowMap } from 'three'

// Render various Experiences individually or combined by building other Experience versions.

// import TheScene from './components/TheSceneOrigins.vue'
// import TheScene from './components/TheSceneAirplane.vue'
// import TheScene from './components/ThePlanet.vue'
import TheScene from './components/TheScene.vue'
</script>

<template>
  <TresCanvas clear-color="#020202" window-size shadows :shadow-map-type="PCFSoftShadowMap">
    <TheScene />
  </TresCanvas>
</template>
