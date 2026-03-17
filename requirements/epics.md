# Epics

This epic set refines the draft into engineering-oriented requirements that are traceable to implementation and evaluation.

## Epic 1 - Core Gameplay Mechanics

- Goal: Enable real-time spaceship control, movement, collision, and survival in the main arcade loop.
- Engineering focus: deterministic update loop, responsive input handling, stable collision processing.
- Verifiable outcome: player can start a run, control the ship, interact with world objects, and reach game-over conditions without logic breaks.

## Epic 2 - Stress System

- Goal: Introduce a stress mechanic that dynamically changes ship handling and perceived game pressure.
- Engineering focus: data-driven state machine, threshold-based tier transitions, tunable parameters.
- Verifiable outcome: stress value changes from gameplay events and correctly applies tier-based handling multipliers.

## Epic 3 - Weapons System

- Goal: Provide multiple weapon types with different tactical use cases against asteroids and enemies.
- Engineering focus: cooldown control, projectile lifecycle management, balance-friendly parameter configuration.
- Verifiable outcome: each weapon can be triggered under valid conditions, respects cooldown/limits, and produces correct combat effects.

## Epic 4 - Enemy and Asteroid Behaviour

- Goal: Generate continuous gameplay challenge through asteroid maintenance and enemy behavior.
- Engineering focus: spawn rules, entity behavior updates, collision interaction consistency.
- Verifiable outcome: asteroids/enemies spawn according to rules and create sustained but manageable challenge.

## Epic 5 - Level Progression

- Goal: Increase challenge through score-threshold stage/level progression.
- Engineering focus: score-threshold progression logic, parameter scaling, difficulty pacing.
- Verifiable outcome: level indicators and spawn/difficulty parameters transition as expected when score reaches defined thresholds.

## Epic 6 - User Interface and Feedback

- Goal: Present clear game-state feedback for decision-making and situational awareness.
- Engineering focus: HUD clarity, state synchronization, menu/game-over transitions.
- Verifiable outcome: score, stress level, level, and state transitions are visible, timely, and consistent with internal game state.

## Prioritization

- Must-have: Epic 1, Epic 2, Epic 3, Epic 6
- Should-have: Epic 4, Epic 5
