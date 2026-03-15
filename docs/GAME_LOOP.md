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
2. Clear the frame background.
3. Update progression with `updateLevel()` using score thresholds (`300000` for Level `2`, `700000` for Level `3`).
4. Check `isLevelTransitionActive()`.
5. If a level transition is active:
   - Render frozen world arrays with `drawFrozenCollection(...)`.
   - Render the frozen player with `drawFrozenPlayer()`.
   - Draw `drawLevelLabel()`, score text, `drawStressBar()`, and `drawWeaponHud()`.
   - Draw `drawLevelTransitionCard()`.
   - Return early without advancing gameplay simulation.
6. If no transition is active:
   - Decrease `collisionCooldown`.
   - Run progression maintenance:
     - `maintainAsteroids()`
     - `spawnEnemies()`
     - `spawnPickups()`
   - Update and render world objects in this order:
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
   - Update and render the player:
     - `jet.update()/show()`
     - `ship.update(dtSeconds)/show()`
   - Update HUD and stress:
     - `drawLevelLabel()`
     - update score text
     - `updateStress(dtSeconds)`
     - `drawStressBar()`
     - `drawWeaponHud()`
   - Draw `drawLevelTransitionCard()` again if the transition became active during this frame.
   - Run the game-over check via `shouldTriggerGameOver()`.

## Rendering Order

Rendering is interleaved with updates, but the visible order is roughly:

1. background
2. world objects: asteroids, explosions, projectiles, enemies, pickups
3. player jet and ship
4. HUD (`level`, `score`, stress bar, weapon readiness strip)
5. level transition briefing overlay (when active)
6. game-over menu overlay (when triggered)

## Collision Systems

Current collision logic includes:

- Ship vs asteroid:
  - Triggers hit feedback.
  - Adds `collisionDeltaAsteroid` stress.
  - Crashes only if stress reaches `MAX_STRESS`.
- Enemy bullet vs ship:
  - Triggers hit feedback.
  - Adds `collisionDeltaEnemyBullet` stress.
  - Crashes only if stress reaches `MAX_STRESS`.
- Enemy missile vs ship:
  - Triggers hit feedback and an explosion effect.
  - Adds `collisionDeltaEnemyMissile` stress.
  - Crashes only if stress reaches `MAX_STRESS`.
  - Applies a short collision cooldown after impact.
- Laser vs asteroid or enemy:
  - Destroys the target.
  - Updates score.
  - Spawns explosions.
- Shotgun vs asteroid or enemy:
  - Destroys the target.
  - Updates score.
  - Spawns explosions.
- Missile vs asteroid:
  - Homes to a target asteroid.
  - Detonates on arrival.
  - Updates score.
- Mine vs asteroid or enemy:
  - Destroys the target on contact.
  - Spawns a red explosion effect.
- Pickup vs ship:
  - Reduces stress by `PICKUP_CONFIG.recoverAmount`.

`collisionCooldown` suppresses repeated rapid stress hits from asteroid collisions, enemy bullets, and post-missile impact overlap.

## Player Feedback Systems

- `triggerShipHitFeedback()` centralizes ship hit feedback.
- Ship hit feedback includes:
  - impact SFX with a `1000ms` gate
  - temporary flash in `Ship.show()`
- BGM is initialized in `setup()`, started from `draw()`, and stopped in `telemetryEnd()`.
