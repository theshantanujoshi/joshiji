# shantanu.lol

![shantanu.lol banner](https://img.shields.io/badge/shantanu-lol-EF4444?style=for-the-badge)

The personal portfolio and digital garden of **Shantanu Joshi**, an AI & Data Science undergrad at the Indian Institute of Technology, Jodhpur, and a core builder at bits&bytes. 

Live at: [www.shantanu.lol](https://www.shantanu.lol)

This repository holds the source code for the portfolio, designed with an obsessive focus on performance, fluid animations, typography, and precise aesthetics. The architecture is driven by modern React Server Components and heavily relies on hardware-accelerated WebGL rendering.

## Features

- **Immersive Boot Sequence:** A cinematic, terminal-style intro and initialization sequence that establishes the site's brutalist aesthetic before dropping the user into the experience.
- **Dynamic Audio & Theming Engine:** A custom built-in audio player containing a curated 10-track playlist. The site's entire color palette, WebGL background, and cursor dynamically shift in real-time to match the dominant accent color extracted from the currently playing track's cover art.
- **WebGL CRT Warp Background:** An interactive CRT plasma distortion background powered by Three.js and custom GLSL shaders that sits fixed behind the content, reacting to the global theme state.
- **Fluid Smooth Scrolling:** Custom implementation of Lenis for buttery-smooth scroll hijacking that feels native and perfectly weighted.
- **Hardware-Accelerated Cursor:** A custom target cursor that adapts to interactive DOM nodes and seamlessly adopts the site's current accent color.
- **Modern Typography:** Optimized loading of **Bricolage Grotesque** and **JetBrains Mono**, implemented via next/font/google.
- **Delightful Interactions:** Sophisticated micro-interactions and transitions built with Framer Motion and GSAP.
- **Responsive Architecture:** Fully responsive design built entirely with Tailwind CSS v4, supporting all device viewports while maintaining accessible semantic HTML.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **WebGL / Graphics:** [Three.js](https://threejs.org/) (React Bits CRTWarp)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/)
- **Scrolling:** [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

To run this project locally, ensure you have Node.js installed, then follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/theshantanujoshi/joshiji.git
   cd joshiji
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## Architecture Highlights

- `src/app/layout.tsx`: Root layout handling global font injection, the global `SmoothScroller` provider, the `IntroVideo` blocker, and the underlying fixed `DynamicCRTWarpComponent`.
- `src/app/page.tsx`: The primary landing page interface.
- `src/components/CustomAudioPlayer.tsx`: The core audio and theming engine responsible for shuffling tracks and dispatching the `themeChange` event to sync colors across the DOM.
- `src/components/IntroVideo.tsx`: The state machine governing the boot sequence and user interaction requirements before enabling audio.

## License

Designed and engineered by Shantanu Joshi. Open-sourced under the ISC License.
