# p5.js 游戏架构说明

## 项目概述

这是一款**小行星风格的街机射击游戏**（v1.3版本，配备先进武器系统），创新之处在于加入了**心理压力机制**。玩家需要管理压力值，压力越高，飞船的控制能力就越差。这迫使玩家在"积极进攻获得高分"和"保持冷静保持控制"之间做出风险-收益权衡。

**核心创意**：压力系统直接影响飞船物理表现（旋转速度、推力大小、拖动系数），创造出与玩家表现相关的浮现式难度。

---

## 架构模式：模块化系统设计

游戏采用**关注点分离**的架构，分成5个独立模块：

```
docs/src/
├── core/        → 核心游戏状态与力学（压力系统）
├── entities/    → 游戏对象（飞船、小行星、投射物等）
├── input/       → 玩家输入控制（键盘输入）
├── systems/     → 游戏循环与关卡系统
└── ui/          → 菜单与HUD界面
```

---

## 1. 核心系统

### 压力系统 ([stress.js](src/core/stress.js))

一个**集中管理的数据驱动状态机**：

**3个固定压力等级**：
- **CALM（镇定）**（0-40）：飞船控制倍数为 1.0x
- **TENSE（紧张）**（40-75）：飞船控制倍数为 0.8x
- **PANIC（恐慌）**（75-100）：飞船控制倍数为 0.6x

**各等级的控制衰减**：
- CALM：旋转速度、推力、拖动均为正常（1.0倍）
- TENSE：所有操作响应降低20%（0.8倍）
- PANIC：所有操作响应降低40%（0.6倍）

**压力触发事件**：
- 被小行星碰撞：+20 压力值
- 被敌人子弹击中：+12 压力值
- 收集恢复道具：-20 压力值
- 被动衰减：每帧 -0.03（120帧冷却期后开始衰减）

**API设计**：统一的函数调用（`addStress()`, `getStressValue()`, `getStressTier()`），确保与旧版全局变量的向后兼容性

### 游戏循环系统 ([game-loop.js](src/systems/game-loop.js))

在60 FPS的帧率下按照固定顺序编排每帧更新：

1. **减少碰撞冷却时间**（无敌时间跟踪）
2. **更新阶段**：关卡进度、小行星生成、敌人生成
3. **渲染阶段**：所有实体更新 + 碰撞检测
   - `updateAndRenderAsteroids()` - 检测与飞船碰撞、分裂小行星
   - `updateAndRenderLaserBeams()` - 检测击中小行星/敌人、清理
   - `updateAndRenderShotgunBullets()` - 霰弹枪的散射实现
   - `updateAndRenderMissiles()` - 防火导弹的追踪机制
   - `updateAndRenderMines()` - 静止陷阱的放置
   - `updateAndRenderEnemies()` - 敌人AI巡逻与射击
   - `updateAndRenderEnemyBullets()` - 敌人投射物（附带压力惩罚）
   - `updateAndRenderPlayer()` - 飞船物理与喷气效果
4. **HUD更新**：压力条、得分显示、关卡标签
5. **游戏结束检查**：等待所有爆炸完成后再结束

### 关卡系统 ([level-spawn.js](src/systems/level-spawn.js))

**基于时间的难度渐进**：

| 关卡 | 时间范围 | 小行星数 | 敌人类型 |
|-----|--------|--------|--------|
| **Level 1** | 0-90秒 | 5个 | 无 |
| **Level 2** | 90-180秒 | 7个 | A型敌人 |
| **Level 3** | 180秒+ | 9个 | A型+B型混合 |

小行星每120帧生成一次，直到达到目标数量。

---

## 2. 实体架构

采用**面向对象的继承层级**设计，具有共享行为：

