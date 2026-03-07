# DEPENDENCY_GRAPH

## English

```text
index.html
|-- style.css
|-- src/core/stress.js
|   |-- STRESS_CONFIG / PICKUP_CONFIG
|   `-- updateStress(), addStress(), reduceStress()
|-- src/systems/level-spawn.js
|   |-- updateLevel()
|   |-- maintainAsteroids()
|   `-- spawnEnemies()
|-- src/entities/entities.js
|   |-- Player: Ship, Jet
|   |-- World: Asteroid, Pickup
|   |-- Weapons: Laser, Missile, ShotgunBullet, Mine, UltrasonicWave
|   `-- Enemies: Enemy, EnemyBullet, EnemyMissile
|-- src/ui/menu.js
|   `-- game(), gameOver(), returnToMenuFromGameOver()
|-- src/systems/game-loop.js
|   |-- runGameFrame()
|   |-- update/render order for all arrays
|   |-- collision checks
|   `-- HUD + stress update
|-- app.js
|   |-- globals and setup/reset
|   |-- draw() -> runGameFrame()
|   `-- drawStressBar()
`-- src/input/controls.js
    |-- menu navigation input
    `-- gameplay keys (movement + weapons)
```

Game Loop relationships:

```text
runGameFrame()
|-- updateLevel(), maintainAsteroids(), spawnEnemies(), spawnPickups()
|-- updateAndRenderAsteroids()
|-- updateAndRenderLaserBeams()
|-- updateAndRenderExplosions()
|-- updateAndRenderShotgunBullets()
|-- updateAndRenderMissiles()
|-- updateAndRenderEnemies()
|-- updateAndRenderMines()
|-- updateAndRenderUltrasonicWaves()
|-- updateAndRenderEnemyBullets()
|-- updateAndRenderEnemyMissiles()
|-- updateAndRenderPickups()
|-- updateAndRenderPlayer()
`-- updateHudAndStress()
```

## 中文

```text
index.html
|-- style.css
|-- src/core/stress.js
|   |-- STRESS_CONFIG / PICKUP_CONFIG
|   `-- updateStress(), addStress(), reduceStress()
|-- src/systems/level-spawn.js
|   |-- updateLevel()
|   |-- maintainAsteroids()
|   `-- spawnEnemies()
|-- src/entities/entities.js
|   |-- 玩家实体: Ship, Jet
|   |-- 场景实体: Asteroid, Pickup
|   |-- 武器实体: Laser, Missile, ShotgunBullet, Mine, UltrasonicWave
|   `-- 敌人实体: Enemy, EnemyBullet, EnemyMissile
|-- src/ui/menu.js
|   `-- game(), gameOver(), returnToMenuFromGameOver()
|-- src/systems/game-loop.js
|   |-- runGameFrame()
|   |-- 各实体数组的更新和渲染顺序
|   |-- 碰撞检测
|   `-- HUD 和 stress 更新
|-- app.js
|   |-- 全局状态和 setup/reset
|   |-- draw() -> runGameFrame()
|   `-- drawStressBar()
`-- src/input/controls.js
    |-- 菜单导航输入
    `-- 游戏输入（移动和武器）
```

主循环关系:

```text
runGameFrame()
|-- updateLevel(), maintainAsteroids(), spawnEnemies(), spawnPickups()
|-- updateAndRenderAsteroids()
|-- updateAndRenderLaserBeams()
|-- updateAndRenderExplosions()
|-- updateAndRenderShotgunBullets()
|-- updateAndRenderMissiles()
|-- updateAndRenderEnemies()
|-- updateAndRenderMines()
|-- updateAndRenderUltrasonicWaves()
|-- updateAndRenderEnemyBullets()
|-- updateAndRenderEnemyMissiles()
|-- updateAndRenderPickups()
|-- updateAndRenderPlayer()
`-- updateHudAndStress()
```

