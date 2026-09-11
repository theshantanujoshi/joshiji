# Shantanu.lol

![shantanu.lol banner](https://img.shields.io/badge/shantanu-lol-EF4444?style=for-the-badge)

The personal portfolio and digital garden of **Shantanu Joshi**, an AI & Data Science undergrad at the Indian Institute of Technology, Jodhpur, and a core builder at bits&bytes. 

Live at: [www.shantanu.lol](https://www.shantanu.lol)

This repository holds the source code for the portfolio, designed with an obsessive focus on performance, fluid animations, typography, and "Apple-like" aesthetics—all driven by a modern React server-component architecture.

## Features

- **Fluid Smooth Scrolling:** Custom implementation of Lenis for buttery-smooth scroll hijacking that feels native and responsive.
- **WebGL CRT Warp Background:** A stunning, interactive CRT plasma distortion background powered by Three.js and custom GLSL shaders that sits fixed behind the content.
- **Modern Typography:** Optimized loading of **Inter** (for pristine, SF Pro-like neutral UI readability) and **JetBrains Mono** (for technical precision), implemented via `next/font/google`.
- **Delightful Interactions:** Sophisticated micro-interactions built with Framer Motion and GSAP.
- **Responsive & Accessible:** Fully responsive design built entirely with Tailwind CSS v4, supporting all device sizes with accessible semantic HTML.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **WebGL / Graphics:** [Three.js](https://threejs.org/) (React Bits CRTWarp)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/)
- **Scrolling:** [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons:** [Lucide React](https://lucide.dev/) & React Icons
- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

To run this project locally, make sure you have Node.js installed, then follow these steps:

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

## Architecture

- `src/app/layout.tsx`: Root layout handling global font injection (Inter & JetBrains Mono), the global `SmoothScroller` provider, and the underlying fixed `CRTWarp` WebGL background.
- `src/app/page.tsx`: The main landing page / index.
- `src/components/`: Reusable React components including navigation, footers, webGL effects, and animated text blocks (`ScrambleText`).

## License

Designed and engineered by Shantanu Joshi. Open-sourced under the ISC License.