```
实体基类
├── 飞船 (Ship)
├── 小行星 (Asteroid)
├── 投射物 (Projectile) - 抽象类
│   ├── 激光 (Laser)
│   ├── 导弹 (Missile) - 带追踪AI
│   └── 霰弹子弹 (ShotgunBullet)
├── 地雷 (Mine) - 静止地雷，碰撞触发
├── 敌人 (Enemy) - A型/B型，配备AI
├── 爆炸 (Explosion) - 粒子效果
├── 喷气 (Jet) - 推进可视化
└── 星空背景 (Stars)
```

**全局状态**（app.js）：
- 数组：asteroids, laserBeams, missiles, shotgunBullets, mines, enemies, enemyBullets, enemyMissiles, explosions
- 游戏状态：score, level, crashed, stress, stressTier
- 冷却计时：collisionCooldown, missileCooldown, shotgunCooldown, mineCooldown

---

## 3. 输入系统 ([controls.js](src/input/controls.js))

### 菜单导航（游戏开始前）
- **← →方向键**：浏览菜单选项
- **Enter / 空格**：确认选择

### 游戏中控制（游戏进行中）
- **← →方向键**：旋转飞船
- **↑方向键**：向前推进（触发喷气效果）
- **空格**：发射激光（30发弹药，每发自动填充）
- **Z键**：导弹（5秒冷却，自动追踪目标）
- **X键**：霰弹枪（15秒冷却，120°圆锥散射，最多20发）
- **C键**：地雷（20秒冷却，最多3个激活）

---

## 4. UI/菜单系统 ([menu.js](src/ui/menu.js))

**基于DOM的状态机**：
```
主菜单 → [开始游戏 | 控制说明 | 关于]
        ↓
     游戏界面
        ↓
     游戏结束
```

菜单交互使用 jQuery 进行部分切换，使用 CSS `display` 属性控制可见性。

---

## 5. 游戏状态流程

```
resetGame()
  ├── 初始化压力状态 (stress=0, tier=0)
  ├── 在中心创建飞船
  ├── 生成5个初始小行星
  └── 清空所有投射物/敌人数组

draw() 循环 (60 FPS):
  └── 如果 !started: 显示菜单
  └── 如果 started: 运行 runGameFrame()
      ├── 更新关卡（基于时间）
      ├── 维护小行星数量（在目标以下时生成）
      ├── 生成敌人（基于关卡）
      ├── 更新并渲染所有实体
      ├── 检查碰撞（集成在更新函数中）
      ├── 更新压力值（衰减或冷却）
      ├── 检查游戏结束条件
      └── 如果游戏结束: 显示游戏结束画面
```

---

## 6. 碰撞系统

**分布式碰撞检测**（在整个游戏循环中分散处理，而非集中处理）：
- 飞船 vs 小行星 → `addStress(20)` + 无敌冷却
- 飞船 vs 敌人子弹 → `addStress(12)` + 短冷却
- 玩家投射物 vs 小行星 → 获得分数 + 小行星分裂
- 玩家投射物 vs 敌人 → 获得分数 + 敌人消失
- 地雷 vs 小行星/敌人 → 爆炸效果 + 目标消失
- 敌人导弹 vs 飞船 → **游戏结束**

---

## 7. 数据驱动配置

所有平衡参数都**集中在常量中**，方便调整：

```javascript
STRESS_CONFIG = {
  maxStress: 100,              // 最大压力值
  tiers: [40, 75],            // 压力等级阈值
  decayPerFrame: 0.03,        // 每帧衰减量
  cooldownFrames: 120,        // 衰减冷却帧数
  collisionDeltaAsteroid: 20, // 小行星碰撞增加压力
  collisionDeltaEnemyBullet: 12 // 敌人子弹增加压力
}

HANDLING_BY_TIER = [
  { rotationMult: 1.0, thrustMult: 1.0, dragMult: 1.0 },  // 镇定
  { rotationMult: 0.8, thrustMult: 0.8, dragMult: 0.8 },  // 紧张
  { rotationMult: 0.6, thrustMult: 0.6, dragMult: 0.6 }   // 恐慌
]

STRESS_UI = {
  tierColors: [[0,255,0], [255,200,0], [255,0,0]],  // 绿-黄-红
  tierLabels: ["CALM", "TENSE", "PANIC"]
}
```

