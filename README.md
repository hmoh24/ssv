## 🚀 Quick Start

*   Install dependencies: `npm install`
*   Start development server: `npm run dev`
    Runs the dev server with hot reload and source maps at http://localhost:8080.
*   Build for production: `npm run build`
    Bundles and optimizes files into the `dist/` folder.
*   Deploy to GitHub Pages: `npm run deploy`
    Pushes the contents of `dist/` to the `gh-pages` branch for GitHub Pages hosting.

## 📁 Project Structure

```text
├── dist/ # Build output (gitignored)
├── src/ # Source files (JS, CSS, HTML template)
│   ├── index.js
│   └── template.html
├── webpack.common.js # Shared Webpack config
├── webpack.dev.js # Development config
├── webpack.prod.js # Production config
├── package.json # Project metadata, scripts, dependencies
├── .gitignore # Ignores dist, node_modules, etc.
└── README.md # This file
```

