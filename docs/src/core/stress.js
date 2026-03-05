const STRESS_CONFIG = {
  maxStress: 100,
  // Exactly 3 tiers via 2 thresholds: [tier0 upper bound, tier1 upper bound]
  tiers: [40, 75],
  decayPerFrame: 0.03,
  cooldownFrames: 120,
  collisionDeltaAsteroid: 20,
  collisionDeltaEnemyBullet: 12
};

const HANDLING_BY_TIER = [
  { rotationMult: 1.0 },
  { rotationMult: 0.8 },
  { rotationMult: 0.6 }
];

const STRESS_UI = {
  tierColors: [
    [0, 255, 0],
    [255, 200, 0],
    [255, 0, 0]
  ],
  tierLabels: ["CALM", "TENSE", "PANIC"]
};

const MAX_STRESS = STRESS_CONFIG.maxStress;

const stressState = {
  value: 0,
  tier: 0,
  cooldownRemaining: 0
};

// Stress API: keep stress logic centralized while legacy globals still work.
function resetStressState() {
  stressState.value = 0;
  stressState.cooldownRemaining = 0;
  stressState.tier = getStressTier(0);
}

function getStressTier(stressValue) {
  const tiers = STRESS_CONFIG.tiers;
  if (stressValue < tiers[0]) return 0;
  if (stressValue < tiers[1]) return 1;
  return 2;
}

function clampTierIndex(tier) {
  return Math.max(0, Math.min(2, Math.floor(tier)));
}

function getHandlingParamsByStress(stressValue) {
  const tier = getStressTier(stressValue);
  return HANDLING_BY_TIER[clampTierIndex(tier)];
}

function getStressUIColorByTier(tier) {
  const rgb = STRESS_UI.tierColors[clampTierIndex(tier)];
  return color(rgb[0], rgb[1], rgb[2]);
}

function getStressUILabelByTier(tier) {
  return STRESS_UI.tierLabels[clampTierIndex(tier)];
}

function addStress(amount, cause) {
  // `cause` is reserved for future telemetry/collision migration.
  stressState.value = constrain(stressState.value + amount, 0, STRESS_CONFIG.maxStress);
  stressState.cooldownRemaining = STRESS_CONFIG.cooldownFrames;
  stressState.tier = getStressTier(stressState.value);
  // Ensure legacy globals reflect API-driven writes in the same frame.
  syncStressGlobals();
  return cause;
}

function getStressValue() {
  return stressState.value;
}

function getStressTierNow() {
  return stressState.tier;
}

function syncStressStateFromGlobals() {
  stressState.value = constrain(stress, 0, STRESS_CONFIG.maxStress);
  stressState.cooldownRemaining = Math.max(0, stressCooldown);
  stressState.tier = getStressTier(stressState.value);
}

function syncStressGlobals() {
  stress = stressState.value;
  stressTier = stressState.tier;
  stressCooldown = stressState.cooldownRemaining;
}

function updateStressState(dtSeconds) {
  // Backward-compat bridge: ingest any legacy `stress += ...` writes first.
  syncStressStateFromGlobals();

  var seconds = typeof dtSeconds === "number" ? dtSeconds : (1 / 60);
  var frames = seconds * 60;
  if (stressState.cooldownRemaining > 0) {
    stressState.cooldownRemaining -= frames;
  } else {
    stressState.value -= STRESS_CONFIG.decayPerFrame * frames;
  }

  stressState.cooldownRemaining = Math.max(0, stressState.cooldownRemaining);
  stressState.value = constrain(stressState.value, 0, STRESS_CONFIG.maxStress);
  stressState.tier = getStressTier(stressState.value);

  // Keep legacy globals in sync so old call sites continue to work.
  syncStressGlobals();
}

function updateStress(dtSeconds) {
  // Thin wrapper kept for existing call sites.
  updateStressState(dtSeconds);
}
