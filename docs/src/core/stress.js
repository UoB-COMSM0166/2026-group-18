const STRESS_CONFIG = {
  maxStress: 100,

  tiers: [40, 75],
  decayPerSecond: 1.8,
  cooldownSeconds: 2,
  collisionDeltaAsteroid: 20,
  collisionDeltaEnemyBullet: 12
};


const HANDLING_BY_TIER = [
  { rotationMult: 1.0, thrustMult: 1.0, dragMult: 1.0 },
  { rotationMult: 0.8, thrustMult: 0.8, dragMult: 0.8 },
  { rotationMult: 0.6, thrustMult: 0.6, dragMult: 0.6 }
];

const STRESS_UI = {
  tierColors: [
    [0, 255, 0],
    [255, 200, 0],
    [255, 0, 0]
  ],
  tierLabels: ["CALM", "TENSE", "PANIC"]
};


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


function getHandlingParams(tier) {
  return HANDLING_BY_TIER[clampTierIndex(tier)];
}


function getHandlingParamsByStress(stressValue) {
  return getHandlingParams(getStressTier(stressValue));
}


function getStressUIColorByTier(tier) {
  const rgb = STRESS_UI.tierColors[clampTierIndex(tier)];
  return color(rgb[0], rgb[1], rgb[2]);
}


function getStressUILabelByTier(tier) {
  return STRESS_UI.tierLabels[clampTierIndex(tier)];
}


function addStress(amount, cause) {

  stressState.value = constrain(stressState.value + amount, 0, STRESS_CONFIG.maxStress);
  stressState.cooldownRemaining = STRESS_CONFIG.cooldownSeconds;
  stressState.tier = getStressTier(stressState.value);

  syncStressGlobals();
  return cause;
}


function reduceStress(amount, cause) {
  stressState.value = constrain(stressState.value - Math.max(0, amount), 0, STRESS_CONFIG.maxStress);
  stressState.tier = getStressTier(stressState.value);
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


  syncStressGlobals();
}


function updateStress(dtSeconds) {

  updateStressState(dtSeconds);
}
