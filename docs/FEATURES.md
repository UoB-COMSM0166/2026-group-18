# FEATURES

## Player Ship Movement
Description: The player rotates and boosts a ship with wrap-around movement. Steering remains responsive when weapon keys are pressed and released during movement.
Dependencies: `Ship` and `Jet` (`docs/src/entities/entities.js`), `keyPressed` and `keyReleased` (`docs/src/input/controls.js`), `updateAndRenderPlayer` (`docs/src/systems/game-loop.js`), `ship` and `jet` globals.
Trigger key: `Arrow Left`, `Arrow Right`, `Arrow Up`.
Cooldown: None.

## Auto Laser
Description: The ship continuously fires a primary laser while enough laser energy is available.
Dependencies: `Ship.update`, `autoLaserCooldown`, and `laserLife` (`docs/src/entities/entities.js`), `Laser` class, `laserBeams` array, `updateAndRenderLaserBeams` (`docs/src/systems/game-loop.js`).
Trigger key: Automatic.
Cooldown: `30` frames between shots, gated by laser energy regeneration.

## Shotgun
Description: Fires a short-range spread of pellets for close-range clearing.
Dependencies: `keyPressed` (`docs/src/input/controls.js`), `isWeaponUnlocked` (`docs/src/systems/level-spawn.js`), `ShotgunBullet` (`docs/src/entities/entities.js`), `shotgunBullets` array, `updateAndRenderShotgunBullets` (`docs/src/systems/game-loop.js`).
Trigger key: `Z`.
Cooldown: `15s`; max `20` active shotgun bullets; unlocked at Level `1`.

## Missile
Description: Launches a homing missile that locks onto an asteroid and detonates on contact.
Dependencies: `keyPressed` (`docs/src/input/controls.js`), `isWeaponUnlocked` (`docs/src/systems/level-spawn.js`), `Missile` (`docs/src/entities/entities.js`), `missiles` array, `updateAndRenderMissiles` (`docs/src/systems/game-loop.js`).
Trigger key: `X`.
Cooldown: `5s`; unlocked at Level `2`.

## Mine
Description: Drops a stationary mine that destroys asteroids or enemies on contact.
Dependencies: `keyPressed` (`docs/src/input/controls.js`), `isWeaponUnlocked` (`docs/src/systems/level-spawn.js`), `Mine` (`docs/src/entities/entities.js`), `mines` array, `updateAndRenderMines` (`docs/src/systems/game-loop.js`), `explosions` array.
Trigger key: `C`.
Cooldown: `20s`; max `3` active mines; unlocked at Level `3`.

## Ultrasonic Wave
Description: Emits an expanding wave that clears non-system asteroids in range.
Dependencies: `keyPressed` (`docs/src/input/controls.js`), `isWeaponUnlocked` (`docs/src/systems/level-spawn.js`), `UltrasonicWave` (`docs/src/entities/entities.js`), `ultrasonicWaves` array, `updateAndRenderUltrasonicWaves` (`docs/src/systems/game-loop.js`).
Trigger key: `V`.
Cooldown: `30s`; unlocked at Level `1`.

## Weapon Readiness HUD
Description: Displays each secondary weapon with its key, cooldown progress, limit state, and lock status.
Dependencies: `WEAPON_HUD_CONFIG`, `getWeaponHudState`, `getWeaponHudColors`, and `drawWeaponHud` (`docs/app.js`), `isWeaponUnlocked` (`docs/src/systems/level-spawn.js`), weapon arrays and cooldown globals.
Trigger key: None.
Cooldown: Mirrors underlying weapon cooldowns and active-entity limits.

## Stress System
Description: Collisions raise stress, higher stress reduces handling, stress decays over time after a cooldown, and the HUD presents a full-to-empty integrity-style danger bar alongside the current stress readout.
Dependencies: `STRESS_CONFIG`, `HANDLING_BY_TIER`, `addStress`, `reduceStress`, `updateStress` (`docs/src/core/stress.js`), `drawStressBar` (`docs/app.js`), hit logic in `docs/src/systems/game-loop.js`.
Trigger key: Passive system.
Cooldown: Stress decay waits `2s` after the last stress gain.

## Stress Recovery Pickups
Description: Cyan pickups spawn automatically and immediately reduce stress on collection.
Dependencies: `PICKUP_CONFIG` (`docs/src/core/stress.js`), `Pickup` (`docs/src/entities/entities.js`), `pickups` array, `spawnPickups` and `updateAndRenderPickups` (`docs/src/systems/game-loop.js`).
Trigger key: None.
Cooldown: Spawn interval `420` frames; max `2` active pickups; lifetime `600` frames.

## Hit Feedback
Description: Ship hits trigger a temporary flash and gated impact sound so damage is easier to read.
Dependencies: `triggerShipHitFeedback`, `isShipHitFlashActive`, `initHitSfx`, `playHitSfx` (`docs/app.js`), `Ship.show` (`docs/src/entities/entities.js`), ship-hit branches in `docs/src/systems/game-loop.js`.
Trigger key: None.
Cooldown: Impact SFX gate `1000ms`; flash duration `1500ms`.

## Background Music
Description: A looping BGM track starts during active gameplay and stops when the run ends.
Dependencies: `initBgm`, `startBgm`, `stopBgm`, and `draw` (`docs/app.js`), `telemetryEnd` (`docs/app.js`), `docs/assets/audio/bgm-loop.mp3`.
Trigger key: None.
Cooldown: None.

## Enemy System
Description: Type A enemies fire bullets; Type B enemies launch homing missiles that now deal heavy stress damage instead of unconditional instant death.
Dependencies: `Enemy`, `EnemyBullet`, `EnemyMissile` (`docs/src/entities/entities.js`), `STRESS_CONFIG.collisionDeltaEnemyMissile` (`docs/src/core/stress.js`), `enemies`, `enemyBullets`, `enemyMissiles` arrays, `spawnEnemies` (`docs/src/systems/level-spawn.js`), enemy update/render functions in `docs/src/systems/game-loop.js`.
Trigger key: None.
Cooldown: Spawn check every `10s`; each enemy manages its own fire cooldown.

## Level Progression and Asteroid Maintenance
Description: Level scales by score thresholds and controls enemy pressure, asteroid density, and weapon unlocks.
Dependencies: `LEVEL_SCORE_THRESHOLDS`, `updateLevel`, `maintainAsteroids`, `drawLevelLabel`, `spawnEnemies`, `isWeaponUnlocked` (`docs/src/systems/level-spawn.js`), `runGameFrame` (`docs/src/systems/game-loop.js`), `score`, `level`, `asteroids`, and enemy arrays.
Trigger key: None.
Cooldown: Level `2` unlocks at score `300000`; Level `3` unlocks at score `700000`; each level unlocks additional weapons (`L1`: shotgun, `L2`: missile, `L3`: mine); system asteroid top-up checks with `2s` interval.

## Level Transition Briefings
Description: A temporary briefing card freezes live gameplay updates and introduces each level's threats and weapon tips.
Dependencies: `LEVEL_TRANSITION_CONTENT`, `triggerLevelTransition`, `isLevelTransitionActive`, `drawLevelTransitionCard` (`docs/src/systems/level-spawn.js`), frozen draw helpers in `docs/src/systems/game-loop.js`, `game` (`docs/src/ui/menu.js`).
Trigger key: None.
Cooldown: Transition duration `4200ms`; fade window `320ms`.
