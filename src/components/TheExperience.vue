<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresPerspectiveCamera :position="[5, 5, 5]" />
  <OrbitControls />
  <TresAmbientLight
    :intensity="0.5"
  />
  <TresDirectionalLight
    :position="[0, 2, 4]"
    :intensity="1"
    cast-shadow
  />
  <TresAxesHelper />
  <TresMesh>
    <TresTorusGeometry :args="[2, 0.75, 16, 32]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