---

## 8. 使用的设计模式

| 模式名称 | 实现方式 | 示例 |
|---------|--------|------|
| **状态机** | 压力等级系统 | 3个离散状态，有明确阈值边界 |
| **对象池** | 基于数组的实体管理 | `asteroids[]`, `enemies[]` |
| **更新-渲染循环** | 帧同步更新 | 所有 `updateAndRender*()` 函数 |
| **数据驱动配置** | 集中参数常量 | `STRESS_CONFIG`, `HANDLING_BY_TIER` |
| **关注点分离** | 模块化子系统 | stress.js, game-loop.js, controls.js, menu.js |
| **向后兼容性** | API桥接 | `syncStressGlobals()` 同步状态到全局变量 |

---

## 9. 架构核心优势

✅ **数据驱动**：所有平衡参数都在常量中，无需修改代码即可调整游戏  
✅ **模块化**：压力系统、游戏循环、输入系统、UI完全独立解耦  
✅ **可扩展性**：实体继承层级使得添加新的投射物/敌人类型很容易  
✅ **易于调试**：压力系统提供统一的getter/setter API，逻辑清晰  
✅ **确定性**：基于时间的关卡进度，基于帧的物理计算，便于重现问题  

---

## 10. 技术实现细节

- **编程语言**：JavaScript（ES5/ES6混合 + p5.js库）
- **渲染**：900×600像素画布，60 FPS帧率
- **物理引擎**：基于速度的牛顿力学，边界环绕处理
- **武器冷却**：毫秒精度追踪（使用 `millis()` 函数）
- **压力衰减**：线性每帧衰减（冷却中除外）
- **敌人AI**：简单巡逻 + 目标锁定射击；导弹追踪前方最近的小行星
- **碰撞检测**：分布在各实体的更新函数中，提高效率

---

## 目录结构

```
docs/
├── app.js                  # 主入口文件
├── design.md              # 设计文档
├── final-idea.md          # 最终创意文档
├── index.html             # 游戏HTML页面
├── inspiration.md         # 灵感来源
├── requirements.md        # 游戏需求规格
├── style.css              # 样式表
├── src/
│   ├── core/
│   │   └── stress.js      # 压力系统（状态机）
│   ├── entities/
│   │   └── entities.js    # 游戏对象定义
│   ├── input/
│   │   └── controls.js    # 输入处理
│   ├── systems/
│   │   ├── game-loop.js   # 主游戏循环
│   │   └── level-spawn.js # 关卡管理
│   └── ui/
│       └── menu.js        # 菜单与HUD
└── uml/
    ├── class-diagram.puml          # 类关系图
    ├── seq-collision.puml          # 碰撞序列图
    └── seq-pickup.puml             # 道具序列图
```

---

## 核心设计理念总结

这款游戏展示了一个设计良好、高度模块化的架构：

1. **游戏机制数据驱动**（压力参数是可调整的常量）
2. **系统相互独立**（压力、输入、UI不直接相互依赖）
3. **实体遵循OOP模式**（继承层级、共享更新-渲染周期）
4. **碰撞检测分布式**（集成在各实体的更新函数中）
5. **状态集中管理**（所有游戏状态存储在全局变量或模块中）

这种设计使得游戏易于调试、扩展和平衡，无需大规模重构。

---

## 设计亮点

- **压力系统创新**：通过影响物理参数而非简单伤害血条，创造独特的游戏体验
- **模块化易维护**：各系统职责清晰，代码改动影响范围小
- **参数易调整**：所有balance参数在constants中，美术、关卡设计师可直接调整
- **扩展性强**：新增武器类型、敌人类型只需继承基类即可
