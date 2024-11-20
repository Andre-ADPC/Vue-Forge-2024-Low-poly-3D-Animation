# Handy Code Tips for Strictly Typed TS

## 1. Configuring the TypeScript Setup in VS Code

### Optimizing Linters for Vue + TypeScript

My default and go-to IDE is VS Code. I use it for various project types and apply a wide variety of programming languages, even down to compiled languages like C, C# and Java.

Obviously with all the gazillions of extensions available, and only selecting proven, high-quality expensions, the workflows in any of these projects can and do become messy, slow and downright confusing at times, especially for a newb like me.

In my experience gained over the past number of years, I have settled in (for now) with a few basic workflow-enhancing options and tools. This will only cover the linters I prefer to use and the reasons for doing so are various, however, the ones listed below have and still cover my needs and asists quite elegantly to keep things "powerful", yet as performant as possible.

If you're using multiple linting tools, like `SonarLint`, `ESLint`, `Stylelint`, and `Prettier`, some redundancy might slow down your workflow. Here's how I've streamline my workflow:

__1. Focus on ESLint:__

- Configure ESLint as your primary linter for TypeScript and Vue.
- Ensure you have the correct plugins:

```shell
npm install eslint eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev

```

- Use an `.eslintrc.js` setup file for Vue + TypeScript:
- Place this file in the Project Root.

```javascript
module.exports = {
    // Other exports ...
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  // Other Plugins ...
  extends: [
    // Note: the order of these `extends:` entries can have an impact.
    // Do some research on ESLint and Prettier specifically as they complement 
    // eachother very well when configured properly.
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    // Customize Other Rules Here
  },
};

```

__2. Integrate Prettier for Formatting:__

- Add a `.prettierrc` file in the Project Root:

```json
// Other Entries ...
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5"
}

```

__3. Remove Redundant Linters:__

- If ESLint is configured for Vue + TypeScript and Prettier handles formatting, you may not need other linting features.
- For those who still use __Vetur__, consider disabling Vetur's linting in the extensions' settings.
- The newer __Vue - Official__ extension has replaced __~~Vetur~~__ as the recommended option already.

---

## 2. `watch` vs `watchEffect`

### Key Differences

- __watchEffect:__
- Automatically tracks dependencies inside the effect function.
- Runs immediately upon setup and whenever dependencies change.
- Does not expose the previous or current value of a reactive variable.
- Usage: Ideal for _dependency-less_ tracking or when you want automatic reactivity.

- __watch:__
- Explicitly tracks changes to one or more reactive sources.
- Provides access to both previous and current values.
- Usage: Suitable when you need fine-grained control over reactivity or track specific reactive sources.

__Which One Should We Use?__

In this case, watch is more appropriate because:

- We are specifically tracking `props.planet` and reacting only when it changes.
- It allows us to type `planet` correctly in the callback, ensuring properties like geometry are safely accessed.

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
