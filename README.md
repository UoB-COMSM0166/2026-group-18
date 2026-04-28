# Keep Calm, Captain!

Here's our game. We built an Asteroids-style shooter with a twist — collisions don't just damage you, they mess with your controls. Get hit too much and your ship handles terribly. Collect pickups to calm down. Play it [here](https://uob-comsm0166.github.io/2026-group-18/) and see for yourself.

Built in p5.js, the game centres on a **Stress mechanic** that degrades ship handling in fixed, predictable tiers as your stress meter rises. This transforms the core loop from simple survival into risk management: play aggressively to score more, or play safely to preserve precision and control.
<p align="center">
  <img src="materials/game-documentation/keepcalm-captain.png" alt="header.jpg" style="width:100%"/>
    <br>
  </a>
</p>

A browser-based Asteroids-style arcade shooter built in p5.js, centred on a Stress mechanic that changes how the ship handles during play. Instead of treating damage as a simple health reduction, our game turns collisions into a controllability problem: taking hits raises the player’s Stress meter, and higher stress degrades ship handling in fixed, predictable tiers. This transforms the core loop from simple survival into risk management: play aggressively to score more, or play safely to preserve precision and control

- [Play the game](https://uob-comsm0166.github.io/2026-group-18/)
- Demo video: (link)
- Final idea: [materials/requirements/final-idea.md](materials/requirements/final-idea.md)

<p align="center">
  <b>Figure 1: Gameplay Screenshot</b><br>
  <img src="docs/asteroids.jpg" width="500"/>
</p>


## Contents
1. [Team](#our-group)
2. [Introduction](#introduction)
3. [Requirements](#requirements)
4. [Design](#design)
5. [Implementation](#implementation)
6. [Evaluation](#evaluation)
7. [Process](#process)
8. [Sustainability, Accessibility, and Ethics](#sustainability-accessibility-ethics)
9. [Conclusion](#conclusion)
10. [Contribution Statement](#contribution-statement)
10. [AI statement](#AI statement)
12. [References](#references)


## Our Group

<p align="center">
  <b>Figure 2: Group Photo</b><br>
  <img src="https://github.com/user-attachments/assets/4f3012f3-9d78-4dff-8d98-3e032d17ac7d" width="500"/>
</p>

| Group member | Email | GitHub Username | Role |
|---|---|---|---|
|Benyu Zhu|benyuzhu@outlook.com|Josh-Zhu0326|Software Developer|
|Yutong Liu|yutong11x@outlook.com|Volta0411|Graphics & Design|
|Lin Zhu|zhulinuk2025@gmail.com|kath0925|Project Manager|
|Zhaohang He|zhaohanghe89@gmail.com|Zhaohang89|Software Developer|
|Bo Sun|bowillrich@gmail.com|bowillrich-cell|Software Developer|


## Introduction

Our game is a browser-based **Asteroids-style arcade shooter** developed in **p5.js**. It is based on the classic arcade formula of navigating a spaceship through an arena, avoiding hazards, and surviving while scoring points. However, rather than simply recreating *Asteroids*, we introduced a mechanic that changes the player’s relationship with control and risk. The central twist of our game is a **Stress system**: whenever the player collides with hazards or takes damage, their **Stress meter** increases, and higher stress reduces the ship’s handling in clear, predictable tiers. At low stress, the ship responds normally; at higher stress, turning, thrust, and drift control become noticeably worse. Players can partially recover by collecting **de-stress pickups**, creating a constant trade-off between aggressive play for a higher score and careful play to preserve precision and control.

This makes the game novel because difficulty does not come only from faster enemies or more obstacles, but from the player’s own performance and state. The challenge becomes psychological as well as mechanical: mistakes do not just reduce survival chances, they directly affect how it feels to play. We designed this twist to create a more dynamic risk–reward loop while still keeping the game readable and fair through fixed thresholds and visible UI feedback. From a software engineering perspective, this mechanic also gave us a strong technical focus, particularly in implementing a **data-driven stress state machine** and balancing movement behaviour across different stress levels.


## Requirements

The central aim of the requirements for this project is to prevent scope creep while keeping the project focused on one clear gameplay innovation. We therefore framed the game around the player’s struggle to survive under pressure: a space arcade shooter in which the player attempts to achieve the highest possible score while managing increasing stress. 
According to Ludewig(2003)'s idea, software artefacts should be understood as models rather than reality itself. We treated our requirements as revisable models of player needs: they describe the game through player-observable behaviour, make scope decisions explicit, and remain open to refinement when evaluation evidence reveals mismatch with actual play experience.

### Early Ideation

During the ideation stage, we collected inspirations based on the types they are interested in respectively, and compared multiple directions through the [inspiration list](materials/requirements/inspiration.md).

We did not merely compare "which game is more interesting", but focused on evaluating four dimensions: gameplay novelty, feasibility of p5.js implementation, controllability of the MVP range, and whether it can form a clear engineering challenge. This comparison process helps us avoid choosing solutions with excessive content or those that are difficult to evaluate from the very beginning.

| Candidate Idea | Main Appeal | Main Risk | Decision |
|---|---|---|---|
| TermiStone-inspired 2D platformer | Strong dual-state mechanic; players switch between elemental states to solve obstacles and terrain challenges. | Required complex level design, tutorial pacing, platforming feel, and a large amount of content. | Rejected as the main direction, but its state-based gameplay idea was transformed into the Stress system. |
| Asteroids-style arena shooter | Focused core loop: rotate, thrust, dodge, shoot, and score; suitable for a stable MVP in p5.js. | Needed a clear twist to avoid becoming a simple clone of Asteroids. | Selected as the project foundation. |
| Rage Game / precision survival reference | High intensity and strong risk-reward rhythm with a small ruleset. | Could become frustrating if difficulty was not carefully balanced. | Used as inspiration for pressure and survival pacing. |
| Puzzle / exploration platformer references | Offered interesting ideas around discovery, state changes, and player learning. | Too dependent on content volume, level structure, and polish. | Used as secondary inspiration only. |

### Feasibility Studies

One early candidate was a 2D platform game inspired by TermiStone. Its core mechanic was a dual-state system in which the player switched between different elemental states and used state-specific abilities to overcome mechanisms, obstacles, and terrain. The idea was highly appealing during the selection stage, and every team member who tried it immediately said: “it should be our project!” We had even produced an [inspiration video](https://www.youtube.com/watch?v=za6nsWXRI2Y) to explore the idea further.

However, according to the requirements of this project, we found that this platformer concept would rely on complex level design, carefully paced tutorials, precise platforming feel, and a large amount of content. Given the module timeframe and the constraints of implementing the game in p5.js, this direction introduced a high risk of scope expansion. 

We therefore switched the project foundation toward an [Asteroids-style arena shooter](materials/requirements/final-idea.md), whose core loop is more focused: rotating, thrusting, dodging, shooting, and scoring. This made it more realistic to build a stable MVP first. At the same time, we preserved the original idea of state-influenced gameplay by reworking it into the current Stress system, where collisions and damage not only increase the risk of failure but also change the ship’s handling state. This became the core requirements trade-off: **reduce content scope while preserving mechanical novelty**.

### Stakeholder and Top-level Need

To avoid treating requirements as a simple feature list, we used stakeholder analysis to connect requirements to the context of the game. The stakeholder onion model suggests that stakeholders should be identified around the product or service itself rather than only around the development team (Alexander and Beus-Dukic, 2009). Based on this theory, we identified four main stakeholder groups: Players are the primary users and can be understood as both normal operators and functional beneficiaries: they interact directly with the game and benefit from an enjoyable, fair, and understandable play experience. Therefore, what they want to focus on is intuitive controls, clear HUD feedback, fair difficulty, and smooth gameplay. Game Developers are close to the product during this duration, so their care about modular structure, maintainability, extensibility, and testability. Course Instructors act as surrogate and assessment stakeholders: their responsibility is judging whether our project is clear, justified, traceable, and supported by evidence. Playtesters provide feedback by revealing usability issues, balancing problems, and gameplay defects that the development team may not notice. From these stakeholders, we derived several top-level needs, summarized below.

| Stakeholder | Top-Level Need | Related Epics | Evidence / Validation |
|---|---|---|---|
| Players | Intuitive controls, clear HUD feedback, fair difficulty progression, and smooth gameplay | Epic 1 - Core Gameplay Mechanics; Epic 2 - Stress System; Epic 5 - Level Progression; Epic 6 - User Interface and Feedback | Playtesting and Think Aloud feedback on onboarding, HUD clarity, weapon readiness, and difficulty pacing; SUS and NASA-TLX results used to assess usability and workload. |
| Game Developers | Modular, maintainable, extensible, and testable system structure | Epic 1 - Core Gameplay Mechanics; Epic 2 - Stress System; Epic 3 - Weapons System; Epic 4 - Enemy and Asteroid Behaviour; Epic 5 - Level Progression; Epic 6 - User Interface and Feedback | Modular implementation across `stress.js`, `game-loop.js`, `level-spawn.js`, `controls.js`, and `menu.js`; acceptance criteria and traceability matrix linking requirements to implementation files. |
| Course Instructors | Clear requirements, justified design decisions, process evidence, and traceable development work | All epics | Use-case modelling, user stories, acceptance criteria, requirement refinement evidence, GitHub issue / PR / commit links, and evaluation results. |
| Playtesters | Identify usability issues, balancing problems, and gameplay defects that the development team may overlook | Epic 2 - Stress System; Epic 5 - Level Progression; Epic 6 - User Interface and Feedback | Weekly feedback and playtesting evidence led to requirement changes including score-based progression, HUD weapon states, level briefing cards, and enemy missile stress damage instead of instant death. |

### Epics and User Stories

Around these needs, we organized the project into six epics, as shown in Figure 3, and then defined user stories from those epics.

<p align="center">
  <b>Figure 3: Six Implementable Epics</b><br>
  <img src="materials/requirements/implementable-epics-relationship.png" width="500"/>
</p>

The user stories were structured around player value. Stories about ship control, collision consistency, and HUD readability address learnability for new players and fairness during play. Stories about stress gain, stress recovery, and tier-based handling changes define the central twist of the project. Stories about weapon cooldowns, enemy pressure, and level progression support challenge depth and long-term motivation for more experienced players. This organization means that stress is a central design driver across the requirements layer.


### Use Case Modelling

We then used **use-case modelling** to describe system behaviour from the perspective of player-observable interactions. The final model contains only one actor, which is  the Player. It keeps the system boundary focused on the single-player gameplay loop.

<p align="center">
  <b>Figure 4: Use Case Diagram</b><br>
  <img src="materials/requirements/use-case-diagram.png" width="500"/>
</p>

Although developers, instructors and test players are also stakeholders, the use-case diagram only retains players as actors because the goal of this diagram is to describe runtime system interactions rather than project management relationships.

### Use-Case Specification Tables

Our use-case model is built around two core use cases: Start and Play a Standard Run and Handle Stress through Collision and Recovery. The first covers the complete flow from the main menu, through the level briefing, into active play, survival through movement and weapons, score-based progression, and finally the game-over state. The second focuses on the core gameplay chain of this project: collisions and hits increase stress, stress changes the HUD and handling state, cyan recovery pickups reduce stress, and passive decay helps the player regain control when they avoid further damage.

<p align="center">
  <b>Table x</b><br>
  <i>Start and Play a Standard Run</i><br>
</p>

| Use-Case Section | Content |
|---|---|
| **Use Case Name** | **Start and Play a Standard Run** |
| **Brief Description** | The player starts from the main menu, reads the level briefing, plays the main survival loop, progresses through score-based levels, and eventually reaches the game-over state. |
| **Primary Actor** | Player |
| **Preconditions** | The game page is loaded and the main menu is visible. |
| **Basic Flow** | 1. The player enters the main menu.<br>2. The system shows `START` and `ABOUT`.<br>3. The player selects `START` using the menu keys.<br>4. The system displays the Level 1 briefing card.<br>5. The player holds `Space` to continue.<br>6. The system dismisses the briefing card and resumes active gameplay.<br>7. The player rotates and boosts the ship to avoid hazards.<br>8. The automatic laser fires while energy is available.<br>9. The player may use available secondary weapons.<br>10. The system updates score, level, stress, HUD, and weapon status during play.<br>11. When the score reaches a level threshold, the system displays the next level briefing card.<br>12. The player continues into the next level with increased pressure.<br>13. If stress reaches `100` after damage, the ship crashes and explodes.<br>14. The system shows the `GAME OVER` page with final score and telemetry summary.<br>15. The player presses any key to return to the main menu. |
| **Alternative Flows** | **A1.** At Step 3, the player selects `ABOUT`; the system shows the game description, collision test link, and `BACK` option.<br>**A2.** At Step 5 or Step 11, the player does not hold `Space`; the system remains on the briefing card.<br>**A3.** During Step 9, the player attempts to use a locked weapon; the HUD shows `LOCKED` and no weapon is fired.<br>**A4.** During Step 9, the player attempts to use a cooling weapon; the HUD shows `COOLING` and no weapon is fired.<br>**A5.** During Step 9, the player attempts to use a weapon at its active limit; the HUD shows `LIMIT` and no weapon is fired. |
| **Postconditions** | The run either ends with the `GAME OVER` page and the player returning to the main menu, or continues in active gameplay if the crash condition has not been reached. |

<p align="center">
  <b>Table Use Case B</b><br>
  <i>Handle Stress through Collision and Recovery</i><br>
</p>

| Use-Case Section | Content |
|---|---|
| **Use Case Name** | **Handle Stress through Collision and Recovery** |
| **Brief Description** | The player’s stress increases when hazards cause damage, decreases through recovery pickups or passive decay, and affects both HUD feedback and ship handling. |
| **Primary Actor** | Player |
| **Preconditions** | A run is active and the player ship is present in the arena. |
| **Basic Flow** | 1. The player controls the ship during active gameplay.<br>2. The ship collides with an asteroid or is hit by enemy fire.<br>3. The system increases stress based on the damage source: asteroid `+20`, enemy bullet `+12`, enemy missile `+30`.<br>4. The system updates the stress bar, colour feedback, numeric stress value, and handling label.<br>5. If stress reaches a higher tier, ship handling becomes weaker.<br>6. The player adapts by avoiding further damage.<br>7. A cyan recovery pickup appears in the arena.<br>8. The player collects the pickup.<br>9. The system reduces stress by `20`.<br>10. The HUD and ship handling update to reflect the new stress state.<br>11. If the player avoids further damage, stress decays passively after the cooldown period. |
| **Alternative Flows** | **B1.** At Step 2, collision cooldown is active; the system prevents repeated stress gain from rapid repeated contact.<br>**B2.** At Step 3, stress reaches `100`; the ship crashes and the game-over flow begins.<br>**B3.** At Step 7, the player does not collect a pickup; the player continues under the current stress state.<br>**B4.** At Step 11, the player takes damage again before passive decay has time to reduce stress; stress increases and the cooldown resets. |
| **Postconditions** | The player either remains in active play with an updated stress state, regains partial control through recovery, or crashes if stress reaches `100`. |

These use-case specifications informed the later sequence diagrams in the design section, especially the collision-to-stress path and the pickup-to-recovery path - both paths require coordinated behaviour across gameplay, HUD, and state-management subsystems.

### Acceptance Criteria and Iterative Refinement

To make the requirements directly checkable, we further translated the user stories into [acceptance criteria](materials/requirements/acceptance-criteria.md) in a Given / When / Then format. For example:

| AC ID | Given | When | Then |
|---|---|---|---|
| AC-2.1 | Stress is below `100` | The ship collides with an asteroid | Stress increases by `20` |
| AC-2.1 | Stress is below `100` | The ship is hit by an enemy bullet | Stress increases by `12` |
| AC-2.1 | Stress is below `100` | The ship is hit by an enemy missile | Stress increases by `30` |
| AC-2.2 | A recovery pickup is collected | Collection is processed | Stress decreases by `20` without going below `0` |
| AC-2.3 | Stress is in range `40-74` | Handling parameters are applied | The tier becomes `TENSE` and handling is reduced |
| AC-3.3 | A weapon is cooling down | The player attempts to use it | No weapon is fired and the HUD shows `COOLING` |
| AC-5.1 | Score reaches `300000` | Level update runs | The game advances to Level 2 |
| AC-5.1 | Score reaches `700000` | Level update runs | The game advances to Level 3 |

In this way, the most important behaviours of the project could be written as verifiable conditions.
The requirements were also refined through feedback from playtesting, Think Aloud sessions, weekly feedback, and workload evaluation. The table below summarises the most important requirement changes.

<p align="center">
  <b>Figure 5: Requirement Refinement Evidence</b><br>
  <img src="materials/requirements/refinement-evidence-table.png" width="500"/>
</p>

The requirements for this project were not fixed. Playtesting, Think Aloud sessions, and [weekly feedback](materials/evaluation/weekly-feedback/2026-03-10-weekly-feedback-and-goals.md) all showed that some initial requirement definitions needed to be revised. Based on this evidence, we made several key adjustments:
- We changed progression from time-based progression to score-based progression;
- We made READY, COOLING, LIMIT, and LOCKED states explicit in the HUD, and improved onboarding through level briefing cards;
- We changed enemy missiles so that they increase stress instead of causing instant death.
This shows that the requirements artefacts in this project were not static records. They actively guided development and supported ongoing design refinement.



## Design

### Design Goals and Architectural Approach

At the beginning of the programme, we ensured to put our core gameplay of this game as the **pressure system**, and we made lots of predictions about the situation that might happening during the process. For example: the numerical design, gameplay operation, the speed of feedback and so on. In the end, we confirmed that use a **hybrid OO-design** approach to design the game, which means divided the system into two layers: **classifying entity objects** by classes and implementing **operation control** by functions. This separation aligns with the use of UML class diagrams for structural modelling and sequence diagrams for behaviour (Fowler, 2004). And we have roughly divided the classes by drawing software: UMLetino. Now we have the diagram completely.

### System Architecture

The part of the entity class, which is including all the objects that player can see during the game, such as the player-controlled aircraft, randomly generated enemies and items that can be picked up. These entities only need to hold their own position, state, speed and behavior. We let them manage themselves through **encapsulation**. The frame-by-frame scheduling, enemy generation judgment, collision resolution and interface update are coordinated by the functions of the control layer. In this structure, because most of the entities in the game are independent objects, the complexity of a single class is reduced a lot, and different subsystems can work more clearly during the game. This structure also makes the codebase easier to maintain. For example, the spawn and split logic is needed, and the game’s core pressure system is only responsible for converting the player’s collection events into a change in pressure and triggering certain mechanics when the pressure reaches a threshold. It allows new entity types or gameplay method to be added without significantly modifying existing components. We use a clearly defined interface to connect the entity object layer and the function implementation layer. The function control layer updates and plans the entity each frame, and the entity object layer provides the local state and behavior for the function control layer to process.
The following picture shows all the **classes** in our game.

### Class Design

In terms of more detailed class design, the Asteroid class represents objects with multi-stage destruction behavior, and the enemy is a local unit with different types and active shooting skills. The Pickup class is used to implement the recovery mechanism. Player related objects are responsible for moving, colliding and updating the state of the pressure value. Projectile classes are divided into laser, missile, mine and enemy missile. These skills also have their own behavior mode; each weapon class is responsible only for its own attack behavior. In the main file, these functions are used only as references and are not involved in the internal implementation. 

The following picture shows the main functions in our game.

<p align="center">
  <b>Figure 6: All the Classes</b><br>
  <img src="materials/design/uml/class.png" width="500"/>
</p>

### Behaviour

In the behavior design, the system is organized around the **main loop**, which performs update, collision detection, feedback processing and state judgment in turn during each frame. For example, when the player accidentally touches a meteorite, the system will directly affect the feel of player’s control, the meteorite split and other effects; When the player is hit by a meteorite or an enemy bullet, the system will increase the pressure value and determine whether the threshold has been reached. As the pressure gradually increases, the player needs to continue to play under high pressure (feedback is the operator's feel). We consider this design to be a core form of feedback for the game. The stress system, as our core system, acts as a **bridge** connecting different subsystems. Damage events increase stress, and items are picked up to decrease stress, which is then linked to operational parameters through thresholds to create a dynamic difficulty system based on the player's performance, so that the player is faced with a different game each time.

<p align="center">
  <b>Figure 7: Functions in the Game</b><br>
  <img src="materials/design/uml/function.png" width="500"/>
</p>



## Implementation

During the implementation, we have designed 3 challenges:

1. Creating the stress system instead of instant death;
2. Replacing time-based level upgrade system by score-based;
3. Adding new weapons and enemies to increase diversity;

### Challenge 1: Creating the stress system instead of instant death

In the earliest version of our game, the ship will collide with asteroid causing instant death. We considered this as over-frustrating punishment, and decided to change it. Instead, we designed a stress system. 

The stress system is constructed by three core species: the stress bar and current stress value, self recovery cooldown, and recovery item. Stress value is initially 0 and will only increase when crash with an asteroid. Once the value reaches 100, the ship will be destroyed. There are two ways to recover, either self recovery, or taking the recovery item. The self recovery cooldown will immediately start right after a collision or an attack. Self recovery will start at a constant rate if there is no extra contact between ship and enemies or asteroids. Similar to the recovery items, they will constantly appear without any influence. 

The other key design is on the handling performance degradation. As stress rise, the handling system of the ship will synchronous declines. In detail, turnings slows down, weaker thrusts, and more significant inertia. This is how our stress system punishing collision, by increasing difficulties in controlling and keep players under reasonable pressure. 

We also improved the game UI after testing. In the earlier version, the stress bar rose when the ship crashed, in which some of the tester feels unintuitive. We then redesigned it into a HP-like bar. In addition, we also changed the shape of our ship to give a clearer ship facing view, and adding colors to both ship and bar in order to tell players the stress conditions more directly. 

<p align="center">
  <b>Figure 8: Annotated Game UI</b><br>
  <img src="materials/implementation/challenge-1-ui.png" width="500"/>
</p>

### Challenge 2: Replacing time-based level upgrade system by score-based

The second challenge was to design an effective level progression system. We planed to create levels of difficulties so that we can guarantee everyone have their suitable experience, no matter they prefer challenging or relaxing, having good or poor skills on this type of game. We have inserted new weapons and enemies to make it more interesting. 

Our first version of the system was a time-based system: players can access to next stage when they have survived 90 seconds in the current stage. However during testing, most players declared that the system was dilatory and endless. The countdown display also cause complex problems: when it’s large, it blocked the view; when it’s small, it was easy to miss. These results implies that we need a better level upgrade system. 

Therefore we redesigned the system into a score-based version, destroying asteroids and enemies to earn scores. Compare to the time-based system, this version leading players to hit rather than dodge. In order to accomplish this, we set up a scoring model in which gain scores of asteroids according to their radius and scores of enemy ships are fixed values. This kept the system closely connected to the shooting game concept. 

After testing and discussing, we set the two level threshold: 30000 and 700000 points. It will automatically upgrade level when reaching them, and also unlock new contents. 

### Challenge 3: Adding new weapons and enemies to increase diversity

The third challenge was to expand the game content without affecting game balance. This makes our game more diverse and less boring, which in other way, attracting more players to try and stay. 

Generally we replaced the manual shooting by automatically shooting since some players reported that they kept pressing space which cause unnecessary work. We also added shotguns and ultrasonic in the first stage. The shotgun is designed to deal with multiples of asteroids coming from the ship’s front, while ultrasonic is to coop with wild range of small asteroids, so that players can destroy asteroids smaller than particular size. Since the ultrasonic is too powerful, we give it a rather longer cooldown to maintain balance. 

In the second stage, we provided a new missile weapon and new enemy blue ship. The blue ship injects missiles to our ship, which makes it more threatening. The homing missile is designed to counter these threats. However in the earlier version, the homing missile doesn’t have a target priority, which players complained a lot. We then wrote several if loops to test which target it was, and allow them to target the higher priority ships first. 

In the third stage, we introduced mines and yellow ship enemies. The yellow ships move towards our ship and fire homing missile as well. This is a more dangerous than the previous blue enemy, and the mines are their counters. However, it seems that the yellow ships can shoot the missile to us before it steps on a mine, hence we have to lower the damage per missile to make it less punishing.  

| Weapon | Preview | Description |
|---|---|---|
| Shotgun | ![Shotgun](materials/implementation/shotgun.png) | Fires seven pellets in a forward cone, making it effective against clusters of asteroids. |
| Ultrasonic | ![Ultrasonic](materials/implementation/ultrasonic.png) | Releases an ultrasonic wave around the ship, destroying nearby asteroids that are not newly spawned. |
| Homing Missile | ![Homing Missile](materials/implementation/homing-missile.png) | Launches a tracking projectile that prioritises high-threat enemies. |
| Mine | ![Mine](materials/implementation/mine.png) | Remains in place and detonates when a high-threat enemy comes into contact with it. |

## Evaluation

### Qualitative Evaluation: Think Aloud

In the qualitative evaluation, since the original game has a relatively simple gameplay and a reliable code, we focused on all possible problems of our changes on the challenges. In other words, can players understand game rules and controls, would they correctly understand the stress system, whether they could judge the right timing to use skills, and will they accept the increase in difficulties in level upgrade system. 

The results tells us there are several problems. The main one is the onboarding and controls. Some players cannot understand how to control our ship without additional guidance. Some even reported that the game was a fixed position shooter rather than dodging asteroids. This implies that, in the earlier version, our game didn’t have a clear tutorial on controls, which we had improved in the latest version. In addition, some testers told us that the ship’s facing direction is unclear during the fast paced game.

The second major issue was the understandability of our stress system. Our original design was an increasing stress bar, which was unintuitive to some of the testers. Also, the results of increasing stress, as in the handling performance degrading, were not clearly pointed out. There was a similar problem in the third challenge on weapons and enemies, which was the cooldown indicator. Hence this problem can be analyzed as: For the new mechanism we have introduced, we need clearer indicators to let players know what has changed.

Overall, the qualitative evaluation has shown that the main problems were not the mechanisms themselves, but on the onboarding, feedback visibility, and system understandabilities. Based on these results, we need to improve, especially for new players, readabilities and gaming experiences. 

### Quantitative Evaluation: SUS and NASA-TLX

### SUS Final Scores

| Participant | Played Before | Contribution Sum | Final SUS Score |
|---|---|---:|---:|
| P1 | Y | 32 | 80 |
| P2 | Y | 30 | 75 |
| P3 | N | 30 | 75 |
| P4 | N | 27 | 67.5 |
| P5 | Y | 36 | 90 |
| P6 | Y | 36 | 90 |
| P7 | N | 22 | 55 |
| P8 | Y | 36 | 90 |
| P9 | N | 29 | 72.5 |
| P10 | Y | 30 | 75 |

<p align="center">
  <b>Figure 9: SUS Overall Chart</b><br>
  <img src="materials/evaluation/SUS-Overall.png" width="500"/>
</p>

<p align="center">
  <img src="materials/evaluation/sus_score_comparison_first_five.png" width="500"/>
</p>

### NASA-TLX Average Scores

| Dimension | 10/3/2026 | 20/4/2026 |
|---|---:|---:|
| Mental | 60.5 | 34 |
| Physical | 22 | 18 |
| Temporal | 67.5 | 43 |
| Performance | 56 | 42 |
| Effort | 45 | 51 |
| Frustration | 28 | 14 |

<p align="center">
  <b>Figure 10: NASA-TLX Chart</b><br>
  <img src="materials/evaluation/nasa-tlx-chart.png" width="500"/>
</p>

<p align="center">
  <img src="materials/evaluation/nasa_tlx_dimension_comparison_first_five.png" width="500"/>
</p>

We had also done two quantitative evaluation to verify our thoughts. 

For the System Usability Scale (SUS), we had measured the overall perceptions of is to use liability, and confidence. Which our game achieved an average score of 77, a generally positive result of assessment. 

We had also compared those players who had similar game experience before, and who has no such experience. We got an average score of 83.3 for those players who had experience of similar games but only 67.5 given by those players who had no experience which enhance our conjecture. We had already made this game intuitive enough for those experienced players. We now need to improve the playing experience for the others. 

Looking at the individual questions there are some lower scores mainly related to the willingness to continue use our system, players comfort during operation, and players level of confidence on using the system. We are confident to say that our system is relatively good for the experience players, but it was not sufficiently beginner friendly. This appears in many aspects. For example, two participants gave low scores for Q1 and Q8, performing that the ships inertia made the controls, feeling  uncomfortable. These results reminded us that player needs more clear, guidance feedback, and the difficulty adjustment in order to adapt this game more quickly.

We also used NASA-TLX as part of our quantitative evaluation. Lower physical demand and higher mental demand is more likely to be caused by our stress driven handling performance degrading. This allowed us to test how the pressure affected by our gameplay and workload. The results of the temporal demand was the highest-rated dimension, which proved that we need to lower the pressure and tension. 

In order to compare how our changes performed in the new game version, we did another quantitative evaluation and produced new charts. There is a clear decrease in both mental and temporal demand which means we achieved part of our goals, players do experience lower pressure and tension in the later test. However, we tied to use same participants’ results in the two tests to do Wilcoxon Signed Rank Test, we didn’t get a significant difference from the current data size. For NASA-TLX, we only get p = 0.188. We tried to used different data source to do Mann-Whitney U Test but this didn’t work as well. 

### Code Testing

In our final evaluation part, we need to test our code itself. We adopted a black-box test approach, according to our challenges, splitting our inputs into valid and invalid, then compare the expect and actual output. 
### Code Testing: Stress System and Feedback

| Partition | Expected Output |
|---|---|
| Valid collision: ship collides with an asteroid | Stress value increases correctly and HUD updates |
| Valid hit: player is hit by an enemy projectile | None |
| Valid recovery: player picks up a recovery item | Stress value decreases correctly |
| Invalid recovery: no recovery item picked up | None |
| Valid self recovery cooldown finish | Stress starts to recover naturally |
| Invalid self recovery cooldown not finished | None |
| Valid tier change | Handling and colour feedback update correctly |
| Valid upper limit reached | the game ends |

### Code Testing: Scoring and Level Progression

| Partition | Expected Output |
|---|---|
| Valid asteroid destroyed | Score increases correctly according to radius × 100 |
| Valid enemy destroyed | Score increases correctly according to fixed value |
| Invalid scoring: no target destroyed | None |
| Valid progression condition: score ≥ 300000 | Enter Level 2 |
| Valid progression condition: score ≥ 700000 | Enter Level 3 |
| Invalid progression condition: score below threshold | None |

### Code Testing: Weapon Activation, Cooldown, and Enemy Behaviour

| Partition | Expected Output |
|---|---|
| Valid weapon activation | Weapon is successfully triggered |
| Invalid weapon activation: cooldown not finished | None |
| Invalid weapon activation: not unlocked | None |
| Valid homing missile locks onto enemy | Prioritises high-threat enemies |
| Valid homing missile locks onto asteroid | Locks onto a valid asteroid target |
| Valid mine placement | Mine is placed successfully |
| Invalid mine placement: maximum reached | None |
| Valid blue ship spawn | Spawns correctly in Stage 2 and above |
| Invalid blue ship spawn | Does not spawn before Stage 2 |
| Valid yellow ship spawn | Spawns correctly in Stage 3 |
| Invalid yellow ship spawn | Does not spawn before Stage 3 |



## Process

In our project, the team consists of five people to jointly develop a classic game based on the browser Asteroide. During the whole game development process, we adopted a combination of modular division of labour and collaborative development to ensure the complete development of the whole game and the quality assurance of the code. The team has the close coorperation.

In order to improve the efficiency of group collaboration, the five of us divided the whole game system into multiple core modules, including: Game Loop, Collision System, Entities, UI/Menu and Controls. It can ensure that each of the five people is responsible for a core module and participates in the overall testing and optimisation in the later assembly stage, so as to achieve the balance and integrity of task allocation.

<p align="center">
  <b>Figure 11: Team Communication via WeChat</b><br>
  <img src="materials/process/wechat-chat.jpg" width="500"/>
</p>

In terms of communication, we held many seminars at the beginning of this project. The direction of the discussion was mainly aimed at the selected game, the improvement of the difficulty of the game, and the innovation and transformation of the game. The first meeting of five people in our group was held online. The meeting lasted for more than an hour. The content of the meeting focused on the repair of game bugs, the level design of the follow-up game, and the core module content that everyone was responsible for .

<p align="center">
  <b>Figure 12: Team Members Collaboratively Testing the Game</b><br>
  <img src="materials/process/team-discussion.jpg" width="500"/>
</p>

During the development process, we have selected a series of tools to support our development and collaboration:

<p align="center">
  <b>Figure 13: The Record of Pull Requests</b><br>
  <img src="materials/process/workflow.png" width="500"/>
</p>

Our team adopted a structured project management approach, integrating Kanban, GitHub workflows, and progress tracking tools to support efficient collaboration throughout the project. 

We use a kanban-based system to organize tasks and monitor progress. Tasks are clearly divided into stages such as backlog, to-do, in progress, testing, and completed, allowing all team members to have a clear understanding of the project status. Responsibilities are clearly defined, and tasks are assigned weekly to ensure a balanced workload for each member and clear deadlines.

<p align="center">
  <b>Figure 14: Kanban Board for Project Management</b><br>
  <img src="materials/process/kanban%20project.png" width="500"/>
</p>

We mainly realise team development and collaboration on GitHub, and the traces of our collaboration and development can be clearly seen on GitHub. Each of our members develops functions on an independent branch and uses pull request to review the code. The process of each pr requires at least two members to review and pass, and then the next code writing can be carried out.

### The Usage of Different Tools

| Tool Name | Purpose | Usage |
|-----------|---------|-------|
| GitHub | Version control and code collaboration | Used branches and pull requests to manage and integrate code |
| P5.js | Game development framework | Used to implement game rendering, animations and interactions |
| Visual Studio Code | Development environment | Used for writing and debugging JavaScript code |
| Kanban Board | Task management | Used to track task progress and allocate responsibilities |
| Browser Developer Tools | Debugging tool | Used to identify runtime errors and performance issues |

To realise this project, we have made a reasonable distribution of tasks, so that each member can share the similar difficulty and complexity.

Work allocation to ensure everybody pays an effort to the project, so that every one can have a contribution.

###  Content Introduction

| Members| Assigned Module | Contirbution |
|--------|-----------------|--------------|
| Lin      |  Game Loop           |  Implementing stable frame rates and game state management |
| Benyu    | Collision Detection  | Accurately handling interactions between bullets and asteroids |
| Zhaohang | Entity System        | Managing objects such as the spaceship, bullets, and asteroids |
| Bo       | Input Controls       | Handling keyboard input and ensuring responsive control mechanisms |
| Yutong   | User Interface (UI/Menu) | Implementing menu transitions and displaying game states |

In the middle and late stages of the project, due to time schedule and geographical restrictions, we gradually turned to online collaboration and held Scrum-like meetings through Microsoft Teams and WeChat voice calls, about twice a week. This short-term and frequent meeting mode has significantly improved the efficiency of communication. Unlike the relatively free and long offline discussions in the early days, these online meetings are more structured and usually revolve around "current progress, problems and next task allocation", so that the team can promote the development progress more clearly.

<p align="center">
  <b>Figure 15: Burndown / Progress Chart of the Project</b><br>
  <img src="materials/process/burndown-chart.png" width="500"/>
</p>

During the project development process, we tracked the overall progress through the burnout diagram. It can be seen from the figure that the team's work progress is uneven in time, especially in the mid-term stage, where there is obvious centralised completion of tasks, which shows that members tend to carry out "sudden development" when the deadline is approaching.

<p align="center">
  <b>Figure 16: Commit and Branch History Visualization</b><br>
  <img src="materials/process/network.png" width="600"/>
</p>

Although this method ensures the completion of stage goals to a certain extent, it also brings greater time pressure. 

However, in the final stage of the project, we successfully completed all the planned tasks and overcame various challenges, including several technical difficulties encountered during the development process.

## Sustainability, Technical, Social and Accessibility

### Sustainability

In our project, we want to develop a game that focusses on user interaction and participation. According to Becker et al. (2015), design decision-making will affect the long-term impact of the system. Based on this, this game aims to have a simple but positive impact on user behaviour.

This game is not only for entertainment but also takes into account its broader impact on users. The Karls Kruner Declaration emphasises that sustainability includes not only environmental aspects, but also social and personal aspects. Therefore, this game aims to provide a meaningful experience while keeping these aspects in mind.

Most of the games are developed using p5.js, do not rely on large-scale data graphics processing and large-scale server support, and reduce carbon emissions to a certain extent, combining the basic concept of green software development.

### Technical

From a technical point of view, the design of this game has clear functionality and concise structure. Duboc et al. (2019) pointed out that we should have a clear understanding of what we have built and how our design decisions affect the whole system. Based on this, this game focusses on maintaining the understandability and purposefulness of the design.

The game will also consider efficiency and resource utilisation during the implementation process. The green software model emphasises the importance of reducing unnecessary calculations and making the system more efficient. Therefore, the game is designed to be simple to operate and avoid unnecessary complexity. 

When we designed the game and arranged the tasks, we divided the game into multiple independent parts completed by one person, fixed the bugs of the game, and better developed the design of the game. While developing, it also ensures the stability of the game when multiplayer is online. We use standard development tools and game development processes (such as GitHub and version control mechanisms) to ensure the consistency and traceability of the code. It is not only conducive to teamwork but also improves the quality of the code.

### Social

From a social perspective, this game aims to provide users with a simple and fascinating experience. Sommerville (2020) pointed out that software systems should consider their impact on people and the interaction between them. Based on this, this game focusses on ease of use and accessibility.

As an entertainment application, the purpose of the game itself is to provide users with relaxation and pastime entertainment, which can relieve stress to a certain extent. The most important thing is that the design of our game is intuitive, and players can get started quickly, which greatly improves the playability of the game.

### Accessibility and Ethics

In another sides, the game follows basic principles of responsible software use. It does not collect or misuse user data, and it avoids any violent or inappropriate content, meeting Fundamental ethical standards. The Green Software Practitioner highlights that software should minimise harm and respect users. In this context, the game provides a safe and appropriate environment for its audience.  

This game mainly relies on keyboard operation, and the operation method is relatively simple, which is favourable to most users. However, the movement mode we mainly use is concentrated in the right hand, and the left hand is used to release skills, which is a little unfriendly for players who are used to left-handed control. We will upgrade the game in the future to improve accessibility.


## Conclusion

That's the project. It wasn't perfect — early playtests showed we needed better onboarding, clearer UI signals, and the progression felt too steep. We fixed what we could and learned a lot along the way: how to turn feedback into actual work, how to balance a system that's literally about losing control, and how to keep a team moving forward when things don't go to plan.

If we had more time, we'd smooth out the difficulty curve, add more weapon variety, and maybe explore different stress interactions beyond just handling. But for what it is, we're happy with how it came together.

Thanks for checking it out.

- 10% ~500 words

- Reflect on the project as a whole. Lessons learnt. Reflect on challenges. Future work, describe both immediate next steps for your current game and also what you would potentially do if you had chance to develop a sequel.


## Contribution Statement

The following table summarises the responsibilities and contributions of each team member:

| **Member** | **Assigned Module** | **Key Contributions** | **Contribution %** |
|---|---|---|---|---:|
| Lin | Game Loop | Project management, Game state management, update flow, and runtime stability | 20% |
| Bo | Collision Detection | Interaction handling between game objects | 20% |
| Zhaohang | Entity System | Management of in-game objects and object structure | 20% |
| Benyu | Input Controls | Player input handling and control responsiveness | 20% |
| Yutong | User Interface (UI/Menu) | Menu flow, screen transitions, and game-state presentation | 20% |

All members also contributed to group discussions, iterative decision-making, and the overall refinement of the project deliverables.

## AI Statement

- We used chatGPT and codex in this project, and learned how to code and maintain the project with AI tools. I spend one day to learn how to code with codex in vscode, and share this with my teammates.

- We used Codex to refactor parts of the codebase, making it more readable and making the structure easier for our team to understand and maintain. we also prepared a markdown file containing natural language prompts, which helped us generate supporting documentation, including a file explaining the overall project structure and the relationships between classes. We ask codex to run this file every time before push to GitHub, and this improved the communication efficiency of our team.

- Next, Codex was used to produce the initial versions of some weapons and enemies. These early examples were not treated as final solutions, but as learning scaffolds: they gave us a starting point for understanding how these systems could be built in p5.js, after which we designed and implemented additional weapons and enemies ourselves.I wrote the ultrasonic wave weapon after reading the weapons wrote by Codex, and re-wrote the AI logic of the missile under the guidance of GPT.

- AI image generation was also used to create a new spaceship asset for the game. In addition, ChatGPT was used throughout the project to explain code behaviour, clarify project-level design questions, and help us understand technical issues when we got stuck. It was especially useful when working with an older version of p5.js, where GPT helped us quickly identify the correct functions and older API usage that matched our version. For example, when I was writing the ultrasonic wave weapon, I need to draw a circle with p5.js, but the version of p5.js of the origin game was too old that the function on the web didn't work, GPT helped to find the correct circle draw function version.

- We also explored whether an embedded large language model could be used inside the project. In this experiment, I tested running a model through WebGPU in the browser and confirmed that this approach was technically possible. However, we decided not to continue with it because loading the online Qwen 0.5B model was too slow for practical use in our game context. As a result, this idea was investigated but not included in the final version of the project.

- Overall, we learned to how to use AI in our project, and it's a valuable knowledge. In the mean time, we still write and read the code ourselves to help us understand what a project should be like.

## Reference

Alexander, I. and Beus-Dukic, L. (2009) Discovering Requirements: How to Specify Products and Services. Chichester: Wiley.

Becker, C., Betz, S., Chitchyan, R., Duboc, L., Easterbrook, S. M., Penzenstadler, B., Seyff, N. and Venters, C. C. (2015). Requirements: The key to sustainability. IEEE Software, 33(1), pp.56–65. Sustainability Design and Software: The Karlskrona Manifesto

Becker, C., Betz, S., Chitchyan, R., Duboc, L., Easterbrook, S. M., Penzenstadler, B., Seyff, N. and Venters, C. C. (2015). Sustainability Design and Software: The Karlskrona Manifesto. Available at: https://www.karlskrona-manifesto.org (Accessed: 21 April 2026). Requirements: The key to sustainability

Duboc, L., Penzenstadler, B. and Porras, J. (2019). Do we really know what we are building? In: Proceedings of the IEEE 27th International Requirements Engineering Conference. IEEE. Do we really know what we are building?

Green Software Foundation (2023). Green Software Patterns. Available at: https://patterns.greensoftware.foundation/guide/suggested-tags (Accessed: 21 April 2026). Green Software Patterns (see the Catalogue part).

Green Software Foundation (2023). Green Software Practitioner. Available at: https://learn.greensoftware.foundation (Accessed: 21 April 2026). Engineering software products

Ludewig, J. (2003) ‘Models in software engineering – an introduction’, Software and Systems Modeling, 2, pp. 5–14. doi:10.1007/s10270-003-0020-3.

Sommerville, I. (2020). Engineering Software Products. London: Pearson. Green Software Practitioner, from Green Software Foundation.


## Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5% of report grade) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.
- **Documentation** of code (5% of report grade)
  - Organise your code so that it could easily be picked up by another team in the future and developed further.
  - Is your repo clearly organised? Is code well commented throughout?
