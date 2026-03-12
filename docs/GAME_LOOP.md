# GAME_LOOP

## Main Frame Entry

`draw()` in `docs/app.js` is the frame entry point when `started === true`.

Before each gameplay frame it:

1. Starts BGM if gameplay is active and music has not started yet.
2. Samples telemetry stress values.
3. Calls `runGameFrame()`.
4. Updates telemetry counters.
5. Finalizes telemetry when the run has crashed.

## Update Order

`runGameFrame()` in `docs/src/systems/game-loop.js` runs in this order:

1. Compute `dtSeconds` and `frameScale` from `deltaTime`.
2. Clear the background.
3. Update score-driven level state with `updateLevel()`.
4. Check `isLevelTransitionActive()`.
5. If a transition is active:
   - draw frozen copies of active world arrays
   - draw the frozen player
   - draw `drawLevelLabel()`
   - update score text
   - draw `drawStressBar()`
   - draw `drawWeaponHud()`
   - draw `drawLevelTransitionCard()`
   - return early without advancing gameplay simulation
6. If no transition is active:
   - decrease `collisionCooldown`
   - run spawn and maintenance systems:
     - `maintainAsteroids()`
     - `spawnEnemies()`
     - `spawnPickups()`
   - update and render world objects in this order:
     - asteroids
     - laser beams
     - explosions
     - shotgun bullets
     - missiles
     - enemies
     - mines
     - ultrasonic waves
     - enemy bullets
     - enemy missiles
     - pickups
   - update and render player:
     - `jet.update()/show()`
     - `ship.update(dtSeconds)/show()`
   - update HUD and stress:
     - `drawLevelLabel()`
     - score text update
     - `updateStress(dtSeconds)`
     - `drawStressBar()`
     - `drawWeaponHud()`
   - draw `drawLevelTransitionCard()` if needed
   - check `shouldTriggerGameOver()`

## Rendering Order

Rendering is interleaved with updates, but the visible order is roughly:

1. background
2. world objects: asteroids, explosions, projectiles, enemies, pickups
3. player jet and ship
4. HUD: level, score, stress bar, weapon readiness strip
5. level transition briefing overlay
6. game-over menu overlay

## Collision Systems

Current collision logic includes:

- Ship vs asteroid:
  - triggers hit feedback
  - adds `collisionDeltaAsteroid` stress
  - crashes only if stress reaches `MAX_STRESS`
- Enemy bullet vs ship:
  - triggers hit feedback
  - adds `collisionDeltaEnemyBullet` stress
  - crashes only if stress reaches `MAX_STRESS`
- Enemy missile vs ship:
  - triggers hit feedback
  - adds `collisionDeltaEnemyMissile` stress
  - crashes only if stress reaches `MAX_STRESS`
  - applies a short collision cooldown after impact
- Laser vs asteroid or enemy:
  - destroys the target
  - updates score
  - spawns explosions
- Shotgun vs asteroid or enemy:
  - destroys the target
  - updates score
  - spawns explosions
- Missile vs asteroid:
  - homes to a target asteroid
  - detonates on arrival
  - updates score
- Mine vs asteroid or enemy:
  - destroys the target on contact
  - spawns a red explosion effect
- Pickup vs ship:
  - reduces stress by `PICKUP_CONFIG.recoverAmount`

`collisionCooldown` suppresses repeated rapid stress hits from asteroid, enemy bullet, and post-missile impact overlap.

## Feedback Systems

- `triggerShipHitFeedback()` centralizes ship hit feedback.
- Ship hit feedback includes:
  - impact SFX with a `1000ms` gate
  - temporary flash in `Ship.show()`
- BGM is initialized in `setup()`, started from `draw()`, and stopped in `telemetryEnd()`.
