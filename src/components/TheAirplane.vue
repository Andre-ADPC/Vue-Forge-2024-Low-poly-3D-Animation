<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import type { Object3D } from 'three'
import { shallowRef, watch } from 'vue'

const props = defineProps<{
  planet: Object3D
}>()

const { scene } = await useGLTF(
  './public/assets/airplane.gltf',
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
const rollSpeed = 1.2 // Speed of the roll

onBeforeRender(({ delta }) => {
  if (!airplane || !props.planet) { return }

  // Update orbit position
  angle += delta * speed
  const x = radius * Math.cos(angle)
  const z = radius * Math.sin(angle)
  airplane.position.set(x, 0, z)

  // Calculate yaw to align airplane to the orbit path
  const yaw = Math.atan2(z, x) //- Math.PI / 2

  // Update aileron roll (independent of yaw)
  rollAngle += delta * rollSpeed

  // Apply rotations
  airplane.rotation.set(
    0, // Remove tilt/tumble (Z-axis)
    -yaw, // Yaw to face forward along the orbit
    rollAngle, // Roll around fuselage (X-axis)
  )

  airplane.updateMatrixWorld()
})
</script>

<template>
  <primitive :object="airplane" />
</template>
