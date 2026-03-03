# Final Idea (Candidate)

A classic Asteroids-style arcade shooter, **but** the player can activate a **Time-Dilation Pulse** that slows down everything except ship rotation (short cooldown, limited energy). This changes the core decision-making from pure reflex to planning: players choose when to slow time to thread through dense asteroid fields or line up precision shots. The MVP is a single arena with asteroids that split, basic scoring, and one special ability with clear UI feedback.  
**Main engineering challenges:** 
1) deterministic, time-based movement and collision handling under dynamic time scaling;
2) a clean game-state + event system (spawning, cooldown/energy, difficulty ramp) that remains testable and data-driven.
     
**Evaluation:** run a short playtest (2–3 users) and record attempts/time-to-survive/ability-usage to tune cooldown and difficulty.
