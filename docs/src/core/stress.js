const STRESS_CONFIG = {
  maxStress: 100,
  // Exactly 3 tiers via 2 thresholds: [tier0 upper bound, tier1 upper bound]
  tiers: [40, 75],
  decayPerSecond: 1.8,
  cooldownSeconds: 2,
  collisionDeltaAsteroid: 20,
  collisionDeltaEnemyBullet: 12
};

// Handling degradation by tier: rotation, thrust, and drag (drift control).
const HANDLING_BY_TIER = [
  { rotationMult: 1.0, thrustMult: 1.0, dragMult: 1.0 }, //CALM
  { rotationMult: 0.8, thrustMult: 0.8, dragMult: 0.8 }, //TENSE
  { rotationMult: 0.6, thrustMult: 0.6, dragMult: 0.6 }  //PANIC
];

const STRESS_UI = {
  tierColors: [
    [0, 255, 0],
    [255, 200, 0],
    [255, 0, 0]
  ],
  tierLabels: ["CALM", "TENSE", "PANIC"]
};

// C1: de-stress pickup tuning
const PICKUP_CONFIG = {
  spawnIntervalFrames: 420,
  maxActive: 2,
  recoverAmount: 20,
  radius: 12,
  lifetimeFrames: 600,
  type: "stressPickup"
};

const MAX_STRESS = STRESS_CONFIG.maxStress;

const stressState = {
  value: 0,
  tier: 0,
  cooldownRemaining: 0
};

// Stress API: keep stress logic centralized while legacy globals still work.

// Reset stress state to initial values (called on game start/reset).
function resetStressState() {
  stressState.value = 0;
  stressState.cooldownRemaining = 0;
  stressState.tier = getStressTier(0);
}

// Map stress value to tier: 0=CALM, 1=TENSE, 2=PANIC.
function getStressTier(stressValue) {
  const tiers = STRESS_CONFIG.tiers;
  if (stressValue < tiers[0]) return 0;
  if (stressValue < tiers[1]) return 1;
  return 2;
}

// Clamp tier index to valid range [0,2] and floor it.
function clampTierIndex(tier) {
  return Math.max(0, Math.min(2, Math.floor(tier)));
}

// Get handling params by tier (centralized mapping entry).
function getHandlingParams(tier) {
  return HANDLING_BY_TIER[clampTierIndex(tier)];
}

// Compatibility path: map stress -> tier -> handling params.
function getHandlingParamsByStress(stressValue) {
  return getHandlingParams(getStressTier(stressValue));
}

// Return UI color (p5 color object) by tier.
function getStressUIColorByTier(tier) {
  const rgb = STRESS_UI.tierColors[clampTierIndex(tier)];
  return color(rgb[0], rgb[1], rgb[2]);
}

// Return UI label text by tier (CALM/TENSE/PANIC).
function getStressUILabelByTier(tier) {
  return STRESS_UI.tierLabels[clampTierIndex(tier)];
}

// Add stress and start cooldown (no decay during cooldown); sync legacy globals.
function addStress(amount, cause) {
  // `cause` is reserved for future telemetry/collision migration.
  stressState.value = constrain(stressState.value + amount, 0, STRESS_CONFIG.maxStress);
  stressState.cooldownRemaining = STRESS_CONFIG.cooldownSeconds;
  stressState.tier = getStressTier(stressState.value);
  // Ensure legacy globals reflect API-driven writes in the same frame.
  syncStressGlobals();
  return cause;
}

// C1: pickup recovery hook
function reduceStress(amount, cause) {
  stressState.value = constrain(stressState.value - Math.max(0, amount), 0, STRESS_CONFIG.maxStress);
  stressState.tier = getStressTier(stressState.value);
  syncStressGlobals();
  return cause;
}

// Get current stress value (single API entry).
function getStressValue() {
  return stressState.value;
}

// Get current stress tier (single API entry).
function getStressTierNow() {
  return stressState.tier;
}

// Pull legacy globals (stress/stressCooldown) into internal state for backward compatibility.
function syncStressStateFromGlobals() {
  stressState.value = constrain(stress, 0, STRESS_CONFIG.maxStress);
  stressState.cooldownRemaining = Math.max(0, stressCooldown);
  stressState.tier = getStressTier(stressState.value);
}

// Push internal stress state back to legacy globals for backward compatibility.
function syncStressGlobals() {
  stress = stressState.value;
  stressTier = stressState.tier;
  stressCooldown = stressState.cooldownRemaining;
}

// Time-based stress update: cooldown and decay are per-second and frame-rate independent.
function updateStressState(dtSeconds) {
  // Backward-compat bridge: ingest any legacy `stress += ...` writes first.
  syncStressStateFromGlobals();

  var seconds = typeof dtSeconds === "number" ? dtSeconds : (1 / 60);
  if (stressState.cooldownRemaining > 0) {
    stressState.cooldownRemaining -= seconds;
  } else {
    stressState.value -= STRESS_CONFIG.decayPerSecond * seconds;
  }


  stressState.cooldownRemaining = Math.max(0, stressState.cooldownRemaining);
  stressState.value = constrain(stressState.value, 0, STRESS_CONFIG.maxStress);
  stressState.tier = getStressTier(stressState.value);

  // Keep legacy globals in sync so old call sites continue to work.
  syncStressGlobals();
}

// Thin wrapper for legacy call sites (actual logic is in updateStressState).
function updateStress(dtSeconds) {
  // Thin wrapper kept for existing call sites.
  updateStressState(dtSeconds);
}
