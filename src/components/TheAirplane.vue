<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import type { Object3D } from 'three'
import { shallowRef, watch } from 'vue'

const props = defineProps<{
  planet: Object3D
}>()

const { scene } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/low-poly/airplane.gltf',
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

let angle = Math.PI / 4
const spin = Math.PI / 4
const speed = 0.2

onBeforeRender(({ delta }) => {
  if (!airplane || !props.planet) { return }

  angle += delta * speed
  const x = radius * Math.cos(angle)
  const z = radius * Math.sin(angle)
  airplane.position.x = x
  airplane.position.z = z
  airplane.rotation.x = spin
  airplane.rotation.z = -Math.PI / 2.314
  airplane.rotation.y = -angle
  airplane.updateMatrixWorld()
})
</script>

<template>
  <primitive :object="airplane" />
</template>
