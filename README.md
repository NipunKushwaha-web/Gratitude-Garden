# Gratitude Garden


A serene digital garden where your gratitude entries bloom into beautiful flowers. Track your gratitude journey through an interactive, visually calming experience.

**[Live Demo](https://gratitude-garden-three.vercel.app/)**

## Features

- **Plant Flowers with Gratitude** - Each gratitude entry you write plants a unique flower in your personal garden
- **Visual Garden Canvas** - Watch your garden grow with animated flowers that bloom beautifully using GSAP
- **Journey Stats** - Track your progress with metrics like "Flowers Planted" and "Words Written"
- **Calendar Widget** - Visualize your gratitude streaks and entry history
- **Local Storage Persistence** - Your garden is automatically saved and persists across sessions
- **Ambient Effects** - Floating pollen particles create a peaceful, meditative atmosphere
- **Responsive Design** - Built with TailwindCSS for a seamless experience on all devices

## Tech Stack

- **React** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first styling
- **GSAP** - Smooth bloom animations
- **Lucide React** - Beautiful iconography
- **Local Storage** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NipunKushwaha-web/Gratitude-Garden.git
   cd Gratitude-Garden
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |

## Project Structure

```
src/
├── components/
│   ├── EntryForm.tsx      # Gratitude input form
│   ├── GardenCanvas.tsx   # Visual garden display
│   ├── GardenFlower.tsx   # Individual flower component
│   ├── Header.tsx         # App header
│   └── CalendarWidget.tsx # Entry calendar view
├── context/
│   └── GardenContext.tsx  # State management & persistence
├── types/
│   └── garden.ts          # TypeScript type definitions
├── App.tsx                # Main application component
└── main.tsx               # Entry point
```

## How It Works

1. **Write Your Gratitude** - Type what you're grateful for in the daily entry form (max 280 characters)
2. **Plant a Flower** - Submit your entry to plant a flower in your garden
3. **Watch It Bloom** - GSAP animations bring your flower to life with a smooth bloom effect
4. **Track Your Journey** - View your growing garden and statistics over time

## Screenshot

<img width="977" height="1885" alt="Screenshot 2026-03-27 181622" src="https://github.com/user-attachments/assets/9bc56d9d-b2d1-4ded-97f5-3d50948d6b43" />

## Author

**Coded by [@thakurxnipun](https://instagram.com/thakurxnipun)**

## License

This project is open source and available under the MIT License.

---

> "Gratitude turns what we have into enough." - Start your gratitude garden today.
