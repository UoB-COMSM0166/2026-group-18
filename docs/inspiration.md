# Game Inspiration List (Platformer / Puzzle Platformer)

## 1) Rage Game (Option one)
- Link: https://www.newgrounds.com/portal/view/1012371
- Core loop: skill-avoid / precision platforming where patterns are learnable; repeated attempts improve routing + execution.
- What makes it great:
  - High intensity with a small ruleset (good for a tight MVP).
  - Strong risk–reward rhythm and replay value (route optimisation).
- Suitability for p5.js (2D): **High**
- Twist potential:
  - Stress/Rage meter that *changes physics parameters* (predictable tiers).
  - Replay of Ghost of last run (optional collision, non-lethal).

## 2) TermiStone (Option two)
- Link: https://www.newgrounds.com/portal/view/1016014
- Core loop: platforming + environmental interactions / traps + pacing.
- What makes it great:
  - Depth via *combinable mechanisms* rather than sheer content length.
  - Clear software-engineering angle: event system, FSMs, data-driven levels.
- Suitability for p5.js (2D): **High–Medium**
- Twist potential:
  - Two-phase level logic world.
  - Resource-limited interactions (energy/cooldowns).

## 3) Öoo
- Link: https://namatakahashi.notion.site/oooo
- Core loop: exploration puzzle platformer centred on bombs; progression is largely knowledge-gated (learn techniques, not new abilities).
- What makes it great:
  - “One mechanic, many solutions” — strong design reference with controlled scope.
  - Excellent discovery/teaching through level layout (player “aha” moments).
- Suitability for p5.js (2D): **Medium**
- Twist potential:Knowledge-gated progression (teach 2–3 advanced techs via level design).

## 4) 13 Bones
- Link: https://solroo.itch.io/13-bones
- Core loop: small-scope indie platformer/action (compact vertical-slice reference).
- What makes it great:
  - Often demonstrates a clean “one main mechanic + few variations” structure.
  - Useful reference for difficulty curve and feedback in a short runtime.
- Suitability for p5.js (2D): **High–Medium**
- Twist potential: Refine one mechanic deeply

## 5) The Legend of Panda Warrior
- Link: https://www.newgrounds.com/portal/view/1016020
- Core loop: platforming + light combat/enemies, possibly skills/progression.
- What makes it great:
  - Goal-driven platforming (combat adds structure beyond pure traversal).
  - Clear engineering challenges: enemy AI, hitbox/hurtbox, balancing/telemetry.
- Suitability for p5.js (2D): **Medium**
- Twist potential: Terrain-changing skills, adaptive enemies

## 6) Super Mario (steam game)
- Core loop: classic side-scrolling platformer with enemies + power-ups that change movement.
- What makes it great:
  - Strong level-design pedagogy: teach → vary → combine → test.
  - Power-ups provide a clean entry point for “twist” design.
- Suitability for p5.js (2D): **Medium** (recommend: 1 power-up + 3 short levels)
- Concern:
  - Differentiation risk: As a canonical reference, an MVP can read as a generic “Mario-like” unless the twist is both strong and shippable within scope.
  - The signature “teach → vary → combine → test” pacing requires substantial iteration and micro-tuning to land well.

## 7) BattleBlock Theater (steam game)
- Core loop: tight platforming levels with hazards; optional co-op/competitive rules.
- What makes it great:
  - Dense short levels; good reference for hazard combinations and pacing.
  - Multiplayer inspiration (but better as a stretch goal).
- Suitability for p5.js (2D): **Medium** (single-player first; networked multiplayer is costly)

## 8) Animal Well
- Core loop: exploration-driven puzzle platforming with gating and backtracking (tools/knowledge unlock paths).
- What makes it great:
  - Strong world structure (gating, loops, progression).
  - Great reference for discovery and player-driven learning.
- Suitability for p5.js (2D): **Medium** (system/level organisation effort)
- Concern:The experience is world-structure and progression-gating driven, which requires significant level-design iteration and UX polish - it is too difficult.

## 9) Terraria (systems reference)
- Core loop: 2D sandbox exploration + mining/crafting/building + procedural generation + persistence.
- What makes it great:
  - Excellent systems inspiration: tile maps, world-gen, inventory, saves.
  - Rich software-engineering angles (data structures, persistence).
- Suitability for p5.js (2D): **Low**
- Concern: The concept is system-heavy and prone to scope explosion, requiring tile/chunk management, procedural generation, inventory/crafting, and persistence, which increases implementation, performance, and testing risk in p5.js.

---

## Ranking (Suitability-first)
1. Rage Game  
2. TermiStone  
3. Öoo 
4. 13 Bones  
5. The Legend of Panda Warrior  
6. Super Mario  
7. BattleBlock Theater (single-player first)  
8. Animal Well (systems inspiration)  
9. Terraria (systems inspiration / small slice only)
