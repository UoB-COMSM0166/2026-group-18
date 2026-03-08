# p5.js Game Architecture

## Project Overview

This is an **Asteroids-style arcade shooter** (v1.3 with advanced weapons system) that introduces a psychological stress mechanic. Players manage a stress meter that degrades ship handling across predictable tiers, forcing a risk-reward playstyle: play aggressively for score vs. stay safe to maintain control.

**Core Innovation**: Stress tier system directly impacts ship physics (rotation, thrust, drift control), creating emergent difficulty that's tied to performance.

---

## Architecture Pattern: Modular System-Based Design

The game uses **separation of concerns** across specialized modules:

```
docs/src/
├── core/        → Game state & mechanics (Stress System)
├── entities/    → Game objects (Ship, Asteroids, Projectiles, etc.)
├── input/       → Player controls (Keyboard input)
├── systems/     → Game loop & level progression
└── ui/          → Menu & HUD (User Interface)
```

---

## 1. Core Systems

### Stress System ([stress.js](src/core/stress.js))

A centralized, data-driven state machine:

**3 Fixed Tiers**:
- **CALM** (0-40): Normal ship handling (1.0x multiplier)
- **TENSE** (40-75): Degraded handling (0.8x multiplier)
- **PANIC** (75-100): Severely degraded handling (0.6x multiplier)

**Handling Degradation by Tier**:
- CALM: 1.0x rotation, thrust, drag multipliers
- TENSE: 0.8x multipliers
- PANIC: 0.6x multipliers

**Stress Events**:
- Asteroid collision: +20 stress
- Enemy bullet hit: +12 stress
- Pickup collected: -20 stress
- Passive decay: 0.03 per frame (after 120-frame cooldown)

**API Design**: Centralized functions (`addStress()`, `getStressValue()`, `getStressTier()`) with backward-compatibility bridge to legacy globals

### Game Loop System ([game-loop.js](src/systems/game-loop.js))

Orchestrates frame-by-frame updates in fixed order at 60 FPS:

1. **Decrement collision cooldown** (invulnerability tracking)
2. **Update Phase**: Level progression, asteroid spawning, enemy spawning
3. **Render Phase**: All entity updates + collision detection
   - `updateAndRenderAsteroids()` - checks ship collisions, splits asteroids
   - `updateAndRenderLaserBeams()` - checks hits vs asteroids/enemies, cleanup
   - `updateAndRenderShotgunBullets()` - spread weapon implementation
   - `updateAndRenderMissiles()` - homing weapon with target tracking
   - `updateAndRenderMines()` - stationary trap placement
   - `updateAndRenderEnemies()` - AI patrol & shooting
   - `updateAndRenderEnemyBullets()` - enemy projectiles with stress penalty
   - `updateAndRenderPlayer()` - ship physics & jet
4. **HUD Update**: Stress bar, score display, level label
5. **Game Over Check**: Waits for all explosions to finish before ending

### Level System ([level-spawn.js](src/systems/level-spawn.js))

Time-based difficulty progression:

| Level | Time Range | Asteroids | Enemies |
|-------|-----------|-----------|---------|
| **Level 1** | 0-90s | 5 base | None |
| **Level 2** | 90-180s | 7 asteroids | Type A only |
| **Level 3** | 180s+ | 9 asteroids | Type A & B |

System asteroids spawn every 120 frames (governed by target count).

---

## 2. Entity Architecture

An **object-oriented hierarchy** with shared behaviors:

```
Entity (abstract)
├── Ship
├── Asteroid
├── Projectile (abstract)
│   ├── Laser
│   ├── Missile (homing AI)
│   └── ShotgunBullet
├── Mine (stationary, triggered by collision)
├── Enemy (Type A/B with AI)
├── Explosion (particle effect)
├── Jet (thrust visualization)
└── Stars (background)
```

**Global State** (app.js):
- Arrays: asteroids, laserBeams, missiles, shotgunBullets, mines, enemies, enemyBullets, enemyMissiles, explosions
- Game state: score, level, crashed, stress, stressTier
- Cooldowns: collisionCooldown, missileCooldown, shotgunCooldown, mineCooldown

---

## 3. Input System ([controls.js](src/input/controls.js))

### Menu Navigation (before game starts)
- **LEFT/RIGHT arrows**: Navigate menu options
- **Enter/Space**: Confirm selection

### In-Game Controls (while playing)
- **LEFT/RIGHT arrows**: Rotate ship
- **UP arrow**: Thrust forward (triggers jet effect)
- **SPACE**: Fire basic laser (30 ammo, recharged per shot)
- **Z**: Missile (5s cooldown, homing target tracking)
- **X**: Shotgun (15s cooldown, 120° cone spread, max 20 bullets)
- **C**: Space Mine (20s cooldown, max 3 active)

---

## 4. UI/Menu System ([menu.js](src/ui/menu.js))

**DOM-based state machine**:
```
Main Menu → [Play | Controls | About]
           ↓
        Game Screen
           ↓
        Game Over
```

Menu interaction uses jQuery for section switching and CSS `display` toggling.

