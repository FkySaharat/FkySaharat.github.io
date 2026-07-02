# FkySaharat Portfolio

A personal portfolio website built with Astro and deployed to GitHub Pages.

---

## Part 1: Create GitHub Web Page

### What is GitHub Pages?

GitHub Pages is a free hosting service that lets you host static websites directly from a GitHub repository. It's perfect for portfolios, documentation, and blogs.

### Prerequisites

- GitHub account
- Git installed locally

### Steps to Create GitHub Web Page

1. **Create a new repository**
   - Repository name: `<username>.github.io` (e.g., `FkySaharat.github.io`)
   - This naming convention is required for user/organization pages
   - Make it public so GitHub Pages can publish it

2. **Clone the repository**
   ```sh
   git clone https://github.com/<username>/<username>.github.io.git
   cd <username>.github.io
   ```

3. **Configure GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: Select `main` (or your default branch)
   - Folder: `/root` or `/docs` depending on your setup
   - Your site will be published at `https://<username>.github.io`

4. **Add content and push**
   ```sh
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

Your website is now live! 🎉

---

## Part 2: Initialize Astro

### What is Astro?

Astro is a modern static site builder that creates fast, optimized websites. It supports multiple frameworks (React, Vue, Svelte, etc.) or plain HTML.

### Prerequisites

- Node.js 22.12.0 or higher
- npm (comes with Node.js)

### Steps to Initialize Astro

1. **Create Astro project**
   ```sh
   npm create astro@latest . -- --template minimal --yes
   ```

2. **Configure for GitHub Pages**
   
   **`astro.config.mjs`:**
   ```javascript
   export default defineConfig({
     site: 'https://<username>.github.io',
     output: 'static',
   });
   ```

   **`package.json`:**
   ```json
   {
     "scripts": {
       "dev": "astro dev",
       "build": "astro build",
       "preview": "astro preview",
       "deploy": "npm run build"
     }
   }
   ```

3. **Install dependencies**
   ```sh
   npm install
   ```

4. **Test the setup**
   ```sh
   npm run dev
   ```
   Visit `http://localhost:4321` to see your site.

5. **Build for production**
   ```sh
   npm run build
   ```
   This creates an optimized `dist/` folder ready for deployment.

---

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── astro.svg
│   ├── components/
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

For more details, see the [Astro project structure guide](https://docs.astro.build/en/basics/project-structure/).

---

## 🧞 Available Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run deploy`          | Build for production                             |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

---

## 📦 Deployment to GitHub Pages

1. **Build the site**
   ```sh
   npm run build
   ```

2. **Deploy to GitHub Pages**
   - Option A: GitHub Actions (recommended - automate deployments)
   - Option B: Manual - commit the `dist/` folder to a `gh-pages` branch

3. **Verify deployment**
   - Check Settings → Pages to see deployment status
   - Visit `https://<username>.github.io` to see your live site

---

## 👀 Want to learn more?

- [Astro Documentation](https://docs.astro.build)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Astro Discord Community](https://astro.build/chat)
