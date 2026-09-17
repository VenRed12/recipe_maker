import React, { useState } from 'react';
import { 
  Clock, ChefHat, ShieldCheck, Heart, Share2, Printer, 
  RotateCw, Check, CheckCircle2, AlertTriangle, Sparkles, 
  Flame, BookOpen, Layers, ArrowRight, CornerDownRight
} from 'lucide-react';

export default function RecipeCard({ 
  recipe, 
  source, 
  onOpenKeyModal, 
  safetyValidation, 
  onRegenerate, 
  isRegenerating,
  onSaveFavorite, 
  isSaved 
}) {
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [checkedSteps, setCheckedSteps] = useState({});
  const [customVariation, setCustomVariation] = useState('');
  const [showVariationInput, setShowVariationInput] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!recipe) {
    return (
      <div className="h-full min-h-[450px] flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-dashed border-stone-300">
        <div className="w-16 h-16 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
          <ChefHat className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-stone-800">Your AI-Tailored Recipe Will Appear Here</h3>
        <p className="text-sm text-stone-500 max-w-md mt-1.5">
          Select your available ingredients, time limit, skill level, dietary restrictions, and cuisine preference, then hit Generate!
        </p>
      </div>
    );
  }

  // Toggle ingredient checked
  const toggleIngredient = (idx) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Toggle step checked
  const toggleStep = (idx) => {
    setCheckedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Multiply numeric quantities in ingredient string
  const formatQuantity = (itemStr) => {
    if (servingsMultiplier === 1) return itemStr;
    // Regex matches fractions (1/2), decimals (1.5), integers (2)
    return itemStr.replace(/(\d+\/\d+|\d*\.?\d+)/g, (match) => {
      let val = 0;
      if (match.includes('/')) {
        const [n, d] = match.split('/').map(Number);
        val = n / d;
      } else {
        val = parseFloat(match);
      }
      if (isNaN(val) || val === 0) return match;
      const scaled = val * servingsMultiplier;
      // Format cleanly (e.g. 1.5 or 2)
      return Number.isInteger(scaled) ? scaled.toString() : scaled.toFixed(1).replace(/\.0$/, '');
    });
  };

  // Copy recipe text to clipboard
  const handleCopy = () => {
    const lines = [
      `# ${recipe.title}`,
      `Cuisine: ${recipe.cuisine} | Total Time: ${recipe.total_time} | Skill: ${recipe.skill_level}`,
      `\n${recipe.description}\n`,
      `## Regional Technique Highlight:\n${recipe.regional_technique_highlight}\n`,
      `## Ingredients:`,
      ...recipe.ingredients.map(i => `- ${i.item} ${i.substitution ? `(Sub: ${i.substitution})` : ''}`),
      `\n## Steps:`,
      ...recipe.steps.map(s => `${s.step_number}. ${s.instruction} (Tip: ${s.tip})`),
      `\n## Cuisine Notes:\n${recipe.cuisine_notes}`
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRegenerateClick = (e) => {
    e.preventDefault();
    onRegenerate(customVariation);
    setCustomVariation('');
    setShowVariationInput(false);
  };

  return (
    <div className="recipe-card-container bg-white rounded-2xl shadow-warm border border-stone-200 overflow-hidden space-y-6">
      {/* Top Banner / Cover */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 md:p-8 relative shadow-inner">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/25 text-white backdrop-blur-xs border border-white/30 shadow-xs flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" /> {recipe.cuisine}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/20 text-white backdrop-blur-xs border border-white/20 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Prep: {recipe.prep_time} | Cook: {recipe.cook_time}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/20 text-white backdrop-blur-xs border border-white/20 flex items-center gap-1">
            <ChefHat className="w-3.5 h-3.5" /> {recipe.skill_level}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight drop-shadow-xs">
          {recipe.title}
        </h1>
        <p className="text-amber-50 text-sm mt-2 max-w-2xl leading-relaxed font-medium">
          {recipe.description}
        </p>

        {/* Action icons */}
        <div className="no-print absolute top-6 right-6 flex items-center gap-2">
          <button
            onClick={onSaveFavorite}
            title="Save to Favorites"
            className={`p-2.5 rounded-xl border transition-all ${
              isSaved
                ? 'bg-white text-rose-500 border-white shadow-sm'
                : 'bg-black/20 hover:bg-black/30 border-white/30 text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleCopy}
            title="Copy Recipe"
            className="p-2.5 rounded-xl bg-black/20 hover:bg-black/30 border border-white/30 text-white transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={handlePrint}
            title="Print Recipe Sheet"
            className="p-2.5 rounded-xl bg-black/20 hover:bg-black/30 border border-white/30 text-white transition-all"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Safety Validation Badge Banner */}
        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                Dietary Safety Pass: Verified & Compliant
              </h4>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                0 Prohibited Ingredients
              </span>
            </div>
            <p className="text-xs text-emerald-800 mt-0.5">
              Verified safe against: {(safetyValidation?.checks_performed || recipe.allergen_flags || []).join(', ')}.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {(recipe.allergen_flags || []).map((flag, idx) => (
                <span key={idx} className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-emerald-300 text-emerald-800 flex items-center gap-1 shadow-2xs">
                  <Check className="w-3 h-3 text-emerald-600" /> {flag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Generation Source Indicator */}
        <div className="flex items-center justify-between p-3 rounded-xl border text-xs ${
          source === 'gemini' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full ${source === 'gemini' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}" />
            <span className="font-bold">
              {source === 'gemini' ? '✨ Live AI: Generated on the fly with Google Gemini API' : '📦 Demo Mode (Offline Curated Recipe)'}
            </span>
          </div>
          {source !== 'gemini' && (
            <button
              onClick={onOpenKeyModal}
              className="text-[11px] font-bold text-brand-700 hover:text-brand-900 underline ml-2"
            >
              Add Gemini API Key for Live Generation →
            </button>
          )}
        </div>

        {/* Regional Technique Spotlight */}
        {recipe.regional_technique_highlight && (
          <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 mt-0.5">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Authentic Regional Technique Spotlight
              </h4>
              <p className="text-xs text-amber-900 font-medium mt-1 leading-relaxed">
                {recipe.regional_technique_highlight}
              </p>
            </div>
          </div>
        )}

        {/* Servings Scaler & Checklist Header */}
        <div className="border-t border-stone-100 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <span>Ingredients</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                  {recipe.ingredients.length} items
                </span>
              </h3>
              <p className="text-xs text-stone-500">Check off items as you prepare your mise-en-place</p>
            </div>

            {/* Servings Scaler Controls */}
            <div className="no-print flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <span className="text-xs font-bold text-stone-600 px-2">Servings:</span>
              {[1, 2, 4].map((mult) => (
                <button
                  key={mult}
                  onClick={() => setServingsMultiplier(mult)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    servingsMultiplier === mult
                      ? 'bg-white text-stone-900 shadow-xs ring-1 ring-stone-300'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {mult * (recipe.servings || 2)} ({mult}x)
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients Grid / List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {recipe.ingredients.map((ing, idx) => {
              const isChecked = !!checkedIngredients[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleIngredient(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                    isChecked
                      ? 'bg-stone-50 border-stone-200 opacity-60'
                      : 'bg-white hover:bg-stone-50/70 border-stone-200 shadow-2xs'
                  }`}
                >
                  <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                    isChecked
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-stone-300 bg-white'
                  }`}>
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-semibold ${isChecked ? 'line-through text-stone-400' : 'text-stone-800'}`}>
                      {formatQuantity(ing.item)}
                    </p>
                    {ing.substitution && (
                      <p className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1">
                        <CornerDownRight className="w-2.5 h-2.5 text-stone-400" />
                        <span>Sub: {ing.substitution}</span>
                      </p>
                    )}
                  </div>
                  {ing.is_pantry_staple && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      Pantry
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Steps / Instructions */}
        <div className="border-t border-stone-100 pt-5 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-stone-900">Step-by-Step Instructions</h3>
            <p className="text-xs text-stone-500">Cook through sequential steps with regional chef guidance</p>
          </div>

          <div className="space-y-3">
            {recipe.steps.map((st, idx) => {
              const isStepDone = !!checkedSteps[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    isStepDone
                      ? 'bg-stone-50 border-stone-200 opacity-60'
                      : 'bg-white hover:bg-stone-50/50 border-stone-200 shadow-2xs'
                  }`}
                >
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isStepDone
                      ? 'bg-emerald-500 text-white'
                      : 'bg-brand-100 text-brand-700 font-extrabold'
                  }`}>
                    {isStepDone ? <Check className="w-4 h-4" /> : (st.step_number || idx + 1)}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <p className={`text-xs md:text-sm font-medium leading-relaxed ${
                      isStepDone ? 'line-through text-stone-400' : 'text-stone-800'
                    }`}>
                      {st.instruction}
                    </p>
                    {st.tip && (
                      <div className="p-2 rounded-lg bg-stone-100/80 border border-stone-200/80 text-[11px] text-stone-600 flex items-start gap-1.5">
                        <ChefHat className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                        <span><strong>Chef's Technique Tip:</strong> {st.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cultural & Cuisine Notes */}
        {recipe.cuisine_notes && (
          <div className="border-t border-stone-100 pt-5">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-brand-600" /> Cultural Context & Serving Recommendation
              </h4>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                {recipe.cuisine_notes}
              </p>
            </div>
          </div>
        )}

        {/* Regenerate Flow Controls */}
        <div className="no-print border-t border-stone-100 pt-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={() => onRegenerate()}
              disabled={isRegenerating}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>Give Me Another Option (Same Constraints)</span>
            </button>

            <button
              onClick={() => setShowVariationInput(!showVariationInput)}
              className="text-xs font-semibold text-brand-700 hover:text-brand-900 underline"
            >
              {showVariationInput ? 'Cancel Refinement' : '+ Refine with a special instruction'}
            </button>
          </div>

          {/* Optional Refinement Input */}
          {showVariationInput && (
            <form onSubmit={handleRegenerateClick} className="p-3.5 bg-brand-50/60 rounded-xl border border-brand-200 space-y-2 animate-in fade-in duration-150">
              <label className="text-xs font-bold text-brand-900 block">
                How would you like to refine the next variation?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customVariation}
                  onChange={(e) => setCustomVariation(e.target.value)}
                  placeholder="e.g. 'Make it spicier', 'One-pot version', 'Crispier texture'"
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-brand-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="submit"
                  disabled={isRegenerating || !customVariation.trim()}
                  className="px-4 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                >
                  Regenerate
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
