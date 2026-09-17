import { validateRecipe } from '../api/validator.js';

console.log("==========================================");
console.log("RUNNING SAFETY VALIDATOR AUTOMATED TESTS");
console.log("==========================================");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

// Test 1: Nut-free detection
const nutRecipe = {
  title: "Cashew Korma",
  ingredients: [
    { item: "1 cup soaked cashews" },
    { item: "1 tbsp oil" },
    { item: "1 tsp cumin" }
  ],
  steps: [{ instruction: "Blend the cashews into cream." }]
};
const resNut = validateRecipe(nutRecipe, ['nut-free']);
assert(!resNut.isValid, "Should detect cashews in nut-free mode");
assert(resNut.violations.some(v => v.keyword === 'cashews' || v.keyword === 'cashew'), "Should flag cashew violation");

// Test 2: Nut-free with coconut (coconut should NOT be rejected)
const coconutRecipe = {
  title: "Kerala Vegetable Stew",
  ingredients: [
    { item: "1 cup coconut milk" },
    { item: "1 potato, diced" }
  ],
  steps: [{ instruction: "Simmer potato in coconut milk." }]
};
const resCoconut = validateRecipe(coconutRecipe, ['nut-free']);
assert(resCoconut.isValid, "Coconut milk should NOT be flagged as a nut in standard cooking");

// Test 3: Gluten-free detection
const glutenRecipe = {
  title: "Soy Garlic Stir-fry",
  ingredients: [
    { item: "2 tbsp soy sauce" },
    { item: "1 block tofu" },
    { item: "1 tbsp wheat flour for dusting" }
  ],
  steps: [{ instruction: "Dust tofu with wheat flour and fry." }]
};
const resGluten = validateRecipe(glutenRecipe, ['gluten-free']);
assert(!resGluten.isValid, "Should detect soy sauce and wheat flour");
assert(resGluten.violations.length >= 2, "Should identify both violations");

// Test 4: Gluten-free safe exception
const gfSafeRecipe = {
  title: "Tamari Glazed Tofu",
  ingredients: [
    { item: "2 tbsp gluten-free soy sauce" },
    { item: "1 tbsp cornstarch" }
  ],
  steps: [{ instruction: "Whisk gluten-free soy sauce with cornstarch." }]
};
const resGfSafe = validateRecipe(gfSafeRecipe, ['gluten-free']);
assert(resGfSafe.isValid, "Gluten-free soy sauce and cornstarch should pass cleanly");

// Test 5: Vegan detection of dairy and honey
const dairyHoneyRecipe = {
  title: "Butter Honey Carrots",
  ingredients: [
    { item: "2 tbsp butter" },
    { item: "1 tbsp honey" },
    { item: "5 carrots" }
  ],
  steps: [{ instruction: "Glaze carrots with butter and honey." }]
};
const resVegan = validateRecipe(dairyHoneyRecipe, ['vegan']);
assert(!resVegan.isValid, "Should detect butter and honey in vegan mode");

// Test 6: Vegetarian detection of bacon/chicken
const meatRecipe = {
  title: "Chicken Carbonara",
  ingredients: [
    { item: "200g chicken breast" },
    { item: "50g bacon" }
  ],
  steps: [{ instruction: "Fry bacon and chicken until golden." }]
};
const resVeg = validateRecipe(meatRecipe, ['vegetarian']);
assert(!resVeg.isValid, "Should detect chicken and bacon in vegetarian mode");

// Test 7: Halal detection of wine and pork
const halalTest = {
  title: "Pork with White Wine Sauce",
  ingredients: [
    { item: "1 cup white wine" },
    { item: "Pork chops" }
  ],
  steps: [{ instruction: "Deglaze pan with white wine." }]
};
const resHalal = validateRecipe(halalTest, ['halal']);
assert(!resHalal.isValid, "Should detect pork and wine for halal constraint");

console.log("------------------------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
