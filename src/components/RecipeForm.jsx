import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Plus, X, Clock, ChefHat, ShieldCheck, 
  Flame, Utensils, Check, RotateCcw, AlertCircle, Info
} from 'lucide-react';

const COMMON_INGREDIENTS = [
  'Spinach', 'Chickpeas', 'Rice', 'Tomato', 'Onion', 
  'Garlic', 'Potatoes', 'Eggs', 'Tofu', 'Paneer', 
  'Black Beans', 'Lentils', 'Zucchini', 'Bell Pepper'
];

const CUISINE_OPTIONS = [
  { id: 'South Indian', label: 'South Indian', flag: '🇮🇳', technique: 'Tadka, curry leaves, coconut' },
  { id: 'North Indian', label: 'North Indian', flag: '🥘', technique: 'Bhunao, whole spices, gravies' },
  { id: 'Mexican', label: 'Mexican', flag: '🇲🇽', technique: 'Charred salsas, chiles, cumin' },
  { id: 'Mediterranean', label: 'Mediterranean', flag: '🫒', technique: 'EVOO bloom, lemon, fresh herbs' },
  { id: 'Italian', label: 'Italian', flag: '🇮🇹', technique: 'Soffritto, mantecatura emulsion' },
  { id: 'Thai', label: 'Thai', flag: '🇹🇭', technique: 'Cracked coconut cream, lime, bird chili' },
  { id: 'Japanese', label: 'Japanese', flag: '🇯🇵', technique: 'Dashi balance, gentle nimono simmer' },
  { id: 'Middle Eastern', label: 'Middle Eastern', flag: '🧆', technique: 'Zaatar, sumac, tahini bloom' },
  { id: 'French', label: 'French', flag: '🇫🇷', technique: 'Mirepoix, pan fond deglazing' },
];

const DIETARY_OPTIONS = [
  { id: 'vegetarian', label: 'Vegetarian', icon: '🌱' },
  { id: 'vegan', label: 'Vegan', icon: '🌿' },
  { id: 'gluten-free', label: 'Gluten-Free', icon: '🌾' },
  { id: 'nut-free', label: 'Nut-Free', icon: '🥜' },
  { id: 'dairy-free', label: 'Dairy-Free', icon: '🥛' },
  { id: 'halal', label: 'Halal', icon: '🌙' },
  { id: 'kosher', label: 'Kosher', icon: '✡️' },
  { id: 'shellfish-free', label: 'Shellfish-Free', icon: '🦐' },
];

const SKILL_LEVELS = [
  { id: 'Beginner', title: 'Beginner', desc: 'Simple cuts, 1-pan, forgiving margins' },
  { id: 'Intermediate', title: 'Intermediate', desc: 'Sauté, reductions, layered aromatics' },
  { id: 'Advanced', title: 'Advanced', desc: 'Multi-stage tempering, emulsification, fine timing' },
];

