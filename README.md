# Lendsqr FE Test

A modern React application built with TypeScript, SCSS, and ESLint, using Vite as the build tool.

## Features

- ⚛️ **React 18** - Latest React with hooks
- 📘 **TypeScript** - Type-safe development
- 🎨 **SCSS** - Advanced styling with variables and nesting
- 🔍 **ESLint** - Code quality and consistency
- ⚡ **Vite** - Fast development and build tool

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn or pnpm

### Installation

1. Navigate to the project directory:
```bash
cd lendsqr-fe-test
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

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
lendsqr-fe-test/
├── src/
│   ├── components/          # React components
│   │   ├── ExampleComponent.tsx
│   │   └── ExampleComponent.scss
│   ├── styles/              # Global styles
│   │   ├── variables.scss   # SCSS variables
│   │   ├── reset.scss       # CSS reset
│   │   ├── App.scss         # App styles
│   │   └── index.scss       # Style imports
│   ├── App.tsx              # Main App component
│   └── main.tsx             # Entry point
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
└── .eslintrc.cjs            # ESLint config
```

## SCSS Variables

Global SCSS variables are defined in `src/styles/variables.scss` and are automatically imported into all SCSS files via Vite configuration.

## TypeScript

All components are written in TypeScript (.tsx files) with strict type checking enabled.

## ESLint

ESLint is configured with TypeScript and React plugins. Run `npm run lint` to check for linting errors.

## License

MIT
