# Acceptance Criteria

This file defines testable acceptance criteria for the user stories in:
- [user-stories.md](user-stories.md)

The criteria focus on player-observable behaviour and deterministic game rules.

## Epic 1 - Core Gameplay Mechanics

### AC-1.1 (US-1.1 Ship Control)

- Given a run is active,
- When the player presses `Left` or `Right`,
- Then the ship heading changes continuously in the pressed direction.
- Given a run is active,
- When the player presses `Up`,
- Then thrust is applied and the ship position and velocity update accordingly.

### AC-1.2 (US-1.2 Collision and Survival Loop)

- Given ship collision cooldown is `0`,
- When the ship collides with an asteroid or valid enemy attack,
- Then the collision consequence is applied exactly once for that hit event.
- Given a stress-increasing hit causes stress to reach `100`,
- When the crash sequence completes,
- Then the run enters the game-over state consistently.

## Epic 2 - Stress System

### AC-2.1 (US-2.1 Stress Gain from Damage)

- Given current stress is below `100`,
- When an asteroid collision occurs,
- Then stress increases by `20`.
- Given current stress is below `100`,
- When an enemy bullet hit occurs,
- Then stress increases by `12`.
- Given current stress is below `100`,
- When an enemy missile hit occurs,
- Then stress increases by `30` and only causes game over if stress reaches `100`.

### AC-2.2 (US-2.2 Stress Recovery)

- Given stress is above `0`,
- When the passive decay cooldown has ended,
- Then stress decreases over time according to the configured decay rate.
- Given a recovery pickup is collected,
- When collection is processed,
- Then stress is reduced by `20` without going below `0`.

### AC-2.3 (US-2.3 Tier-Based Handling Changes)

- Given stress is in range `0-39`,
- When handling parameters are applied,
- Then the tier is `CALM` with handling multipliers of `1.0`.
- Given stress is in range `40-74`,
- When handling parameters are applied,
- Then the tier is `TENSE` with handling multipliers of `0.8`.
- Given stress is in range `75-100`,
- When handling parameters are applied,
- Then the tier is `PANIC` with handling multipliers of `0.6`.
- Given stress tier changes,
- When the HUD updates,
- Then the player receives visible stress and handling feedback.

## Epic 3 - Weapons System

### AC-3.1 (US-3.1 Primary Weapon Usage)

- Given the player ship is active and laser energy is available,
- When gameplay updates run,
- Then primary laser shots are auto-fired at approximately `0.5s` intervals.

### AC-3.2 (US-3.2 Secondary Weapon Variety)

- Given the shotgun is unlocked and ready,
- When the player presses `Z`,
- Then shotgun projectiles are spawned in a forward cone.
- Given the missile is unlocked and ready,
- When the player presses `X`,
- Then a homing missile entity is spawned.
- Given the mine is unlocked and ready,
- When the player presses `C`,
- Then a mine entity is placed.
- Given the ultrasonic wave is unlocked and ready,
- When the player presses `V`,
- Then an ultrasonic-wave entity is spawned.

### AC-3.3 (US-3.3 Cooldown, Limit, and Lock Rules)

- Given a secondary weapon is locked by level,
- When the player attempts to use it,
- Then no entity is spawned and the HUD shows `LOCKED`.
- Given a secondary weapon is cooling down,
- When the player attempts to use it,
- Then no entity is spawned and the HUD shows `COOLING`.
- Given active shotgun pellets or mines have reached their configured limit,
- When the player attempts to create more,
- Then creation is blocked and the HUD shows `LIMIT`.
- Given a secondary weapon is unlocked, off cooldown, and below its active limit,
- When the HUD updates,
- Then the weapon state is shown as `READY`.

## Epic 4 - Enemy and Asteroid Behaviour

### AC-4.1 (US-4.1 Asteroid Challenge)

- Given the run is active,
- When asteroid maintenance executes,
- Then asteroids are replenished toward the current level target count.
- Given a valid asteroid hit by a weapon occurs,
- When collision resolution runs,
- Then asteroid split or removal follows the current game rules.

### AC-4.2 (US-4.2 Enemy Pressure)

- Given level progression reaches enemy-enabled stages,
- When enemy spawning logic executes,
- Then enemies spawn according to configured type and count rules.
- Given enemies are active,
- When update cycles run,
- Then they move and attack according to their implemented behaviour patterns.

## Epic 5 - Level Progression

### AC-5.1 (US-5.1 Score-Based Level Advancement)

- Given the run is active and the score is below `300000`,
- When the score reaches `300000`,
- Then level state advances to `Level 2`.
- Given the run is active and the score is below `700000`,
- When the score reaches `700000`,
- Then level state advances to `Level 3`.

### AC-5.2 (US-5.2 Difficulty Scaling and Briefing)

- Given the level increases,
- When spawn and maintenance logic run,
- Then asteroid target counts and enemy pressure increase according to level configuration.
- Given a new level is reached,
- When the transition begins,
- Then the player sees a level briefing card before active gameplay resumes.
- Given the level briefing card is active,
- When the player has not held `Space`,
- Then active gameplay remains paused.
- Given a new level is reached,
- When the HUD and weapon rules update,
- Then level-gated weapon unlocks match the current level configuration.

## Epic 6 - User Interface and Feedback

### AC-6.1 (US-6.1 HUD Visibility)

- Given the run is active,
- When score, stress, level, or weapon state changes,
- Then the HUD displays updated values in-frame and remains readable.
- Given stress changes,
- When the HUD updates,
- Then the stress bar, numeric stress value, and handling feedback reflect the current state.

### AC-6.2 (US-6.2 Game State Feedback)

- Given the game is at the main menu,
- When the menu is displayed,
- Then `START` and `ABOUT` are available as selectable options.
- Given the player opens the about screen,
- When the screen is displayed,
- Then project information, the collision tests link, and a return option are visible.
- Given the run reaches game over,
- When the game-over screen is displayed,
- Then the final score and summary information are shown.
- Given the game-over screen is active,
- When the player presses any key,
- Then the game returns to the main menu.

### AC-6.3 (US-6.3 Control and Status Clarity)

- Given the player follows the documented controls,
- When movement and weapon keys are pressed,
- Then in-game actions match the documented bindings.
- Given a level briefing is shown,
- When the player reads the briefing,
- Then the relevant level threat and weapon control information is visible.