export default function RecipeForm({ onSubmit, isLoading, statusMessage }) {
  const [ingredients, setIngredients] = useState(['Spinach', 'Chickpeas', 'Rice']);
  const [ingredientInput, setIngredientInput] = useState('');
  const [pantryStaples, setPantryStaples] = useState(true);
  const [maxTime, setMaxTime] = useState(30);
  const [skillLevel, setSkillLevel] = useState('Intermediate');
  const [dietary, setDietary] = useState(['nut-free']);
  const [cuisine, setCuisine] = useState('South Indian');

  const addIngredient = (item) => {
    const trimmed = item.trim();
    if (!trimmed) return;
    if (!ingredients.some(i => i.toLowerCase() === trimmed.toLowerCase())) {
      setIngredients([...ingredients, trimmed]);
    }
    setIngredientInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addIngredient(ingredientInput);
    }
  };

  const removeIngredient = (idxToRemove) => {
    setIngredients(ingredients.filter((_, idx) => idx !== idxToRemove));
  };

  const toggleDietary = (id) => {
    if (dietary.includes(id)) {
      setDietary(dietary.filter(item => item !== id));
    } else {
      setDietary([...dietary, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredients.length === 0 && !pantryStaples) {
      alert("Please add at least one ingredient or enable pantry staples!");
      return;
    }
    onSubmit({
      ingredients,
      pantryStaples,
      maxTime,
      skillLevel,
      dietaryRestrictions: dietary,
      cuisine
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-warm border border-stone-200/80 p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-100 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-600 font-bold text-sm">
              5D
            </span>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">The 5 Constraints</h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Safety Engine Active
          </span>
        </div>
        <p className="text-xs text-stone-500 mt-1.5">
          Provide your 5 constraints simultaneously. Our engine crafts an authentic recipe satisfying all of them together.
        </p>
      </div>

      {/* 1. AVAILABLE INGREDIENTS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
            <span className="flex h-5 w-5 rounded-full bg-brand-500 text-white text-xs items-center justify-center font-bold">1</span>
            Available Ingredients
          </label>
          <span className="text-xs text-stone-400 font-medium">
            {ingredients.length} added
          </span>
        </div>

        {/* Input box */}
        <div className="flex gap-2">
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type ingredient (e.g. Lentils, Spinach, Tomato) & press Enter"
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-stone-50/50"
          />
          <button
            type="button"
            onClick={() => addIngredient(ingredientInput)}
            className="px-4 py-2.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-1 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-1.5 min-h-[36px]">
          {ingredients.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-brand-50 text-brand-800 border border-brand-200 shadow-2xs group animate-in fade-in zoom-in duration-150"
            >
              {item}
              <button
                type="button"
                onClick={() => removeIngredient(idx)}
                className="text-brand-500 hover:text-brand-800 rounded-full p-0.5"
                title="Remove ingredient"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {ingredients.length === 0 && (
            <span className="text-xs text-stone-400 italic py-1">No custom ingredients added yet.</span>
          )}
        </div>

        {/* Quick suggestions */}
        <div className="pt-1">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
            Quick Add Staples:
          </span>
          <div className="flex flex-wrap gap-1">
            {COMMON_INGREDIENTS.filter(i => !ingredients.includes(i)).slice(0, 8).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => addIngredient(item)}
                className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-stone-400" /> {item}
              </button>
            ))}
          </div>
        </div>

        {/* Pantry Staples Toggle */}
        <div className="mt-3 p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 text-xs">🧂</div>
            <div>
              <p className="text-xs font-bold text-stone-800">Include Pantry Staples</p>
              <p className="text-[11px] text-stone-500">Assume salt, pepper, cooking oil, water, and basic ground spices</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPantryStaples(!pantryStaples)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              pantryStaples ? 'bg-brand-500' : 'bg-stone-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                pantryStaples ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 2. TIME AVAILABLE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
            <span className="flex h-5 w-5 rounded-full bg-brand-500 text-white text-xs items-center justify-center font-bold">2</span>
            Time Available
          </label>
          <span className="text-sm font-extrabold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> ≤ {maxTime} Minutes
          </span>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="15"
            max="60"
            step="5"
            value={maxTime}
            onChange={(e) => setMaxTime(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
          />
          <div className="flex justify-between text-[11px] text-stone-400 font-medium">
            <span>15 min (Flash)</span>
            <span>30 min (Weeknight)</span>
            <span>45 min (Comfort)</span>
            <span>60+ min (Slow Simmer)</span>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {[15, 30, 45, 60].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setMaxTime(t)}
              className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                maxTime === t
                  ? 'bg-brand-500 text-white border-brand-600 shadow-sm'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
              }`}
            >
              {t} min
            </button>
          ))}
        </div>
      </div>

      {/* 3. SKILL LEVEL */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
          <span className="flex h-5 w-5 rounded-full bg-brand-500 text-white text-xs items-center justify-center font-bold">3</span>
          Skill Level
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SKILL_LEVELS.map((level) => {
            const isSelected = skillLevel === level.id;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => setSkillLevel(level.id)}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/50 shadow-sm ring-1 ring-brand-400'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-brand-800' : 'text-stone-800'}`}>
                    {level.title}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-600" />}
                </div>
                <p className="text-[11px] text-stone-500 mt-1 leading-tight">{level.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. DIETARY RESTRICTIONS (HARD CONSTRAINTS) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
            <span className="flex h-5 w-5 rounded-full bg-brand-500 text-white text-xs items-center justify-center font-bold">4</span>
            Dietary Needs (Hard Constraints)
          </label>
          <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            Strict Zero Tolerance
          </span>
        </div>
        <p className="text-[11px] text-stone-500">
          The safety engine will strictly audit all ingredients against chosen restrictions and auto-reject/regenerate if violated.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DIETARY_OPTIONS.map((opt) => {
            const isChecked = dietary.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleDietary(opt.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                  isChecked
                    ? 'bg-rose-50 border-rose-300 text-rose-900 shadow-2xs font-bold'
                    : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>{opt.icon}</span>
                  <span>{opt.label}</span>
                </span>
                {isChecked && <Check className="w-3.5 h-3.5 text-rose-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. CUISINE / CULTURAL PREFERENCE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
            <span className="flex h-5 w-5 rounded-full bg-brand-500 text-white text-xs items-center justify-center font-bold">5</span>
            Cuisine & Technique Preference
          </label>
          <span className="text-xs text-stone-400 font-medium">Authentic regional methods</span>
        </div>

        {/* Dropdown */}
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-stone-50/50"
        >
          {CUISINE_OPTIONS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.flag} {c.label} — ({c.technique})
            </option>
          ))}
        </select>

        {/* Quick cuisine chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {CUISINE_OPTIONS.slice(0, 6).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCuisine(c.id)}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                cuisine === c.id
                  ? 'bg-brand-600 text-white border-brand-700 font-bold shadow-2xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* GENERATE BUTTON */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl text-white font-bold text-base shadow-warm flex items-center justify-center gap-2 transition-all ${
            isLoading
              ? 'bg-stone-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 hover:from-brand-600 hover:to-brand-800 active:scale-[0.99]'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{statusMessage || 'Crafting Recipe with 5 Constraints...'}</span>
            </div>
          ) : (
            <>
              <Sparkles className="w-5 h-5 animate-pulse text-amber-200" />
              <span>Generate 5-Constraint Recipe</span>
            </>
          )}
        </button>

        {isLoading && (
          <p className="text-center text-xs text-stone-500 mt-2.5 animate-pulse flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Zero-tolerance safety validation and regional technique formatting in progress...
          </p>
        )}
      </div>
    </form>
  );
}
