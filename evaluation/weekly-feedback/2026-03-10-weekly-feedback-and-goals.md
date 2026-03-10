# Weekly Playtest Feedback + Iteration Goals (Week of 2026-03-10)

## 1. Feedback Summary

### 1.1 Sources
- User surveys (SUS + NASA-TLX)
- Team post-playtest meeting notes

### 1.2 Problems
1. New players struggle to understand controls, UI signals, and tutorial guidance.
2. Level 3 difficulty spikes too sharply and causes frustration.
3. Combat feedback is unclear, especially weapon cooldown/readiness visibility.
4. Ship nose direction is hard to identify during fast combat.
5. End-of-run summary lacks key information for player self-evaluation.

## 2. This Week Priorities

### P0 (Must Complete)
1. Fix input locking/conflicts between movement and weapon controls.
2. Add a level briefing gate with hold-space-to-continue.
3. Add HUD indicators for weapon availability and cooldown status.
4. Improve ship orientation readability (ship silhouette update based on reference).
5. Rebalance Level 3 yellow enemy lethality.
6. Replace time-based progression with score-based progression.
7. Prioritize missile targeting toward high-threat targets.

### P1 (Should Complete)
1. Improve MVP game-over summary panel (score, level reached, survival time, retry hint).

## 3. Kanban Issue

- Fix input locking between movement and weapon keys
- Add level briefing gate with hold-space-to-continue
- Add HUD weapon readiness and cooldown indicators
- Redesign ship silhouette for clearer nose direction
- Rebalance Level 3 Type-B enemy lethality
- Replace time-based progression with score-based thresholds
- Prioritize missile targeting toward high-threat enemies
- Improve MVP game-over summary panel

## 4. Validation Plan

1. New-player task test: complete movement + use 3 weapon types within 2 minutes without facilitator help.
2. Input regression: verify multi-key press/release order reliability.
3. Progression regression: verify score threshold transitions with no double-trigger and no skipping.
4. Combat regression: verify missile target priority follows the high-threat-first rule.
5. Balance regression: compare Level 3 death causes and frustration reports before/after changes.
6. Quick SUS + NASA-TLX re-test: compare experienced vs first-time players.

## 5. Traceability Requirement

For each implemented change, link:
`Issue -> PR -> Commit -> Verification Evidence`
