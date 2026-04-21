# Keep Calm, Captain!

A browser-based Asteroids-style arcade shooter built in p5.js, centred on a Stress mechanic that changes how the ship handles during play. Instead of treating damage as a simple health reduction, our game turns collisions into a controllability problem: taking hits raises the player’s Stress meter, and higher stress degrades ship handling in fixed, predictable tiers. This transforms the core loop from simple survival into risk management: play aggressively to score more, or play safely to preserve precision and control

- [Play the game](https://uob-comsm0166.github.io/2026-group-18/)
- Demo video: (link)
- Final idea: [requirements/final-idea.md](requirements/final-idea.md)

![Screenshot/GIF here]


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
11. [References](#references)


## Our Group

GROUP PHOTO.
![1ea16c65c7c97f326304811ae963f9b3](https://github.com/user-attachments/assets/4f3012f3-9d78-4dff-8d98-3e032d17ac7d)

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

### Early Ideation

At the start of the project, we focused on identifying a game concept that was both technically feasible and distinct enough to justify development. Rather than aiming for a large content-heavy game, we wanted a design that could be implemented effectively in **p5.js**, delivered within the module timeframe, and still provide a clear gameplay identity. This led us towards an arcade-style structure with a small number of interacting systems instead of a narrative-heavy or asset-heavy design. From this process, we selected an **Asteroids-style arena shooter** as the foundation because it offers a familiar, readable core loop while leaving room for a meaningful gameplay twist. 

The key question in the ideation phase was not simply “what game should we make?”, but “what mechanic can make a simple game worth engineering well?”. The answer was the **Stress mechanic**. Instead of using damage only as a loss condition, we designed stress to act as a state variable that changes how the ship handles. Collisions increase the player’s stress level, and higher stress reduces control through fixed, predictable tiers. This gave the project a clear novelty while also creating a focused engineering challenge. 

Our early ideation work was recorded through a structured set of weekly deliverables. In Week 2, we developed two candidate ideas and documented them for comparison before committing to a final direction. In Week 3, we also reviewed short videos explaining both ideas and recorded the reasoning behind our final selection. This helped ensure that the chosen concept was not the result of an unexamined preference, but of a visible decision process supported by comparison and discussion.

**Evidence**
- Two candidate ideas: [docs/ideas.md](docs/ideas.md)
- Week 3 idea videos: [docs/video_links.md](docs/video_links.md)
- Final concept selection rationale: [requirements/final-idea.md](requirements/final-idea.md)

### Team Decision and Scope Control

As a team, we decided what to develop by balancing three constraints: **novelty**, **feasibility**, and **scope control**. We wanted a game with an identifiable twist, but we also needed a design that could be implemented and tested reliably within the module. For this reason, we avoided ideas that depended on large amounts of bespoke content, complex AI from the beginning, or overly broad mechanics. Instead, we chose a concept where one central mechanic could influence movement, difficulty, scoring, and recovery at the same time. 

This decision also shaped our MVP. We deliberately limited the first version of the game to one arena, three stress tiers, a visible stress meter, one recovery pickup type, and baseline asteroid splitting and scoring. More advanced functionality, such as extended enemy behaviour, was treated as stretch scope rather than essential scope. This was an important requirements decision because it prevented the project from turning into an uncontrolled feature list. By controlling scope early, we ensured that the core loop could be implemented, tested, and refined before optional features were added. 

A key planning decision was to switch our primary implementation reference to a **p5.js Asteroids** project so that the game would align with the module’s required technology stack and remain feasible as a testable MVP. Earlier inspirations were retained only as design references for pacing, difficulty, and pattern ideas. This was an important scope-control decision because it reduced technical risk and kept the project focused on implementable mechanics rather than over-ambitious inspiration.

**Evidence**
- Final idea and design rationale: [requirements/final-idea.md](requirements/final-idea.md)
- Inspiration sources: [requirements/inspiration.md](requirements/inspiration.md)

**MVP / Stretch Goals / Scope Table (First-Principles)**

| First-Principles Requirement | MVP (Must Ship) | Stretch (If Time Allows) | Out of Scope (v1) |
|---|---|---|---|
| A playable arcade core loop is required | One arena + baseline asteroid splitting and scoring | Additional arena layouts | Campaign / narrative mode |
| The game needs one clear novelty that can be engineered and tested | Stress system: collisions increase stress | More stress interactions with extra systems | Multiple unrelated “twists” |
| Stress effects must be readable and deterministic | Three fixed stress tiers that alter handling predictably | Finer balancing per tier | Dynamic/complex tier logic |
| Player needs a way to recover control | One de-stress pickup type | More pickup categories | Large content-heavy item system |
| Feedback must be visible for evaluation | Real-time stress meter (HUD) | Extra HUD analytics/details | Full UI overhaul |
| Scope must remain controllable within module timeframe | Core loop + stress + recovery only | Advanced enemy behaviour / extra weapons | Feature-heavy expansion before core stabilises |

### Epics and User Stories

We summarised requirements into six epics to keep scope manageable and implementation traceable: core gameplay mechanics, stress system, weapons system, enemy and asteroid behaviour, level progression, and UI/feedback. This structure let us split development into clear functional areas while keeping the stress system as the central design driver. In practice, other epics were specified not as isolated features, but as systems that either increase stress pressure, respond to stress state changes, or help the player recover from stress.

From these epics, we derived player-centred user stories to define expected gameplay value before discussing implementation detail. The key stories include precise ship control, consistent collision outcomes, understandable stress gain and recovery, predictable tier-based handling changes, reliable weapon use with clear cooldown constraints, readable HUD information, and meaningful progression through increasing challenge. Writing stories in this format helped the team align decisions around player experience and provided a direct bridge from requirements to acceptance criteria and testing.

Evidence sources for this section are documented in `requirements/epics.md` and `requirements/user-stories.md`, with supporting requirement checks in `requirements/acceptance-criteria.md`.

![Game snapshot](docs/asteroids.jpg)

### Use Case Modelling

We used **use-case modelling** to represent the game as a set of player-observable interactions rather than only internal modules. The primary actor is the **player**, and the system-level use cases include: starting a run, controlling movement, firing weapons, colliding with hazards, collecting stress-recovery pickups, progressing through levels, and reaching a game-over state. Modelling the game this way clarified system boundaries and made each requirement easier to trace to gameplay behaviour.

This model was especially valuable because several key events are cross-system by nature. A single collision is not just a physics event: it also triggers stress updates, potentially changes handling tier, and must immediately provide readable feedback through the HUD. By framing these interactions as linked use cases, we preserved an end-to-end view of player experience, which then informed our UML sequence diagrams, implementation planning, and acceptance criteria.

![Use case diagram](design/uml/use-case-diagram.png)

*Figure X. Use-case diagram showing player-system interactions in the stress-driven gameplay loop.*

### Acceptance Criteria and Iterative Refinement

To make the requirements testable, we translated the user stories into **acceptance criteria** using a **Given / When / Then** structure. This allowed us to specify important mechanics in measurable terms rather than vague descriptions. For example, collisions and enemy hits increase stress by defined amounts, recovery pickups reduce stress by a fixed value, and the three stress tiers correspond to specific ranges and handling multipliers. Cooldowns, weapon use, HUD updates, and progression rules were also expressed as concrete, checkable behaviour. This made the requirements useful not only for planning, but also for implementation and later validation. 

Our requirements were not static. After playtesting, we identified several problems at the requirements level, including unclear onboarding, poor readiness feedback, difficulty spikes, and progression issues. As a result, we refined parts of the backlog and updated requirements to better match user needs. One important example was the decision to move progression away from the earlier **time-based** model towards a **score-based** model, showing that requirements were revised in response to evidence rather than treated as fixed from the outset. This iterative refinement was essential because it demonstrated that the requirements artefacts actively guided development rather than existing only as documentation. 

**Evidence for acceptance criteria and iterative refinement**
- Acceptance criteria are documented using Given/When/Then in [requirements/acceptance-criteria.md](requirements/acceptance-criteria.md), including stress gain/recovery tiers, weapon cooldown rules, HUD updates, and progression checks.
- Weekly playtest findings and iteration priorities are recorded in [evaluation/weekly-feedback/2026-03-10-weekly-feedback-and-goals.md](evaluation/weekly-feedback/2026-03-10-weekly-feedback-and-goals.md), covering onboarding problems, readiness feedback issues, and difficulty spikes.
- Requirement-change evidence for progression is captured in [requirements/user-stories.md](requirements/user-stories.md), where US-5.1 is updated to score-based level advancement after playtesting.
- The same change is tracked as an iteration action item (“Replace time-based progression with score-based progression”) in [evaluation/weekly-feedback/2026-03-10-weekly-feedback-and-goals.md](evaluation/weekly-feedback/2026-03-10-weekly-feedback-and-goals.md).
- End-to-end requirement traceability (Requirement -> Story -> AC -> Issue/PR/Commit -> Evaluation) is maintained in [requirements/traceability-matrix.md](requirements/traceability-matrix.md), showing that requirement updates were linked to implementation and verification activity.


## Design

### Design Goals and Architectural Approach

Early in the design process, we identified the core gameplay of this game as **the pressure system**, and we also made a lot of predictions about what might happen in the process: numerical design, operational gameplay, speed of feedback and so on. Finally, we decided to adopt the hybrid OO Design method to design our game, which means we divided the system into two layers: classifying **entity objects** by classes and implementing **operation control** by functions. This separation aligns with the use of UML class diagrams for structural modelling and sequence diagrams for behaviour (Fowler, 2004). And we have roughly divided the classes by drawing software: UMLetino. Now we have the diagram completely.


### System Architecture

The part of the entity class includes all the **actual objects** in the game, such as the player-controlled aircraft, randomly generated meteorites and enemies, and items that can be picked up. These entities only need to hold their own **position, state, speed and behavior**. We let them manage themselves through encapsulation. The frame-by-frame scheduling, enemy generation judgment, collision resolution and interface update are coordinated by the functions of the control layer. In this structure, because most of the entities in the game are independent objects, the complexity of a single class is reduced a lot, and different subsystems can work more clearly during the game. This structure also makes the codebase easier to maintain. For example, the spawn and split logic is needed, and the game’s core pressure system is only responsible for converting the player’s collection events into a change in pressure and triggering certain mechanics when the pressure reaches a threshold. It allows new entity types or gameplay method to be added without significantly modifying existing components. We use a clearly defined interface to connect the entity object layer and the function implementation layer. The function control layer updates and plans the entity each frame, and the entity object layer provides the local state and behavior for the function control layer to process.

The following picture shows all the **classes** in our game.

![(design/uml/class.png)]

### Class Design

In terms of more detailed class design, the Asteroid class represents objects with multi-stage destruction behavior, and the enemy is a local unit with different types and active shooting skills. The Pickup class is used to implement the recovery mechanism. Player related objects are responsible for moving, colliding and updating the state of the pressure value. Projectile classes are divided into laser, missile, mine and enemy missile. These skills also have their own behavior mode; each weapon class is responsible only for its own attack behavior. In the main file, these functions are used only as references and are not involved in the internal implementation. 

The following picture shows all the **function** in our game.

![(design/uml/function.png)]

### Behavioural Design

In the behavior design, the system is organized around the main loop, which performs update, collision detection, feedback processing and state judgment in turn in each frame. For example, when the player’s bullet hits the meteorite, the system will directly affect the feel of player’s control, the meteorite split and other effects; When the player is hit by a meteorite or an enemy bullet, the system will increase the pressure value and determine whether the threshold has been reached. As the pressure gradually increases, the player needs to continue to play under high pressure (feedback is the operator's feel). We consider this design to be a core form of feedback for the game. The stress system, as our core system, acts as a bridge connecting different subsystems. Damage events increase stress, and items are picked up to decrease stress, which is then linked to operational parameters through thresholds to create a dynamic difficulty system based on the player's performance, so that the player is faced with a different game each time.


### Design Rationale and Trade-offs

The system was intentionally designed around discrete stress tiers rather than continuous degradation. This made the mechanic easier to communicate, easier to balance, and easier to verify. A continuous model might have felt smoother, but it would also have made the relationship between error and control loss harder for players to understand and harder for the team to test systematically. Fixed tiers allow the player to build a clearer mental model and allow the mechanic to be mapped directly to measurable acceptance criteria.

A second design trade-off was scope. We deliberately kept the architecture focused on the systems necessary for the MVP: one arena, three stress tiers, core weapon behaviour, pickups, and progression logic. Optional enemy AI and more complex behaviour patterns were treated as extensions rather than assumptions built into the core structure. This helped us avoid overengineering and kept the design aligned with the playable core loop.

### Link Between Design and Requirements

Our design was closely tied to the requirements artefacts rather than created in isolation. The user stories required reliable control, understandable stress changes, readable HUD feedback, progression, and consistent collision handling. The acceptance criteria then made many of these behaviours measurable, including exact stress gains, recovery values, tier thresholds, and cooldown behaviour. The class structure and sequence diagrams were therefore designed to support these requirements directly: they provide a clear place for state management, a reliable flow for collisions and pickups, and a separation between gameplay logic and presentation.

The design artefacts were produced as a formal Week 4 deliverable and included both a UML class diagram and sequence diagrams for the core gameplay interactions.

**Design artefacts**
- OO design documentation: [design/design.md](design/design.md)


## Implementation

During the implementation of our game, we raise three main areas of challenge:

1. reducing frustration caused by the instant-death mechanic while still maintaining tension through a stress system;
2. replacing time-based level progression with score-based progression in order to improve pacing;
3. expanding the range of weapons and enemies while preserving overall gameplay balance and creating clearer strategic differences between stages.


### Challenge 1: Reducing frustration while maintaining tension through the stress system

In the earliest version of the game, colliding with an asteroid caused immediate death. Although this made the game difficult, it also made it feel overly punishing, since a single mistake could end the entire run. Instead of creating meaningful challenge, this often led to frustration. To address this, we removed the instant-death mechanic and replaced it with a stress system.

The stress system was built around three core elements: the current stress value, stress tiers, and a recovery cooldown. Stress increases when the player is hit by collisions or attacks, and the ship only crashes when stress reaches its upper limit. Recovery does not begin immediately after damage is taken; instead, there is a short cooldown before stress gradually decreases. We also added recovery pickups so that players could lower stress more quickly during intense situations. This made failure more gradual rather than being caused by one accidental mistake.

A key design decision was that stress should affect more than survival. As stress rises, the handling of the ship becomes worse: turning slows down, thrust becomes weaker, and inertia becomes more noticeable. This allows the player to keep playing under pressure, but with increasing difficulty in control. In this way, the system preserves tension while making punishment feel fairer.

We also improved the user interface during testing. In earlier versions, the stress bar rose when the player took damage, but some players found this confusing. We therefore redesigned it into a more health-bar-like display and clearly labelled the current stress state. This made it easier for players to understand their level of danger during fast-paced gameplay. Overall, the stress system reduced frustration while keeping the sense of pressure in combat.

![Annotated game UI](implementation/challenge-1-ui.png)

### Challenge 2: Replacing time-based progression with score-based progression

The second challenge was designing a progression system that created a sense of growth without harming the pace of the game. We divided the game into three stages so that players could gradually experience higher levels of difficulty. Rather than making these separate modes, we allowed players to move automatically into the next stage once they met certain conditions, unlocking new weapons and enemies along the way. This made progression feel more natural.

Our first implementation used time-based advancement: players entered the next stage after surviving for 90 seconds. While simple, testing showed that this made the pace feel slow. The countdown display used to communicate progression also created problems. When it was large, it blocked the player’s view; when it was small, it was easy to miss. These issues suggested that survival time alone was not an effective progression condition for a fast-paced shooting game.

We therefore redesigned the system so that progression depended on score instead of time. Compared with a time-based system, score reflects player performance more directly and gives progression a clearer sense of purpose. To support this, we implemented a scoring model in which destroying asteroids awards points based on asteroid radius multiplied by 100, while enemy ships give fixed score values. This kept the system closely connected to the game’s core mechanics and made rewards for different targets easier to understand.

After discussion and testing, we set two score thresholds: 300,000 and 700,000 points. Reaching them automatically advances the player to the next stage and unlocks new content. Compared with the original time-based design, this approach improved pacing and made progression feel more closely tied to player performance and achievement.
### Challenge 3: Expanding weapons and enemies while preserving balance

The third challenge was expanding the game’s content without making it repetitive or damaging balance. To increase variety, we introduced new weapons and enemies progressively across different stages. This meant that difficulty increased not only through larger numbers, but also through new strategic demands.

In the first stage, we replaced manual shooting with automatic shooting so that players could focus more on movement, dodging, and skill usage. We also added the shotgun and the ultrasonic ability. The shotgun was designed to deal with groups of small asteroids approaching from one direction, while ultrasonic was intended to clear fragmented debris. Because ultrasonic was highly effective, it was given a long cooldown to maintain balance.

In the second stage, we introduced the missile weapon and the blue enemy ship. The blue ship fires bullets at the player, making it a more direct threat than asteroids. The missile was designed as a counter to these high-priority enemies. However, in the first version, missiles had no target-priority system and were often wasted on low-threat asteroids. After testing, we redesigned the targeting logic so that missiles update their target dynamically according to threat priority, allowing them to focus on enemy ships first.

In the third stage, we introduced mines and the yellow enemy ship. The yellow ship moves towards the player and fires homing missiles, making it significantly more dangerous than the previous enemy type. Testing showed that this stage could become too punishing, so we reduced the yellow ship’s damage. At the same time, mines were designed as a trap-based weapon that works well against its movement behaviour, helping players manage pressure while other weapons are on cooldown.

Through this staged design, each new mechanic was matched to a new type of threat. As a result, later gameplay became more complex because of changing strategic demands rather than simply higher numerical difficulty.

| Weapon | Preview | Description |
|---|---|---|
| Shotgun | ![Shotgun](implementation/shotgun.png) | Fires seven pellets in a forward cone, making it effective against clusters of asteroids. |
| Ultrasonic | ![Ultrasonic](implementation/ultrasonic.png) | Releases an ultrasonic wave around the ship, destroying nearby asteroids that are not newly spawned. |
| Homing Missile | ![Homing Missile](implementation/homing-missile.png) | Launches a tracking projectile that prioritises high-threat enemies. |
| Mine | ![Mine](implementation/mine.png) | Remains in place and detonates when a high-threat enemy comes into contact with it. |

## Evaluation

### Qualitative Evaluation: Think Aloud

In the qualitative evaluation, we focused on four questions: whether players could quickly understand the game rules and controls, whether they could correctly understand the stress system, whether they could judge the right timing for skill use, and whether they could accept the increase in difficulty in later stages. Since the original game had relatively simple gameplay but reliable code, and since our work mainly extended the gameplay rather than heavily modifying the codebase, this part of the evaluation mainly examined whether the newly introduced mechanics were clear, intuitive, and easy to understand from the player’s perspective.

The results showed that the most obvious problems appeared in onboarding and controls. Some players could not immediately understand how to control the ship without additional guidance, and some even assumed that the game was a fixed-position shooter rather than one that required active movement for dodging and positioning. In addition, some players reported that the ship’s facing direction was not clear enough during fast-paced gameplay.

The second major issue was the understandability of the stress system. Some players felt that the original design, in which the stress bar increased when the player was hit, was not intuitive. It was also not easy for them to notice that rising stress would reduce the ship’s handling performance. A third issue concerned weapon feedback: several players reported that early versions lacked clear cooldown indicators, making it difficult to tell whether a weapon was available. Finally, players showed relatively low acceptance of the earlier time-based stage progression system, suggesting that this progression method still had room for improvement in terms of pacing and acceptability.

Overall, the qualitative evaluation showed that the main problems did not lie in the core mechanics themselves, but in onboarding, feedback visibility, and system understandability. Based on these findings, we improved the control guidance, the stress bar display, weapon cooldown feedback, and the stage progression system in order to improve readability and the experience for new players.

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

![SUS Chart](evaluation/SUS-Overall.png)

### NASA-TLX Average Scores

| Dimension | 10/3/2026 | 20/4/2026 |
|---|---:|---:|
| Mental | 60.5 | 34 |
| Physical | 22 | 18 |
| Temporal | 67.5 | 43 |
| Performance | 56 | 42 |
| Effort | 45 | 51 |
| Frustration | 28 | 14 |

![NASA-TLX Chart](evaluation/nasa-tlx-chart.png)

To complement the qualitative results, we used the System Usability Scale (SUS) to measure overall perceptions of ease of use, learnability, and confidence. Our game achieved an average SUS score of **77.0**, indicating a generally positive level of usability.

A further comparison revealed that participants with experience of similar games achieved an average score of **83.3**, whereas those without relevant experience averaged **67.5**. This suggests that the game is relatively intuitive for experienced players, but that novice players still face barriers in the learning process and in building confidence.

Looking at the individual items, the lower scores were mainly related to players’ willingness to continue using the system, their comfort during operation, and their confidence in using it, rather than to system complexity, integration, or consistency. This suggests that the main issue is not that the system itself is structurally confusing, but that, for first-time players of this genre, the ship’s inertia, the pace of control, and the early-stage difficulty are still not sufficiently beginner-friendly. For example, two participants gave relatively low scores for Q1 and Q8, suggesting that the ship’s inertia made the controls feel less comfortable. Although inertia is a core part of the gameplay and should not be removed entirely, this result shows that players need better guidance, feedback, and difficulty adjustment in order to adapt more quickly.

We also used **NASA-TLX** because our game is fundamentally concerned with tension, effort, and loss of control. Stress-driven handling degradation changes how demanding the game feels, so a workload measure was more closely aligned with our design goals than a broad usability score alone. NASA-TLX allowed us to judge whether later gameplay created satisfying pressure or simply excessive workload caused by unclear feedback, visual overload, or control frustration. The results showed that **temporal demand** was the highest-rated dimension, suggesting that the game created a relatively high level of pacing pressure and tension.

We conducted a second round of testing with the first five players on **20/4/2026**. According to the **Wilcoxon signed-rank test**, NASA-TLX data showed decreases in both **mental demand** and **temporal demand**, suggesting that players experienced a lower cognitive burden and less pacing pressure in the later test. However, the statistical results for both SUS and NASA-TLX did not reach significance. For NASA-TLX, the result was approximately **p = 0.188**, indicating a downward trend but not a statistically significant difference with the current sample size. Similarly, the new SUS results also did not show a significant change.

Overall, the SUS and NASA-TLX findings support the issues identified in the qualitative evaluation. Future improvements should focus on onboarding for novice players, feedback clarity, and the early gameplay experience, so as to reduce operational burden and improve player confidence.

### Code Testing

In addition to user evaluation, we also tested the code itself. We adopted a black-box testing approach and drew on the idea of equivalence partitioning, classifying inputs into valid and invalid cases and then comparing expected outputs with actual outputs. Based on our three main challenges, the testing focused on the stress-value system, the score and level-progression logic, and the activation, cooldown, and enemy-related behaviour of weapons.

### Code Testing: Stress System and Feedback

| Partition | Expected Output |
|---|---|
| Valid collision: player collides with an asteroid | Stress value increases correctly and HUD updates accordingly |
| Valid hit: player is hit by an enemy projectile | Stress value increases correctly and HUD updates accordingly |
| Valid recovery: player picks up a recovery item | Stress value decreases correctly |
| Invalid recovery: no recovery item picked up | Stress value remains unchanged |
| Valid cooldown end | Stress starts to recover naturally |
| Invalid cooldown not finished | Stress does not recover naturally |
| Valid tier change | Handling and colour feedback update correctly |
| Valid upper limit reached | Player crashes and the game ends |

### Code Testing: Scoring and Level Progression

| Partition | Expected Output |
|---|---|
| Valid asteroid destroyed | Score increases correctly according to radius × 100 |
| Valid enemy destroyed | Score increases correctly according to fixed value |
| Invalid scoring: no target destroyed | Score remains unchanged |
| Valid progression condition: score ≥ 300000 | Enter Stage 2 |
| Valid progression condition: score ≥ 700000 | Enter Stage 3 |
| Invalid progression condition: score below threshold | Stage remains unchanged |

### Code Testing: Weapon Activation, Cooldown, and Enemy Behaviour

| Partition | Expected Output |
|---|---|
| Valid weapon activation | Weapon is successfully triggered |
| Invalid weapon activation: cooldown not finished | Weapon cannot be triggered |
| Invalid weapon activation: not unlocked | Weapon cannot be triggered |
| Valid homing missile locks onto enemy | Prioritises high-threat enemies |
| Valid homing missile locks onto asteroid | Locks onto a valid asteroid target |
| Valid mine placement | Mine is placed successfully |
| Invalid mine placement: maximum reached | No new mine is generated |
| Valid blue ship spawn | Spawns correctly in Stage 2 and above |
| Invalid blue ship spawn | Does not spawn before Stage 2 |
| Valid yellow ship spawn | Spawns correctly in Stage 3 |
| Invalid yellow ship spawn | Does not spawn before Stage 3 |



## Process

Our development process was based on the idea that even a small game project needs explicit collaboration practices if it is to remain stable, testable, and improvable. From the beginning, we treated the project not as a collection of individual coding tasks, but as a shared software engineering effort. In practice, this meant combining regular team meetings, GitHub-based task tracking, incremental development, and retrospective reflection. Our goal was not to apply Agile in a formal industrial sense, but to adopt the parts most useful for a student team under time pressure: short iterations, visible work allocation, regular review, and willingness to revise priorities when evidence showed that earlier assumptions were wrong.

### Teamwork and Meetings

We worked together primarily through frequent in-person meetings, supported by shared online tools. In-person meetings were valuable because they made it easier to discuss gameplay ideas, sketch design changes, and resolve misunderstandings quickly. This was especially helpful in the early stages, when the team needed to develop a shared understanding of the concept and agree on a manageable scope.

As development progressed, meetings became more structured. We organised work into short sprints and used meetings for three purposes: reviewing what had been completed, reflecting on what had or had not worked in the previous sprint, and planning the next priorities. This helped us avoid drifting into disconnected individual work and gave us regular moments to stop, compare progress, and decide whether the current backlog still reflected the most important project needs.

Our collaboration was also structured through weekly deliverables. These milestones helped the team maintain momentum and provided checkpoints for moving from process setup, to idea generation, to concept selection, and then to formal requirements and design work. This made the project easier to manage because each week produced a visible output rather than only informal discussion.

**Weekly milestone evidence**
- Week 1: team process and inspiration research
- Week 2: p5.js drawing app and two candidate ideas
- Week 3: idea videos and final concept selection
- Week 4: requirements documents and OO design artefacts

### Tools and Methods

Our main collaboration tools were **GitHub**, a **Kanban board**, shared documentation, and regular sprint-style meetings. GitHub was the central place for version control, code integration, and linking technical work to project decisions. We used **GitHub Projects** as our Kanban board to manage work visually and keep progress transparent. This helped us see which tasks were planned, in progress, blocked, or completed, and reduced the risk of duplicate or forgotten work.

**Project management evidence**
- Kanban board: see the **Projects** tab in this repository
- Team workflow / Definition of Done / WIP rules: [docs/process.md](docs/process.md)

We also adopted an iterative Agile mindset rather than a fixed up-front plan. Instead of locking every design decision early, we repeatedly returned to the current playable build, current issues, and recent feedback to decide what to do next. This became particularly important later, when playtesting exposed onboarding, balancing, and progression problems that required us to revise both implementation and requirements.

Where appropriate, we also used lightweight paired discussion and live review when implementing or debugging uncertain areas. We did not apply pair programming rigidly, but the underlying principle was useful: difficult problems were often easier to solve when one person focused on implementation while another questioned assumptions, checked logic, or thought ahead about integration and side effects.

### Roles and Responsibility

We did define team roles, but we found that static roles alone were not enough. Early on, roles were useful for creating ownership and ensuring that essential areas such as requirements, implementation, documentation, testing, and coordination were not ignored. This helped prevent the common student-project problem where everyone assumes someone else will take responsibility.

However, one of the lessons of the project was that role definitions needed to adapt over time. As the project moved from ideation into implementation and then into evaluation and refinement, the most important tasks changed. A role structure that worked during requirements capture was not necessarily the best fit during balancing, testing, or report writing. We therefore re-evaluated responsibilities during retrospectives and redistributed work when necessary. This prevented workload concentration and helped the team respond when certain problems unexpectedly became urgent.

In retrospect, this flexible approach worked better than a rigid fixed-role model. Clear responsibility was helpful, but collective ownership was equally important. When responsibilities became too isolated, integration slowed and misunderstandings increased. When responsibilities were clear but code and decisions remained shared, progress was more stable.

### What Worked Well

Several aspects of the process worked well. First, regular meetings and sprint checkpoints gave the team a stable rhythm and reduced the risk of long periods of invisible work followed by painful integration. Second, GitHub issues and Kanban made work visible and helped translate broad goals into smaller actionable tasks. Third, the team improved over time at linking development to evidence. In the later iteration plan, significant changes were expected to connect **Issue -> PR -> Commit -> Verification Evidence**, making the process more disciplined rather than purely informal.

Another strength was our willingness to adapt after feedback. The weekly playtest summary did not just list problems; it transformed them into prioritised tasks such as fixing input conflicts, improving cooldown indicators, clarifying ship orientation, rebalancing Level 3, and replacing time-based progression with score-based thresholds. This showed that the process could convert evaluation into concrete development work rather than treating feedback as optional commentary.

### What Did Not Work Well

Not everything worked well. One of the earliest difficulties was **integration and version control**. In the first few sprints, bringing branches together was harder than expected. This exposed a common weakness in team projects: individual progress can look fine in isolation while the shared codebase becomes harder to merge and reason about. We had to improve naming conventions, code standards, and review habits before integration became smoother.

A second weakness was that some assumptions about the game were initially too optimistic. Later feedback showed that onboarding was not clear enough for new players, some UI signals were not readable enough, and progression produced too sharp a difficulty spike. In process terms, this meant that our earlier backlog did not fully reflect user needs. Retrospective thinking was useful here because it pushed us to ask not only “what should we add next?” but also “which assumption has failed, and what needs to change because of it?”

### Adaptation and Reflection

The most important lesson from the process was that adaptation matters more than pretending the original plan was correct. Our project showed this most clearly in the later stages, when evidence from playtesting caused us to revise priorities, change progression logic, and place more emphasis on feedback clarity and onboarding. These were not minor adjustments: they changed both what we chose to build next and how we justified those choices.

Looking back, our process was strongest when we treated teamwork itself as something that required design and iteration. Meetings, roles, and tools did not automatically produce good collaboration; they became useful only when we reflected on them honestly and changed them when they stopped helping. What worked best was combining structure with flexibility: enough process to make work visible and coordinated, but enough openness to admit when our current way of working was not producing the right outcome.


## Sustainability, Accessibility, Privacy and Security

Our game is a lightweight, browser-based application built without accounts, cloud storage, or backend processing. This keeps deployment simple and reduces both operational complexity and resource overhead. From a sustainability perspective, the system benefits from a relatively small technical footprint: it runs directly in the browser, avoids unnecessary infrastructure, and does not depend on continuous server-side computation. While this does not make the project “green” by default, it does mean that the game is simpler to host, maintain, and run than a comparable system with persistent services or heavy data processing.

From a privacy perspective, the current version collects no personal data and requires no user registration. This means there is no account information, profile data, or stored gameplay history to process or protect. As a result, privacy risk is reduced because the system does not handle sensitive user data beyond normal web-hosting exposure. Similarly, the security surface is smaller than in applications that rely on authentication, databases, or user-generated content. This is not a complete security strategy, but it is an important architectural choice: keeping the system simple limits the number of obvious points of failure.

Accessibility was more directly relevant to moment-to-moment gameplay. Because the core mechanic depends on the player noticing degraded handling, readable HUD signals, clear ship orientation, and understandable feedback are not optional polish; they are necessary for the game to function fairly. Playtesting showed that unclear controls, weak readiness feedback, and poor visual readability quickly became usability problems. For that reason, we treated onboarding, HUD clarity, and interaction feedback as accessibility-related quality concerns rather than purely aesthetic issues.

In future work, we would strengthen this area by adding support for alternative input methods, more configurable UI options, clearer onboarding for novice players, and more explicit accessibility settings. We would also look at stronger contrast control, clearer visual indicators, and broader device testing. These changes would move the project beyond basic usability towards a more inclusive and robust experience.


## Conclusion

- 10% ~500 words

- Reflect on the project as a whole. Lessons learnt. Reflect on challenges. Future work, describe both immediate next steps for your current game and also what you would potentially do if you had chance to develop a sequel.


## Contribution Statement

- Provide a table of everyone's contribution, which *may* be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Please let us know as soon as possible if there are any issues with teamwork as soon as they are apparent and we will do our best to help your team work harmoniously together.

## Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5% of report grade) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.
- **Documentation** of code (5% of report grade)
  - Organise your code so that it could easily be picked up by another team in the future and developed further.
  - Is your repo clearly organised? Is code well commented throughout?
