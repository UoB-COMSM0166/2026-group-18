# CONTROLS

## Movement

- `Arrow Left`: rotate ship left
- `Arrow Right`: rotate ship right
- `Arrow Up`: thrust forward
- `Auto Laser`: fires automatically while laser energy is available

## Weapons

- `Z`: shotgun (`15s` cooldown, up to 8 per shot, max 20 active shotgun bullets, unlocked at Level `1`)
- `X`: missile (`5s` cooldown, unlocked at Level `2`)
- `C`: space mine (`20s` cooldown, max 3 active mines, unlocked at Level `3`)
- `Bottom HUD`: shows each secondary weapon as `READY`, `COOLING`, `LIMIT`, or `LOCKED` with a cooldown progress bar

## Special Abilities

- `V`: ultrasonic wave (`30s` cooldown, unlocked at Level `1`)

## Menu / Flow Controls

- `Arrow Up` / `Arrow Down`: move menu selection
- `Enter` or `Space`: confirm in menu
- Any key during game-over: return to menu

## Notes

- Weapon availability is level-gated through `isWeaponUnlocked(...)`.
- The current menu only exposes `Start` and `About`; the old controls menu is no longer part of the active navigation list.
