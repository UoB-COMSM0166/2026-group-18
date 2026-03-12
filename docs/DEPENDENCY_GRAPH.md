# DEPENDENCY_GRAPH

## English

```text
index.html
|-- style.css
|-- src/core/stress.js
|   |-- STRESS_CONFIG / PICKUP_CONFIG
|   |-- addStress(), reduceStress(), updateStress()
|   `-- stress tier / handling helpers
|-- src/systems/level-spawn.js
|   |-- score-based level progression
|   |-- weapon unlock rules
|   |-- asteroid maintenance
|   `-- level transition briefings
|-- src/entities/entities.js
|   |-- Player: Ship, Jet
|   |-- World: Asteroid, Pickup, Explosion
|   |-- Weapons: Laser, Missile, ShotgunBullet, Mine, UltrasonicWave
|   `-- Enemies: Enemy, EnemyBullet, EnemyMissile
|-- src/ui/menu.js
|   `-- game flow state: game(), gameOver(), returnToMenuFromGameOver()
|-- src/systems/game-loop.js
|   |-- runGameFrame()
|   |-- entity update/render pipelines
|   |-- collision handling
|   `-- frozen rendering during level transitions
|-- app.js
|   |-- global state and setup/reset
|   |-- draw() frame entry
|   |-- stress HUD
|   |-- weapon HUD
|   |-- hit feedback audio/flash
|   `-- BGM lifecycle
`-- src/input/controls.js
    |-- menu navigation keys
    `-- gameplay movement + weapon keys
```

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
|   |-- addStress(), reduceStress(), updateStress()
|   `-- stress 分层与操控辅助函数
|-- src/systems/level-spawn.js
|   |-- 基于分数的关卡推进
|   |-- 武器解锁规则
|   |-- 陨石维持生成
|   `-- 关卡过场说明卡
|-- src/entities/entities.js
|   |-- 玩家实体: Ship, Jet
|   |-- 场景实体: Asteroid, Pickup, Explosion
|   |-- 武器实体: Laser, Missile, ShotgunBullet, Mine, UltrasonicWave
|   `-- 敌人实体: Enemy, EnemyBullet, EnemyMissile
|-- src/ui/menu.js
|   `-- 游戏流程状态: game(), gameOver(), returnToMenuFromGameOver()
|-- src/systems/game-loop.js
|   |-- runGameFrame()
|   |-- 各实体数组的更新与渲染流程
|   |-- 碰撞处理
|   `-- 关卡过场时的冻结渲染
|-- app.js
|   |-- 全局状态与 setup/reset
|   |-- draw() 帧入口
|   |-- 压力条 HUD
|   |-- 武器 HUD
|   |-- 受击音效与闪烁反馈
|   `-- BGM 生命周期
`-- src/input/controls.js
    |-- 菜单导航按键
    `-- 游戏移动与武器按键
```

```text
runGameFrame()
|-- updateLevel()
|-- 如果关卡过场激活:
|   |-- drawFrozenCollection(...) 绘制冻结场景对象
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
    `-- 检查是否触发 gameOver()
```
