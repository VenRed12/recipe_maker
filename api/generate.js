import dotenv from 'dotenv';
dotenv.config();
import { validateRecipe } from './validator.js';
import { getMockRecipe } from '../src/data/mockRecipes.js';

/**
 * Authentic regional culinary directives for deep technique enforcement
 */
const REGIONAL_CULINARY_DIRECTIVES = {
  'South Indian': `Focus on authentic South Indian techniques:
- Start with a classic Tempering / Tadka (mustard seeds sputtered in hot sesame oil or coconut oil, fresh curry leaves, dried red chilies, pinch of hing/asafoetida, urad dal).
- Emphasize freshly grated coconut, tamarind extract for souring, crushed black pepper, or rasam/sambar aromatics.
- Pair with steamed rice, idli/dosa, or savor as a regional dry roast (poriyal / varuval / kootu).
- DO NOT just sprinkle generic curry powder. Name specific spices and regional technique!`,

  'North Indian': `Focus on authentic North Indian techniques:
- Layer flavors through Bhunao (slow frying of finely diced onions, ginger-garlic paste, and tomatoes until fat separates).
- Temper with whole spices: cumin seeds, green cardamom, cloves, cinnamon stick, and kasuri methi (fenugreek leaves crushed between palms).
- Focus on balanced gravies (tari / masala) or dry stir-fries (sabzi) with depth and aroma.`,

  'Mexican': `Focus on authentic regional Mexican techniques:
- Charring aromatics on a comal/dry skillet (tomatoes, tomatillos, garlic, onions) to develop smoky sweet depth.
- Toaster/rehydrator of dried chiles (ancho, guajillo, chipotle) into a smooth, emulsified adobo or salsa.
- Cook down the sofrito / salsa in fat until concentrated (guisar la salsa) before adding liquids.
- Brighten with Mexican oregano, fresh cilantro stems, lime zest, and raw onion dice.`,

  'Mediterranean': `Focus on authentic Mediterranean techniques:
- Gentle blooming of garlic and herbs in high-quality extra virgin olive oil over medium-low heat.
- Layering acidity with fresh lemon juice, sumac, capers, or vinegar against creamy elements (tahini, labneh, white beans).
- Finishing with heaps of fresh tender herbs (parsley, mint, dill) stirred in off the heat to preserve vibrancy.`,

  'Italian': `Focus on authentic Italian regional techniques:
- Build flavor with a gentle Soffritto (minced onion, celery, carrot in olive oil) or Aglio e Olio base.
- Starchy emulsification: use reserved cooking water with fat to create a silky, clinging sauce (la mantecatura).
- Simple, hyper-focused ingredient harmonies where quality technique elevates everyday staples.`,

  'Thai': `Focus on authentic Thai cooking techniques:
- Balance the 4 pillars: Salty, Sweet, Sour, Spicy.
- If using coconut milk, fry the thick coconut cream until it "cracks" and oil separates before frying curry paste or aromatics.
- Bruise lemongrass, tear kaffir lime leaves, crush bird's eye chilies to release essential oils.`,

  'Japanese': `Focus on authentic Japanese home cooking techniques:
- Balance dashi umami, mirin/sugar, and soy sauce (or gluten-free tamari) using the "Sa-Shi-Su-Se-So" seasoning order.
- Quick sauté (Itame-mono) with toasted sesame oil or gentle simmering (Nimono) with drop-lid (otoshibuta) technique.
- Clean presentation highlighting the natural geometry and color of fresh ingredients.`,

  'Middle Eastern': `Focus on authentic Levantine and Middle Eastern techniques:
- Blooming warm ground spices (cumin, coriander, allspice, sumac, za'atar) in warm oil.
- Caramelizing onions slowly for Mujadara-style sweetness.
- Bright lemon-tahini or garlic-toum emulsification and herb-heavy finishes.`,

  'French': `Focus on authentic French bistro techniques:
- Build a Mirepoix (onion, carrot, celery) cooked gently without color (suer) or browned for depth.
- Deglazing the fond (browned bits) with stock or acidic liquid to create a rich pan sauce.
- Mount with cold fat/butter (or olive oil for dairy-free) at the very end (monter au beurre).`
};

/**
 * Builds the strict LLM Prompt enforcing the 5 simultaneous constraints
 */
