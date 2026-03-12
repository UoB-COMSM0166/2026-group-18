# DEPENDENCY_GRAPH

## English

```text
index.html
|-- style.css
|-- src/core/stress.js
|   |-- STRESS_CONFIG / PICKUP_CONFIG
|   `-- updateStress(), addStress(), reduceStress()
|-- src/systems/level-spawn.js
|   |-- LEVEL_SCORE_THRESHOLDS
|   |-- updateLevel()
|   |-- maintainAsteroids()
|   |-- spawnEnemies()
|   |-- triggerLevelTransition()
|   `-- isWeaponUnlocked(), getUnlockedWeapons()
|-- src/entities/entities.js
|   |-- Player: Ship, Jet
|   |-- World: Asteroid, Pickup, Explosion
|   |-- Weapons: Laser, Missile, ShotgunBullet, Mine, UltrasonicWave
|   `-- Enemies: Enemy, EnemyBullet, EnemyMissile
|-- src/ui/menu.js
|   `-- game(), gameOver(), returnToMenuFromGameOver()
|-- src/systems/game-loop.js
|   |-- runGameFrame()
|   |-- update/render order for all gameplay arrays
|   |-- collision checks
|   |-- frozen rendering during level transitions
|   `-- HUD + stress update
|-- app.js
|   |-- globals and setup/reset
|   |-- draw() -> runGameFrame()
|   |-- hit feedback audio/flash helpers
|   |-- BGM lifecycle
|   |-- drawStressBar()
|   `-- weapon HUD state + drawWeaponHud()
`-- src/input/controls.js
    |-- menu navigation input
    `-- gameplay keys (movement + weapons, level-gated unlock checks, shared cooldown readiness check)
```

Game Loop relationships:

```text
runGameFrame()
|-- updateLevel()
|-- if level transition active:
|   |-- drawFrozenCollection(...) for world arrays
|   |-- drawFrozenPlayer()
|   |-- drawLevelLabel()
|   |-- drawStressBar()
|   |-- drawWeaponHud()
|   `-- drawLevelTransitionCard()
`-- else:
    |-- maintainAsteroids()
    |-- spawnEnemies()
    |-- spawnPickups()
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
    |-- updateHudAndStress()
    `-- gameOver() check
```

## Chinese

```text
index.html
|-- style.css
|-- src/core/stress.js
|   |-- STRESS_CONFIG / PICKUP_CONFIG
|   `-- updateStress(), addStress(), reduceStress()
|-- src/systems/level-spawn.js
|   |-- LEVEL_SCORE_THRESHOLDS
|   |-- updateLevel()
|   |-- maintainAsteroids()
|   |-- spawnEnemies()
|   |-- triggerLevelTransition()
|   `-- isWeaponUnlocked(), getUnlockedWeapons()
|-- src/entities/entities.js
|   |-- 玩家实体: Ship, Jet
|   |-- 场景实体: Asteroid, Pickup, Explosion
|   |-- 武器实体: Laser, Missile, ShotgunBullet, Mine, UltrasonicWave
|   `-- 敌人实体: Enemy, EnemyBullet, EnemyMissile
|-- src/ui/menu.js
|   `-- game(), gameOver(), returnToMenuFromGameOver()
|-- src/systems/game-loop.js
|   |-- runGameFrame()
|   |-- 各游戏数组的更新与渲染顺序
|   |-- 碰撞检测
|   |-- 关卡过场期间的冻结渲染
|   `-- HUD 与 stress 更新
|-- app.js
|   |-- 全局状态与 setup/reset
|   |-- draw() -> runGameFrame()
|   |-- 受击反馈音效与闪烁
|   |-- BGM 生命周期控制
|   |-- drawStressBar()
|   `-- 武器 HUD 状态计算与 drawWeaponHud()
`-- src/input/controls.js
    |-- 菜单导航输入
    `-- 游戏输入（移动和武器，含关卡解锁检查与共享冷却可用性判断）
```

主循环关系:

```text
runGameFrame()
|-- updateLevel()
|-- 如果关卡过场激活:
|   |-- drawFrozenCollection(...) 绘制冻结中的世界对象
|   |-- drawFrozenPlayer()
|   |-- drawLevelLabel()
|   |-- drawStressBar()
|   |-- drawWeaponHud()
|   `-- drawLevelTransitionCard()
`-- 否则:
    |-- maintainAsteroids()
    |-- spawnEnemies()
    |-- spawnPickups()
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
    |-- updateHudAndStress()
    `-- 检查是否进入 gameOver()
```
