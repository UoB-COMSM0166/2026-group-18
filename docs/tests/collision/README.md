# Collision Edge-Case Test Mode

This folder contains a standalone collision test harness for manual verification of entity collision behavior.

## Run

- Local: open `docs/tests/collision/index.html` in a browser.
- GitHub Pages: open `/tests/collision/index.html` under the deployed `docs` site.

## Test Protocol

1. Open the test page.
2. Select a case from the case dropdown.
3. Click `Run Scenario` (the canvas replays a short scenario animation).
4. Check the `Expected`, `Observed`, and `Status` fields.
5. If the output is valid, click `Record Observed`.
6. Attach visual proof (screenshot or short clip) in `evidence/`.
7. Repeat for all 8 cases.
8. Click `Export Observed JSON` and archive the exported file with the issue/PR.

All scenarios run in deterministic fixed-step mode (`1/60` per step) and do not depend on the main game loop.

## Edge Case Matrix (Expected + Observed)

| ID | Scenario | Expected | Observed | Status | Evidence |
|---|---|---|---|---|---|
| C1 | Tangent contact | Tangent touch is treated as a collision exactly once (single trigger). | `hitCount=1, hitFrames=[39]` | Pass | `evidence/C1_tangent_contact.mov` |
| C2 | High-speed tunneling | Naive end-position check may miss; swept collision check must detect hit. | `naiveHit=false, sweptHit=true` | Pass | `evidence/C2_high_speed_tunneling.mov` |
| C3 | Spawn-overlap | Overlap at spawn is detected immediately at frame 0. | `immediateCollision=true (frame=0)` | Pass | `evidence/C3_spawn_overlap.mov` |
| C4 | Vertex/corner contact | Corner-only contact still counts as collision. | `collision=true, centerIn=false, edgeHit=true, vertexHit=true` | Pass | `evidence/C4_vertex_corner_contact.mov` |
| C5 | Multi-collision same frame | Multiple candidates in one frame resolve to a single damage event. | `candidates=2, resolvedEvents=1` | Pass | `evidence/C5_multi_collision_same_frame.mov` |
| C6 | Screen-wrap boundary | Collision is detected across wrapped world boundary. | `directCollision=false, wrappedCollision=true` | Pass | `evidence/C6_screen_wrap_boundary.mov` |
| C7 | Asteroid split immediate collision | Split children overlap may occur, but same-frame immediate damage is suppressed by guard logic. | `overlapAtSplit=true, sameFrameDamageEvents=0` | Pass | `evidence/C7_split_immediate_collision.mov` |
| C8 | Floating-point jitter / repeated triggers | Jitter does not cause repeated damage triggers every frame. | `naiveTriggers=60, stableTriggers=1` | Pass | `evidence/C8_floating_point_jitter.mov` |

## Pass/Fail Criteria

- **Pass**
  - All 8 cases executed.
  - `Observed` is recorded for each case.
  - Evidence file exists for each case.
  - Exported JSON includes all case IDs with status.
- **Fail**
  - Missing case result.
  - Missing evidence.
  - Behavior differs from expected and is not documented as known issue.

## Evidence Naming Convention

Use one of these patterns:

- Clip (current run): `C{N}_{short_name}.mov`
- Alternative: `C{N}_{short_name}.mp4` or screenshot `.png`

Examples:

- `C1_tangent_contact.mov`
- `C2_high_speed_tunneling.mov`

## Notes

- This module is test-only and does not modify gameplay code in `docs/src/*`.
- Keep all new evidence paths relative to this folder for GitHub Pages compatibility.


## Current Evidence Set

- `evidence/C1_tangent_contact.mov`
- `evidence/C2_high_speed_tunneling.mov`
- `evidence/C3_spawn_overlap.mov`
- `evidence/C4_vertex_corner_contact.mov`
- `evidence/C5_multi_collision_same_frame.mov`
- `evidence/C6_screen_wrap_boundary.mov`
- `evidence/C7_split_immediate_collision.mov`
- `evidence/C8_floating_point_jitter.mov`
- `evidence/collision_observed_2026-03-10T21-15-19-277Z.json`
