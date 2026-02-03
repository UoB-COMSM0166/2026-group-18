# Two Candidate Game Ideas

## Idea 1 - Stress Tiers Precision Dodge Platformer (inspired by Rage Game)
**Description:** A hard, learnable “precision dodge platformer” with repeatable enemy patterns, **but** the player’s **Stress** level dynamically changes the movement feel in predictable tiers, pushing a risk–reward loop where staying calm literally improves control.

**Core loop:** Short levels with deterministic hazards/enemy patterns → plan micro-routes → execute precisely → instant death on hit/out-of-bounds → fast retry.               Stress increases on death and decreases on clear / collecting “calming beans”.               Stress is capped and split into three fixed tiers (Calm / Tense / Rage) to keep behaviour learnable and fair.

**Twist mechanics:**
- **Primary twist — Stress tiers (0–100, capped):**
- Calm: low acceleration + high friction (most stable control).
- Tense: higher acceleration + slight sliding (harder to micro-adjust).
- Rage: keep “Tense” feel, plus a fixed global difficulty bump (e.g., enemy speed/attack rate ×1.2), with clear audiovisual cues.
- **Auxiliary twist — Soul Swap:**
- The player’s previous death location spawns a single “ghost” with no collision.
- A visible swap radius is drawn around the ghost.               If the player enters the radius and presses **Space**, the player and ghost positions swap.
- Constraints: swap only inside the radius;               cooldown (e.g., 2 seconds);               only one ghost exists (new death replaces old), preventing spam and excessive shortcutting.

**MVP scope (time-boxed):**
- MVP (main): Stress tiers + 2 short levels + 1 repeatable enemy pattern + timer + death counter.
- MVP (optional): Soul Swap (only after core movement/collision feels stable).

**Main challenges:**
1) **Data-driven balancing** for tier parameters (acceleration/friction) and tier transitions while preserving fairness and learnability.
2) **Deterministic movement + collision** under changing parameters (repeatable outcomes, stable feel, minimal “random deaths”).
3) **Ghost lifecycle + swap system** with clear feedback and cooldown management, without collapsing level intent.

**Lightweight evaluation plan:**
- Playtest (5–10 mins per tester): can players explain why they died and how Stress affected control?
- Metrics to log per level: attempts, time-to-clear, time spent in each tier, bean pickups, swap usage count (if enabled).               Use results to adjust tier parameters and level pacing.

---

## Idea 2 - Two-Phase World Toggle Puzzle Platformer (inspired by TermiStone)
**Description:** A mechanism-driven puzzle platformer, **but** the level has two switchable phases (World A / World B) where the same space contains different rules, creating an “observe → switch → execute” rhythm.

**Core loop:** Read the environment → switch phase → traverse using the new rule set → combine rules as levels progress.

**Rule set (combinable and teachable):**
- R1: Solid/ghost platforms (A solid, B intangible/absent; supports switching mid-jump).
- R2: Mutually exclusive interactions (A: button works, door closed; B: button disabled, door open; requires ordered actions).

**Anti-spam constraint:** add a light switching constraint (e.g., 200ms cooldown).               Optional: certain mechanisms freeze/reset on switch if needed for clarity.

**MVP scope (teaching-first):**
- 3 short teaching levels: single-rule → variation → combined challenge.
- Implement 2 rule types (start with R1 + R2; add R3 only if time permits).

**Main challenges:**
1) **Dual-world level data model** (tilesA/tilesB, entities with activeIn and stateA/stateB) that remains readable and maintainable for the team.
2) **Event system + FSMs** for interactables (broadcast `switch_world`, doors/buttons/moving platforms as explicit state machines).
3) **Phase readability in rendering** so players don’t brute-force switches (e.g., non-active world as a faint “ghost preview” to support planning).

**Lightweight evaluation plan:**
- Playtest: do players solve a level by reasoning (few switches) or by brute force (many switches)?
- Metrics: switches per level, time-to-clear, number of deaths near phase boundaries;               use this to tune cooldown, visual cues, and rule combinations.

---
