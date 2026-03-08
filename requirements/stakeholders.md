# Stakeholders

This stakeholder definition is optimized for COMSM0166 marking priorities: clear user value, engineering quality, and evidence-based evaluation.

## Comparison of Two Stakeholder Versions

| Dimension | Version A (broader team list) | Version B (course-focused list) | Improvement direction |
|---|---|---|---|
| Coverage | Includes designers, managers, community | Includes instructors and test players | Keep course-relevant stakeholders as primary |
| Alignment to coursework | Indirect | Direct evaluator role is explicit | Retain `Course Instructors` and add measurable evidence |
| Engineering specificity | General descriptions | Slightly better focus | Add architecture/testability links |
| Assessability | Low (hard to score objectively) | Medium | Define verifiable outputs per stakeholder |

## Optimized Stakeholder Set

### Players

- Role: Primary end users.
- Main goals: intuitive controls, readable HUD, fair difficulty progression, responsive gameplay.
- Relevant architecture modules: `input`, `systems`, `ui`, `entities`.
- Quality attributes: usability, playability, runtime stability.
- Evidence in report: playtest results, usability findings, balancing adjustments.

### Game Developers

- Role: Build and maintain the system.
- Main goals: modular codebase, low coupling, easy feature extension, clear technical documentation.
- Relevant architecture modules: separation across `core`, `entities`, `input`, `systems`, `ui`; centralized configuration for stress/cooldown tuning.
- Quality attributes: maintainability, extensibility, testability.
- Evidence in report: architecture rationale, module boundaries, implementation/testing artifacts.

### Course Instructors

- Role: Formal assessors of both process and software quality.
- Main goals: requirements traceability, justified design decisions, robust evaluation and reflection.
- Quality attributes: rigor, traceability, reproducibility.
- Evidence in report: requirement-to-design mapping, UML/architecture artifacts, evaluation methodology and outcomes.

### Test Players

- Role: Independent validation group.
- Main goals: identify usability issues, balancing problems, and gameplay defects.
- Relevant architecture modules: `ui` clarity, `systems` balance progression, `core` stress behavior.
- Quality attributes: validation coverage, defect discoverability.
- Evidence in report: structured test sessions, issue logs, fixes linked to findings.

## Priority and Scope

- High priority: `Players`, `Game Developers`, `Course Instructors`.
- Medium-high priority: `Test Players`.
- Secondary (not core to marking evidence): external gaming community and internal role labels without distinct assessment outputs.

## Stakeholder-Driven Requirement Direction

- Functional: controls, feedback visibility, progression fairness, core gameplay loop.
- Non-functional: modularity, maintainability, and stable frame-by-frame behavior.
- Documentation: explicit traceability from stakeholder needs -> user stories -> acceptance criteria -> evaluation evidence.
