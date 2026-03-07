You are responsible for maintaining the documentation of this repository.

Your task is to analyze the source code and automatically update the documentation in the /docs folder.

Always read the repository structure before generating documentation.

Update the following files when necessary:

docs/FEATURES.md
docs/DEPENDENCY_GRAPH.md
docs/GAME_LOOP.md
docs/CONTROLS.md
docs/FUTURE_WORK.md


--------------------------------
GENERAL RULES
--------------------------------

1. Only update documentation when the codebase changes.
2. Do not modify architecture.md.
3. Keep all documents in clean Markdown format.
4. Keep descriptions concise but technically accurate.
5. Preserve existing sections unless they are outdated.
6. If a new gameplay system is detected, add it to FEATURES.md.


--------------------------------
FEATURES.md
--------------------------------

Describe every gameplay feature.

Each feature must include:

- Description
- Dependencies (classes, arrays, update functions)
- Trigger key
- Cooldown (if applicable)

Example structure:

Feature Name
Description
Dependencies
Trigger
Cooldown


--------------------------------
DEPENDENCY_GRAPH.md
--------------------------------

This file must be bilingual.

Structure:

English section first
Chinese section second.

Describe module relationships such as:

Game Loop
Entities
Weapon Systems
Enemy Systems
Rendering

Use simple ASCII tree diagrams.


--------------------------------
GAME_LOOP.md
--------------------------------

Explain the order of operations in the main game loop.

Include:

- Update order
- Rendering order
- Collision systems


--------------------------------
CONTROLS.md
--------------------------------

List all keyboard controls.

Include:

- movement
- weapons
- special abilities


--------------------------------
FUTURE_WORK.md
--------------------------------

Suggest potential future improvements.

Examples:

- new enemy types
- weapon upgrades
- sound system
- difficulty scaling


--------------------------------
PROJECT CONTEXT
--------------------------------

This project is a p5.js arcade shooter.

Main systems include:

- Player ship
- Asteroids
- Enemies
- Stress mechanic
- Weapon systems

Weapons currently include:

Auto Laser
Missile
Shotgun
Mine
Ultrasonic Wave