<div align="center">
  <br />
  <h1>🍱 BentoMe</h1>
  <p><strong>The modern, cyber-aesthetic profile builder for creators and founders.</strong></p>
  <p>Build stunning, highly-interactive bento-grid personal websites in seconds. Features flawless drag-and-drop mechanics, a dense packing CSS grid engine, and gorgeous glassmorphism aesthetics.</p>
</div>

<br />

## 🛠 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-4A4A55?style=for-the-badge)

<br />

## ✨ Features

- **Dense Packing Grid Engine**: A sophisticated 1D-array-to-CSS-Grid engine that automatically mathematically reflows and densely packs differently sized blocks (1x1 to 4x2).
- **Draft & Publish Workflow**: Make edits safely in your browser, preview your bento link, and push to production with a single click.
- **Micro-Resume (Timeline Block)**: A vertically scrolling experience/education timeline designed for professionals.
- **Dynamic Blocks**: Embed Spotify tracks, YouTube videos, animated typing text, interactive digital pets, and GitHub metrics directly into your grid.
- **High-End Aesthetics**: Cyberpunk themes, glassmorphism layers, dynamic WebGL canvas physics backgrounds, and fluid Framer Motion spring physics.
- **Responsive Clamping**: Layouts automatically restructure and clamp widths on mobile viewports without destroying desktop configuration data.

<br />

## 📸 Preview

*Drop a screenshot or GIF of the builder here:*

![BentoMe Builder Preview]([INSERT_SCREENSHOT_HERE])

<br />

## 🚀 Quick Start

Follow these steps to run BentoMe locally.

### 1. Clone the repository
```bash
git clone https://github.com/[YOUR_USERNAME]/bentome.git
cd bentome/client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Copy the `.env.example` file to create a `.env.local` file:
```bash
cp .env.example .env.local
```
Then, insert your Supabase URL and Anon Key into the `.env.local` file. You will need a Supabase project with a `profiles` table configured.

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

<br />

## 🔒 Security Note
Ensure your `.env.local` file is never committed to GitHub. The `.gitignore` is configured to prevent this by default.