---

## 5. Game State Flow

```
resetGame()
  ├── Initialize stress state (stress=0, tier=0)
  ├── Create ship at center
  ├── Spawn 5 initial asteroids
  └── Clear all projectile/enemy arrays

draw() loop (60 FPS):
  └── if !started: show menu
  └── if started: runGameFrame()
      ├── Update level (time-based)
      ├── Maintain asteroids (spawn if below target)
      ├── Spawn enemies (level-dependent)
      ├── Update & render all entities
      ├── Check collisions (integrated in update functions)
      ├── Update stress (decay or cooldown)
      ├── Check game over condition
      └── if game over: show game over screen
```

---

## 6. Collision System

**Distributed throughout game loop** (not centralized):
- Ship vs Asteroid → `addStress(20)` + invulnerability cooldown
- Ship vs Enemy Bullet → `addStress(12)` + short cooldown
- Projectile vs Asteroid → Score increase + asteroid split
- Projectile vs Enemy → Score increase + enemy removal
- Mine vs Asteroid/Enemy → Triggered explosion + removal
- Enemy Missile vs Ship → Game over

---

## 7. Data-Driven Configuration

All balance parameters are **centralized in constants**:

```javascript
STRESS_CONFIG = {
  maxStress: 100,
  tiers: [40, 75],
  decayPerFrame: 0.03,
  cooldownFrames: 120,
  collisionDeltaAsteroid: 20,
  collisionDeltaEnemyBullet: 12
}

HANDLING_BY_TIER = [
  { rotationMult: 1.0, thrustMult: 1.0, dragMult: 1.0 },  // CALM
  { rotationMult: 0.8, thrustMult: 0.8, dragMult: 0.8 },  // TENSE
  { rotationMult: 0.6, thrustMult: 0.6, dragMult: 0.6 }   // PANIC
]

STRESS_UI = {
  tierColors: [[0,255,0], [255,200,0], [255,0,0]],
  tierLabels: ["CALM", "TENSE", "PANIC"]
}
```

---

## 8. Design Patterns Used

| Pattern | Implementation | Example |
|---------|---|---|
| **State Machine** | Stress tier system | 3 discrete tiers with threshold boundaries |
| **Object Pool** | Array-based entity management | `asteroids[]`, `enemies[]` |
| **Update-Render Loop** | Frame-synchronized | `updateAndRender*()` functions |
| **Centralized Configuration** | Data-driven balance | `STRESS_CONFIG`, `HANDLING_BY_TIER` |
| **Separation of Concerns** | Modular subsystems | stress.js, game-loop.js, controls.js, menu.js |
| **Backward Compatibility** | API bridge | `syncStressGlobals()` syncs internal state to legacy globals |

---

## 9. Key Architectural Strengths

✅ **Data-Driven**: All balance parameters in constants — easy to tune  
✅ **Modular**: Clear separation between stress, game loop, input, UI  
✅ **Extensible**: Entity hierarchy allows new projectile/enemy types  
✅ **Debuggable**: Centralized stress API with clear getter/setter semantics  
✅ **Deterministic**: Time-based progression (levels), frame-based physics  

---

## 10. Technical Implementation Details

- **Language**: JavaScript (ES5/ES6 hybrid, with p5.js library)
- **Rendering**: 900x600 canvas, 60 FPS
- **Physics**: Velocity-based Newtonian mechanics with screen wrapping
- **Weapon Cooldowns**: Millisecond-based (`millis()` tracked)
- **Stress Decay**: Linear per-frame reduction (unless in cooldown)
- **Enemy AI**: Simple patrol with target-based firing; homing missile seeks nearest asteroid in forward cone
- **Collision Detection**: Distributed across entity update functions for efficiency

---

## Directory Structure

```
docs/
├── app.js                  # Main entry point
├── design.md              # Design documentation
├── final-idea.md          # Final concept document
├── index.html             # Game HTML page
├── inspiration.md         # Inspiration sources
├── requirements.md        # Game requirements
├── style.css              # Styling
├── src/
│   ├── core/
│   │   └── stress.js      # Stress system (state machine)
│   ├── entities/
│   │   └── entities.js    # Game object definitions
│   ├── input/
│   │   └── controls.js    # Input handling
│   ├── systems/
│   │   ├── game-loop.js   # Main game loop
│   │   └── level-spawn.js # Level management
│   └── ui/
│       └── menu.js        # Menu & HUD
└── uml/
    ├── class-diagram.puml          # Class relationships
    ├── seq-collision.puml          # Collision sequence
    └── seq-pickup.puml             # Pickup sequence
```

---

## Key Takeaway

This game demonstrates a well-structured, modular architecture where:
1. **Game mechanics are data-driven** (stress parameters are tunable constants)
2. **Systems are independent** (stress, input, UI don't know about each other directly)
3. **Entities follow OOP patterns** (inheritance, shared update-render cycle)
4. **Collision is distributed** (built into each entity's update function)
5. **State is centralized** (all game state in global variables or modules)

This design makes it easy to debug, extend, and balance the game without major refactoring.
