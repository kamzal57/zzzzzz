# Changelog

## [Unreleased] - 2025-11-03

### Added
- **Progress Tracking**: Added module completion tracking with visual progress bar
  - Displays completed modules count and percentage
  - Progress persists across browser sessions using localStorage
  - Visual indicators for completed modules with checkmark icons

- **Scroll to Top Button**: Added floating button that appears when scrolling down
  - Smooth scroll animation
  - Only visible after scrolling 400px down the page

- **Deployment Configurations**:
  - Added `netlify.toml` for Netlify deployment with security headers and caching
  - Added `vercel.json` for Vercel deployment configuration
  - Added GitHub Actions workflow (`.github/workflows/deploy.yml`) for automated GitHub Pages deployment

- **SEO Improvements**: Enhanced index.html with comprehensive meta tags
  - Open Graph tags for social media sharing
  - Twitter Card meta tags
  - Descriptive meta tags for search engines
  - Theme color for mobile browsers

- **Validation Scripts**: Added npm scripts for pre-deployment validation
  - `npm run validate`: Runs typecheck, lint, and build
  - `npm run predeploy`: Alias for validate script

- **Documentation**: Added `README_DEPLOY.md` with detailed deployment instructions for:
  - Netlify (automatic and manual deployment)
  - Vercel (automatic and CLI deployment)
  - GitHub Pages (automatic via Actions and manual)

### Changed
- **Build Optimization**: Enhanced vite.config.ts with:
  - Code splitting for React and Gemini AI vendors
  - Improved chunk size management
  - Optimized minification settings

- **Module Cards**: Enhanced with completion tracking features
  - "Mark Complete" button for each module
  - Visual distinction for completed modules (cyan border and styling)
  - Checkmark icon replaces module number when completed

### Fixed
- Removed deprecated `.eslintignore` file (ESLint v9+ uses `ignores` in config file)

### Improved
- User experience with persistent progress tracking
- Navigation with scroll-to-top functionality
- Build performance with code splitting and vendor chunking
- Deployment readiness with multiple platform configurations
