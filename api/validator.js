/**
 * Dietary Safety Validator Pass
 * Performs a keyword audit against user-selected restrictions to guarantee safety.
 * Does not rely on LLM adherence alone.
 */

export const RESTRICTION_RULES = {
  'nut-free': {
    name: 'Nut-Free',
    prohibited: [
      'peanut', 'peanuts', 'peanut butter', 'peanut oil', 'groundnut', 'arachis',
      'almond', 'almonds', 'almond flour', 'almond meal', 'almond milk',
      'cashew', 'cashews', 'cashew cream', 'kaju',
      'walnut', 'walnuts',
      'pecan', 'pecans',
      'hazelnut', 'hazelnuts', 'nutella', 'filbert',
      'pistachio', 'pistachios', 'pista',
      'macadamia',
      'pine nut', 'pine nuts', 'pignoli',
      'brazil nut', 'brazil nuts',
      'praline', 'marzipan', 'chestnut', 'chestnuts'
    ],
    exceptions: ['nut-free', 'butternut squash', 'nutmeg', 'coconut']
  },
  'gluten-free': {
    name: 'Gluten-Free',
    prohibited: [
      'wheat', 'all-purpose flour', 'plain flour', 'bread flour', 'wheat flour',
      'whole wheat', 'atta', 'maida', 'semolina', 'suji', 'rava',
      'breadcrumbs', 'panko', 'crouton', 'croutons',
      'barley', 'malt', 'malt vinegar',
      'rye',
      'spelt', 'farro', 'kamut', 'bulgur', 'couscous', 'triticale',
      'soy sauce', 'shoyu',
      'seitan', 'vital wheat gluten', 'durum'
    ],
    exceptions: [
      'gluten-free', 'gf', 'tamari', 'coconut aminos', 'gluten-free soy sauce',
      'cornstarch', 'rice flour', 'almond flour', 'tapioca', 'buckwheat'
    ]
  },
  'vegetarian': {
    name: 'Vegetarian',
    prohibited: [
      'chicken', 'poultry', 'beef', 'steak', 'pork', 'bacon', 'ham', 'turkey', 'duck',
      'lamb', 'mutton', 'veal', 'venison', 'pancetta', 'prosciutto', 'sausage',
      'chorizo', 'pepperoni', 'salami', 'meat', 'meatball', 'gelatin', 'lard', 'tallow',
      'fish', 'salmon', 'tuna', 'cod', 'halibut', 'trout', 'sardine', 'anchovy', 'anchovies',
      'shrimp', 'prawn', 'prawns', 'crab', 'lobster', 'crawfish', 'clam', 'clams',
      'mussel', 'mussels', 'oyster', 'oysters', 'squid', 'calamari', 'octopus', 'scallop', 'scallops',
      'fish sauce', 'oyster sauce'
    ],
    exceptions: ['vegetarian', 'plant-based', 'vegan', 'meatless', 'mock meat', 'tofu', 'tempeh']
  },
  'vegan': {
    name: 'Vegan',
    prohibited: [
      // All meat/seafood
      'chicken', 'poultry', 'beef', 'steak', 'pork', 'bacon', 'ham', 'turkey', 'duck',
      'lamb', 'mutton', 'veal', 'venison', 'pancetta', 'prosciutto', 'sausage',
      'chorizo', 'pepperoni', 'salami', 'meat', 'meatball', 'gelatin', 'lard', 'tallow',
      'fish', 'salmon', 'tuna', 'cod', 'halibut', 'trout', 'sardine', 'anchovy', 'anchovies',
      'shrimp', 'prawn', 'prawns', 'crab', 'lobster', 'crawfish', 'clam', 'clams',
      'mussel', 'mussels', 'oyster', 'oysters', 'squid', 'calamari', 'octopus', 'scallop',
      'fish sauce', 'oyster sauce',
      // Dairy & animal products
      'milk', 'dairy', 'heavy cream', 'whipping cream', 'sour cream', 'half and half',
      'buttermilk', 'butter', 'ghee',
      'cheese', 'paneer', 'parmesan', 'cheddar', 'mozzarella', 'gouda', 'brie', 'feta',
      'ricotta', 'cream cheese', 'curd', 'dahi', 'yogurt',
      'egg', 'eggs', 'egg white', 'egg yolk', 'mayonnaise',
      'honey', 'whey', 'casein'
    ],
    exceptions: [
      'vegan', 'plant-based', 'dairy-free', 'egg-free', 'oat milk', 'almond milk',
      'soy milk', 'coconut milk', 'vegan cheese', 'vegan butter', 'vegan mayo',
      'tofu', 'tempeh', 'flax egg', 'aquafaba', 'maple syrup', 'agave'
    ]
  },
  'dairy-free': {
    name: 'Dairy-Free',
    prohibited: [
      'milk', 'cow milk', 'goat milk', 'heavy cream', 'whipping cream', 'sour cream',
      'half and half', 'buttermilk', 'condensed milk', 'evaporated milk',
      'butter', 'ghee', 'clarified butter',
      'cheese', 'paneer', 'parmesan', 'cheddar', 'mozzarella', 'gouda', 'brie', 'feta',
      'ricotta', 'cream cheese', 'curd', 'dahi', 'yogurt', 'kefir',
      'whey', 'casein', 'lactose'
    ],
    exceptions: [
      'dairy-free', 'vegan', 'plant-based', 'coconut milk', 'almond milk', 'oat milk',
      'soy milk', 'cashew milk', 'vegan butter', 'vegan cheese', 'dairy-free yogurt', 'coconut yogurt'
    ]
  },
  'halal': {
    name: 'Halal',
    prohibited: [
      'pork', 'bacon', 'ham', 'lard', 'pancetta', 'prosciutto', 'pepperoni', 'chorizo', 'pork sausage',
      'alcohol', 'wine', 'red wine', 'white wine', 'beer', 'sake', 'mirin', 'shaoxing wine',
      'rum', 'brandy', 'bourbon', 'whiskey', 'vodka', 'cooking wine'
    ],
    exceptions: ['halal', 'alcohol-free', 'non-alcoholic']
  },
  'kosher': {
    name: 'Kosher',
    prohibited: [
      'pork', 'bacon', 'ham', 'lard',
      'shrimp', 'prawn', 'prawns', 'crab', 'lobster', 'clam', 'mussel', 'oyster', 'squid', 'calamari', 'octopus'
    ],
    exceptions: ['kosher']
  },
  'shellfish-free': {
    name: 'Shellfish-Free',
    prohibited: [
      'shrimp', 'prawn', 'prawns', 'crab', 'lobster', 'crawfish', 'crayfish',
      'clam', 'clams', 'mussel', 'mussels', 'oyster', 'oysters', 'scallop', 'scallops',
      'squid', 'calamari', 'octopus', 'shrimp paste', 'belacan', 'oyster sauce'
    ],
    exceptions: ['vegetarian oyster sauce', 'mushroom oyster sauce', 'plant-based']
  }
};