function buildPrompt(data) {
  const {
    ingredients = [],
    pantryStaples = true,
    maxTime = 30,
    skillLevel = 'Intermediate',
    dietaryRestrictions = [],
    cuisine = 'Mediterranean',
    variationPrompt = ''
  } = data;

  const cuisineDirective = REGIONAL_CULINARY_DIRECTIVES[cuisine] ||
    `Ensure authentic regional techniques, aromatics, and flavor profiles representative of ${cuisine} cuisine. Avoid generic shortcuts.`;

  const pantryStaplesText = pantryStaples
    ? 'Standard kitchen pantry staples (cooking oil, salt, black pepper, water, and basic ground spices) may be assumed available in modest amounts.'
    : 'Strict Pantry Mode: ONLY use the exact available ingredients listed by the user, plus plain water and salt if needed.';

  const dietaryText = dietaryRestrictions.length > 0
    ? dietaryRestrictions.map(r => `- ${r.toUpperCase()} (HARD NON-NEGOTIABLE CONSTRAINT: Zero tolerance for any prohibited items or sneaky derivatives)`).join('\n')
    : 'No specific dietary restrictions requested.';

  return `You are an elite master chef and culinary technique instructor. Your mission is to generate an authentic, delicious, and regionally accurate recipe that satisfies FIVE SIMULTANEOUS CONSTRAINTS with surgical precision.

=== THE 5 CONSTRAINTS ===
1. AVAILABLE INGREDIENTS:
   User Kitchen: ${ingredients.join(', ') || 'Various seasonal staples'}
   Pantry Staples Policy: ${pantryStaplesText}
   *PRIORITY*: The recipe must center around what the user actually has. Offer clear 1-to-1 substitutions if an ingredient can be swapped.

2. TIME AVAILABLE:
   Maximum Total Time (Prep + Cook): ${maxTime} minutes.
   *PRIORITY*: The recipe MUST realistically be prepped and cooked within this timeframe for a ${skillLevel} cook.

3. SKILL LEVEL:
   Skill: ${skillLevel}
   *Beginner*: Plain explanations, simple knife work, visual doneness cues, forgiving margins.
   *Intermediate*: Confident sauté, reduction, proper seasoning to taste, active heat management.
   *Advanced*: Multi-stage flavor building, precise temperature control, professional culinary techniques.

4. DIETARY RESTRICTIONS (HARD CONSTRAINTS):
${dietaryText}
   *CRITICAL SAFETY MANDATE*: You MUST NOT include ANY ingredient, sauce, or garnish that violates these restrictions. If the user is nut-free, no tree nuts or peanuts. If vegan, no dairy/ghee/honey/meat. If gluten-free, no wheat/soy-sauce/barley. Violating this will cause severe health risks and complete recipe rejection.

5. REGIONAL / CULTURAL CUISINE PREFERENCE:
   Target Cuisine: ${cuisine}
   Technique Guide:
   ${cuisineDirective}
   *CORE DIFFERENTIATOR*: Lean into REAL regional culinary technique (e.g. tempering/tadka, charring chiles, soffritto, deglazing). Do NOT just output a generic stir-fry or salad with a pinch of cumin.

${variationPrompt ? `=== VARIATION DIRECTIVE ===\nUser requested this refinement/variation: "${variationPrompt}"\nMake this recipe distinct from previous outputs while respecting all 5 constraints!\n` : ''}

=== STRICT OUTPUT REQUIREMENT ===
Respond ONLY with a valid JSON object matching this schema exactly. No conversational markdown, no code fencing before/after, just raw JSON:

{
  "title": "Authentic Regional Dish Name (English & Traditional Name)",
  "cuisine": "${cuisine}",
  "prep_time": "X mins",
  "cook_time": "Y mins",
  "total_time": "Z mins",
  "skill_level": "${skillLevel}",
  "servings": 2,
  "description": "2-3 vivid sentences capturing the dish's regional roots, texture, and flavor profile.",
  "regional_technique_highlight": "1-2 sentences highlighting the authentic regional technique used in this recipe (e.g., 'Mustard Seed & Curry Leaf Tadka', 'Comal Charring & Emulsion').",
  "ingredients": [
    {
      "item": "Ingredient name with quantity (e.g. 1 cup cooked chickpeas)",
      "category": "Produce | Protein | Grain | Spices & Aromatics | Pantry",
      "substitution": "Optional regional or pantry substitution (e.g. 'Can sub black beans or lentils')",
      "is_pantry_staple": false
    }
  ],
  "steps": [
    {
      "step_number": 1,
      "instruction": "Clear, precise step-by-step action.",
      "tip": "Chef's pro-tip for technique, temperature, or visual doneness cue."
    }
  ],
  "allergen_flags": ["Nut-Free", "Gluten-Free", "Vegan"],
  "cuisine_notes": "Serving suggestions, traditional accompaniments, or cultural context for this dish."
}`;
}

