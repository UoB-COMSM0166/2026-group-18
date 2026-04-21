# Implementation

This chapter should explain how the game was implemented and highlight two technical challenges.

Recommended references:
- [design/architecture-en.md](../design/architecture-en.md)
- [docs/FEATURES.md](../docs/FEATURES.md)
- [docs/GAME_LOOP.md](../docs/GAME_LOOP.md)
- [requirements/traceability-matrix.md](../requirements/traceability-matrix.md)

## 1. Implementation Overview

Summarize system modules and responsibilities:

| Module | Main Responsibility | Key Files |
|---|---|---|
| Core | Stress state and tuning constants | `docs/src/core/stress.js` |
| Entities | Ship, asteroids, enemies, projectiles | `docs/src/entities/entities.js` |
| Systems | Game loop, collisions, progression | `docs/src/systems/game-loop.js`, `docs/src/systems/level-spawn.js` |
| Input | Keyboard handling and cooldown triggers | `docs/src/input/controls.js` |
| UI | Menu and HUD | `docs/src/ui/menu.js`, `docs/app.js` |

## 2. Technical Challenge A

Suggested topic: Stress tier state machine and handling degradation.

Write with this structure:
- Problem: Why this was hard (state consistency, balancing, feedback clarity).
- Design decision: Tier thresholds + data-driven config.
- Implementation: APIs used and where they are called.
- Verification: How you confirmed behavior (tests, logs, play sessions).
- Trade-offs: What you simplified and why.

Code references:
- `addStress()`, `reduceStress()`, `updateStress()` in `docs/src/core/stress.js`
- Collision call sites in `docs/src/systems/game-loop.js`
- HUD rendering in `docs/app.js`

## 3. Technical Challenge B

Suggested topic options (pick one):
- Multi-weapon cooldown and projectile lifecycle
- Collision ordering and game-over consistency
- Enemy spawn scaling and pacing

Use the same structure as Challenge A:
- Problem
- Design decision
- Implementation
- Verification
- Trade-offs

## 4. Key Data Structures and Flow

Describe:
- Global arrays for entities/projectiles
- Per-frame update order in `runGameFrame()`
- How events propagate (input -> system update -> collision -> HUD)

Optional summary table:

| Data Structure | Purpose | Lifecycle |
|---|---|---|
| `asteroids[]` | World challenge objects | spawn -> update/render -> split/remove |
| `enemies[]` | Dynamic pressure | spawn by level -> update/fire -> remove |
| `pickups[]` | Stress recovery | timed spawn -> collect/expire |
| `explosions[]` | Visual feedback | create on event -> particle decay |

## 5. Integration and Versioning Evidence

Record iterative development evidence:
- Which feature landed in which iteration/version
- Related PR and commit links
- Associated issue IDs

Use [docs/CHANGELOG](../docs/CHANGELOG) plus GitHub PR history.

## 6. Testing and Debugging Support

Document concrete engineering checks:
- Manual regression checklist
- Console/telemetry observations
- Edge cases tested (max stress, cooldown boundaries, empty arrays)

## 7. Reflection

Answer briefly:
- What design choices reduced complexity?
- What technical debt remains?
- What will be refactored next and why?
