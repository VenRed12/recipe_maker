import React from 'react';
import { Bookmark, X, Trash2, Clock, ChefHat, Flame, ArrowRight } from 'lucide-react';

export default function SavedRecipesModal({ isOpen, onClose, savedRecipes, onSelectRecipe, onDeleteRecipe }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-elevated border border-stone-200 max-w-xl w-full p-6 space-y-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Saved Favorite Recipes</h3>
              <p className="text-xs text-stone-500">Stored locally in your browser</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Recipe List */}
        <div className="overflow-y-auto flex-1 space-y-2.5 pr-1">
          {savedRecipes.length === 0 ? (
            <div className="text-center py-12 text-stone-400 space-y-2">
              <Bookmark className="w-10 h-10 mx-auto text-stone-300" />
              <p className="text-sm font-semibold text-stone-600">No saved recipes yet</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                Generate any recipe and click the heart icon on the recipe card to bookmark it here!
              </p>
            </div>
          ) : (
            savedRecipes.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-stone-200 hover:border-brand-300 bg-stone-50/50 hover:bg-white transition-all flex items-center justify-between gap-3 shadow-2xs group"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectRecipe(item.recipe);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-brand-100 text-brand-700">
                      {item.recipe.cuisine}
                    </span>
                    <span className="text-[11px] text-stone-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.recipe.total_time}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 group-hover:text-brand-600 transition-colors">
                    {item.recipe.title}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                    {item.recipe.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectRecipe(item.recipe);
                      onClose();
                    }}
                    className="p-2 text-xs font-bold text-brand-600 hover:bg-brand-50 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    Load <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteRecipe(item.id)}
                    title="Delete saved recipe"
                    className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