/**
 * Calls Google Gemini API
 */
async function callGemini(prompt, apiKey) {
  // Candidate models: gemini-2.5-flash -> gemini-1.5-flash -> gemini-2.0-flash
  const models = [
    'gemini-3.6-flash',
    'gemini-3.8-flash',
    'gemini-flash-latest',
    'gemini-3.5-flash-lite',
    'gemini-2.0-flash'
  ];
  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Gemini model ${model} returned ${response.status}: ${errorText}`);
        lastError = new Error(`Gemini API error (${response.status}): ${errorText}`);
        continue; // Try next model fallback
      }

      const result = await response.json();
      const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        throw new Error("No text content returned from Gemini");
      }

      // Parse JSON
      const cleanJson = rawText.trim()
        .replace(/^```jsons*/i, '')
        .replace(/^```s*/i, '')
        .replace(/```$/i, '')
        .trim();

      return JSON.parse(cleanJson);
    } catch (err) {
      console.warn(`Model ${model} failed: ${err.message}`);
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to generate recipe from Gemini API");
}

/**
 * Main serverless request handler
 */
export default async function handler(req, res) {
  // Support CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-gemini-key'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const {
      ingredients = [],
      pantryStaples = true,
      maxTime = 30,
      skillLevel = 'Intermediate',
      dietaryRestrictions = [],
      cuisine = 'South Indian',
      variationPrompt = ''
    } = body;

    // Determine API Key: passed in header > passed in body > process.env
    const apiKey = (req.headers && req.headers['x-gemini-key']) ||
                   body.apiKey ||
                   process.env.GEMINI_API_KEY ||
                   '';

    let recipe = null;
    let source = 'gemini';
    let retryCount = 0;
    let validationResult = { isValid: true, violations: [] };

    if (!apiKey || apiKey.trim() === '' || apiKey === 'DEMO_MODE') {
      // Offline / Demo Mode: return curated authentic recipe satisfying constraints
      recipe = getMockRecipe({ ingredients, maxTime, skillLevel, dietaryRestrictions, cuisine, variationPrompt });
      source = 'demo-engine';
      validationResult = validateRecipe(recipe, dietaryRestrictions);
    } else {
      // Online with Gemini API
      let prompt = buildPrompt(body);
      const MAX_RETRIES = 2;

      while (retryCount <= MAX_RETRIES) {
        try {
          recipe = await callGemini(prompt, apiKey.trim());
          source = 'gemini';
        } catch (apiErr) {
          console.error("Gemini API call failed:", apiErr.message);
          // Return clear informative error instead of masking it with mock recipes
          return res.status(400).json({
            success: false,
            error: `Gemini API Error: ${apiErr.message}. Please verify your API key in the top-right settings.`
          });
        }

        // STEP 4: SAFETY VALIDATION PASS
        validationResult = validateRecipe(recipe, dietaryRestrictions);

        if (validationResult.isValid) {
          // Safety pass clean!
          break;
        } else {
          // Violation detected! Trigger auto-regeneration pass with corrective prompt
          retryCount++;
          console.warn(`Safety Violation Detected (Attempt ${retryCount}):`, validationResult.violations);

          if (retryCount <= MAX_RETRIES) {
            const violationList = validationResult.violations
              .map(v => `"${v.item}" violates strict requirement: ${v.restriction}`)
              .join('; ');

            prompt = `${buildPrompt(body)}

CRITICAL SAFETY ERROR IN PREVIOUS ATTEMPT:
The generated recipe violated the hard constraints:
${violationList}

YOU MUST REGENERATE THE RECIPE COMPLETELY. DO NOT USE ANY OF THE VIOLATING INGREDIENTS OR DERIVATIVES. Replace them with safe, regional alternatives that strictly comply with all ${dietaryRestrictions.join(', ')} constraints!`;
          }
        }
      }
    }

    // Final safety audit
    const finalValidation = validateRecipe(recipe, dietaryRestrictions);

    return res.status(200).json({
      success: true,
      source,
      retries: retryCount,
      safety_validation: {
        passed: finalValidation.isValid,
        violations: finalValidation.violations,
        checks_performed: finalValidation.checksPerformed
      },
      recipe
    });

  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Internal server error while crafting recipe'
    });
  }
}
