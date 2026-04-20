# Software Quality and Testing

## 1. Testing Approach

We applied **black box testing** to selected functional units of our game.

Following **Equivalence Partitioning (EP)**, we:
- decomposed the game into functional units,
- identified inputs / behaviours and outputs,
- defined partitions,
- identified constraints between categories,
- wrote test cases with inputs, expected outputs, and observed outputs,
- paid particular attention to boundary values.

## 2. Functional Units Identified

1. Controls and Movement
2. Collision, Damage and Cooldown Protection
3. Recovery and Stress State
4. Weapons and Readiness State
5. Level Progression, Spawning and Upgrade Effects

---

## 3. Black Box Test Design

### Functional Unit 1: Controls and Movement

**Feature under test**  
Player movement response to control input.

**Inputs / behaviour categories**
- No input
- Left / right rotation input
- Thrust input
- Multiple simultaneous inputs
- Input while movement constraints apply

**Outputs**
- Position update
- Direction / rotation update
- Speed change
- Whether movement remains within expected rules

**Constraints**
- Some input combinations interact rather than acting independently
- Movement behaviour depends on current state, direction, and speed

**Boundary values**
- Stationary to moving
- Near maximum speed
- Near screen / map boundary
- Single-frame input vs sustained input

**Test cases**

| ID | Inputs | Expected outputs | Observed outputs | Pass/Fail |
|---|---|---|---|---|
| CM1 | No input for one update cycle | Ship position and direction remain unchanged or follow passive drift rules only |  |  |
| CM2 | Apply thrust from stationary state | Speed increases and ship moves forward |  |  |
| CM3 | Hold left rotation for several update cycles | Direction changes continuously to the left |  |  |
| CM4 | Continue thrust near speed cap | Speed does not exceed intended maximum |  |  |
| CM5 | Move toward map boundary | Player remains within allowed movement limits / behaviour remains valid |  |  |

---

### Functional Unit 2: Collision, Stress Increase and Cooldown Protection

**Feature under test**  
Stress increase and protection behaviour when the player collides with harmful entities.

**Inputs / behaviour categories**
- No collision
- Collision while not protected
- Collision while collision cooldown is active
- Repeated collision across multiple frames
- Collision when stress is close to maximum threshold

**Outputs**
- Whether stress is increased
- Whether stress cooldown starts or resets
- Whether repeated collision is blocked by collision cooldown
- Whether stress tier changes
- Whether fail-state is triggered

**Constraints**
- Collision does not always imply a new stress increase; collision cooldown must be checked
- A valid hit updates ```stressState.value```, ```stressState.cooldownRemaining```, and ```stressState.tier```
- Repeated contact should not immediately apply another stress increase during active collision cooldown
- Crash should occur when stress reaches or exceeds the maximum threshold

**Boundary values**
- Just touching vs not touching collision boundary
- First frame of collision cooldown
- First frame after collision cooldown ends
- Stress just below maximum threshold
- Stress exactly at / above maximum threshold

**Test cases**

| ID | Inputs | Test Procedure | Expected outputs | Observed outputs | Pass/Fail |
|---|---|---|---|---|---|
| CD1 | Harmful entity does not touch player | Keep the player ship separated from all harmful entities during the observation period | No stress increase is applied; stress value and tier remain unchanged; no crash occurs | Stress value did not change; the displayed stress bar remained unchanged; no crash occurred | Pass |
| CD2 | Harmful entity collides with player while no collision cooldown is active | Move the ship into one asteroid once while no cooldown is active | Stress increases by 20; stress cooldown starts/resets; stress tier is recalculated; no crash occurs unless stress reaches the maximum threshold | The displayed stress bar increased by one visible step after one asteroid collision; the ship remained alive | Pass |
| CD3 | Another collision occurs during the active collision cooldown period | Stay in contact with the asteroid during active cooldown | No additional stress increase is applied during the active collision cooldown period | The displayed stress bar did not increase further while the ship remained in contact during the active collision cooldown period | Pass |
| CD4 | Collision occurs immediately after protection ends | Collide again immediately after cooldown expires | Stress increases again after the collision cooldown has ended; the stress bar rises again; stress cooldown starts/resets again | After the collision cooldown expired, the next collision increased the displayed stress bar again | Pass |
| CD5 | Player is hit when stress is close enough to the maximum threshold that one more valid hit reaches or exceeds it | Raise stress near maximum, then trigger one more valid hit | Stress reaches the maximum threshold correctly; fail-state is triggered; normal play does not continue as if the ship survived | The final hit pushed stress to the maximum threshold, triggered the fail-state, and stopped normal play | Pass |

---

### Functional Unit 3: Recovery and Stress State

**Feature under test**  
Transition into and out of stress-related gameplay state.

**Inputs / behaviour categories**
- Normal state
- Stress increasing but below threshold
- Stress reaches threshold
- Recovery condition active
- Recovery interrupted

