# Evaluation

This chapter should provide evidence, not only description.  
Recommended target: one qualitative method + one quantitative method + testing evidence.

## 1. Evaluation Goals

Define evaluation questions that map to requirements.

Example questions:
- Q1: Is ship control still usable under stress tier changes?
- Q2: Do level progression and enemy spawn create a fair difficulty curve?
- Q3: Are weapon cooldown rules understandable during gameplay?

Link questions to:
- [requirements/user-stories.md](../requirements/user-stories.md)
- [requirements/acceptance-criteria.md](../requirements/acceptance-criteria.md)
- [requirements/traceability-matrix.md](../requirements/traceability-matrix.md)

## 2. Qualitative Evaluation (Think-Aloud or Heuristic)

### 2.1 Method

- Method: `Think-Aloud` or `Heuristic Evaluation` (pick one as primary).
- Participants: `N = ___` (profile and prior game experience).
- Session length: `___` minutes each.
- Tasks:
  - `Task 1: survive for 2 minutes`
  - `Task 2: use at least 3 weapon types`
  - `Task 3: recover from high stress using pickups`

### 2.2 Data Capture

- Screen/audio recording: `yes/no`
- Observer notes template: `timestamp, event, quote, issue`
- Severity scale: `0-3` (0 cosmetic, 3 critical)

### 2.3 Findings Log

| ID | Observation / Quote | Severity | Related Story | Related Issue | Fix Iteration |
|---|---|---|---|---|---|
| U-01 | `TBD` | `TBD` | `US-x.x` | `#TBD` | `Iteration x` |
| U-02 | `TBD` | `TBD` | `US-x.x` | `#TBD` | `Iteration x` |

## 3. Quantitative Evaluation

Use measurable metrics from gameplay sessions.

### 3.1 Metrics

- Survival time (seconds)
- Collision count
- Average stress and stress-over-time
- Pickup count
- Score
- Weapon usage frequency

### 3.2 Experiment Design

- Runs per build: `___`
- Build comparison: `Baseline vs Current` (or `Iteration A vs B`)
- Controlled variables: map, starting conditions, test instructions

### 3.3 Results Table

| Metric | Baseline | Current | Delta | Interpretation |
|---|---|---|---|---|
| Survival time (s) | `TBD` | `TBD` | `TBD` | `TBD` |
| Collision count | `TBD` | `TBD` | `TBD` | `TBD` |
| Avg stress | `TBD` | `TBD` | `TBD` | `TBD` |
| Pickup count | `TBD` | `TBD` | `TBD` | `TBD` |
| Score | `TBD` | `TBD` | `TBD` | `TBD` |

## 4. Code Testing Evidence

Document how requirements were checked in code and runtime.

### 4.1 Manual Test Cases

| Test ID | Requirement / AC | Steps | Expected | Actual | Status |
|---|---|---|---|---|---|
| T-01 | `AC-x.x` | `TBD` | `TBD` | `TBD` | `Pass/Fail` |
| T-02 | `AC-x.x` | `TBD` | `TBD` | `TBD` | `Pass/Fail` |

### 4.2 Regression Checks

- Collision and stress updates in [docs/src/systems/game-loop.js](../docs/src/systems/game-loop.js)
- Stress tier transitions in [docs/src/core/stress.js](../docs/src/core/stress.js)
- Input and cooldown behavior in [docs/src/input/controls.js](../docs/src/input/controls.js)

## 5. Iteration Impact

Show that evaluation findings entered the workflow:

`Finding -> GitHub Issue -> PR -> Commit -> Verified in next test`

Use links to issue/PR IDs and update [requirements/traceability-matrix.md](../requirements/traceability-matrix.md).

## 6. Threats to Validity

- Small participant sample size
- Learning effects between repeated runs
- Potential observer bias in qualitative coding
- Hardware/browser differences for FPS and controls

## 7. Conclusion

Summarize:
- What improved
- What still failed
- What is scheduled for next iteration
