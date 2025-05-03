# ITCS5122-SvelteKit-D3-Tutorial

A hands-on visual analytics tutorial built with SvelteKit and D3.js for ITCS-5122.

## Tutorial Overview

This tutorial demonstrates how to create interactive data visualizations using SvelteKit and D3.js. It provides a foundation for building web-based visualization app with modern web technologies.

## Technologies Used

- [SvelteKit](https://svelte.dev/) - Full-stack framework for building web applications
- [D3.js](https://d3js.org/) - Data visualization library for visualizing data
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or pnpm
- Basic knowledge of HTML, CSS, and JavaScript
- VS Code (or any IDEs)
- Chrome Web Browser

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zyang19/ITCS5122-SvelteKit-D3-Tutorial.git
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or to open in browser automatically
   npm run dev -- --open
   ```

## Project Structure

```
my-vis-5122/
├── src/                  # Source code
│   ├── lib/              # Components and utilities
│   │   ├── components/   # Reusable UI components
│   │   ├── visualizations/ # D3 visualization components
│   │   └── state/        # State management for visualizations
│   ├── routes/           # SvelteKit routes (pages)
│   ├── app.html          # HTML template
│   └── app.css           # Global styles
├── static/               # Static assets (images, data files)
│   └── data/             # JSON and CSV datasets
├── .svelte-kit/          # SvelteKit build output (ignored by git)
├── package.json          # Project dependencies and scripts
└── vite.config.js        # Vite configuration
```


## License

[MIT](LICENSE)