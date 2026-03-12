# GAME_LOOP

## Main Frame Entry

`draw()` in `docs/app.js` calls `runGameFrame()` when `started === true`. Before the frame starts, it also:

1. Starts looping BGM if gameplay is active and music has not started yet.
2. Samples telemetry stress values.
3. Finalizes telemetry when `crashed === true`.

## Update Order

`runGameFrame()` in `docs/src/systems/game-loop.js` executes in this order:

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
   - Update and render gameplay entities in this order:
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

Rendering is interleaved with updates inside each system function. The visible layering is approximately:

1. background
2. world objects (asteroids, effects, projectiles, enemies, pickups)
3. player jet and ship
4. HUD (`level`, `score`, stress bar, weapon readiness strip)
5. level transition briefing overlay (when active)
6. game-over menu overlay (when triggered)

## Collision Systems

Implemented collision checks include:

- Ship vs asteroid:
  - If stress already at max, the ship crashes.
  - Else stress increases by `collisionDeltaAsteroid`.
- Laser/shotgun/missile/mine vs asteroid or enemy:
  - Removes targets, triggers explosions, and updates score where applicable.
- Enemy bullet vs ship:
  - Adds stress by `collisionDeltaEnemyBullet`.
- Enemy missile vs ship:
  - Immediate ship crash.
  - Also triggers hit feedback and missile explosion visuals.
- Pickup vs ship:
  - Reduces stress by `PICKUP_CONFIG.recoverAmount`.

`collisionCooldown` prevents repeated instant stress hits from rapid consecutive asteroid and enemy-bullet collisions.

## Player Feedback Systems

- Ship hit feedback is centralized through `triggerShipHitFeedback()` in `docs/app.js`.
- Hit feedback includes gated impact SFX and a temporary ship flash in `Ship.show()`.
- BGM is initialized in `setup()`, started from `draw()`, and stopped in `telemetryEnd()`.
