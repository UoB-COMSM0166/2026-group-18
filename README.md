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
10. [AI statement]()
12. [References](#references)


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

![UML class diagram](design/uml/class.png)

### Class Design

In terms of more detailed class design, the Asteroid class represents objects with multi-stage destruction behavior, and the enemy is a local unit with different types and active shooting skills. The Pickup class is used to implement the recovery mechanism. Player related objects are responsible for moving, colliding and updating the state of the pressure value. Projectile classes are divided into laser, missile, mine and enemy missile. These skills also have their own behavior mode; each weapon class is responsible only for its own attack behavior. In the main file, these functions are used only as references and are not involved in the internal implementation. 

The following picture shows all the **function** in our game.

![](design/uml/function.png)

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

In this project, our team consisted of five members who collaboratively developed a browser-based version of the classic game *Asteroids*. Throughout the development process, we adopted a combination of modular task allocation and collaborative development to ensure the completeness of the game, maintain code quality, and promote effective teamwork.

To improve collaboration efficiency, we divided the overall system into several core modules, including the Game Loop, Collision System, Entities, UI/Menu, and Controls. Each team member was responsible for one core module, while also contributing to integration, testing, and optimization during the later stages. This approach ensured a balanced distribution of tasks as well as a cohesive and well-integrated system.

<p align="center"><em>Figure: Team communication via WeChat</em></p>

<p align="center">
  <img src="materials/report-images/wechat-chat.jpg" width="500"/>
</p>

In terms of communication, we held multiple discussion meetings at the early stage of the project. These discussions mainly focused on the selection of the game, the design of difficulty progression, and potential innovations and improvements.
Our first group meeting was conducted online and lasted for over an hour. During this meeting, we focused on addressing existing bugs, planning subsequent level design, and allocating responsibilities for each core module among team members.

<p align="center"><em>Figure: Team members collaboratively testing the game</em></p>

<p align="center">
  <img src="materials/report-images/team-discussion.jpg" width="500"/>
</p>

We primarily used GitHub to support team development and collaboration, where our development activities and contributions were clearly recorded. Each team member worked on separate branches to implement features, and pull requests were used for code integration and review.
<p align="center"><em>Figure: The record of pull requests</em></p>

<p align="center">
  <img src="materials/report-images/workflow.png" width="500"/>
</p>

Our team adopted a structured project management approach combining Kanban boards, GitHub workflows, and progress tracking tools to support efficient collaboration throughout the project.
We used a Kanban-based system to organize tasks and monitor progress. Tasks were clearly divided into stages such as backlog, to-do, in progress, testing, and done, allowing all team members to have a clear overview of the project status. Responsibilities were well defined, and tasks were assigned on a weekly basis, ensuring a balanced workload and clear deadlines for each member.

In addition, GitHub was used as the primary platform for development and collaboration. Each team member worked on separate branches and submitted their changes through pull requests. All pull requests required approval from at least two team members before merging, ensuring code quality, consistency, and traceability. This workflow also promoted knowledge sharing and collaborative problem-solving within the team.

<p align="center"><em>Figure: Kanban board for project management</em></p>

<p align="center">
  <img src="materials/report-images/kanban%20project.png" width="500"/>
</p>

All pull requests required approval from at least two team members before being merged. This process ensured that code quality was maintained and that all changes were reviewed collaboratively before further development continued.
During the development process, we selected a range of tools to support both development and team collaboration:
### The Usage of Different Tools

| Tool Name | Purpose | Usage |
|-----------|---------|-------|
| GitHub | Version control and code collaboration | Used branches and pull requests to manage and integrate code |
| P5.js | Game development framework | Used to implement game rendering, animations and interactions |
| Visual Studio Code | Development environment | Used for writing and debugging JavaScript code |
| Kanban Board | Task management | Used to track task progress and allocate responsibilities |
| Browser Developer Tools | Debugging tool | Used to identify runtime errors and performance issues |

To support the implementation of the project, we allocated tasks in a balanced and structured manner. This ensured that each team member was responsible for work of similar complexity and difficulty, avoiding an uneven distribution of workload across the team. This approach improved overall efficiency and ensured that all team members contributed equally to the development process.
###  Content Introduction

The following table summarises the responsibilities and contributions of each team member:

| Member   | Assigned Module        | Contribution |
|----------|------------------------|--------------|
| Lin      | Game Loop            | Implementing stable frame rates and game state management |
| Benyu    | Collision Detection  | Accurately handling interactions between bullets and asteroids |
| Zhaohang | Entity System        | Managing objects such as the spaceship, bullets, and asteroids |
| Bo       | Input Controls       | Handling keyboard input and ensuring responsive control mechanisms |
| Yutong   | User Interface (UI/Menu) | Implementing menu transitions and displaying game states |

In the middle and later stages of the project, due to time constraints and geographical limitations, we gradually transitioned to online collaboration. We conducted Scrum-style stand-up meetings approximately twice a week using Microsoft Teams and WeChat voice calls. This short and frequent meeting format significantly improved communication efficiency.
Compared to the earlier in-person meetings, which were more flexible and time-consuming, these online meetings were more structured and focused. They typically centered on current progress, existing issues, and the allocation of upcoming tasks, allowing the team to advance the development process in a more organized and efficient manner.

<p align="center"><em>Figure: Burndown / progress chart of the project</em></p>

<p align="center">
  <img src="materials/report-images/burndown-chart.png" width="500"/>
</p>

While this approach helped meet deadlines, it also introduced periods of increased pressure and reduced consistency in the development process. During the development process, we tracked overall progress using a burndown chart. From the chart, it can be observed that the team's progress was not evenly distributed over time. In particular, during the mid-stage of development, a noticeable concentration of completed tasks occurred, indicating that team members tended to engage in “burst development” as deadlines approached.

<p align="center"><em>Figure: Commit and branch history visualization</em></p>

<p align="center">
  <img src="materials/report-images/network.png" width="600"/>
</p>

Although this approach ensured that key milestones were met to some extent, it also introduced considerable time pressure. Nevertheless, in the final stages of the project, we successfully completed all planned tasks while overcoming various challenges, including several technical difficulties encountered during development.


## Sustainability, Technical, Social and Accessibility

### Sustainability:
In this project, we aim to develop a game that focuses on user interaction and engagement. According to Becker et al. (2015), design decisions can significantly influence the long-term impact of a system. Based on this perspective, the game is designed to have a simple yet positive influence on user behavior, aligning with the principles outlined in the Karlskrona Manifesto for sustainability design.  

The game is not only intended for entertainment but also considers its broader impact on users. The Karlskrona Manifesto emphasizes that sustainability includes not only environmental aspects but also social and individual dimensions (Becker et al., 2015). Therefore, the game aims to provide a meaningful and engaging experience while taking these aspects into account.

From an environmental perspective, the game was primarily developed using p5.js and does not rely on large-scale graphical processing or heavy server infrastructure. As a result, it consumes relatively low computational resources, which helps reduce energy consumption and, to some extent, carbon emissions. This aligns with the principles of sustainable and green software development.

### Technical:
From a technical perspective, the game is designed with clear functionality and a simple structure. Duboc et al. (2019) emphasize the importance of understanding what we are building and how design decisions influence system behavior. Based on this principle, the game focuses on maintaining a design that is both understandable and purposeful.

In addition, the implementation considers efficiency and resource usage. According to the Green Software Foundation (2023), green software patterns highlight the importance of reducing unnecessary computation, improving energy efficiency, and avoiding excessive complexity in system design. Therefore, the game is intentionally designed to remain lightweight and efficient, minimising resource consumption while maintaining functionality.

During the design and task allocation stages, the game was divided into multiple independent components that could be developed individually. This approach facilitated efficient debugging, improved the overall development process, and allowed the team to refine the game design more effectively.

At the same time, we ensured the stability of the game during multi-user or continuous play scenarios. By adopting standard development tools and practices, such as GitHub and version control mechanisms, we maintained code consistency and traceability. This not only supported effective collaboration among team members but also significantly improved overall code quality.

### Social:
From a social perspective, the game is designed to provide a simple and engaging experience for users. Sommerville (2020) explains that software systems should consider how they affect people and their interactions. Based on this, the game focuses on being accessible and easy to use.    

As an entertainment application, the primary purpose of the game is to provide users with a means of relaxation and leisure, which can help reduce stress to some extent. In addition, the game is designed to be intuitive, allowing players to quickly understand the controls and gameplay. This significantly enhances the overall playability and user experience.

### Accessibility and Ethics:
From an ethical perspective, the game follows the basic principles of responsible software development. It does not collect or misuse user data and avoids violent or inappropriate content, thereby meeting fundamental ethical standards.

According to the Green Software Foundation (2023), green software practitioner guidelines emphasize that software should minimize harm and respect users. In this context, the game provides a safe and appropriate environment for its audience.

The game primarily relies on keyboard-based controls, which are relatively simple and accessible for most users. However, the control scheme is predominantly designed for right-hand operation, with movement and actions distributed in a way that may not be convenient for left-handed players. 

To improve accessibility, future versions of the game could introduce customizable control settings, allowing users to adjust key mappings according to their preferences.

These design choices align with multiple sustainability tags identified by the Green Software Foundation, demonstrating an awareness of the environmental impact of software systems.


## Conclusion

- 10% ~500 words

- Reflect on the project as a whole. Lessons learnt. Reflect on challenges. Future work, describe both immediate next steps for your current game and also what you would potentially do if you had chance to develop a sequel.


## Contribution Statement

- Provide a table of everyone's contribution, which *may* be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Please let us know as soon as possible if there are any issues with teamwork as soon as they are apparent and we will do our best to help your team work harmoniously together.

## AI Statement

- We used chatGPT and codex in this project, and learned how to code and maintain the project with AI tools. I spend one day to learn how to code with codex in vscode, and share this with my teammates.

- First, I helped my teammates configure Codex so that it could be used consistently in our workflow. I then used Codex to refactor parts of the codebase, making it more readable and making the structure easier for our team to understand and maintain. I also prepared a markdown file containing natural language prompts, which helped us generate supporting documentation, including a file explaining the overall project structure and the relationships between classes. We ask codex to run this file every time before push to GitHub, and this improved the communication efficiency of our team.

- Next, Codex was used to produce the initial versions of some weapons and enemies. These early examples were not treated as final solutions, but as learning scaffolds: they gave us a starting point for understanding how these systems could be built in p5.js, after which we designed and implemented additional weapons and enemies ourselves.I wrote the ultrasonic wave weapon after reading the weapons wrote by Codex, and re-wrote the AI logic of the missile under the guidance of GPT.

- AI image generation was also used to create a new spaceship asset for the game. In addition, ChatGPT was used throughout the project to explain code behaviour, clarify project-level design questions, and help us understand technical issues when we got stuck. It was especially useful when working with an older version of p5.js, where GPT helped us quickly identify the correct functions and older API usage that matched our version. For example, when I was writing the ultrasonic wave weapon, I need to draw a circle with p5.js, but the version of p5.js of the origin game was too old that the function on the web didn't work, GPT helped to find the correct circle draw function version.

- We also explored whether an embedded large language model could be used inside the project. In this experiment, I tested running a model through WebGPU in the browser and confirmed that this approach was technically possible. However, we decided not to continue with it because loading the online Qwen 0.5B model was too slow for practical use in our game context. As a result, this idea was investigated but not included in the final version of the project.

- Overall, we learned to how to use AI in our project, and it's a valuable knowledge. In the mean time, we still write and read the code ourselves to help us understand what a project should be like.

## Reference
Becker, C., Betz, S., Chitchyan, R., Duboc, L., Easterbrook, S. M., Penzenstadler, B., Seyff, N. and Venters, C. C. (2015). Requirements: The key to sustainability. IEEE Software, 33(1), pp.56–65. Sustainability Design and Software: The Karlskrona Manifesto

Becker, C., Betz, S., Chitchyan, R., Duboc, L., Easterbrook, S. M., Penzenstadler, B., Seyff, N. and Venters, C. C. (2015). Sustainability Design and Software: The Karlskrona Manifesto. Available at: https://www.karlskrona-manifesto.org (Accessed: 21 April 2026). Requirements: The key to sustainability

Duboc, L., Penzenstadler, B. and Porras, J. (2019). Do we really know what we are building? In: Proceedings of the IEEE 27th International Requirements Engineering Conference. IEEE. Do we really know what we are building?

Green Software Foundation (2023). Green Software Patterns. Available at: https://patterns.greensoftware.foundation/guide/suggested-tags (Accessed: 21 April 2026). Green Software Patterns (see the Catalogue part).

Green Software Foundation (2023). Green Software Practitioner. Available at: https://learn.greensoftware.foundation (Accessed: 21 April 2026). Engineering software products

Sommerville, I. (2020). Engineering Software Products. London: Pearson. Green Software Practitioner, from Green Software Foundation.


## Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5% of report grade) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.
- **Documentation** of code (5% of report grade)
  - Organise your code so that it could easily be picked up by another team in the future and developed further.
  - Is your repo clearly organised? Is code well commented throughout?
