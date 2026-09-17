/**
 * Curated Authentic Regional Recipes for Offline / Demo Preview
 * Strictly adhering to regional culinary techniques and multi-constraint parameters.
 */

export const REGIONAL_RECIPES = {
  'South Indian': {
    title: "Keerai Kootu (South Indian Spinach & Lentil Stew with Curry Leaf Tadka)",
    cuisine: "South Indian",
    prep_time: "10 mins",
    cook_time: "18 mins",
    total_time: "28 mins",
    skill_level: "Intermediate",
    servings: 2,
    description: "A comforting Tamil home-style preparation of tender spinach and soft lentils, enriched with freshly grated coconut and elevated by the quintessential South Indian mustard-seed and curry-leaf tempering (tadka).",
    regional_technique_highlight: "Authentic Tadka (Tempering): Mustard seeds popped in smoking coconut oil with dried red chilies, hing, and fresh curry leaves to release deep, fat-soluble aromatic oils.",
    ingredients: [
      { item: "200g Fresh Spinach (Keerai), washed and roughly chopped", category: "Produce", substitution: "Kale, Swiss chard, or fenugreek leaves", is_pantry_staple: false },
      { item: "3/4 cup Moong Dal (split yellow lentils) or Toor Dal, rinsed", category: "Protein", substitution: "Yellow split peas or red lentils", is_pantry_staple: false },
      { item: "1/4 cup Fresh grated coconut (or desiccated coconut soaked in warm water)", category: "Produce", substitution: "2 tbsp coconut milk or omit for lower fat", is_pantry_staple: false },
      { item: "1 Green chili, slit lengthwise", category: "Produce", substitution: "Jalapeño or pinch of red chili powder", is_pantry_staple: false },
      { item: "1/2 tsp Turmeric powder", category: "Spices & Aromatics", substitution: "Fresh turmeric grated", is_pantry_staple: true },
      { item: "1 tsp Black mustard seeds", category: "Spices & Aromatics", substitution: "Cumin seeds", is_pantry_staple: true },
      { item: "1/2 tsp Cumin seeds (jeera)", category: "Spices & Aromatics", substitution: "Ground cumin", is_pantry_staple: true },
      { item: "1 sprig Fresh curry leaves (8-10 leaves)", category: "Spices & Aromatics", substitution: "Fresh cilantro for finishing", is_pantry_staple: false },
      { item: "1 Dried red chili, broken in half", category: "Spices & Aromatics", substitution: "Pinch of red pepper flakes", is_pantry_staple: true },
      { item: "1 pinch Asafoetida (Hing, ensure gluten-free certified if GF)", category: "Spices & Aromatics", substitution: "Garlic clove minced", is_pantry_staple: true },
      { item: "1 tbsp Coconut oil or sesame oil", category: "Pantry", substitution: "Any neutral vegetable oil", is_pantry_staple: true },
      { item: "1/2 tsp Sea salt (to taste)", category: "Pantry", substitution: "Table salt", is_pantry_staple: true }
    ],
    steps: [
      {
        step_number: 1,
        instruction: "In a saucepan, combine rinsed moong dal, 2 cups of water, and turmeric powder. Bring to a gentle boil, then simmer partially covered for 12 minutes until soft and creamy.",
        tip: "Skim any white foam from the surface to keep the lentil base sweet and clean."
      },
      {
        step_number: 2,
        instruction: "Add the chopped spinach and slit green chili into the simmering dal. Cook uncovered for 4-5 minutes until the spinach wilts into a vibrant emerald green.",
        tip: "Do not overcook the greens; keeping them bright preserves vital enzymes and peppery sweetness."
      },
      {
        step_number: 3,
        instruction: "Pulse the grated coconut and 1/2 tsp cumin seeds with 2 tbsp of warm water into a coarse paste. Fold this paste into the simmering stew and season with salt. Simmer for 2 minutes on low.",
        tip: "The coconut paste naturally thickens the kootu without requiring any cornstarch or flour."
      },
      {
        step_number: 4,
        instruction: "Execute the Tadka: In a small ladle or pan, heat coconut oil over medium-high heat. Drop in mustard seeds. When they crackle vigorously, immediately add dried red chili, hing, and fresh curry leaves.",
        tip: "Stand back as curry leaves pop in hot oil! This takes only 10 seconds and locks in the authentic aroma."
      },
      {
        step_number: 5,
        instruction: "Pour the sizzling tadka directly over the spinach stew. Immediately cover with a lid for 1 minute to trap the aromatic vapors, then stir gently.",
        tip: "Covering the pot locks the essential volatile oils directly into the stew."
      }
    ],
    allergen_flags: ["Gluten-Free", "Nut-Free", "Vegan", "Vegetarian", "Dairy-Free", "Halal"],
    cuisine_notes: "Traditionally served over steaming hot Sona Masoori or Basmati rice, accompanied by papadum or lemon pickle."
  },

  'Mexican': {
    title: "Tacos de Calabacita y Frijol Negro (Charred Squash & Black Bean Tacos with Salsa Tatemada)",
    cuisine: "Mexican",
    prep_time: "10 mins",
    cook_time: "15 mins",
    total_time: "25 mins",
    skill_level: "Beginner",
    servings: 2,
    description: "A vibrant Mexican street-style taco featuring smoky charred zucchini and seasoned black beans, crowned with quick roasted comal salsa and pickled red onions on warm corn tortillas.",
    regional_technique_highlight: "Salsa Tatemada (Dry-Skillet Charring): Blistering aromatics on a smoking dry comal/cast iron to caramelize natural sugars and impart a rich, authentic campfire smokiness.",
    ingredients: [
      { item: "2 Medium Zucchini (or Mexican Calabacita), diced into 1/2-inch cubes", category: "Produce", substitution: "Yellow summer squash or bell peppers", is_pantry_staple: false },
      { item: "1 can (15 oz) Black beans, drained and rinsed", category: "Protein", substitution: "Pinto beans or cooked lentils", is_pantry_staple: true },
      { item: "2 Ripe Roma tomatoes, whole", category: "Produce", substitution: "Tomatillos or 1/2 cup canned fire-roasted tomatoes", is_pantry_staple: false },
      { item: "1 Jalapeño or Serrano pepper, whole", category: "Produce", substitution: "Pinch of cayenne or chipotle pepper", is_pantry_staple: false },
      { item: "2 Cloves Garlic, peel left on", category: "Produce", substitution: "Garlic powder", is_pantry_staple: true },
      { item: "6 Small White or Yellow Corn Tortillas (certified GF)", category: "Grain", substitution: "Cassava tortillas or warm rice bowls", is_pantry_staple: false },
      { item: "1 tsp Ground Cumin & 1/2 tsp Mexican Oregano", category: "Spices & Aromatics", substitution: "Regular oregano", is_pantry_staple: true },
      { item: "1 Fresh Lime, halved", category: "Produce", substitution: "Apple cider vinegar", is_pantry_staple: false },
      { item: "1/4 cup Fresh cilantro, chopped (stems finely minced)", category: "Produce", substitution: "Fresh scallions", is_pantry_staple: false },
      { item: "1 tbsp Cooking oil", category: "Pantry", substitution: "Avocado or olive oil", is_pantry_staple: true },
      { item: "Salt and freshly cracked black pepper", category: "Pantry", substitution: "To taste", is_pantry_staple: true }
    ],
    steps: [
      {
        step_number: 1,
        instruction: "Char the Salsa Aromatics: Heat a dry cast iron skillet over high heat. Place whole tomatoes, jalapeño, and unpeeled garlic cloves directly on the dry pan. Turn occasionally for 6-8 minutes until deeply blistered and charred.",
        tip: "Leaving garlic skin on protects the clove from burning while the interior steams into sweet, mellow garlic puree."
      },
      {
        step_number: 2,
        instruction: "Sauté the Vegetables: In a separate wide skillet, heat oil over high heat. Add diced zucchini in a single layer. Sear without moving for 2-3 minutes to get golden caramelization, then stir and add cumin, oregano, and salt.",
        tip: "High heat prevents squash from turning mushy by evaporating surface moisture quickly."
      },
      {
        step_number: 3,
        instruction: "Incorporate Beans: Stir rinsed black beans and finely minced cilantro stems into the skillet with zucchini. Splash in 2 tbsp water or lime juice, reduce heat to low, and warm through for 3 minutes.",
        tip: "Cilantro stems contain the highest concentration of aromatic essential oils; never discard them!"
      },
      {
        step_number: 4,
        instruction: "Finish the Salsa: Peel the charred garlic. In a bowl or mortar (molcajete), roughly mash the charred tomatoes, roasted pepper, and garlic with a pinch of coarse salt and juice of half a lime.",
        tip: "A coarse, rustic texture creates far superior taco mouthfeel compared to an over-pureed blender salsa."
      },
      {
        step_number: 5,
        instruction: "Warm tortillas directly over an open burner flame or dry pan for 20 seconds per side until pliable and speckled. Fill with zucchini-bean mixture, top with spoon of charred salsa, fresh cilantro leaves, and a squeeze of lime.",
        tip: "Always toast corn tortillas right before assembly to awaken the nixtamalized corn aroma."
      }
    ],
    allergen_flags: ["Gluten-Free", "Nut-Free", "Vegan", "Vegetarian", "Dairy-Free", "Halal"],
    cuisine_notes: "Serve with lime wedges and pickled red onions. For extra richness, pair with sliced ripe avocado."
  },

  'Mediterranean': {
    title: "Levantine Braised Chickpeas with Garlic Bloom, Cumin & Herb Emulsion",
    cuisine: "Mediterranean",
    prep_time: "8 mins",
    cook_time: "17 mins",
    total_time: "25 mins",
    skill_level: "Intermediate",
    servings: 2,
    description: "Creamy chickpeas simmered in a golden extra virgin olive oil emulsion infused with thinly shaved garlic, sweet smoked paprika, crushed cumin, and finished with a cascade of lemon juice and tender herbs.",
    regional_technique_highlight: "Garlic & Spice Bloom: Sizzling shaved garlic and whole spices in low-temperature extra-virgin olive oil so fat absorbs every volatile aromatic without scorching.",
    ingredients: [
      { item: "1 can (15 oz) Chickpeas (Garbanzo beans), liquid reserved (aquafaba)", category: "Protein", substitution: "Cannellini or butter beans", is_pantry_staple: true },
      { item: "4 Cloves Garlic, thinly shaved lengthwise", category: "Produce", substitution: "Garlic paste", is_pantry_staple: true },
      { item: "3 tbsp Extra Virgin Olive Oil", category: "Pantry", substitution: "Any good quality olive oil", is_pantry_staple: true },
      { item: "1 tsp Whole cumin seeds or ground cumin", category: "Spices & Aromatics", substitution: "Coriander", is_pantry_staple: true },
      { item: "1 tsp Sweet Spanish or Smoked Paprika", category: "Spices & Aromatics", substitution: "Aleppo pepper or red chili flakes", is_pantry_staple: true },
      { item: "1/2 cup Diced tomatoes or 1 fresh tomato grated", category: "Produce", substitution: "1 tbsp tomato paste + water", is_pantry_staple: true },
      { item: "1/2 cup Fresh Italian parsley or mint, roughly chopped", category: "Produce", substitution: "Fresh cilantro or dill", is_pantry_staple: false },
      { item: "1 Fresh Lemon (zest and juice)", category: "Produce", substitution: "Red wine vinegar", is_pantry_staple: false },
      { item: "Sea salt and freshly cracked black pepper", category: "Pantry", substitution: "To taste", is_pantry_staple: true }
    ],
    steps: [
      {
        step_number: 1,
        instruction: "Pour extra virgin olive oil and shaved garlic into a cold skillet. Place over medium-low heat and cook gently for 3 minutes until garlic is fragrant and pale ivory, not brown.",
        tip: "Starting with cold oil allows garlic aromatics to infuse gently into the oil before reaching browning temperature."
      },
      {
        step_number: 2,
        instruction: "Add cumin and paprika directly into the oil. Sizzle for 30 seconds until the oil turns a deep sunset red.",
        tip: "Blooming spices in fat activates lipophilic flavor compounds that water cannot dissolve."
      },
      {
        step_number: 3,
        instruction: "Add chickpeas along with 1/4 cup of their reserved starchy canning liquid and diced tomatoes. Season with 1/2 tsp salt.",
        tip: "The natural starches in chickpea liquid (aquafaba) will emulsify with the olive oil to make a glossy, rich sauce."
      },
      {
        step_number: 4,
        instruction: "Simmer uncovered for 10 minutes over medium heat, lightly crushing 1/3 of the chickpeas with the back of a wooden spoon to thicken the broth.",
        tip: "Crushing a portion of the beans creates a velvety body without adding cream or flour."
      },
      {
        step_number: 5,
        instruction: "Remove from heat. Stir in lemon zest, 2 tbsp fresh lemon juice, and half of the fresh herbs. Drizzle with a teaspoon of raw olive oil and top with remaining herbs.",
        tip: "Always add fresh tender herbs off the flame so heat does not dull their peppery volatile oils."
      }
    ],
    allergen_flags: ["Gluten-Free", "Nut-Free", "Vegan", "Vegetarian", "Dairy-Free", "Halal"],
    cuisine_notes: "Serve warm with gluten-free crusty bread, warm pita, or fluffy quinoa. Excellent accompanied by Kalamata olives."
  },

  'Italian': {
    title: "Cannellini all'Uccelletto (Tuscan Braised White Beans with Sage & Garlic)",
    cuisine: "Italian",
    prep_time: "5 mins",
    cook_time: "15 mins",
    total_time: "20 mins",
    skill_level: "Beginner",
    servings: 2,
    description: "A timeless Tuscan trattoria classic of tender white cannellini beans stewed in sweet crushed tomatoes, flavored with whole garlic cloves and fresh aromatic sage leaves.",
    regional_technique_highlight: "La Mantecatura Rustica: Emulsifying bean starch with rich Tuscan olive oil and tomato juices through vigorous circular spoon movements off heat.",
    ingredients: [
      { item: "1 can (15 oz) Cannellini beans, rinsed", category: "Protein", substitution: "Great Northern or navy beans", is_pantry_staple: true },
      { item: "1 cup Canned San Marzano crushed tomatoes or passata", category: "Pantry", substitution: "2 fresh tomatoes grated", is_pantry_staple: true },
      { item: "3 Cloves Fresh garlic, peeled and crushed lightly", category: "Produce", substitution: "Minced garlic", is_pantry_staple: true },
      { item: "6-8 Fresh Sage leaves", category: "Produce", substitution: "1/2 tsp dried sage or fresh rosemary", is_pantry_staple: false },
      { item: "2 tbsp Extra Virgin Olive Oil", category: "Pantry", substitution: "Standard olive oil", is_pantry_staple: true },
      { item: "Pinch of crushed red pepper flakes (peperoncino)", category: "Spices & Aromatics", substitution: "Black pepper", is_pantry_staple: true },
      { item: "Fine sea salt and cracked black pepper to taste", category: "Pantry", substitution: "To taste", is_pantry_staple: true }
    ],
    steps: [
      {
        step_number: 1,
        instruction: "In a heavy skillet, warm olive oil over medium heat. Add crushed garlic cloves and fresh sage leaves. Sauté for 2 minutes until sage crisp edges and garlic turns lightly golden.",
        tip: "Crushing garlic rather than mincing gives a gentle, sweet garlic infusion that will not scorch."
      },
      {
        step_number: 2,
        instruction: "Pour in crushed tomatoes and red pepper flakes. Season with salt. Simmer over medium heat for 6-8 minutes until the tomato sauce sweetens and oil begins to separate around the perimeter.",
        tip: "Simmering until oil pools around the edges ensures the tomato acidity has mellowed into sweetness."
      },
      {
        step_number: 3,
        instruction: "Add rinsed cannellini beans and 2 tbsp water. Simmer on low heat for 5 minutes, allowing beans to absorb tomato and sage aromatics.",
        tip: "Keep the simmer gentle so the delicate bean skins stay intact."
      },
      {
        step_number: 4,
        instruction: "Perform Mantecatura: Remove skillet from heat. Drizzle with 1 tsp fresh olive oil and vigorously swirl the pan with a wooden spoon for 30 seconds to produce a glossy emulsion.",
        tip: "The friction emulsifies the natural starches with the fat into a luxurious glaze."
      }
    ],
    allergen_flags: ["Gluten-Free", "Nut-Free", "Vegan", "Vegetarian", "Dairy-Free", "Halal"],
    cuisine_notes: "Classic Tuscan cucina povera. Serve spooned over toasted gluten-free country bread or polenta."
  }
};

