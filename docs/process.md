# Team Process

## Workflow (GitHub Projects)
We use a Kanban flow: Backlog → Ready → In Progress → In Review (PR) → Done

- Backlog: ideas / not committed.
- Ready: committed for the current iteration; acceptance criteria written.
- In Progress: assigned to someone; work happening on a branch.
- In Review: PR opened; awaiting review / fixes.
- Done: meets the Definition of Done (below).

## Definition of Done (DoD)
An item can move to **Done** only if:
- [ ] It is a GitHub Issue with clear acceptance criteria.
- [ ] Code is merged into `main` via a Pull Request (PR).
- [ ] A test plan was executed (unit tests for pure logic OR a manual checklist).
- [ ] The change is reproducible locally (README/run steps still work).
- [ ] Evidence is provided: PR link + screenshot/gif (if it affects gameplay/UI).

## WIP Limits (to reduce integration risk)
- In Progress: max 1 issue per person.
- In Review: max 3 PRs at a time.
- Ready: keep small prioritised items only.
