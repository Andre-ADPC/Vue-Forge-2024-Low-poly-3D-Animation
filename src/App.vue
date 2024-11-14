<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { PCFSoftShadowMap } from 'three'

//import TheExperience from './components/TheExperienceOrigins.vue'
import TheExperience from './components/TheExperience.vue'
</script>

<template>
  <TresCanvas clear-color="#000000" window-size shadows :shadow-map-type="PCFSoftShadowMap">
    <TheExperience />
  </TresCanvas>
</template>
