# FUTURE_WORK

## Gameplay and Enemies

- Continue tuning Type B homing missile stress damage after playtesting.
- Add more enemy variants with distinct movement and attack patterns.
- Add boss encounters at major progression milestones.
- Add more asteroid archetypes such as armored or fast-fragment variants.

## Weapons and Progression

- Add upgrade paths for existing weapons such as damage, radius, cooldown, or efficiency upgrades.
- Add temporary power-ups and risk/reward pickups.
- Tune the current score thresholds (`300000`, `700000`) against playtest data and session length targets.

## Difficulty and Balance

- Replace hard thresholds with adaptive difficulty scaling based on player performance.
- Tune stress gain/decay with telemetry and balancing presets.
- Improve enemy spawn logic to avoid unfair overlap spawns.

## UX, Audio, and Feedback

- Expand the sound layer with weapon-specific SFX, enemy warning cues, and user volume controls.
- Improve HUD polish with stronger ready-state flashes and clearer low-availability warnings.
- Keep iterating on stress-bar readability if the team wants a different visual metaphor.
- Add pause, quick restart, and accessibility options.

## Technical Quality

- Add automated tests for collisions, cooldown rules, and progression thresholds.
- Refactor global state into more isolated modules.
- Add deterministic seed support for reproducible debugging and balancing.
