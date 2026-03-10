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
Dependencies: `keyPressed` (`docs/src/input/controls.js`), `isWeaponUnlocked` (`docs/src/systems/level-spawn.js`), `Missile` class (`docs/src/entities/entities.js`), `missiles` array, `updateAndRenderMissiles` (`docs/src/systems/game-loop.js`).
Trigger key: `X`.
Cooldown: `5s` (unlocked at Level `2`).

## Shotgun Weapon
Description: Fires a cone spread of up to 8 projectiles for short-range clearing.
Dependencies: `keyPressed` (`docs/src/input/controls.js`), `isWeaponUnlocked` (`docs/src/systems/level-spawn.js`), `ShotgunBullet` class, `shotgunBullets` array, `updateAndRenderShotgunBullets` (`docs/src/systems/game-loop.js`).
Trigger key: `Z`.
Cooldown: `15s`, max `20` active shotgun bullets (unlocked at Level `1`).

## Space Mine Weapon
Description: Places a stationary mine that explodes when an asteroid or enemy touches it.
Dependencies: `keyPressed` (`docs/src/input/controls.js`), `isWeaponUnlocked` (`docs/src/systems/level-spawn.js`), `Mine` class, `mines` array, `updateAndRenderMines` (`docs/src/systems/game-loop.js`), `explosions` array.
Trigger key: `C`.
Cooldown: `20s`, max `3` active mines (unlocked at Level `3`).

## Ultrasonic Wave Weapon
Description: Expanding wave that removes non-system asteroids in range.
Dependencies: `keyPressed` (`docs/src/input/controls.js`), `isWeaponUnlocked` (`docs/src/systems/level-spawn.js`), `UltrasonicWave` class, `ultrasonicWaves` array, `updateAndRenderUltrasonicWaves` (`docs/src/systems/game-loop.js`).
Trigger key: `V`.
Cooldown: `30s` (unlocked at Level `1`).

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

## Hit Feedback System
Description: Ship hits trigger a temporary flash effect and a gated impact sound to make damage more readable.
Dependencies: `triggerShipHitFeedback`, `initHitSfx`, `playHitSfx` (`docs/app.js`), `isShipHitFlashActive` (`docs/app.js`), `Ship.show` (`docs/src/entities/entities.js`), hit branches in `updateAndRenderAsteroids`, `updateAndRenderEnemyBullets`, and `updateAndRenderEnemyMissiles` (`docs/src/systems/game-loop.js`).
Trigger key: None (triggered automatically when the ship is hit).
Cooldown: Impact SFX gate `1000ms`; flash duration `1500ms`.

## Background Music
Description: A looping background track starts during gameplay and stops when the run ends.
Dependencies: `initBgm`, `startBgm`, `stopBgm` (`docs/app.js`), `draw` (`docs/app.js`), `telemetryEnd` (`docs/app.js`), `assets/audio/bgm-loop.mp3`.
Trigger key: None (game-state driven).
Cooldown: None.

## Enemy System
Description: Type A enemies fire bullets; Type B enemies fire homing missiles.
Dependencies: `Enemy`, `EnemyBullet`, `EnemyMissile` classes (`docs/src/entities/entities.js`), `enemies`/`enemyBullets`/`enemyMissiles` arrays, `spawnEnemies` (`docs/src/systems/level-spawn.js`), `updateAndRenderEnemies`/`updateAndRenderEnemyBullets`/`updateAndRenderEnemyMissiles` (`docs/src/systems/game-loop.js`).
Trigger key: None (system-driven spawn and AI fire).
Cooldown: Global spawn every `10s` (level-gated); per-enemy fire cooldown is dynamic.

## Level Progression and Asteroid Maintenance
Description: Level scales over time and controls enemy/asteroid pressure.
Dependencies: `updateLevel`, `maintainAsteroids`, `drawLevelLabel`, `spawnEnemies` (`docs/src/systems/level-spawn.js`), `runGameFrame` (`docs/src/systems/game-loop.js`), `asteroids` array.
Trigger key: None.
Cooldown: Level changes at `90s` and `180s`; each level unlocks additional weapons (`L1`: shotgun, `L2`: missile, `L3`: mine); system asteroid top-up checks with `2s` interval.

## Level Transition Briefings
Description: Each level start shows a temporary overlay briefing that freezes active gameplay visuals while introducing new threats and weapons.
Dependencies: `LEVEL_TRANSITION_CONTENT`, `triggerLevelTransition`, `drawLevelTransitionCard`, `isLevelTransitionActive` (`docs/src/systems/level-spawn.js`), frozen draw helpers in `docs/src/systems/game-loop.js`, `game()` (`docs/src/ui/menu.js`).
Trigger key: None (automatic on level start/change).
Cooldown: Transition card duration `4200ms` with `320ms` fade-in/out windows.