/**
 * Normalizes a string for dietary pattern analysis
 */
function normalizeText(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9s-]/g, ' ');
}

/**
 * Validates a recipe against user selected restrictions.
 * @param {Object} recipe - The generated recipe object
 * @param {Array<string>} restrictions - Array of restriction keys (e.g. ['nut-free', 'gluten-free'])
 * @returns {Object} { isValid: boolean, violations: Array<{ restriction, keyword, item, location }> }
 */
export function validateRecipe(recipe, restrictions = []) {
  if (!recipe || !Array.isArray(restrictions) || restrictions.length === 0) {
    return { isValid: true, violations: [], checksPerformed: [] };
  }

  const violations = [];
  const checksPerformed = [];

  // Extract all text to check: ingredients, steps, substitution notes
  const ingredientTexts = (recipe.ingredients || []).map(ing => {
    const item = typeof ing === 'string' ? ing : (ing.item || '');
    const sub = typeof ing === 'object' && ing.substitution ? ing.substitution : '';
    return { text: `${item} ${sub}`, original: item };
  });

  const stepTexts = (recipe.steps || []).map((st, idx) => {
    const instr = typeof st === 'string' ? st : (st.instruction || '');
    const tip = typeof st === 'object' && st.tip ? st.tip : '';
    return { text: `${instr} ${tip}`, original: `Step ${idx + 1}` };
  });

  // Also check title and description
  const metaTexts = [
    { text: recipe.title || '', original: 'Title' },
    { text: recipe.description || '', original: 'Description' }
  ];

  for (const rawKey of restrictions) {
    const key = rawKey.toLowerCase().trim();
    const rule = RESTRICTION_RULES[key];
    if (!rule) continue;

    checksPerformed.push(rule.name);

    // Check all ingredient lines
    for (const itemObj of ingredientTexts) {
      const norm = normalizeText(itemObj.text);

      // Check if line contains an explicit exception
      const hasException = rule.exceptions.some(exc => norm.includes(exc));
      if (hasException) {
        // Exception matched (e.g. 'gluten-free soy sauce' or 'coconut milk')
        continue;
      }

      for (const prohibited of rule.prohibited) {
        // Word boundary regex
        const pattern = new RegExp(`\\b${prohibited}\\b`, 'i');
        if (pattern.test(norm)) {
          violations.push({
            restriction: rule.name,
            keyword: prohibited,
            item: itemObj.original,
            location: 'ingredients'
          });
          break; // Stop at first prohibited word for this item
        }
      }
    }

    // Check steps for sneak-in ingredients
    for (const stepObj of stepTexts) {
      const norm = normalizeText(stepObj.text);
      const hasException = rule.exceptions.some(exc => norm.includes(exc));
      if (hasException) continue;

      for (const prohibited of rule.prohibited) {
        const pattern = new RegExp(`\\b${prohibited}\\b`, 'i');
        if (pattern.test(norm)) {
          // Check if already caught in ingredients
          const alreadyCaught = violations.some(v => v.restriction === rule.name && v.keyword === prohibited);
          if (!alreadyCaught) {
            violations.push({
              restriction: rule.name,
              keyword: prohibited,
              item: stepObj.original,
              location: 'instructions'
            });
          }
          break;
        }
      }
    }
  }

  return {
    isValid: violations.length === 0,
    violations,
    checksPerformed
  };
}
