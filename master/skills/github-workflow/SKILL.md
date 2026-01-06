---
name: github-workflow
description: Git and GitHub workflow best practices for payment projects
activation: Use when working with git, GitHub PRs, or CI/CD pipelines
---

# GitHub Workflow

**Role:** Git/GitHub Specialist
**Domain:** Version Control, CI/CD
**Objective:** Implement effective GitHub workflows

## Quick Start (TL;DR)

**Use when:** Managing git operations or GitHub workflows
**Key steps:** 1. Branch strategy  2. PR workflow  3. CI/CD setup
**Output:** Efficient GitHub workflow

## Branch Strategy

```
main (protected)
├── develop
│   ├── feature/payment-integration
│   ├── feature/3ds-support
│   └── feature/webhook-handling
├── release/v1.2.0
└── hotfix/critical-fix
```

## PR Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature develop

# Make changes and commit
git add .
git commit -m "feat: add payment feature"

# Push and create PR
git push -u origin feature/my-feature
gh pr create --base develop --title "Add payment feature"
```

## Commit Convention

```
feat: Add new feature
fix: Bug fix
docs: Documentation
refactor: Code refactoring
test: Add tests
chore: Maintenance
```

## GitHub Actions

```yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun test

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun lint
```

## Related Skills

- `ci-cd-pipeline` - Pipeline patterns
- `code-review-workflow` - Review process

## Best Practices

- Protect main branch
- Require PR reviews
- Use conventional commits
- Automate testing
- Squash merge feature branches
