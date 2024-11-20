<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { TresObject, useLoop } from '@tresjs/core'
import type { Object3D, Mesh, Vector3 } from 'three' // Vector3 will be used later, 
import { shallowRef, watch } from 'vue'

// See Notes in CODE_BUDDY.MD for additional information on Strict Types for TS.

// Props for Passing the Planet Object
const props = defineProps<{
  planet: Object3D
}>()

// Load the Aeroplane GLTF Model Asynchronously
const airplane = shallowRef<Object3D | null>(null)

// Apply `shallowRef` or `ref` for Handling `async` Loading Properly
useGLTF('./public/assets/airplane.gltf').then(({ scene }) => {
  scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true
    }
  })
  scene.updateMatrixWorld()
  airplane.value = scene
})

// Aeroplane Orbiting Properties
let angle = Math.PI / 4 // Angle for orbiting the planet
const speed = 0.2 // Speed of orbit
let rollAngle = 0 // Angle for aileron roll
const rollSpeed = 1.2 // Speed of the roll

// Dynamically compute radius once planet geometry is ready
const radius = shallowRef(1)
// The `props.planet.geometry.computeBoundingSphere()` is Invoked Correctly.
// Confirming: `boundingSphere?.radius` Uses a Fallback Value other than | 1
watch(() => props.planet, (planet: Object3D | null) => {
  if (planet instanceof Mesh && planet.geometry) {
    planet.geometry.computeBoundingSphere()
    radius.value = Math.abs(planet.geometry.boundingSphere?.radius || 1) + 0.5
  }
})

// Confirming: `onBeforeRender` properly tracks and updates only if BOTH `airplane` and `props.planet` are Loaded.
// Animate the airplane in the orbit
const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
  if (!airplane.value || !(props.planet instanceof Mesh)) return

  // Update orbit position
  angle += delta * speed
  const x = radius.value * Math.cos(angle)
  const z = radius.value * Math.sin(angle)
  airplane.value.position.set(x, 0, z)

  // Calculate yaw to align airplane to the orbit path
  const yaw = Math.atan2(z, x)

  // Update aileron roll
  rollAngle += delta * rollSpeed

  // Apply rotations
  airplane.value.rotation.set(
    0,      // Remove tilt/tumble (Z-axis)
    -yaw,   // Yaw to face forward along the orbit
    rollAngle // Roll around fuselage (X-axis)
  )

  airplane.value.updateMatrixWorld()
})
</script>

<template>
  <!-- Render airplane model -->
  <primitive :object="airplane" v-if="airplane" />
</template>
