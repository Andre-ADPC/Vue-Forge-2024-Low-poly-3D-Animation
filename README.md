<p align="center">
  <img width=100%" src=".\public\assets\adpc-prj-bnr.jpeg" alt="ADPC Banner Image"><br>
</p>

# Andre's Hack on Vue Forge Episode 5 - 2024

Let's see how this works shall we!

---
Vue.JS Forge 2024 Speaker - _[Alvaro Saburido](https://github.com/alvarosabu)_ creator of _[Tres.JS](https://github.com/Tresjs/tres)_


![repo-banner](https://github.com/Tresjs/playground/raw/main/public/github-banner.png)

<p align="center">
  <a href="https://www.npmjs.com/package/@tresjs/core"><img src="https://img.shields.io/npm/v/@tresjs/core/latest.svg?label=core&color=%2382DBCA" alt="core"></a>
   <a href="https://www.npmjs.com/package/@tresjs/cientos"><img src="https://img.shields.io/npm/v/@tresjs/cientos/latest.svg?label=cientos&color=%23f19b00" alt="cientos"></a>
  <a href="https://www.npmjs.com/package/three"><img src="https://img.shields.io/npm/v/three/latest.svg?label=%20&logo=threedotjs&color=f4f4f4&logoColor=black" alt="core"></a>
    <a href="https://www.npmjs.com/package/vite"><img src="https://img.shields.io/npm/v/vite/latest.svg?label=%20&logo=vite&color=AE58FF&logoColor=FFB310" alt="core"></a>
  <a href="https://discord.gg/UCr96AQmWn"><img src="https://img.shields.io/badge/chat-discord-purple?style=flat&logo=discord" alt="discord chat"></a>
</p>

## Vue Forge Excercise - Low Poly 3D Planet 🪐

> Quick start repo for [Tres.js](https://tresjs.org) projects

## Features

- [Tres.js](https://tresjs.org) and latest [Three.js](https://threejs.org)
- `@tresjs/cientos` package pre-installed 📦
- `@tresjs/leches` GUI controls for debuging 🍰
- Shader support (glsl) with [`vite-plugin-glsl`](https://github.com/UstymUkhman/vite-plugin-glsl) 🎨

## Usage

```bash
npx degit tresjs/starter my-tres-project
```

## Install

```bash
cd my-tres-project
pnpm install
```

## Run

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

# The Coordinate Systems Involved
## Visualizing the Axes

To solidify the concept, imagine a virtual box where:

- The center of the screen (viewport) is the origin __(0,0,0)__.
- The axes align as follows:

```perl
                                          Y+ (moving upwards on the screen)
                                          |
                                          |    / Z- (moving into the screen)
                                          |   /
                                          |  /
                                          | /
  (moving left on screen)  X- ---------(0,0,0)--------- X+  (moving right on screen)
                                         /|
                                        / |
                                       /  |
                                      /   |
       (moving out of the screen) Z+ /    |
                                          |
         (moving downwards on the screen) Y+

```

## In Our Current Scenario

Given this standard described above, let’s reanalyze:
The Greek letters ψ, θ, and φ are typically used to describe the three axes in mathematics related to the _**Euler Angles of Rotation**_.

- For the **Z**-axis, **Ψ** is used. It is pronounced _"Psi"_ (silent-P) in English and _"See"_ in modern Greek. Uppercase Ψ, lowercase ψ or 𝛙; (It's the 23rd letter in the Greek alphabet : ψι psi).
- For the **X**-axis, **Φ** is used. It is pronounced _"Phy"_ in English and in modern Greek. Uppercase Φ, lowercase ϕ or φ; (It's the 21st letter in the Greek alphabet : φι fi).  - [Alt + 966] = lowercase ϕ and [Alt + 934] = uppercase Φ.
- For the **Y**-axis, **θ** is used. It is pronounced _"Theta"_ in English and _"Thita"_ in modern Greek. Uppercase Θ or ϴ, lowercase θ or ϑ; (It's the 8th letter in the Greek alphabet : θι thita). - [Alt + 952] = lowercase θ and [Alt + 920] = uppercase Θ.

**Note:** The [Alt + numerals] does not work as expected "out of the box" in the VS Code IDE. I have no clue about whether it does in other IDEs, so do some research if you need the functionality.
That said, if you want the standard OS behaviour from your [Alt + "KEYs"] to behave as expected, you will need to configure, or reconfigure your VS Code Instance's  _[Keybindings](https://code.visualstudio.com/docs/getstarted/keybindings)_.

---
As a simple alternative, I often refer to _[Pat Kearns' Keynote Support](https://www.keynotesupport.com/internet/special-characters-greek-letters-symbols.shtml)_ or the _[Alt Code Unicode](https://altcodeunicode.com/)_ site and simply apply the HTML HEX or DEC values discoverable there. A Quick and easy C&P from **&#913;** to **&#937;** !
By using the notation `&#x + 0123 + ;` for HTML HEX and `&# + 123 + ;` for HTML DEC the ALT-code values are osed in the `0123` or `123` positions respectively.

---

<html>
<div style="background:#1b2c31; color:#cccccc; border-radius:25px; margin:1.0em; padding:1.5em">
<strong style="color:#ffffff; font-size:20px; margin-bottom:1.2em">1. Z-Axis or ψ (Into/Out of the Screen):</strong><br>
As per our POV: Positive <strong style="color:blue">+Z</strong> moves toward the viewer, and negative <strong style="color:blue">-Z</strong> moves <br>into the screen.<br><br>
<strong style="color:#ffffff; font-size:20px; margin-bottom:1.2em">2. X-Axis or Φ (Left/Right):</strong><br>
        Horizontal movement along the monitor: Positive <strong style="color:red">+X</strong> moves right; negative <strong style="color:red">-X</strong> moves left.<br><br>
<strong style="color:#ffffff; font-size:20px; margin-bottom:1.2em">3. Y-Axis or θ (Up/Down):</strong><br>
        Vertical movement along the monitor: Positive <strong style="color:green">+Y</strong> moves upward; negative <strong style="color:green">-Y</strong> moves downward.
</div>
<br>
This matches how Three.js interprets the axes, so our intuition aligns perfectly.
</html>

## Why Orientations and Rotations Might Feel Confusing — It's All About the Object's Origin POV.

Remember this one thing: **Your "Up" might be my "Down"**, and as easily **Your "X" can be my "Z"**...

The **default Euler <u>rotation</u> order** in Three.js (XYZ) can sometimes cause confusion:

- X-Axis Rotation : Affects Roll (rotation around the fuselage horizontal X-axis).
- Y-Axis Rotation : Affects Pitch (nose up/down, rotation around vertical Y-axis).
- Z-Axis Rotation : Affects Yaw (nose left/right, rotation around vertical  Z-axis). 

<p align="center">
  <img width="80%" src=".\public\assets\yrp.webp" alt="Hero Image"><br>
  <caption><i>"Roll", "Pitch" and "Yaw" in 3D Space</i></caption>
</p>

When multiple rotations combine, especially with intrinsic rotations, the local axes of the object may change after each applied transformation. This is why the airplane's rotations may feel unintuitive if not carefully isolated.


### Recommendations

The following is a summary extract from a very interesting explanation (with the math behind it) of Euler's and other's work on **_Rotation Representation_.**
> In **Euler angles**, each rotation is imagined to be represented in the _post-rotation_ coordinate frame of the last rotation: `Rzyx(ψ,θ,φ) = Rz(ψ) Ry(θ) Rx(φ)` — **ZYX** Euler Angles **Yaw(ψ), Pitch(θ), Roll(φ)**. In Fixed angles, all rotations are imagined to be represented in the original (fixed) coordinate frame.
> 
R. Platt - Khoury College _[Four different ways to represent rotation.](https://www.khoury.northeastern.edu/home/rplatt/cs5335_fall2017/slides/euler_quaternions.pdf)_

Also read Noel Hughes' paper _["Quaternion to/from Euler Angle of Arbitrary Rotation Sequence & Direction Cosine Matrix Conversion Using Geometric Methods"](https://www.researchgate.net/publication/242259944_Quaternion_to_Euler_Angle_Conversion_for_Arbitrary_Rotation_Sequence_Using_Geometric_Methods)_

#### To prevent misinterpretations or mix-ups:
In practice while you are writing the code, you can enable a visualization helper for either Tres or Three JS to orientate yourself in the 3D space environment.

#### Visualization Helper for Debugging:
Add a **Tres.js** or _Three.js_ `AxesHelper` to visualize the coordinate system in the 3D space.

<html>
<div style="background:#1b2c31; color:#cccccc; border-radius:25px; margin:1.0em; padding:1.5em">

```ts
  <TresAxesHelper

    const
    axesHelper="new"
    Tres.AxesHelper(5);
    scene.add(axesHelper);
  />
```

</div>
</html>

This displays the `axes` directly in the scene:

```js
- Red = (+X , 0 , -X),
- Green = (+Y , 0 , -Y),
- Blue = (+Z , 0 , -Z).
```

#### Clarify Local vs Global Axes:

<html>
<div style="background:#1b2c31; color:#cccccc; border-radius:25px; margin:1.0em; padding:1.5em">

_When applying rotations, remember that `local axes` can differ from `world/global` axes after an initial rotation._

<br>

* If needed, convert between `world` and `local` axes explicitly.
</div>
</html>

#### Log Key Values:

Print the `object’s` position and rotation values at each frame and inspect them to verify that transformations behave as expected.