/**
 * Returns a matched or customized mock recipe satisfying all constraints
 */
export function getMockRecipe({ ingredients = [], maxTime = 30, skillLevel = 'Intermediate', dietaryRestrictions = [], cuisine = 'South Indian', variationPrompt = '' }) {
  // Find closest template
  const matched = REGIONAL_RECIPES[cuisine] || REGIONAL_RECIPES['South Indian'];

  // Clone template
  const recipe = JSON.parse(JSON.stringify(matched));

  // Adjust time according to user constraint
  const targetCook = Math.min(parseInt(maxTime) || 30, 40);
  const targetPrep = Math.max(5, Math.min(10, Math.floor(targetCook * 0.3)));
  recipe.prep_time = `${targetPrep} mins`;
  recipe.cook_time = `${targetCook - targetPrep} mins`;
  recipe.total_time = `${targetCook} mins`;
  recipe.skill_level = skillLevel;

  // Personalize with user ingredients if provided
  if (ingredients.length > 0) {
    const firstIng = ingredients[0];
    recipe.description += ` Specifically customized to highlight your kitchen staples including ${ingredients.slice(0, 3).join(', ')}.`;
  }

  // Handle variation prompt if provided
  if (variationPrompt) {
    recipe.title += ` (${variationPrompt.slice(0, 25)})`;
    recipe.steps.push({
      step_number: recipe.steps.length + 1,
      instruction: `Chef's Custom Variation: Incorporated your request: "${variationPrompt}". Adjust seasoning to highlight this note.`,
      tip: "Custom technique tailored to your requested variation."
    });
  }

  // Ensure allergen flags reflect user restrictions
  const formattedRestrictions = dietaryRestrictions.map(r =>
    r.charAt(0).toUpperCase() + r.slice(1)
  );
  recipe.allergen_flags = Array.from(new Set([...recipe.allergen_flags, ...formattedRestrictions]));

  return recipe;
}
