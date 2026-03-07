# GAME_LOOP

## Main Frame Entry

`draw()` in `docs/app.js` calls `runGameFrame()` when `started === true`.

## Update Order

`runGameFrame()` in `docs/src/systems/game-loop.js` executes in this order:

1. Compute `dtSeconds` from `deltaTime`.
2. Decrease `collisionCooldown`.
3. Clear frame background.
4. Update progression/spawn systems:
   - `updateLevel()`
   - `maintainAsteroids()`
   - `spawnEnemies()`
   - `spawnPickups()`
5. Update and render gameplay entities:
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
6. Update and render player:
   - `jet.update()/show()`
   - `ship.update(dtSeconds)/show()`
7. HUD and stress:
   - `drawLevelLabel()`
   - update score text
   - `updateStress(dtSeconds)`
   - `drawStressBar()`
8. Game-over check via `shouldTriggerGameOver()`.

## Rendering Order

Rendering is interleaved with updates inside each system function. The visible layering is approximately:

1. background
2. world objects (asteroids, effects, projectiles, enemies, pickups)
3. player jet and ship
4. HUD (`level`, `score`, stress bar)
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
- Pickup vs ship:
  - Reduces stress by `PICKUP_CONFIG.recoverAmount`.

`collisionCooldown` prevents repeated instant stress hits from rapid consecutive collisions.

