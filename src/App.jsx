import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Flame, ShieldCheck, Bookmark, Key, 
  HelpCircle, UtensilsCrossed, AlertTriangle 
} from 'lucide-react';
import RecipeForm from './components/RecipeForm.jsx';
import RecipeCard from './components/RecipeCard.jsx';
import ApiKeyModal from './components/ApiKeyModal.jsx';
import SavedRecipesModal from './components/SavedRecipesModal.jsx';

export default function App() {
  const [recipe, setRecipe] = useState(null);
  const [recipeSource, setRecipeSource] = useState('demo-engine');
  const [safetyValidation, setSafetyValidation] = useState(null);
  const [lastConstraints, setLastConstraints] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // API Key & Modals
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem('gemini_user_api_key') || '');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  
  // LocalStorage Saved Favorites
  const [savedRecipes, setSavedRecipes] = useState(() => {
    try {
      const stored = localStorage.getItem('flavorforge_saved_recipes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    if (newKey) {
      sessionStorage.setItem('gemini_user_api_key', newKey);
    } else {
      sessionStorage.removeItem('gemini_user_api_key');
    }
  };

  const handleSaveFavorite = () => {
    if (!recipe) return;
    const exists = savedRecipes.some(r => r.recipe.title === recipe.title);
    if (exists) {
      // Remove
      const updated = savedRecipes.filter(r => r.recipe.title !== recipe.title);
      setSavedRecipes(updated);
      localStorage.setItem('flavorforge_saved_recipes', JSON.stringify(updated));
    } else {
      // Add
      const updated = [
        { id: Date.now().toString(), savedAt: new Date().toISOString(), recipe },
        ...savedRecipes
      ];
      setSavedRecipes(updated);
      localStorage.setItem('flavorforge_saved_recipes', JSON.stringify(updated));
    }
  };

  const handleDeleteSaved = (id) => {
    const updated = savedRecipes.filter(r => r.id !== id);
    setSavedRecipes(updated);
    localStorage.setItem('flavorforge_saved_recipes', JSON.stringify(updated));
  };

  // Main recipe generation function
  const handleGenerate = async (constraints, variationPrompt = '') => {
    setIsLoading(true);
    setErrorMessage('');
    setLastConstraints(constraints);

    const stages = [
      'Analyzing available pantry ingredients...',
      'Structuring authentic regional technique...',
      'Invoking Google Gemini AI engine...',
      'Executing keyword safety validation pass...',
      'Formatting culinary card & steps...'
    ];

    let stageIdx = 0;
    setStatusMessage(stages[stageIdx]);
    const interval = setInterval(() => {
      stageIdx = (stageIdx + 1) % stages.length;
      setStatusMessage(stages[stageIdx]);
    }, 1200);

    try {
      const payload = {
        ...constraints,
        variationPrompt,
        apiKey: apiKey || undefined
      };

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'x-gemini-key': apiKey } : {})
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate recipe');
      }

      setRecipe(data.recipe);
      setRecipeSource(data.source || 'gemini');
      setSafetyValidation(data.safety_validation);
      
      // Smooth scroll to recipe card on mobile
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          window.scrollTo({ top: 650, behavior: 'smooth' });
        }, 100);
      }

    } catch (err) {
      console.error("Generation error:", err);
      setErrorMessage(err.message || 'Error occurred while contacting recipe engine.');
    } finally {
      clearInterval(interval);
      setIsLoading(false);
      setStatusMessage('');
    }
  };

  // Re-generate flow with current constraints
  const handleRegenerate = (variation = '') => {
    if (!lastConstraints) return;
    handleGenerate(lastConstraints, variation);
  };

  const isCurrentRecipeSaved = recipe && savedRecipes.some(r => r.recipe.title === recipe.title);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      {/* Top Navbar */}
      <header className="no-print sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 px-4 md:px-8 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 text-white flex items-center justify-center shadow-warm">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-stone-900 tracking-tight flex items-center gap-1.5">
                FlavorForge
              </span>
              <p className="text-[11px] text-stone-500 hidden sm:block">5-Constraint Customised Recipe Generator</p>
            </div>
          </div>

          {/* Right utility buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSavedModalOpen(true)}
              className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5 text-rose-500" />
              <span>Saved</span>
              {savedRecipes.length > 0 && (
                <span className="h-4 w-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {savedRecipes.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsKeyModalOpen(true)}
              className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                apiKey
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
              }`}
            >
              <Key className={`w-3.5 h-3.5 ${apiKey ? 'text-emerald-600' : 'text-brand-600'}`} />
              <span>{apiKey ? 'API Key Active' : 'Configure API Key'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8">
        {/* Error Alert if any */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Generation Error</p>
              <p className="text-xs mt-0.5 text-rose-700">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form (5 Cols) */}
          <div className="no-print lg:col-span-5 space-y-6">
            <RecipeForm
              onSubmit={handleGenerate}
              isLoading={isLoading}
              statusMessage={statusMessage}
            />
          </div>

          {/* Right Column: Recipe Card Display (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <RecipeCard
              recipe={recipe}
              source={recipeSource}
              onOpenKeyModal={() => setIsKeyModalOpen(true)}
              safetyValidation={safetyValidation}
              onRegenerate={handleRegenerate}
              isRegenerating={isLoading}
              onSaveFavorite={handleSaveFavorite}
              isSaved={isCurrentRecipeSaved}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-stone-200 py-6 px-4 text-center text-xs text-stone-500">
        <p>FlavorForge © 2026 • Built with React, Vite, Tailwind CSS, Google Gemini & Dual-Pass Dietary Safety Engine</p>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />

      <SavedRecipesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedRecipes={savedRecipes}
        onSelectRecipe={setRecipe}
        onDeleteRecipe={handleDeleteSaved}
      />
    </div>
  );
}
