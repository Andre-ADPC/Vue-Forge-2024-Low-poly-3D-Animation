# Handy Code Tips for Strictly Typed TS

## 1. `watch` vs `watchEffect`
__Key Differences__

-    __watchEffect:__
        - Automatically tracks dependencies inside the effect function.
        - Runs immediately upon setup and whenever dependencies change.
        - Does not expose the previous or current value of a reactive variable.
        - Usage: Ideal for _dependency-less_ tracking or when you want automatic reactivity. 

-    __watch:__
        - Explicitly tracks changes to one or more reactive sources.
        - Provides access to both previous and current values.
        - Usage: Suitable when you need fine-grained control over reactivity or track specific reactive sources. 

__Which One Should We Use?__

In this case, watch is more appropriate because:

-    We are specifically tracking `props.planet` and reacting only when it changes.
-    It allows us to type `planet` correctly in the callback, ensuring properties like geometry are safely accessed.
    
### Fixed Implementation
__Updated watch with Proper Typing:__

```typescript
// ... other `imports`
import { Mesh } from 'three'
import { watch, shallowRef } from 'vue'

// Other code ...

const radius = shallowRef(1)

// Watch for changes in props.planet
watch(() => props.planet, (planet: Object3D | null) => {
  if (planet instanceof Mesh && planet.geometry) {
    planet.geometry.computeBoundingSphere()
    radius.value = Math.abs(planet.geometry.boundingSphere?.radius || 1) + 0.5
  }
})
// Other code ...
```

---
