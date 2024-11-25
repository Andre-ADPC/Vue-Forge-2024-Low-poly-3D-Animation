<!-- @format -->

# Handy Code Tips for Strictly Typed TS

## 1. Configuring the TypeScript Setup in VS Code

### Optimizing Linters for Vue + TypeScript

My default and go-to IDE is VS Code. I use it for various project types and apply a wide variety of programming languages, even down to compiled languages like C, C# and Java.

Obviously with all the gazillions of extensions available, and only selecting proven, high-quality expensions, the workflows in any of these projects can and do become messy, slow and downright confusing at times, especially for a newb like me.

In my experience gained over the past number of years, I have settled in (for now) with a few basic workflow-enhancing options and tools. This will only cover the linters I prefer to use and the reasons for doing so are various, however, the ones listed below have and still cover my needs and asists quite elegantly to keep things "powerful", yet as performant as possible.

If you're using multiple code linting and formatting tools, like `SonarLint`, `ESLint`, `Stylelint`, and `Prettier` formatter, some redundancy might slow down your workflow. Here's how I've streamline my workflow:

**1. Focus on ESLint:**

- Configure ESLint as your primary linter for TypeScript and Vue.
- Ensure you have the correct plugins:

ESLint can be configured using the **standard or legacy** way, using a JavaScript configuration file, or if you prefer to remain a "purista", you can use **[TypeScript ESLint](https://typescript-eslint.io/getting-started/)** and apply a **MJS-version** configuration file.

Do read the documentation to make sure the various configuration options are what you want for your project.

#### Using the TypeScript ESLint "flat" Configuration Format

```shell
npm install --save-dev eslint @eslint/js typescript typescript-eslint

```

#### Using ESLint's JavaScript Config file format instead:

```shell
npm install eslint eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev

```

A typical **`eslint.config.mjs`** **"flat-config"** file content example:

```typescript
/* `eslint.config.mjs` */
// flat-config version
// @ts-check

import eslint from '@eslint/js';
import someOtherConfig from 'eslint-config-other-configuration-that-enables-formatting-rules';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  someOtherConfig,
  prettierConfig
);
```

A typical **`eslint.config.js`** file content example:

```javascript
/* `eslint.config.js` */

module.exports = {
  // Other exports ...
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  // Other Plugins ...
  extends: [
    // Note: the order of these `extends:` entries can have an impact.
    // Do some research on ESLint and Prettier specifically as they complement
    // eachother very well when configured properly.
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    // Customize Other Rules Here
  },
};
```

- Use an `.eslintrc.js` setup file for Vue + TypeScript:
- Place this file in the Project Root.

The `.eslintrc.js` file is a _"legacy format"_ and contains various ESLint-Prettier Cross-configuration options to basically let both ESLint "flavours" focus on code **Linting** and Prettier focus on code **Formatting**.

It is also used in this project to extend formatting for Vue.JS components, among a host of other formatting functionality.

Here is a very basic version of an `.eslintrc.js` file:

```javascript
/* eslintrc.js */
// Legacy configuration version

/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'other-configuration-that-enables-formatting-rules',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
};
```

**2. Integrate Prettier for Formatting:**

Prettier was installed, however, should you need to reinstall it the command is as follows:

`npm install --save-dev prettier`

Compared to ESLint, Prettier doesn’t need a config file, meaning you can run and use it straight away. However, if you want to set a specific formatting configuration , you will need to create a file called .prettierrc.json in the project’s root directory, where you can define your format options.

- Add a `.prettierrc` file in the Project Root:

```json
// Other Entries ...
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

To ensure there are no conflicts between ESLint and Prettier, it is recommended to install `eslint-config-prettier` as it's the best solution to **disable ESLint rules** that are **irrelevant** to **code formatting**, as Prettier is already good at it:

```bash
npm install --save-dev eslint-config-prettier
```

Next, open and edit the `eslint.config.mjs` or `eslint.config.js` file, and add **`'prettier'`** at the **END** of your `[extends list]` array to disable any other previous rules from other plugins:

**3. Remove Redundant Linters:**

- If ESLint is configured for Vue + TypeScript and Prettier handles formatting, you may not need other linting features.
- For those who still use **Vetur**, consider disabling Vetur's linting in the extensions' settings.
- The newer **Vue - Official** extension has replaced **~~Vetur~~** as the recommended option already.

---

## 2. `watch` vs `watchEffect`

### Key Differences

- **watchEffect:**
- Automatically tracks dependencies inside the effect function.
- Runs immediately upon setup and whenever dependencies change.
- Does not expose the previous or current value of a reactive variable.
- Usage: Ideal for _dependency-less_ tracking or when you want automatic reactivity.

- **watch:**
- Explicitly tracks changes to one or more reactive sources.
- Provides access to both previous and current values.
- Usage: Suitable when you need fine-grained control over reactivity or track specific reactive sources.

**Which One Should We Use?**

In this case, watch is more appropriate because:

- We are specifically tracking `props.planet` and reacting only when it changes.
- It allows us to type `planet` correctly in the callback, ensuring properties like geometry are safely accessed.

### Fixed Implementation

**Updated watch with Proper Typing:**

```typescript
// ... other `imports`
import { Mesh } from 'three';
import { watch, shallowRef } from 'vue';

// Other code ...

const radius = shallowRef(1);

// Watch for changes in props.planet
watch(
  () => props.planet,
  (planet: Object3D | null) => {
    if (planet instanceof Mesh && planet.geometry) {
      planet.geometry.computeBoundingSphere();
      radius.value = Math.abs(planet.geometry.boundingSphere?.radius || 1) + 0.5;
    }
  }
);
// Other code ...
```

---
