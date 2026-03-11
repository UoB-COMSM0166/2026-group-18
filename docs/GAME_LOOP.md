# GAME_LOOP

## Main Frame Entry

`draw()` in `docs/app.js` calls `runGameFrame()` when `started === true`. Before the frame starts, it also:

1. Starts looping BGM if the run is active and music has not started yet.
2. Samples telemetry stress values.
3. Runs telemetry end/finalization when `crashed === true`.

## Update Order

`runGameFrame()` in `docs/src/systems/game-loop.js` executes in this order:

1. Compute `dtSeconds` and `frameScale` from `deltaTime`.
2. Clear the frame background.
3. Update progression via `updateLevel()`.
4. Check `isLevelTransitionActive()`.
5. If a level transition is active:
   - Render frozen world arrays with `drawFrozenCollection(...)`.
   - Render frozen player with `drawFrozenPlayer()`.
   - Draw `drawLevelLabel()`, score text, and `drawStressBar()`.
   - Draw `drawLevelTransitionCard()`.
   - Return early without advancing gameplay simulation.
6. If no transition is active:
   - Decrease `collisionCooldown`.
   - Run spawn/maintenance systems:
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
   - Update and render player:
     - `jet.update()/show()`
     - `ship.update(dtSeconds)/show()`
   - Update HUD and stress:
     - `drawLevelLabel()`
     - update score text
     - `updateStress(dtSeconds)`
     - `drawStressBar()`
   - Draw `drawLevelTransitionCard()` again if the transition became active during this frame.
   - Run the game-over check via `shouldTriggerGameOver()`.

1. Compute `dtSeconds` from `deltaTime`.
2. Clear frame background.
3. Update level state with `updateLevel()`.
4. If a level transition card is active:
   - render frozen world/player state
   - draw HUD (`level`, `score`, stress bar, weapon readiness HUD)
   - draw the transition card
   - return early for that frame
5. Decrease `collisionCooldown`.
6. Update progression/spawn systems:
   - `maintainAsteroids()`
   - `spawnEnemies()`
   - `spawnPickups()`
7. Update and render gameplay entities:
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
8. Update and render player:
   - `jet.update()/show()`
   - `ship.update(dtSeconds)/show()`
9. HUD and stress:
   - `drawLevelLabel()`
   - update score text
   - `updateStress(dtSeconds)`
   - `drawStressBar()`
   - `drawWeaponHud()`
10. Draw level transition card if needed.
11. Game-over check via `shouldTriggerGameOver()`.


## Rendering Order

Rendering is interleaved with updates inside each system function. The visible layering is approximately:

1. background
2. world objects (asteroids, effects, projectiles, enemies, pickups)
3. player jet and ship

4. HUD (`level`, `score`, stress bar)
5. level transition briefing overlay (when active)
6. game-over menu overlay (when triggered)

4. HUD (`level`, `score`, stress bar, weapon readiness strip)
5. game-over menu overlay (when triggered)


## Collision Systems

Implemented collision checks include:

- Ship vs asteroid:
  - If stress already at max, ship crashes.
  - Else stress increases by `collisionDeltaAsteroid`.
- Laser/shotgun/missile/mine vs asteroid or enemy:
  - Removes targets, triggers explosions, updates score where applicable.
- Enemy bullet vs ship:
  - Adds stress by `collisionDeltaEnemyBullet`.
- Enemy missile vs ship:
  - Immediate ship crash.
  - Also triggers hit feedback and missile explosion visuals.
- Pickup vs ship:
  - Reduces stress by `PICKUP_CONFIG.recoverAmount`.


`collisionCooldown` prevents repeated instant stress hits from rapid consecutive collisions from asteroids and enemy bullets.

## Player Feedback Systems

- Ship hit feedback is centralized through `triggerShipHitFeedback()` in `docs/app.js`.
- Hit feedback includes:
  - gated impact SFX
  - temporary ship flash in `Ship.show()`
- BGM is initialized in `setup()`, started from `draw()`, and stopped in `telemetryEnd()`.


`collisionCooldown` prevents repeated instant stress hits from rapid consecutive collisions.

