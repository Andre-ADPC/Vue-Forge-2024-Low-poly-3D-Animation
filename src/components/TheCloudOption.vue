<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import type { Object3D, Vector3 } from 'three'
// import { shallowRef, watch } from 'vue'

const props = defineProps<{
  planet: Object3D
}>()

const { scene } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/low-poly/cloud.gltf')

const cloud = scene.children[0] as Object3D
cloud.castShadow = true
// create a function to return a random number between two values with random sign
function random(min: number, max: number): number {
  const randomNumber = Math.random() * (max - min) + min
  return Math.random() < 0.5 ? -randomNumber : randomNumber
}

cloud.position.set(random(-8, 8), random(0.5, 1), random(-8, 8))

const size = random(0.5, 1)
cloud.scale.set(size, size, size)
cloud.updateMatrixWorld()

watch(
  () => props.planet,
  (planet: { position: Vector3; }) => {
    if (!planet) { return }
    cloud.lookAt(planet.position)
    cloud.updateMatrixWorld()
  },
)

const { onBeforeRender } = useLoop()

let angle = random(-1, 1) * Math.PI
const speed = Math.random() / 10

onBeforeRender(({ delta }) => {
  if (!cloud) { return }

  const radius = Math.abs(props.planet.geometry.boundingSphere.radius + 0.25)
  angle += delta * speed
  const x = radius * Math.cos(angle)
  const z = radius * Math.sin(angle)
  cloud.position.x = x
  cloud.position.z = z
  cloud.rotation.y = -angle
  cloud.lookAt(props.planet.position)
  cloud.updateMatrixWorld()
})

function watch(arg0: () => Object3D<import('three').Object3DEventMap>, arg1: (planet: { position: Vector3; }) => void) {
  throw new Error('Function not implemented.');
}
</script>

<template>
  <primitive
    :object="scene"
    cast-shadow
  />
</template>
