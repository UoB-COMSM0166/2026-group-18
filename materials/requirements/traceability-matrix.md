# Traceability Matrix

This document connects requirements to implementation evidence:

`Requirement -> User Story -> Acceptance Criteria -> GitHub Issue -> PR -> Commit -> Module/File -> Evaluation Evidence`

Use this matrix as the primary traceability artifact in the report Process and Evaluation chapters.

## Current Evidence Snapshot (as of March 8, 2026)

- The repository has clear commit/PR evidence for most implemented features.
- Many historical changes do not include explicit GitHub Issue IDs in commit/PR text.
- For those rows, `GitHub Issue` is marked as `TBD` and should be backfilled from GitHub Issues.

## Workflow Rules

1. Create one GitHub Issue per requirement-sized task.
2. Include the User Story ID in the issue title or body.
3. Reference issue IDs in PR descriptions (`Closes #xx`).
4. Add commit messages that mention the issue ID.
5. Record code file paths and evaluation evidence in this matrix after merge.

## Labels (recommended)

- `system:stress`
- `system:entity`
- `system:gameplay`
- `system:input`
- `system:ui`
- `type:feature`
- `type:bug`
- `type:evaluation`

## Matrix

| Req ID | User Story | Acceptance Criteria ID | GitHub Issue | PR | Commit | Module / File | Evaluation Evidence | Link Confidence | Status |
|---|---|---|---|---|---|---|---|---|---|
| R-1 | US-1.1 Ship Control | AC-1.1 | `TBD` | `#37` | `3c57993` (`refactor(game): split app.js...`) | `docs/src/input/controls.js`, `docs/src/entities/entities.js` | `task completion, control error rate` | missing | Implemented (issue backfill needed) |
| R-2 | US-1.2 Collision and Survival Loop | AC-1.2 | `#69`, `#72` | `#63`, `TBD` | `f21e32f`, `TBD` | `docs/src/systems/game-loop.js`, `docs/src/entities/entities.js`, `docs/app.js` | `collision fairness notes, bug reproduction, hit feedback reliability` | confirmed | Implemented + Enhancement in progress |
| R-3 | US-2.1 Stress Gain from Damage | AC-2.1 | `#27`, `#69`, `#30` | `#35`, `#63`, `TBD` | `4e4867e`, `f21e32f`, `TBD` | `docs/src/core/stress.js`, `docs/src/systems/game-loop.js` | `stress-over-time`, `collision count`, `dt-based stress consistency` | confirmed + inferred | Implemented |
| R-4 | US-2.2 Stress Recovery | AC-2.2 | `#31`, `#69` | `#48`, `#49`, `#63` | `a0f0c70`, `9fccf17`, `f21e32f` | `docs/src/core/stress.js`, `docs/src/systems/game-loop.js`, `docs/src/entities/entities.js` | `pickup count`, `post-pickup stress delta` | confirmed | Implemented |
| R-5 | US-2.3 Tier-Based Handling Changes | AC-2.3 | `#27`, `#28`, `#29`, `#30`, `#32`, `#69` | `#35`, `#48`, `#49`, `#59-#62`, `#63`, `TBD` | `4e4867e`, `a0f0c70`, `9fccf17`, `8f4384a`, `f21e32f`, `TBD` | `docs/src/core/stress.js`, `docs/app.js`, `docs/src/entities/entities.js` | `tier transition checks`, `HUD tier feedback`, `rotation/thrust/drift degradation consistency` | confirmed + inferred | Implemented |
| R-6 | US-3.1 Primary Weapon Usage | AC-3.1 | `TBD` | `#58` | `c1fdb45` (`v1.4 ...`) | `docs/src/entities/entities.js`, `docs/src/systems/game-loop.js` | `shots fired per minute` | missing | Implemented (issue backfill needed) |
| R-7 | US-3.2 Secondary Weapon Variety | AC-3.2 | `#70` | `TBD` | `2731e87`, `TBD` | `docs/src/input/controls.js`, `docs/src/entities/entities.js`, `docs/src/systems/level-spawn.js` | `weapon usage distribution by level` | confirmed | Implemented + Enhancement in progress |
| R-8 | US-3.3 Cooldown and Limit Rules | AC-3.3 | `#30`, `#70` | `TBD`, `#58` | `2731e87`, `c1fdb45`, `TBD` | `docs/src/input/controls.js`, `docs/app.js`, `docs/src/systems/level-spawn.js` | `cooldown and unlock-rule violations`, `frame-rate-independent cooldown behavior` | inferred | Implemented + Enhancement in progress |
| R-9 | US-4.1 Asteroid Challenge | AC-4.1 | `TBD` | `TBD` | `dbcf68e` (`Initialize p5.js project structure...`) | `docs/src/entities/entities.js`, `docs/src/systems/level-spawn.js` | `asteroid count over time` | missing | Implemented (PR/issue backfill needed) |
| R-10 | US-4.2 Enemy Pressure | AC-4.2 | `TBD` | `TBD` | `87448db` (`add new level and enemies`) | `docs/src/entities/entities.js`, `docs/src/systems/level-spawn.js` | `enemy encounter frequency` | missing | Implemented (PR/issue backfill needed) |
| R-11 | US-5.1 Score-Based Level Advancement | AC-5.1 | `#30`, `#70` | `TBD` | `87448db`, `TBD` | `docs/src/systems/level-spawn.js` | `score-threshold transition correctness`, `level gating at 300000/700000` | confirmed + inferred | Implemented + Enhancement in progress |
| R-12 | US-5.2 Difficulty Scaling | AC-5.2 | `#30`, `#33`, `#34`, `#70` | `TBD` | `87448db`, `7fc09f2`, `TBD` | `docs/src/systems/level-spawn.js`, `docs/src/systems/game-loop.js`, `docs/app.js` | `survival curve by level/score`, `telemetry-assisted balancing analysis` | confirmed + inferred | Implemented + Enhancement in progress |
| R-13 | US-6.1 HUD Visibility | AC-6.1 | `#28`, `#32`, `#69`, `#72` | `#35`, `#48`, `#49`, `#59-#62`, `#63`, `TBD` | `4e4867e`, `a0f0c70`, `9fccf17`, `8f4384a`, `f21e32f`, `TBD` | `docs/app.js`, `docs/src/core/stress.js`, `docs/src/entities/entities.js` | `HUD/readability + hit-feedback clarity + tier-label consistency` | confirmed | Implemented + Enhancement in progress |
| R-14 | US-6.2 Game State Feedback | AC-6.2 | `#71` | `#64`, `TBD` | `cf52387`, `TBD` | `docs/src/ui/menu.js`, `docs/index.html`, `docs/src/input/controls.js` | `state confusion incidents / start-flow errors` | confirmed | Implemented + Enhancement in progress |
| R-15 | US-6.3 Control and Status Clarity | AC-6.3 | `#71` | `#64`, `#58`, `TBD` | `cf52387`, `c1fdb45`, `TBD` | `docs/CONTROLS.md`, `docs/src/input/controls.js`, `docs/src/ui/menu.js` | `control clarity questionnaire / tutorial comprehension` | confirmed | Implemented + Enhancement in progress |

## Cross-Cutting / Evaluation Infrastructure

These issues are highly valuable for report quality and reproducibility, but are not pure one-to-one gameplay requirement items.

| Issue | Suggested Scope | Related Req IDs | Status |
|---|---|---|---|
| `#33` | Telemetry metric collection (`survivalTime`, `collisionCount`, `stress samples`, etc.) for balancing analysis | `R-3`, `R-4`, `R-12` | Closed |
| `#34` | Telemetry JSON export + README metric definitions for reproducible experiments | `R-12` | Closed |

## Evidence Checklist

- Every merged feature has at least one linked Issue and one linked PR.
- Every User Story has at least one Acceptance Criteria ID.
- Every completed story has at least one code file path and one evaluation evidence entry.
- Every high-severity usability issue has a fix issue/PR link in the next iteration.
