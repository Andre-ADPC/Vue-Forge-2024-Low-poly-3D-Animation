<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import type { Object3D } from 'three'
import { shallowRef, watch } from 'vue'

const props = defineProps<{
  planet: Object3D
}>()

const { scene } = await useGLTF(
  '/public/assets/airplane.gltf',
)

const airplane = scene
scene.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true
  }
})
airplane.updateMatrixWorld()

const { onBeforeRender } = useLoop()

props.planet.geometry.computeBoundingSphere()
const radius = Math.abs(props.planet.geometry.boundingSphere?.radius | 1) + 0.5
airplane.position.set(radius, 0, 0)

let angle = Math.PI / 4 // Angle for orbiting the planet
const speed = 0.2 // Speed of orbit
let rollAngle = 0 // Angle for aileron roll
const rollSpeed = 2 // Speed of the roll

onBeforeRender(({ delta }) => {
  if (!airplane || !props.planet) { return }

  // Update orbit
  angle += delta * speed
  const x = radius * Math.cos(angle)
  const z = radius * Math.sin(angle)
  airplane.position.x = x
  airplane.position.z = z

  // Update roll
  rollAngle += delta * rollSpeed

  // Apply rotations
  airplane.rotation.x = rollAngle // Longitudinal roll
  airplane.rotation.z = -Math.PI / 2.314 // Tilting for aesthetic
  airplane.rotation.y = -angle // Keep oriented toward orbit

  airplane.updateMatrixWorld()
})
</script>

<template>
  <primitive :object="airplane" />
</template>
