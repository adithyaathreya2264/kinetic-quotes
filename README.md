# Kinetic Quotes 🖋️


> "Words have weight. Store the ones that move you."

**Kinetic Quotes** is a serene, offline-first personal library for collecting thoughts, lyrics, and wisdom. It transforms static text into "tiny kinetic bookmarks" with subtle motion—letters that drift, fade, or shimmer—creating a gallery-like experience for your favorite words.

## ✨ The Core Idea

Most note-taking apps are utilitarian lists. Kinetic Quotes is designed to be a digital sanctuary. The goal was to build a space that feels like a quiet gallery rather than a database.

*   **Atmosphere**: Soft neutral colors, elegant typography, and breathable whitespace.
*   **Motion**: Text doesn't just appear; it arrives.
*   **Privacy**: Your data lives on your device.
*   **Simplicity**: No login, no cloud sync fees, just you and your words.

## 🚀 Features

*   **Kinetic Typography**: Choose from 4 animation styles for every quote:
    *   *Drift*: Gentle floating motion (Spring physics).
    *   *Fade*: Soft upward entry with blur.
    *   *Shimmer*: Subtle pulse for emphasis.
    *   *Typewriter*: Classic mechanical entry.
*   **Offline-First**: Built with a Service Worker and IndexedDB. Works perfectly without an internet connection.
*   **PWA Ready**: Installable on mobile and desktop as a native-feeling app.
*   **Masonry Layout**: A responsive, organic grid that adapts to quote lengths, mimicking a gallery wall.
*   **Data Sovereignty**: Full JSON Export and Import capabilities. You own your data.
*   **Serene UI**: Glassmorphism headers, blurred ambient backgrounds, and premium typography (*Playfair Display* & *DM Sans*).

## 🛠️ Tech Stack

*   **Framework**: [React 18](https://react.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Database**: [Dexie.js](https://dexie.org/) (IndexedDB wrapper)
*   **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository** (or download the zip)
    ```bash
    git clone https://github.com/yourusername/kinetic-quotes.git
    cd kinetic-quotes
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  Open `http://localhost:3000` in your browser.

## 📦 Building for Production

To create a production-ready build for deployment:

```bash
npm run build
```

To preview the build locally:

```bash
npm run preview
```

## 🎨 Design System

The app uses a carefully selected "Warm Alabaster" theme to reduce eye strain and evoke the feeling of high-quality paper.

*   **Fonts**: 
    *   *Playfair Display* (Serif) for quote body.
    *   *DM Sans* (Sans-serif) for UI elements and metadata.
*   **Palette**:
    *   Background: `#fcfbf9` (Paper)
    *   Ink: `#292524` (Warm Charcoal)
    *   Accents: `#a8a29e` (Stone)