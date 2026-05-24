# Immersive Portfolio

An immersive cinematic portfolio experience built with **Next.js**, **React Three Fiber**, and **Three.js**.

Instead of scrolling through traditional web sections, this project transforms scrolling into a journey through a dynamic atmospheric world. As the user scrolls, the camera travels through different environmental zones with cinematic movement, fog transitions, depth layering, interactive project landmarks, and responsive atmospheric effects.

---

# ✨ Features

- 🎥 Cinematic scroll-driven camera system
- 🌫 Dynamic fog and atmospheric transitions
- 🌲 Procedural forest environment
- ✨ Particle systems and atmospheric FX
- 🧠 Scene-based world states
- 📦 Interactive project landmarks
- 🎨 Cinematic postprocessing (Bloom + Vignette)
- 🌍 Spatial layering for depth perception
- 💡 Dynamic lighting and color mood transitions
- ⚡ Smooth scrolling with Lenis
- 🖥 Responsive overlay UI
- 🧭 Immersive portfolio storytelling approach

---

# 🛠 Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

## 3D / Graphics
- Three.js
- React Three Fiber
- @react-three/drei
- @react-three/postprocessing

## Animation / Interaction
- Lenis
- Zustand

---

# 📂 Project Structure

```bash
src/
│
├── app/
│   └── page.tsx
│
├── components/
│   ├── experience/
│   │   ├── Atmosphere.tsx
│   │   ├── Background.tsx
│   │   ├── CameraRig.tsx
│   │   ├── Experience.tsx
│   │   ├── Forest.tsx
│   │   ├── Foreground.tsx
│   │   ├── Particles.tsx
│   │   ├── ProjectStones.tsx
│   │   ├── SceneAnchors.tsx
│   │   ├── ScrollController.tsx
│   │   ├── ScrollSync.tsx
│   │   ├── useScene.ts
│   │   ├── useScrollProgress.ts
│   │   ├── zones.ts
│   │   └── projects.ts
│   │
│   ├── shared/
│   │   └── useActiveProject.ts
│   │
│   └── ui/
│       └── Overlay.tsx
│
└── styles/
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone <your-repo-url>
```

## 2. Install dependencies

```bash
npm install
```

## 3. Run the development server

```bash
npm run dev
```

## 4. Open in browser

```bash
http://localhost:3000
```

---

# 🎬 Core Concepts

## Scroll-Based World Navigation

The portfolio uses browser scroll as a cinematic timeline.

Scrolling controls:
- camera movement
- environmental transitions
- scene states
- object interaction
- visual atmosphere

---

## Scene System

The world is divided into multiple zones:

- 🌲 Intro
- 📦 Projects
- 🌿 Skills
- 🌫 Contact

Each scene dynamically changes:
- fog
- lighting
- density
- color grading
- atmosphere

---

## Spatial Layering

The environment uses:
- foreground silhouettes
- midground interaction space
- background depth forms

to create cinematic depth perception.

---

## Atmospheric Rendering

The project simulates atmosphere using:
- particles
- drifting fog planes
- bloom
- vignette
- color transitions

---

# 🧠 Inspiration

Inspired by immersive web experiences such as:

- Bruno Simon Portfolio
- Dogstudio interactive experiences
- Cinematic game environments
- Atmospheric storytelling websites

---

# 📌 Future Improvements

- 🎵 Spatial audio system
- 🌍 Procedural terrain generation
- 🧩 Interactive project expansion panels
- ✨ GPU particle effects
- 🎨 Custom shaders
- 🖱 Mouse-reactive camera movement
- 📱 Mobile optimization
- ⚡ Performance optimization

---

# 👨‍💻 Author

## Golam Kibria
Full Stack Developer

- 🌐 Portfolio: https://kibria-portfolio-cf78f.web.app
- 💼 LinkedIn: https://www.linkedin.com/in/kibria7
- 📧 Email: golam.kibria1205@gmail.com

---

# 📄 License

This project is open source and available under the MIT License.