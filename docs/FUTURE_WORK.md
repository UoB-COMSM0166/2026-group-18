# FUTURE_WORK

## Gameplay and Enemies

- Add new enemy variants with distinct movement and attack patterns.
- Add boss encounters at fixed time or level milestones.
- Add asteroid-type diversity (armored, splitting chain, fast fragments).
- Rebalance Type B missile lethality so late-game pressure stays readable without feeling unfair.

## Weapon and Progression Systems

- Add upgrade trees for existing weapons (damage, radius, cooldown, ammo efficiency).
- Add temporary power-ups and risk/reward pickups.
- Tune the current score thresholds (`300000`, `700000`) against playtest data and session length targets.

## Difficulty and Balance

- Replace hard thresholds with adaptive difficulty scaling based on player performance.
- Tune stress gain/decay with telemetry and balancing presets.
- Improve enemy spawn logic to avoid unfair overlap spawns.

## UX, Audio, and Feedback


- Add more layered sound feedback (weapon SFX, enemy warnings, pause/menu cues, volume controls).
- Add clearer cooldown indicators and per-weapon HUD widgets.

- Add full sound system (weapon SFX, warnings, ambient loop, impact feedback).
- Add HUD animation polish such as flashing just-ready states and stronger low-availability warnings.

- Add pause screen, restart shortcut, and accessibility options.
- Refine the stress bar presentation if the team decides to switch from a pressure meter to a health-like HUD metaphor.

## Technical and Quality

- Add automated gameplay tests for collisions, cooldowns, and spawn rules.
- Refactor globals into state modules to reduce coupling.
- Add deterministic seed mode for reproducible debugging and balance tests.
