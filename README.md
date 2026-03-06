[index.html](https://github.com/user-attachments/files/24891406/index.html)# 2026-group-18
2026 COMSM0166 group 18

# COMSM0166 Project Template
A project template for the Software Engineering Discipline and Practice module (COMSM0166).

## Info

This is the template for your group project repo/report. We'll be setting up your repo and assigning you to it after the group forming activity. You can delete this info section, but please keep the rest of the repo structure intact.

You will be developing your game using [P5.js](https://p5js.org) a javascript library that provides you will all the tools you need to make your game. However, we won't be teaching you javascript, this is a chance for you and your team to learn a (friendly) new language and framework quickly, something you will almost certainly have to do with your summer project and in future. There is a lot of documentation online, you can start with:

- [P5.js tutorials](https://p5js.org/tutorials/) 
- [Coding Train P5.js](https://thecodingtrain.com/tracks/code-programming-with-p5-js) course - go here for enthusiastic video tutorials from Dan Shiffman (recommended!)

## Project Management
We use Kanban board (GitHub Projects) a visual workflow system that limits work-in-progress to help teams deliver work continuously and transparently : see the **Projects** tab in this repository.

**Week 1 Deliverables**
- Team process (workflow, DoD, WIP): see [docs/process.md](docs/process.md).
- Game inspiration list: see [docs/inspiration.md](docs/inspiration.md).

**Week 2 Deliverables**
- Drawing app (p5.js paint): [click to run](https://uob-comsm0166.github.io/2026-group-18/).
- Two candidate ideas: see [docs/ideas.md](docs/ideas.md).

**Week 3 Videos about two ideas**
- Watch Week 3 videos here:
  👉 [docs/video_links.md](docs/video_links.md)
- The reason we choose this game final: [docs/final-idea.md](docs/final-idea.md)

**Plan Update:**
We switched our primary reference to a p5.js Asteroids project to align with the module’s required tech stack (p5.js) and ensure a feasible, testable MVP. Previous inspirations remain design references only (pacing, difficulty, patterns).

**Week 4 Deliverables**
- Requirements (stakeholders, epics, user stories + AC, reflection): see [docs/requirements.md](docs/requirements.md).
- OO design (UML class + sequence diagrams): see [docs/design.md](docs/design.md).


## Repository Structures

/docs — p5.js implementation and playable web version  
/docs/*.md — process and design documentation


## How to Run

Open docs/index.html in a web browser to run the p5.js version of the game.
Alternatively, use the GitHub Pages deployment link provided above.


## Your Game (change to title of your game)

Asteroids-style arcade shooter with a Stress mechanic: collisions raise stress, degrading handling in predictable tiers; pickups reduce stress.

- [Play the game](https://uob-comsm0166.github.io/2026-group-18/)
- Demo video: (link)
- Final idea: [docs/final-idea.md](docs/final-idea.md)

IMAGE. Add an image of your game here, keep this updated with a snapshot of your latest development.

LINK. Add a link here to your deployed game, you can also make the image above link to your game if you wish. Your game lives in the [/docs](/docs) folder, and is published using Github pages. 

VIDEO. Include a demo video of your game here (you don't have to wait until the end, you can insert a work in progress video)

## Version History

### v1.4 - Telemetry + Export
-Implemented
  - Record per run: `survivalTime`, `collisionCount`, `stressOverTime`, `pickupCount`, `shotsFired`, `enemyHitsTaken`
  - Stress sampled every `0.5s`
  - On game over: print telemetry summary to console
  - Press `T` to download telemetry JSON
  - Export telemetry logs.

### v1.3 – Advanced Weapon System
Major gameplay expansion with multiple new weapons and cooldown mechanics.

New weapons added:

- **Missile (Z key)**  
  Homing missile that automatically targets asteroids.  
  Cooldown: **5 seconds**

- **Shotgun (X key)**  
  Fires **8 bullets in a 120° cone** in front of the ship.  
  Effective for clearing groups of enemies and asteroids.  
  Cooldown: **15 seconds**

- **Space Mine (C key)**  
  Deploys a stationary mine at the ship’s location.  
  The mine explodes when touched by an asteroid or enemy, destroying it and creating a red explosion effect.  
  Cooldown: **20 seconds**

Gameplay improvements:

- Added **weapon cooldown system** for balanced gameplay.
- Implemented **bullet edge cleanup** to remove projectiles when they leave the screen.
- Added limits to prevent excessive objects:
  - Maximum **20 shotgun bullets**
  - Maximum **3 active mines**
- Updated the **Controls page** to include new weapon instructions.

This update significantly expands combat strategy and adds more tactical gameplay options.

### v1.2 – Enemies and Level System
- Added enemy ships with two types:
  - **Type A (Blue Triangle)**: fires normal bullets toward the player.
  - **Type B (Yellow Triangle)**: launches homing missiles.
- Implemented **time-based level progression**.
  - Level increases every 90 seconds.
- Enemy spawning system introduced with controlled maximum enemy count.
- Improved overall gameplay difficulty and pacing.

### v1.1 – Stress System
- Added **Stress Bar mechanic**.
- Collisions with asteroids increase stress.
- High stress reduces ship turning ability.
- Stress gradually recovers over time.

### v1.0 – Initial Game Prototype
- Basic Asteroids-style gameplay.
- Player spaceship movement and shooting.
- Asteroid spawning and splitting.
- Explosion effects and scoring system.

## Your Group

GROUP PHOTO.
![1ea16c65c7c97f326304811ae963f9b3](https://github.com/user-attachments/assets/4f3012f3-9d78-4dff-8d98-3e032d17ac7d)

| Group member | Email | Role |
|---|---|---|
|Benyu Zhu|benyuzhu@outlook.com|role|
|Yutong Liu|yutong11x@outlook.com|role|
|Lin Zhu|zhulinuk2025@gmail.com|role|
|Zhaohang He|zhaohanghe89@gmail.com|role|
|Bo Sun|bowillrich@gmail.com|role|


## Project Report

### Introduction

- 5% ~250 words 
- Describe your game, what is based on, what makes it novel? (what's the "twist"?) 

### Requirements 

- 15% ~750 words
- Early stages design. Ideation process. How did you decide as a team what to develop? Use case diagrams, user stories. 

### Design

- 15% ~750 words 
- System architecture. Class diagrams, behavioural diagrams. 

### Implementation

- 15% ~750 words

- Describe implementation of your game, in particular highlighting the TWO areas of *technical challenge* in developing your game. 

### Evaluation

- 15% ~750 words

- One qualitative evaluation (of your choice) 

- One quantitative evaluation (of your choice) 

- Description of how code was tested. 

### Process 

- 15% ~750 words

- Teamwork. How did you work together, what tools and methods did you use? Did you define team roles? Reflection on how you worked together. Be honest, we want to hear about what didn't work as well as what did work, and importantly how your team adapted throughout the project.

### Conclusion

- 10% ~500 words

- Reflect on the project as a whole. Lessons learnt. Reflect on challenges. Future work, describe both immediate next steps for your current game and also what you would potentially do if you had chance to develop a sequel.

### Contribution Statement

- Provide a table of everyone's contribution, which *may* be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Please let us know as soon as possible if there are any issues with teamwork as soon as they are apparent and we will do our best to help your team work harmoniously together.

### Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5% of report grade) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.
- **Documentation** of code (5% of report grade)
  - Organise your code so that it could easily be picked up by another team in the future and developed further.
  - Is your repo clearly organised? Is code well commented throughout?
