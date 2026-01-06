# Contributing to Claude Payment Orchestrator

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Contributions](#making-contributions)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the maintainers.

## Getting Started

### Prerequisites

- Node.js 20+
- Bun package manager
- Claude Code CLI
- Git

### Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR-USERNAME/mcp-config-master.git
cd mcp-config-master
```

## Development Setup

### Install Dependencies

```bash
# Install development dependencies
bun install
```

### Validate Configuration

```bash
# Run the configuration validator
node scripts/validate-config.js
```

### Test MCP Mocks

```bash
# Run tests
bun test
```

## Making Contributions

### Types of Contributions

1. **New Agents** - Specialized AI agents for specific domains
2. **New Skills** - Task-specific capabilities
3. **New Commands** - Slash commands for user interaction
4. **Bug Fixes** - Fix issues in existing code
5. **Documentation** - Improve docs, examples, guides

### Creating New Components

Use the scaffolding commands:

```bash
# Create a new agent
/new-agent my-agent domain

# Create a new skill
/new-skill my-skill domain

# Create a new command
/new-command my-command
```

### Component Guidelines

#### Agents

Agents should:
- Have clear domain focus
- Include MCP Integration table
- Include Superpowers Workflow table
- Follow 4-phase execution flow
- Include communication protocol

```markdown
---
name: agent-name
description: Clear description of what the agent does
tools: [Read, Write, Edit, Bash, Glob, Grep, Task]
model: sonnet
---

# Agent Title

**Role:** Specific role
**Domain:** Domain area
**Objective:** Clear objective

## When to Use
...
```

#### Skills

Skills should:
- Have clear trigger conditions
- Include execution protocol diagram
- List MCP tools used
- Include examples

```markdown
# Skill: Skill Name

**Role:** Role
**Domain:** Domain
**Objective:** Objective

## Activation
**Trigger:** When to activate
**Mode:** Autonomous / Interactive / Guided

## Execution Protocol
...
```

#### Commands

Commands should:
- Have clear argument definitions
- Include usage examples
- List workflow steps
- Reference related skills/agents

```markdown
---
name: command-name
description: What the command does
arguments:
  - name: arg1
    description: "Argument description"
    required: true
---

# /command-name - Title

## Usage
...
```

## Coding Standards

### File Naming

- Agents: `kebab-case.md` in `master/agents/`
- Skills: `kebab-case/SKILL.md` in `master/skills/`
- Commands: `kebab-case.md` in `master/commands/`

### Frontmatter

All agent and command files must have valid YAML frontmatter:

```yaml
---
name: kebab-case-name
description: Clear description
tools: [Tool1, Tool2]  # for agents
model: sonnet          # for agents
arguments:             # for commands
  - name: arg
    required: true
---
```

### MCP Integration

All components should document MCP tool usage:

```markdown
## MCP Integration

| Server | Tools | Use When |
|--------|-------|----------|
| **Serena** | `find_symbol` | Code analysis |
| **Context7** | `get_library_docs` | Documentation |
```

### Documentation

- Use clear, concise language
- Include examples for all features
- Document parameters and return values
- Add ASCII diagrams for complex flows

## Testing

### Run Validation

```bash
# Validate all configuration
node scripts/validate-config.js
```

### Run Tests

```bash
# Run MCP mock tests
bun test
```

### Test Coverage

- All new agents should have MCP integration tests
- All new skills should have execution tests
- All new commands should have argument validation

## Pull Request Process

### Before Submitting

1. **Validate configuration**
   ```bash
   node scripts/validate-config.js
   ```

2. **Run tests**
   ```bash
   bun test
   ```

3. **Update documentation**
   - Update README.md if adding features
   - Update CHANGELOG.md
   - Add to relevant module.json

### PR Requirements

1. **Title**: Clear, descriptive title
2. **Description**: What and why
3. **Testing**: How you tested
4. **Checklist**:
   - [ ] Validation passes
   - [ ] Tests pass
   - [ ] Documentation updated
   - [ ] CHANGELOG.md updated

### Review Process

1. Maintainer reviews within 48 hours
2. Address feedback
3. Maintainer merges when approved

## Module System

### Adding to Modules

When creating new components, add them to the appropriate module:

```json
// master/modules/payment/module.json
{
  "skills": [
    "existing-skill",
    "your-new-skill"  // Add here
  ]
}
```

### Module Guidelines

- `core` - Essential, always-installed components
- `payment` - Payment processing, PSP integration
- `security` - Security, compliance, auditing
- `frontend` - UI/UX, React, Next.js

## Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions
- Check existing issues before creating new ones

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Claude Payment Orchestrator!
