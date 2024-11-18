<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { PCFSoftShadowMap } from 'three'

// Render various Experiences individually or combined by building other Experience versions.

// import TheExperience from './components/TheExperienceOrigins.vue'
// import TheExperience from './components/TheExperienceAirplane.vue'
// import TheExperience from './components/ThePlanet.vue'
import TheExperience from './components/TheExperience.vue'
</script>

<template>
  <TresCanvas clear-color="#020202" window-size shadows :shadow-map-type="PCFSoftShadowMap">
    <TheExperience />
  </TresCanvas>
</template>
