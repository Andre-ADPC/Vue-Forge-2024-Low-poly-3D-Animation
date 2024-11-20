<script setup lang="ts"> 
import { ref, shallowRef } from 'vue'
import { useGLTF } from '@tresjs/cientos' 
import { type TresObject, useLoop } from '@tresjs/core' 
import { Mesh, Object3D } from 'three'
import Clouds from './Clouds.vue' 
import Airplane from './Airplane.vue' 

// Reactive references
const planetRef = ref<TresObject | null>(null)
const icosphere = shallowRef<TresObject | null>(null)

// Load GLTF model asynchronously
const nodes = shallowRef<Record<string, any>>({})
useGLTF('./public/assets/low-poly-planet.glb').then(({ nodes: loadedNodes }) => {
nodes.value = loadedNodes

const planet = nodes.value.Planet
if (planet) {
    planet.traverse((child) => {
        if (child instanceof Mesh) {
        child.receiveShadow = true
    }
    })
    planetRef.value = planet
}

const icosphereNode = nodes.value.Icosphere
if (icosphereNode) {
    icosphereNode.traverse((child) => {
        if (child instanceof Mesh) {
        child.castShadow = true
        child.receiveShadow = true
        }
    })
    icosphere.value = icosphereNode
}

// Process trees for shadows
const trees = Object.values(nodes.value).filter((node) => node.name.includes('Tree'))
    trees.forEach((tree) => {
        tree.traverse((child) => {
    if (child instanceof Mesh) {
            child.castShadow = true
            child.receiveShadow = true
            }
        })
    })
})

// Animation loop for planet rotation
const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
    if (planetRef.value) {
    // Rotate the planet dynamically
        planetRef.value.rotation.y += delta * 0.1
        planetRef.value.rotation.x -= delta * 0.003
        planetRef.value.rotation.z -= delta * 0.02
    }
})
</script>

<template>
<!-- Render planet -->
    <primitive ref="planetRef" v-if="planetRef" :object="planetRef" />

<!-- Add airplane, passing the icosphere -->
    <Airplane v-if="icosphere" :planet="icosphere" />

<!-- Render multiple clouds around the planet -->
    <Clouds
        v-for="cloud of 9"
        :key="cloud"
        v-if="icosphere"
        :planet="icosphere"
    />
</template>
