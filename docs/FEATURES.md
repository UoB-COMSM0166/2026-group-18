# FEATURES

## Player Ship Movement
Description: The player rotates and boosts a ship with wrap-around movement. Releasing non-movement keys no longer clears active steering input.
Dependencies: `Ship` and `Jet` (`docs/src/entities/entities.js`), `keyPressed`/`keyReleased` (`docs/src/input/controls.js`), `updateAndRenderPlayer` (`docs/src/systems/game-loop.js`), `ship` and `jet` globals.
Trigger key: `Arrow Left`, `Arrow Right`, `Arrow Up`.
Cooldown: None.

## Auto Laser
Description: The ship continuously fires a primary laser while enough laser energy is available.
Dependencies: `Ship.update`, `autoLaserCooldown`, and `laserLife` (`docs/src/entities/entities.js`), `Laser` class, `laserBeams` array, `updateAndRenderLaserBeams` (`docs/src/systems/game-loop.js`).
Trigger key: Automatic.
Cooldown: `30` frames between shots, gated by laser energy regeneration.

## Shotgun
Description: Fires a short-range cone spread of up to 8 pellets for crowd clearing.
Dependencies: `keyPressed` (`docs/src/input/controls.js`), `isWeaponUnlocked` (`docs/src/systems/level-spawn.js`), `ShotgunBullet` (`docs/src/entities/entities.js`), `shotgunBullets` array, `updateAndRenderShotgunBullets` (`docs/src/systems/game-loop.js`).
Trigger key: `Z`.
Cooldown: `15s`; max `20` active pellets; unlocked at Level `1`.

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
Cooldown: Mirrors the underlying weapon cooldown and active-limit rules.

## Stress System
Description: Collisions raise stress, stress lowers ship handling by tier, and the HUD presents stress as a full-to-empty danger bar style display.
Dependencies: `STRESS_CONFIG`, `HANDLING_BY_TIER`, `addStress`, `reduceStress`, `updateStress` (`docs/src/core/stress.js`), `drawStressBar` (`docs/app.js`), collision logic in `docs/src/systems/game-loop.js`.
Trigger key: Passive system.
Cooldown: Stress decay waits `2s` after the last stress gain.

## Stress Recovery Pickups
Description: Cyan pickups spawn automatically and immediately reduce stress on collection.
Dependencies: `PICKUP_CONFIG` (`docs/src/core/stress.js`), `Pickup` (`docs/src/entities/entities.js`), `pickups` array, `spawnPickups` and `updateAndRenderPickups` (`docs/src/systems/game-loop.js`).
Trigger key: None.
Cooldown: Spawn interval `420` frames; max `2` active pickups; pickup lifetime `600` frames.

## Hit Feedback
Description: Ship hits trigger a temporary flash and gated impact sound to improve damage readability.
Dependencies: `triggerShipHitFeedback`, `isShipHitFlashActive`, `initHitSfx`, `playHitSfx` (`docs/app.js`), `Ship.show` (`docs/src/entities/entities.js`), hit branches in `docs/src/systems/game-loop.js`.
Trigger key: None.
Cooldown: Impact SFX gate `1000ms`; flash duration `1500ms`.

## Background Music
Description: A looping BGM track starts during active gameplay and stops when the run is finalized.
Dependencies: `initBgm`, `startBgm`, `stopBgm`, and `draw` (`docs/app.js`), `telemetryEnd` (`docs/app.js`), `docs/assets/audio/bgm-loop.mp3`.
Trigger key: None.
Cooldown: None.

## Enemy System
Description: Type A enemies chase and fire bullets; Type B enemies launch homing missiles.
Dependencies: `Enemy`, `EnemyBullet`, `EnemyMissile` (`docs/src/entities/entities.js`), `enemies`, `enemyBullets`, `enemyMissiles` arrays, `spawnEnemies` (`docs/src/systems/level-spawn.js`), enemy update/render functions in `docs/src/systems/game-loop.js`.
Trigger key: None.
Cooldown: Spawn check every `10s`; each enemy manages its own fire cooldown.

## Level Progression
Description: Score thresholds raise the level, unlock weapons, increase asteroid maintenance targets, and enable stronger enemies.
Dependencies: `LEVEL_SCORE_THRESHOLDS`, `updateLevel`, `maintainAsteroids`, `spawnEnemies`, `isWeaponUnlocked` (`docs/src/systems/level-spawn.js`), `runGameFrame` (`docs/src/systems/game-loop.js`), `score`, `level`, and gameplay arrays.
Trigger key: None.
Cooldown: Level `2` begins at score `300000`; Level `3` is not currently reachable because its threshold is `Infinity`.

## Level Transition Briefings
Description: A temporary briefing card freezes live gameplay updates and introduces each level's threats and weapon tips.
Dependencies: `LEVEL_TRANSITION_CONTENT`, `triggerLevelTransition`, `isLevelTransitionActive`, `drawLevelTransitionCard` (`docs/src/systems/level-spawn.js`), frozen draw helpers in `docs/src/systems/game-loop.js`, `game` (`docs/src/ui/menu.js`).
Trigger key: None.
Cooldown: Transition duration `4200ms`; fade window `320ms`.
