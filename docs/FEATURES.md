# FEATURES

## Player Ship Movement
Description: The player rotates and boosts a ship with screen wrap-around movement.
Dependencies: `Ship` (`docs/src/entities/entities.js`), `keyPressed`/`keyReleased` (`docs/src/input/controls.js`), `updateAndRenderPlayer` (`docs/src/systems/game-loop.js`), `ship` global.
Trigger key: `Arrow Left`, `Arrow Right`, `Arrow Up`.
Cooldown: None.

## Auto Laser (Primary Fire)
Description: The ship auto-fires laser shots when laser energy is available.
Dependencies: `Ship.update` and `autoLaserCooldown` (`docs/src/entities/entities.js`), `Laser` class, `laserBeams` array, `updateAndRenderLaserBeams` (`docs/src/systems/game-loop.js`).
Trigger key: Automatic (no manual key).
Cooldown: `30` frames between shots (about `0.5s` at 60 FPS), gated by laser energy.

## Missile Weapon
Description: Fires a homing missile that locks to an asteroid and detonates on target.
Dependencies: `keyPressed` (`docs/src/input/controls.js`), `Missile` class (`docs/src/entities/entities.js`), `missiles` array, `updateAndRenderMissiles` (`docs/src/systems/game-loop.js`).
Trigger key: `Z`.
Cooldown: `5s`.

## Shotgun Weapon
Description: Fires a cone spread of up to 8 projectiles for short-range clearing.
Dependencies: `keyPressed` (`docs/src/input/controls.js`), `ShotgunBullet` class, `shotgunBullets` array, `updateAndRenderShotgunBullets` (`docs/src/systems/game-loop.js`).
Trigger key: `X`.
Cooldown: `15s` and max `20` active shotgun bullets.

## Space Mine Weapon
Description: Places a stationary mine that explodes when an asteroid or enemy touches it.
Dependencies: `keyPressed` (`docs/src/input/controls.js`), `Mine` class, `mines` array, `updateAndRenderMines` (`docs/src/systems/game-loop.js`), `explosions` array.
Trigger key: `C`.
Cooldown: `20s` and max `3` active mines.

## Ultrasonic Wave Weapon
Description: Expanding wave that removes non-system asteroids in range.
Dependencies: `keyPressed` (`docs/src/input/controls.js`), `UltrasonicWave` class, `ultrasonicWaves` array, `updateAndRenderUltrasonicWaves` (`docs/src/systems/game-loop.js`).
Trigger key: `V`.
Cooldown: `30s`.

## Stress System
Description: Collisions increase stress; higher stress reduces handling. Stress decays over time and can be reduced by pickups.
Dependencies: `STRESS_CONFIG`, `HANDLING_BY_TIER`, `updateStress` (`docs/src/core/stress.js`), `addStress`/`reduceStress`, `drawStressBar` (`docs/app.js`), collision logic in `updateAndRenderAsteroids` and `updateAndRenderEnemyBullets` (`docs/src/systems/game-loop.js`).
Trigger key: Passive system (collision-driven).
Cooldown: Stress decay cooldown `2s` after stress increases.

## Stress Recovery Pickups
Description: Periodic pickups that reduce stress when collected by the ship.
Dependencies: `PICKUP_CONFIG` (`docs/src/core/stress.js`), `Pickup` class (`docs/src/entities/entities.js`), `pickups` array, `spawnPickups` and `updateAndRenderPickups` (`docs/src/systems/game-loop.js`).
Trigger key: None (spawned automatically; collected on contact).
Cooldown: Spawn interval `420` frames, max `2` active pickups, lifetime `600` frames.

## Enemy System
Description: Type A enemies fire bullets; Type B enemies fire homing missiles.
Dependencies: `Enemy`, `EnemyBullet`, `EnemyMissile` classes (`docs/src/entities/entities.js`), `enemies`/`enemyBullets`/`enemyMissiles` arrays, `spawnEnemies` (`docs/src/systems/level-spawn.js`), `updateAndRenderEnemies`/`updateAndRenderEnemyBullets`/`updateAndRenderEnemyMissiles` (`docs/src/systems/game-loop.js`).
Trigger key: None (system-driven spawn and AI fire).
Cooldown: Global spawn every `10s` (level-gated); per-enemy fire cooldown is dynamic.

## Level Progression and Asteroid Maintenance
Description: Level scales over time and controls enemy/asteroid pressure.
Dependencies: `updateLevel`, `maintainAsteroids`, `drawLevelLabel`, `spawnEnemies` (`docs/src/systems/level-spawn.js`), `runGameFrame` (`docs/src/systems/game-loop.js`), `asteroids` array.
Trigger key: None.
Cooldown: Level changes at `90s` and `180s`; system asteroid top-up checks with `2s` interval.

