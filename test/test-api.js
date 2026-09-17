import handler from '../api/generate.js';

console.log("==========================================");
console.log("RUNNING API HANDLER MULTI-CONSTRAINT TEST");
console.log("==========================================");

class MockResponse {
  constructor() {
    this.statusCode = 200;
    this.headers = {};
    this.data = null;
  }
  setHeader(k, v) { this.headers[k] = v; return this; }
  status(code) { this.statusCode = code; return this; }
  json(payload) {
    this.data = payload;
    return this;
  }
  end() { return this; }
}

async function runTest() {
  const req = {
    method: 'POST',
    headers: {},
    body: {
      ingredients: ['Spinach', 'Chickpeas', 'Rice'],
      pantryStaples: true,
      maxTime: 25,
      skillLevel: 'Intermediate',
      dietaryRestrictions: ['nut-free', 'vegan', 'gluten-free'],
      cuisine: 'South Indian',
      apiKey: 'DEMO_MODE'
    }
  };

  const res = new MockResponse();
  await handler(req, res);

  console.log("Status Code:", res.statusCode);
  console.log("Success:", res.data?.success);
  console.log("Safety Validation Passed:", res.data?.safety_validation?.passed);
  console.log("Checks Performed:", res.data?.safety_validation?.checks_performed);
  console.log("Recipe Title:", res.data?.recipe?.title);
  console.log("Regional Technique:", res.data?.recipe?.regional_technique_highlight);
  console.log("Total Time:", res.data?.recipe?.total_time);
  console.log("Ingredients Count:", res.data?.recipe?.ingredients?.length);
  console.log("Steps Count:", res.data?.recipe?.steps?.length);

  if (!res.data?.success) {
    console.error("❌ Test Failed: API returned success: false");
    process.exit(1);
  }

  if (!res.data?.safety_validation?.passed) {
    console.error("❌ Test Failed: Safety validation did not pass");
    process.exit(1);
  }

  if (!res.data?.recipe?.regional_technique_highlight) {
    console.error("❌ Test Failed: Regional technique highlight is missing");
    process.exit(1);
  }

  console.log("✅ API HANDLER MULTI-CONSTRAINT TEST PASSED PERFECTLY!");
}

runTest().catch(err => {
  console.error("Test execution error:", err);
  process.exit(1);
});