**Outputs**
- Stress value change
- Enter / exit stress state
- Recovery progress or reset

**Constraints**
- State change depends on both threshold and timing / recovery conditions
- Recovery may require uninterrupted safe time

**Boundary values**
- Just below threshold
- Exactly at threshold
- Just enough recovery time
- Recovery interrupted just before completion

**Test cases**

| ID | Inputs | Expected outputs | Observed outputs | Pass/Fail |
|---|---|---|---|---|
| RS1 | Stress below threshold | No stressed state triggered |  |  |
| RS2 | Stress reaches threshold | Stressed state is triggered |  |  |
| RS3 | Recovery condition maintained for insufficient time | Stressed state remains active |  |  |
| RS4 | Recovery condition maintained for required time | Stressed state clears / recovery completes |  |  |
| RS5 | Recovery is interrupted by new damage / pressure | Recovery resets or stops according to game rule |  |  |

---

### Functional Unit 4: Weapons and Readiness State

**Feature under test**  
Whether a weapon can be fired under the current readiness conditions.

**Inputs / behaviour categories**
- Weapon unlocked and ready
- Weapon unlocked but cooling down
- Weapon locked
- Sufficient resource / insufficient resource
- Fire input pressed / not pressed

**Outputs**
- Whether weapon fires
- Whether projectile / effect is created
- Whether cooldown begins
- Whether readiness indicator updates

**Constraints**
- Fire action may require multiple conditions to be true simultaneously
- Different weapon types may follow different readiness rules

**Boundary values**
- Cooldown exactly finished
- Resource exactly sufficient
- Resource just insufficient
- Weapon just unlocked

**Test cases**

| ID | Inputs | Expected outputs | Observed outputs | Pass/Fail |
|---|---|---|---|---|
| WR1 | Fire input with unlocked and ready weapon | Weapon fires successfully |  |  |
| WR2 | Fire input during cooldown | Weapon does not fire |  |  |
| WR3 | Fire input with locked weapon | Weapon does not fire |  |  |
| WR4 | Fire input with exactly enough resource | Weapon fires and resource is consumed correctly |  |  |
| WR5 | Fire input with insufficient resource | Weapon does not fire |  |  |

---

### Functional Unit 5: Level Progression, Spawning and Upgrade Effects

**Feature under test**  
Progression to next level and activation of associated game effects.

**Inputs / behaviour categories**
- Progress below requirement
- Progress exactly at requirement
- Progress beyond requirement
- Before upgrade
- After upgrade
- Spawn under old / new progression state

**Outputs**
- Whether level increases
- Whether new enemies / waves spawn
- Whether upgrade effect appears
- Whether unlock effects are applied

**Constraints**
- Spawn and progression rules may depend on current level
- Upgrade effects may activate only when progression condition is met

**Boundary values**
- Just below progression threshold
- Exactly at progression threshold
- Immediately after level increase
- Transition from one level to the next

**Test cases**

| ID | Inputs | Expected outputs | Observed outputs | Pass/Fail |
|---|---|---|---|---|
| LP1 | score < 300000 | Level 1; Auto Laser keep shooting; shotgun & ultrasonic unlock; only Asteroid | Level 1 shown on top left; Level 1 brief appeared and hold space to start; Auto Laser kept shooting; shotgun & ultrasonic unlocked while mine & missle locked; only Asteroid appeared and gain scores by destroing them | Pass |
| LP2 | right after score >= 300000 | Level up; new level brief appears; new weapon unlocks | Level 2 shown on top left; Level 2 brief appeared and hold space to continue; new weapon: shotgun unlocked | Pass |
| LP3 | 300000 <= score < 700000 | Level 2; new enemy | Level 2 shown on top left; new enemy: Enemy("A") in blue appears periodically | Pass |
| LP4 | right after score >= 700000 | Level up; new level brief appears; new weapon unlocks | Level 3 shown on top left; Level 3 brief appeared and hold space to continue; new weapon: mine unlocked | Pass |
| LP5 | score >= 700000 | Level 3; new enemy | Level 3 shown on top left; new enemy: Enemy("B") in yellow appears periodically | Pass |

---

## 4. Test Execution Summary

| Functional Unit | Number of Test Cases | Tests Run? | Notes |
|---|---:|---|---|
| Controls and Movement | 5 |  |  |
| Collision, Damage and Cooldown Protection | 5 |  |  |
| Recovery and Stress State | 5 |  |  |
| Weapons and Readiness State | 5 |  |  |
| Level Progression, Spawning and Upgrade Effects | 5 |  |  |

---

## 5. Future Tests

Future testing should extend this initial black box testing by:
- adding more boundary-value cases,
- testing more complex combinations of state changes,
- increasing coverage of multi-step gameplay sequences,
- adding automated tests where feasible,
- complementing black box tests with code-level checks where useful.
