# Controls and Movement Testing

## 1. Testing Approach

This section covers only **Functional Unit 1: Controls and Movement**.

We applied **black box testing** using **Equivalence Partitioning (EP)**.  
For this functional unit, we:
- identified the movement-related inputs and behaviours,
- identified expected outputs,
- considered interaction constraints between inputs,
- selected important boundary cases,
- defined concrete test cases with expected and observed outputs.

## 2. Functional Unit Under Test

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
- Movement across screen boundaries follows wrap-around behaviour

**Boundary values**
- Stationary to moving
- Sustained thrust over time
- Near screen / map boundary
- Single-frame input vs sustained input

## 3. Test Cases

| ID | Inputs | Test procedure | Expected outputs | Observed outputs | Pass/Fail |
|----|--------|----------------|------------------|------------------|-----------|
| CM1 | No input for one update cycle | Start with the ship stationary and release all movement keys for one to several update cycles. | Ship heading remains unchanged; position remains unchanged if velocity is zero, or continues only according to existing drift if velocity was already present. | No visible movement or rotation was observed when no input was applied; when drift already existed, movement continued passively as expected. | Pass |
| CM2 | Apply thrust from stationary state | Start with the ship stationary, facing a known direction, then press `UP` for a short interval. | Velocity increases from zero and the ship begins moving forward in the direction it is facing. | The ship accelerated from rest and moved forward in the facing direction as expected. | Pass |
| CM3 | Hold left rotation for several update cycles | Hold `LEFT` for several consecutive update cycles without thrust. | Ship heading changes continuously to the left while the key is held; position should not change apart from any pre-existing drift. | Continuous left rotation was observed while the key was held; no unexpected positional change occurred beyond existing drift. | Pass |
| CM4 | Continue thrust for an extended interval | Hold `UP` continuously for multiple seconds in open space and observe the movement trend. | Ship speed increases at first, then approaches a stable movement range under drag; movement remains smooth and controllable without instability. | Speed increased initially and then appeared to stabilise during sustained thrust; no instability or abnormal acceleration was observed. | Pass |
| CM5 | Move toward a screen boundary | Thrust the ship across the left, right, top, or bottom screen boundary and observe the transition. | When the ship crosses a screen edge, it wraps to the opposite side; movement continues normally and no invalid out-of-bounds behaviour occurs. | The ship reappeared on the opposite side after crossing the screen boundary and continued moving normally. | Pass |
| CM6 | Apply rotation and thrust simultaneously | Hold `LEFT` and `UP` together for several update cycles. | The ship rotates while also accelerating; the movement direction updates consistently with the changing heading. | Rotation and thrust were both applied correctly at the same time; movement direction changed consistently with the updated heading. | Pass |
## 4. Evidence

Supporting screenshots, videos, and notes should be stored in:

- `docs/tests/controls-and-movement/evidence/`

Suggested evidence mapping:
- `CM1_no_input`
- `CM2_thrust_from_stationary`
- `CM3_left_rotation`
- `CM4_sustained_thrust`
- `CM5_screen_wrap`
- `CM6_rotate_and_thrust`
