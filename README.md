# 🍱 BentoLink (Interactive Digital Identity Platform)

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)

**Live Demo:** [bentolink.vercel.app](https://bentolink.vercel.app)  
**Creator Profile:** [bentolink.vercel.app/adt](https://bentolink.vercel.app/adt)

---

## 💡 The Vision

The modern web is flooded with static, uninspired "link-in-bio" directories. **BentoLink** was engineered to solve the lack of self-expression in digital identities by bridging the gap between highly interactive, gamified cyber-aesthetics and hyper-minimalist SaaS portfolios. 

Instead of a boring list of links, BentoLink treats a user's profile as a **living, modular canvas**. Visitors don't just *view* the profile; they *interact* with it through real-time global likes, dynamic Discord presence, fluid physics-based grid movements, and customizable aesthetics.

## ✨ Engineering Highlights & Core Features

* **Algorithmic "Dense Packing" Layout:** Engineered a robust, responsive layout system utilizing CSS `grid-auto-flow: dense` combined with a 1D array shifting algorithm. This allows users to effortlessly scale and reorganize blocks (1x1, 2x2, 4x1) on the fly without breaking the DOM layout or leaving empty visual gaps—solving the notoriously complex 2D Bin Packing problem for web UIs.
* **Real-Time Gamification Engine:** Built custom **Remote Procedure Calls (RPC)** in PostgreSQL via Supabase to handle atomic database increments safely. This powers features like global profile likes and interactive "Tamagotchi-style" digital pets, preventing race conditions when multiple users interact simultaneously.
* **Fluid UI Physics:** Completely decoupled layout mathematics from visual rendering. Every layout shift, resize, and state change is powered by Framer Motion's Apple-like spring physics, resulting in a premium, weightless user experience.
* **Live Status Integrations:** Utilizes WebSockets via the Lanyard API to broadcast a user's real-time Spotify listening activity and Discord gaming status directly to their grid, creating a truly "live" digital presence.
* **Global Theme Architecture:** Users can instantly toggle between vastly different UI paradigms—from WebGL-powered interactive cursor physics (like "Matrix Rain") to hyper-clean "SaaS Minimalism" utilizing static CSS grain textures for professional micro-resumes.

---

## 🛠️ Technical Stack

* **Frontend Framework:** Next.js (App Router), React, TypeScript
* **Styling & Animation:** Tailwind CSS v4, Framer Motion, `@tsparticles/react` (for lightweight WebGL canvas effects)
* **State Management:** `zustand` (for global client state and rapid optimistic UI updates)
* **Backend & Auth:** Supabase (PostgreSQL, Row Level Security, RPC Functions)
* **Hosting & CI/CD:** Vercel

---

## 🚀 Local Development Setup

Want to run BentoLink locally? Follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/bentolink.git](https://github.com/YOUR_GITHUB_USERNAME/bentolink.git)
cd bentolink
