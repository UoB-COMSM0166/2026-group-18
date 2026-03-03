## Final Idea — Stress / Handling Degradation (Asteroids twist)

A classic Asteroids-style arena shooter, **but** every collision increases a **Stress meter** that degrades ship handling in *predictable tiers* (e.g., reduced rotation rate and increased drift). Players can collect **de-stress pickups** to recover control, turning the core loop into a risk-management problem (play aggressively for score vs stay safe to keep precision).  

**Main engineering challenges:** 
1) a data-driven **stress state machine** (3 fixed tiers, capped values) with clearly communicated UI feedback;
2) deterministic, time-based movement and **balancing with telemetry** (track survival time, collision rate, stress-over-time, and pickup usage) to tune tier parameters and difficulty.

**MVP scope:** one arena, 3 stress tiers, stress UI, one de-stress pickup type, and baseline asteroid splitting/scoring. 

**Optional AI extension (stretch):** add a single enemy type with a simple **FSM** (e.g., patrol → chase → disengage) using steering behaviour, to increase pressure under high stress without overwhelming scope.
