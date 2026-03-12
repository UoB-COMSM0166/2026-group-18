# CONTROLS

## Movement

- `Arrow Left`: rotate ship left
- `Arrow Right`: rotate ship right
- `Arrow Up`: thrust forward
- `Auto Laser`: fires automatically while laser energy is available

## Weapons

- `Z`: shotgun (`15s` cooldown, max `20` active pellets, unlocked at Level `1`)
- `X`: missile (`5s` cooldown, unlocked at Level `2`)
- `C`: mine (`20s` cooldown, max `3` active mines, unlocked at Level `3`)

## Special Abilities

- `V`: ultrasonic wave (`30s` cooldown, unlocked at Level `1`)

## HUD Feedback

- Bottom weapon HUD: shows `READY`, `COOLING`, `LIMIT`, or `LOCKED` for each secondary weapon
- Top-right stress bar: shows current stress state using a full-to-empty danger display

## Menu / Flow Controls

- `Arrow Up` / `Arrow Down`: move menu selection
- `Enter` or `Space`: confirm menu selection
- Any key during the game-over screen: return to menu

## Notes

- Weapon use is level-gated through `isWeaponUnlocked(...)`.
- Releasing weapon keys should no longer interrupt active steering input.
- The active menu navigation currently exposes `Start` and `About`.
