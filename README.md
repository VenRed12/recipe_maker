# FlavorForge | 5-Constraint Customised Recipe Maker

An AI-powered culinary web application that generates authentic regional recipes tailored to **five simultaneous constraints**:
1. **Available Ingredients** (Tag-based kitchen entry + pantry staples toggle)
2. **Time Available** (Interactive slider from 15 to 60+ minutes)
3. **Skill Level** (Beginner, Intermediate, Advanced)
4. **Dietary Restrictions** (Hard constraints: Nut-Free, Gluten-Free, Vegan, Halal, etc.)
5. **Cultural / Cuisine Preference** (South Indian, Mexican, Mediterranean, Italian, Thai, etc.)

---

## Key Differentiators

- **Simultaneous 5-Dimensional Resolution**: Solves all constraints together rather than filtering a fixed database.
- **Authentic Regional Technique Directives**: Instructs the LLM on genuine regional techniques (e.g. South Indian *tadka / tempering* with mustard seeds and curry leaves; Mexican *comal charring & adobo emulsion*; Italian *soffritto & mantecatura*) rather than swapping a single spice in a generic dish.
- **Dual-Pass Safety Validation Engine**: After the LLM generates a recipe, a dedicated keyword safety audit validates ingredients and steps against the selected dietary restrictions. If a violation is caught, the system auto-rejects and triggers an automated corrective regeneration pass.
- **Interactive Recipe Card**:
  - **Servings Scaler**: Dynamically scales ingredient quantities (1x, 2x, 4x).
  - **Mise-en-place Checklist**: Strikethrough ingredients and check off steps as you cook.
  - **Substitution Notes**: Regional and pantry alternatives for each ingredient.
  - **Clean Print / PDF Export**: Optimized `@media print` layout for physical cooking sheets.
  - **Favorites & Local Persistence**: Bookmarks recipes directly in browser `localStorage`.
  - **Demo Mode & Direct Gemini Integration**: Works immediately with built-in culinary demo engine or with your own free Google Gemini API key.

---

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons
- **Backend / Serverless**: Node.js serverless API (`/api/generate.js`) ready for Vercel deployment
- **AI Model**: Google Gemini API (`gemini-2.5-flash` / `gemini-1.5-flash`) with automated retry loop
- **Safety Engine**: Regex-based dietary scanner (`/api/validator.js`)

---

## Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Create a `.env` file or set the environment variable:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```
*(You can also configure the API key directly in the web UI via the "Configure API Key" button, or use the built-in Instant Demo Engine without any key!)*

### 3. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser. The Vite server includes an integrated dev proxy that handles both the frontend and the `/api/generate` serverless function seamlessly.

### 4. Build for Production
```bash
npm run build
```
Outputs optimized production assets into `dist/`.

### 5. Run Standalone Node Server
```bash
npm start
```
Starts the standalone server at `http://localhost:3000` serving the built frontend and API route.

### 6. Run Safety Validator Tests
```bash
npm run test:validator
```
Executes automated unit tests verifying the allergen and dietary restriction filters.

---

## Deploying to Vercel

This repository is pre-configured with `vercel.json` for 1-click deployment:

1. Push this repository to GitHub or run `vercel` in this directory.
2. In the Vercel Project Settings, add the Environment Variable:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
3. Deploy! The `/api/generate.js` file will automatically be provisioned as a serverless function.

---

## Project Structure

```
smart-recipe-generator/
├── api/
│   ├── generate.js          # Serverless function & Gemini API caller
│   └── validator.js         # Keyword dietary safety engine
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── ApiKeyModal.jsx         # API key settings modal
│   │   ├── RecipeCard.jsx          # Interactive recipe card with scaler & checklist
│   │   ├── RecipeForm.jsx          # 5-Constraint input form
│   │   └── SavedRecipesModal.jsx   # LocalStorage favorites drawer
│   ├── data/
│   │   └── mockRecipes.js          # Curated regional recipes for offline demo
│   ├── App.jsx              # Main application layout
│   ├── index.css            # Tailwind directives & print styles
│   └── main.jsx             # React entry point
├── test/
│   └── test-validator.js    # Safety validation test suite
├── index.html               # Web page entry template
├── package.json             # Scripts & dependencies
├── server.js                # Standalone Node HTTP server
├── tailwind.config.js       # Custom warm culinary theme
├── vercel.json              # Vercel deployment routing
└── vite.config.js           # Vite build config with dev API middleware
```

---

## License
MIT License. Built for the modern home chef.
