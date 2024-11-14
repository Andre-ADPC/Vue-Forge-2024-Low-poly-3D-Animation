<script setup lang="ts">
import { ref } from 'vue'
import { useGLTF } from '@tresjs/cientos'
import { type TresObject, useLoop } from '@tresjs/core'
import TheCloud from './TheCloud.vue'
import TheAirplane from './TheAirplane.vue'

const { nodes } = await useGLTF('/low-poly-planet/low-poly-planet.glb')

const { onBeforeRender } = useLoop()

const planetRef = ref<TresObject | null>(null)
const planet = nodes.Planet
const icosphere = nodes.Icosphere

planet.traverse((child) => {
  if (child.type === 'Mesh') {
    child.receiveShadow = true
  }
})

const cloudsRef = ref<TresObject | null>(null)
const clouds = Object.values(nodes).filter(node => node.name.includes('Cloud'))

const trees = Object.values(nodes).filter(node => node.name.includes('Tree'))

const airplane = nodes.Airplane

console.log('nodes', nodes)

trees.forEach((tree) => {
  tree.traverse((child) => {
    if (child.type === 'Mesh') {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
})

onBeforeRender(({ delta }) => {
  if (!planetRef.value) { return }

  planetRef.value.rotation.y -= delta * 0.04
  planetRef.value.rotation.x += delta * 0.003
  planetRef.value.rotation.z += delta * 0.02
})
</script>

<template>
  <primitive ref="planetRef" :object="planet" />
  <TheAirplane :planet="icosphere" />
  <TheCloud
    v-for="cloud of [1, 2, 3, 4, 5, 6, 7, 8, 9]"
    :key="cloud"
    :planet="icosphere"
  />
</template>ß
