<script setup lang="ts">
import { OrbitControls, Stars } from '@tresjs/cientos'
import ThePlanet from './ThePlanet.vue'
//     ^? Note: TwoSlash Queries does NOT work inside TS-based Scripts (yet) [See Orta](https://github.com/orta/vscode-twoslash-queries/issues/36#issuecomment-1823439282)
</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 5]" :near="0.001" :far="2000" />
  <OrbitControls />
  <TresAmbientLight />
  <TresDirectionalLight
    :shadow-bias="0.0001"
    cast-shadow
    :position="[2, 2, 5]"
    :look-at="[0, 0, 0]"
  />
  <Suspense>
    <ThePlanet />
  </Suspense>
  <Stars />
  <TresAxesHelper />
</template>
