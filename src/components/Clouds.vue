<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import type { Object3D, Vector3 } from 'three' // Vector3 will be used later, leave it in.
import { Mesh } from 'three'
import { shallowRef, watch } from 'vue'

// Props for Passing the Planet Object
const props = defineProps<{
  planet: Object3D
}>()

// Load the cloud GLTF model asynchronously
const cloud = shallowRef<Object3D | null>(null)
useGLTF('./public/assets/cloud.gltf').then(({ scene }) => {
  const loadedCloud = scene.children[0] as Object3D
  loadedCloud.castShadow = true

  // Randomize position and size
  function random(min: number, max: number): number {
    const randomNumber = Math.random() * (max - min) + min
    return Math.random() < 0.5 ? -randomNumber : randomNumber
  }

  loadedCloud.position.set(random(-8, 8), random(0.5, 1), random(-8, 8))
  const size = random(0.5, 1)
  loadedCloud.scale.set(size, size, size)

  loadedCloud.updateMatrixWorld()
  cloud.value = loadedCloud
})

// Watch for Updates to the Planet and adjust the Cloud Object’s behaviour:
const radius = shallowRef(1)
// The `props.planet.geometry.computeBoundingSphere()` is Invoked Correctly.
// Confirming: `boundingSphere?.radius` Uses a Fallback Value other than | 1
watch(() => props.planet, (planet: Object3D | null) => {
  if (planet instanceof Mesh && planet.geometry) {
    planet.geometry.computeBoundingSphere()
    radius.value = Math.abs(planet.geometry.boundingSphere?.radius || 1) + 0.5
  }
})

// Cloud animation logic
const { onBeforeRender } = useLoop()

let angle = Math.random() * Math.PI * 2
const speed = Math.random() / 10

onBeforeRender(({ delta }) => {
  if (!cloud.value || !props.planet) return

  // Update cloud position based on orbit
  angle += delta * speed
  const x = radius.value * Math.cos(angle)
  const z = radius.value * Math.sin(angle)

  cloud.value.position.set(x, cloud.value.position.y, z)
  cloud.value.rotation.y = -angle
  cloud.value.lookAt(props.planet.position)
  cloud.value.updateMatrixWorld()
})
</script>

<template>
  <!-- Render the cloud object -->
  <primitive v-if="cloud" :object="cloud" cast-shadow />
</template>
