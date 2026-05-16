---
name: create-pr
description: Create and push a pull request for the current branch with all staged changes
---

Create and push a pull request for the current branch. This skill will:
1. Create a new feature branch from main
2. Stage and commit all changes
3. Push to origin
4. Open a pull request on GitHub using GitHub CLI

## Quick Start

Run this command from the project root to create a PR with your changes:

```bash
git checkout -b feature/your-feature-name && \
git add . && \
git commit -m "your: Commit message here" && \
git push -u origin feature/your-feature-name && \
gh pr create --title "Your PR Title" --body "Your PR description"
```

## Manual Steps

If you prefer to do it step-by-step:

```bash
# 1. Create a new branch
git checkout -b feature/your-feature-name

# 2. Stage and commit changes
git add .
git commit -m "your: Commit message"

# 3. Push to origin
git push -u origin feature/your-feature-name

# 4. Create PR on GitHub
gh pr create --title "Your PR Title" --body "Your PR description"
```

## Requirements

- Git configured with author name and email
- GitHub CLI (`gh`) installed and authenticated
- All changes staged and ready to commit
- Push access to the repository

## Example

```bash
git checkout -b feature/todos-ui && \
git add . && \
git commit -m "feat: Implement Todo UI with drag-to-reorder and delete" && \
git push -u origin feature/todos-ui && \
gh pr create --title "feat: Implement Todo UI with drag-to-reorder" --body "## Summary

- Added new Todo UI with In Progress/Done sections
- Implemented drag-to-reorder functionality for priority
- Added delete buttons for each todo
- Fixed JWT authentication for dev mode

## Test plan

- [ ] Can add todos
- [ ] Can mark todos as done
- [ ] Can drag and reorder todos
- [ ] Can delete todos
- [ ] All API calls working with dev JWT token"
```
