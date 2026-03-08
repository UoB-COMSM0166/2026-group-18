# Acceptance Criteria

This file defines testable acceptance criteria for all User Stories in:
- [user-stories.md](user-stories.md)

## Epic 1 - Core Gameplay Mechanics

### AC-1.1 (US-1.1 Ship Control)

- Given the run has started,
- When the player presses `Left`/`Right`,
- Then the ship heading changes continuously in the pressed direction.
- Given the run has started,
- When the player presses `Up`,
- Then ship thrust is applied and position/velocity update accordingly.

### AC-1.2 (US-1.2 Collision and Survival Loop)

- Given ship collision cooldown is `0`,
- When the ship collides with an asteroid or valid enemy attack,
- Then collision consequences are applied exactly once for that hit event.
- Given stress reaches max or a lethal collision rule is triggered,
- When the frame update completes,
- Then the run enters game-over state consistently.

## Epic 2 - Stress System

### AC-2.1 (US-2.1 Stress Gain from Damage)

- Given current stress is below max,
- When an asteroid collision occurs,
- Then stress increases by configured asteroid delta (`+20`).
- Given current stress is below max,
- When an enemy bullet hit occurs,
- Then stress increases by configured enemy-bullet delta (`+12`).

### AC-2.2 (US-2.2 Stress Recovery)

- Given stress is above `0`,
- When passive decay cooldown ends,
- Then stress decreases over time according to configured decay rate.
- Given a stress-recovery pickup is collected,
- When collection is processed,
- Then stress is reduced by configured recover amount (`20`) without going below `0`.

### AC-2.3 (US-2.3 Tier-Based Handling Changes)

- Given stress is in range `0-39`,
- When handling parameters are queried,
- Then tier is `CALM` with multipliers `1.0`.
- Given stress is in range `40-74`,
- When handling parameters are queried,
- Then tier is `TENSE` with multipliers `0.8`.
- Given stress is in range `75-100`,
- When handling parameters are queried,
- Then tier is `PANIC` with multipliers `0.6`.

## Epic 3 - Weapons System

### AC-3.1 (US-3.1 Primary Weapon Usage)

- Given the player ship is active and laser energy is available,
- When gameplay updates run,
- Then primary laser shots are auto-fired at configured interval (about `0.5s`).

### AC-3.2 (US-3.2 Secondary Weapon Variety)

- Given cooldown conditions are satisfied,
- When the player presses `Z`,
- Then a missile entity is spawned.
- Given cooldown conditions are satisfied,
- When the player presses `X`,
- Then shotgun projectiles are spawned in a forward cone.
- Given cooldown conditions are satisfied,
- When the player presses `C`,
- Then a mine entity is placed.
- Given cooldown conditions are satisfied,
- When the player presses `V`,
- Then an ultrasonic-wave entity is spawned.

### AC-3.3 (US-3.3 Cooldown and Limit Rules)

- Given a secondary weapon was just used,
- When the player attempts to trigger it again before cooldown end,
- Then no new entity is spawned for that weapon.
- Given active shotgun bullets or mines reached configured limits,
- When player input requests more,
- Then creation is blocked until count drops below the limit.

## Epic 4 - Enemy and Asteroid Behaviour

### AC-4.1 (US-4.1 Asteroid Challenge)

- Given the run is active,
- When asteroid maintenance executes,
- Then asteroids are replenished toward system target counts.
- Given a valid asteroid hit by weapon occurs,
- When collision resolves,
- Then asteroid split/remove behavior follows current game rules.

### AC-4.2 (US-4.2 Enemy Pressure)

- Given level progression reaches enemy-enabled stages,
- When enemy spawning logic executes,
- Then enemies spawn according to configured type and count rules.
- Given enemies are active,
- When update cycles run,
- Then they move and attack according to implemented behavior patterns.

## Epic 5 - Level Progression

### AC-5.1 (US-5.1 Time-Based Level Advancement)

- Given the run has started,
- When elapsed time crosses configured thresholds (`90s`, `180s`),
- Then level state increases to the expected stage.

### AC-5.2 (US-5.2 Difficulty Scaling)

- Given the level increases,
- When spawn/maintenance logic runs,
- Then challenge parameters (asteroid target counts and enemy pressure) increase according to level config.

## Epic 6 - User Interface and Feedback

### AC-6.1 (US-6.1 HUD Visibility)

- Given the run is active,
- When score/stress/level values change,
- Then HUD displays updated values in-frame and remains readable.

### AC-6.2 (US-6.2 Game State Feedback)

- Given player is outside active gameplay,
- When entering menu or game-over states,
- Then the corresponding UI state is shown consistently and can be exited as defined.

### AC-6.3 (US-6.3 Control and Status Clarity)

- Given a player opens the controls documentation and starts a run,
- When pressing documented movement/weapon keys,
- Then in-game actions match documented bindings without conflicting mappings.
